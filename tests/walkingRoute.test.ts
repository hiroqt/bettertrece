import assert from 'node:assert/strict';
import test from 'node:test';
import {
  findWalkingRoute,
  findWalkingRoutes,
  splitRouteByShade,
} from '../src/lib/walkingRoute.ts';

const road = (
  coordinates: number[][],
  properties: Record<string, unknown> = {}
) => ({
  type: 'Feature' as const,
  properties,
  geometry: { type: 'LineString' as const, coordinates },
});

test('finds the shortest connected public path and skips explicitly private ways', () => {
  const route = findWalkingRoute(
    [
      road(
        [
          [120, 14],
          [120.001, 14],
        ],
        { class: 'residential' }
      ),
      road(
        [
          [120, 14],
          [120, 14.001],
          [120.001, 14],
        ],
        { class: 'footway' }
      ),
      road(
        [
          [120.001, 14],
          [120.002, 14],
        ],
        { class: 'service', access: 'private' }
      ),
    ],
    [120, 14],
    [120.001, 14]
  );

  assert.ok(route);
  assert.deepEqual(route.features[0].geometry.coordinates, [
    [120, 14],
    [120.001, 14],
  ]);
});

test('offers a longer alternative when it has substantially more modeled shade', () => {
  const start: [number, number] = [120, 14];
  const destination: [number, number] = [120.002, 14];
  const routes = findWalkingRoutes(
    [
      road([start, destination]),
      road([start, [120.001, 14.0006], destination]),
    ],
    start,
    destination,
    120,
    () => true,
    {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [119.9999, 14.0001],
                  [120.0021, 14.0001],
                  [120.0021, 14.0008],
                  [119.9999, 14.0008],
                  [119.9999, 14.0001],
                ],
              ],
            ],
          },
        },
      ],
    }
  );

  assert.ok(routes.shortest);
  assert.ok(routes.moreShade);
  const shortest = splitRouteByShade(routes.shortest, {
    type: 'FeatureCollection',
    features: [],
  });
  const moreShade = splitRouteByShade(routes.moreShade, {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [119.9999, 14.0001],
                [120.0021, 14.0001],
                [120.0021, 14.0008],
                [119.9999, 14.0008],
                [119.9999, 14.0001],
              ],
            ],
          ],
        },
      },
    ],
  });
  assert.ok(
    routes.moreShade.features[0].properties.distanceMeters >
      routes.shortest.features[0].properties.distanceMeters
  );
  assert.ok(moreShade.shadedDistanceMeters > shortest.shadedDistanceMeters);
});

test('returns no route for disconnected network or distant endpoints', () => {
  const roads = [
    road([
      [120, 14],
      [120.001, 14],
    ]),
  ];
  assert.equal(findWalkingRoute(roads, [120, 14], [120.01, 14]), null);
  assert.equal(findWalkingRoute(roads, [120, 14], [120.001, 14.01]), null);
  assert.equal(findWalkingRoute(roads, [120, 14], [120, 14]), null);
  assert.equal(
    findWalkingRoute(
      [
        road(
          [
            [120, 14],
            [120.001, 14],
          ],
          { subclass: 'trunk_link' }
        ),
      ],
      [120, 14],
      [120.001, 14]
    ),
    null
  );
});

test('joins vector tile endpoints rounded to about one metre', () => {
  const route = findWalkingRoute(
    [
      road(
        [
          [120, 14],
          [120.001004, 14],
        ],
        { class: 'residential' }
      ),
      road(
        [
          [120.000996, 14],
          [120.002, 14],
        ],
        { class: 'residential' }
      ),
    ],
    [120, 14],
    [120.002, 14]
  );
  assert.ok(route);
  assert.equal(route.features[0].geometry.coordinates.length, 3);
});

test('uses a nearby connected street when the closest mapped node is isolated', () => {
  const route = findWalkingRoute(
    [
      road([
        [120.00002, 14],
        [120.00002, 14.0001],
      ]),
      road([
        [120.00012, 14],
        [120.001, 14],
        [120.002, 14],
      ]),
    ],
    [120, 14],
    [120.002, 14]
  );

  assert.ok(route);
});

test('respects an allowed-area predicate while assembling the road graph', () => {
  const route = findWalkingRoute(
    [
      road([
        [120, 14],
        [120.001, 14],
        [120.002, 14],
      ]),
    ],
    [120, 14],
    [120.002, 14],
    120,
    point => point[0] <= 120.001
  );
  assert.equal(route, null);
});

test('rejects road segments and endpoint connectors that cross a restricted area', () => {
  const roads = [
    road([
      [120, 14],
      [120.001, 14],
    ]),
  ];
  const allowed = (point: [number, number]) =>
    point[0] < 120.0002 || point[0] > 120.0003;
  assert.equal(
    findWalkingRoute(roads, [120, 14], [120.001, 14], 120, allowed),
    null
  );
  assert.equal(
    findWalkingRoute(roads, [120.00025, 14], [120.001, 14], 120, allowed),
    null
  );
});

test('splits a route into shaded and exposed distance at the selected time', () => {
  const route = {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: [
            [120, 14],
            [120.001, 14],
            [120.002, 14],
          ],
        },
      },
    ],
  };
  const shade = {
    type: 'FeatureCollection' as const,
    features: [
      {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'MultiPolygon' as const,
          coordinates: [
            [
              [
                [120.0004, 13.9999],
                [120.0006, 13.9999],
                [120.0006, 14.0001],
                [120.0004, 14.0001],
                [120.0004, 13.9999],
              ],
            ],
          ],
        },
      },
    ],
  };

  const segments = splitRouteByShade(route, shade);
  assert.ok(segments.features.length > 2);
  assert.ok(segments.features.some(feature => feature.properties?.shaded));
  assert.ok(segments.features.some(feature => !feature.properties?.shaded));
  assert.ok(segments.shadedDistanceMeters > 10);
  assert.ok(segments.shadedDistanceMeters < 50);
  assert.ok(segments.distanceMeters > segments.shadedDistanceMeters);
});
