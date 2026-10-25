import assert from 'node:assert/strict';
import test from 'node:test';
import { createOutsideMask, isInsideGeometry } from '../src/lib/mapBoundary.ts';

test('display mask contains the OSM city outline as a hole', () => {
  const mask = createOutsideMask({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [120, 14],
              [121, 14],
              [121, 15],
              [120, 15],
              [120, 14],
            ],
          ],
        },
      },
    ],
  });

  assert.equal(mask.geometry.type, 'Polygon');
  assert.equal(mask.geometry.coordinates.length, 2);
  assert.ok(mask.geometry.coordinates[0].length === 5);
  assert.ok(mask.geometry.coordinates[1].length === 5);
  assert.ok(
    mask.geometry.coordinates[1].every(
      ([longitude, latitude]) =>
        longitude >= 120 && longitude <= 121 && latitude >= 14 && latitude <= 15
    )
  );
  const signedArea = (ring: number[][]) =>
    ring
      .slice(0, -1)
      .reduce(
        (area, point, index) =>
          area + point[0] * ring[index + 1][1] - ring[index + 1][0] * point[1],
        0
      );
  assert.ok(signedArea(mask.geometry.coordinates[0]) > 0);
  assert.ok(signedArea(mask.geometry.coordinates[1]) < 0);
});

test('boundary membership handles polygon holes and multipolygons', () => {
  const geometry = {
    type: 'MultiPolygon' as const,
    coordinates: [
      [
        [
          [0, 0],
          [4, 0],
          [4, 4],
          [0, 4],
          [0, 0],
        ],
        [
          [1, 1],
          [2, 1],
          [2, 2],
          [1, 2],
          [1, 1],
        ],
      ],
      [
        [
          [10, 10],
          [12, 10],
          [12, 12],
          [10, 12],
          [10, 10],
        ],
      ],
    ],
  };

  assert.equal(isInsideGeometry([0.5, 0.5], geometry), true);
  assert.equal(isInsideGeometry([1.5, 1.5], geometry), false);
  assert.equal(isInsideGeometry([11, 11], geometry), true);
  assert.equal(isInsideGeometry([8, 8], geometry), false);
});
