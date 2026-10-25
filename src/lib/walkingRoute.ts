import type {
  Feature,
  FeatureCollection,
  LineString,
  MultiPolygon,
} from 'geojson';
import { isInsideGeometry } from './mapBoundary.ts';

type RoadFeature = Feature<
  LineString | { type: 'MultiLineString'; coordinates: number[][][] },
  Record<string, unknown>
>;
type Coordinate = [number, number];

const key = ([longitude, latitude]: Coordinate) =>
  `${longitude.toFixed(5)},${latitude.toFixed(5)}`;
const distance = (a: Coordinate, b: Coordinate) => {
  const latitudeScale = Math.cos((((a[1] + b[1]) / 2) * Math.PI) / 180);
  return Math.hypot(
    (b[0] - a[0]) * 111_320 * latitudeScale,
    (b[1] - a[1]) * 111_320
  );
};

function staysAllowed(
  a: Coordinate,
  b: Coordinate,
  isAllowed: (point: Coordinate) => boolean
) {
  const steps = Math.max(1, Math.ceil(distance(a, b) / 5));
  for (let index = 0; index <= steps; index += 1) {
    const progress = index / steps;
    if (
      !isAllowed([
        a[0] + (b[0] - a[0]) * progress,
        a[1] + (b[1] - a[1]) * progress,
      ])
    )
      return false;
  }
  return true;
}

function isWalkable({ properties = {} }: RoadFeature) {
  const className = String(properties.class ?? properties.highway ?? '');
  const subclass = String(properties.subclass ?? '');
  return (
    !['no', 'private'].includes(
      String(properties.access ?? '').toLowerCase()
    ) &&
    !['no', 'private'].includes(String(properties.foot ?? '').toLowerCase()) &&
    !className.startsWith('motorway') &&
    !className.startsWith('trunk') &&
    !subclass.startsWith('motorway') &&
    !subclass.startsWith('trunk')
  );
}

export function findWalkingRoute(
  features: RoadFeature[],
  start: Coordinate,
  destination: Coordinate,
  maxSnapMeters = 120,
  isAllowed: (point: Coordinate) => boolean = () => true
): FeatureCollection<LineString> | null {
  return findWalkingRoutes(
    features,
    start,
    destination,
    maxSnapMeters,
    isAllowed
  ).shortest;
}

export function findWalkingRoutes(
  features: RoadFeature[],
  start: Coordinate,
  destination: Coordinate,
  maxSnapMeters = 120,
  isAllowed: (point: Coordinate) => boolean = () => true,
  shade: FeatureCollection<MultiPolygon> = {
    type: 'FeatureCollection',
    features: [],
  }
) {
  const noRoutes = { shortest: null, moreShade: null };
  if (!isAllowed(start) || !isAllowed(destination)) return noRoutes;
  if (distance(start, destination) < 1) return noRoutes;
  const graph = new Map<
    string,
    { point: Coordinate; neighbors: Map<string, number> }
  >();
  const getNode = (point: Coordinate) => {
    const id = key(point);
    if (!graph.has(id)) graph.set(id, { point, neighbors: new Map() });
    return graph.get(id)!;
  };

  for (const feature of features) {
    if (!isWalkable(feature)) continue;
    const lines =
      feature.geometry.type === 'LineString'
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates;
    for (const line of lines) {
      for (let i = 1; i < line.length; i += 1) {
        const a = line[i - 1] as Coordinate;
        const b = line[i] as Coordinate;
        if (!staysAllowed(a, b, isAllowed)) continue;
        const length = distance(a, b);
        if (length === 0) continue;
        getNode(a).neighbors.set(key(b), length);
        getNode(b).neighbors.set(key(a), length);
      }
    }
  }
  if (!graph.size) return noRoutes;

  const roadNodes = [...graph.entries()];
  const addEndpoint = (id: string, point: Coordinate) => {
    const endpoint = { point, neighbors: new Map<string, number>() };
    for (const [roadId, node] of roadNodes) {
      const connectorDistance = distance(point, node.point);
      if (
        connectorDistance <= maxSnapMeters &&
        staysAllowed(point, node.point, isAllowed)
      ) {
        endpoint.neighbors.set(roadId, connectorDistance);
        node.neighbors.set(id, connectorDistance);
      }
    }
    if (!endpoint.neighbors.size) return false;
    graph.set(id, endpoint);
    return true;
  };
  const from = '__route_start__';
  const to = '__route_destination__';
  if (!addEndpoint(from, start) || !addEndpoint(to, destination))
    return noRoutes;

  const shadedEdges = new Map<string, boolean>();
  const routeWithPreference = (preferShade: boolean) => {
    const distances = new Map([[from, 0]]);
    const previous = new Map<string, string>();
    const pending = new Set([from]);
    while (pending.size) {
      let current = '';
      let best = Infinity;
      for (const node of pending) {
        const cost = distances.get(node) ?? Infinity;
        if (cost < best) {
          current = node;
          best = cost;
        }
      }
      if (!current || current === to) break;
      pending.delete(current);
      for (const [neighbor, length] of graph.get(current)!.neighbors) {
        let cost = length;
        if (preferShade && shade.features.length) {
          const edgeId =
            current < neighbor
              ? `${current}|${neighbor}`
              : `${neighbor}|${current}`;
          let shaded = shadedEdges.get(edgeId);
          if (shaded === undefined) {
            const a = graph.get(current)!.point;
            const b = graph.get(neighbor)!.point;
            const midpoint: Coordinate = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
            shaded = shade.features.some(feature =>
              isInsideGeometry(midpoint, feature.geometry)
            );
            shadedEdges.set(edgeId, shaded);
          }
          // shortcut: exposed edges cost 3x, tune if route shade proves too weak or detours feel excessive
          if (!shaded) cost *= 3;
        }
        const next = best + cost;
        if (next < (distances.get(neighbor) ?? Infinity)) {
          distances.set(neighbor, next);
          previous.set(neighbor, current);
          pending.add(neighbor);
        }
      }
    }
    if (!distances.has(to)) return null;
    const path = [to];
    while (path[0] !== from) {
      const parent = previous.get(path[0]);
      if (!parent) return null;
      path.unshift(parent);
    }
    const coordinates = path
      .map(id => graph.get(id)!.point)
      .filter(
        (point, index, points) =>
          index === 0 ||
          point[0] !== points[index - 1][0] ||
          point[1] !== points[index - 1][1]
      );
    const routeDistance = coordinates
      .slice(1)
      .reduce(
        (total, point, index) => total + distance(coordinates[index], point),
        0
      );
    return {
      type: 'FeatureCollection' as const,
      features: [
        {
          type: 'Feature' as const,
          properties: { distanceMeters: routeDistance },
          geometry: {
            type: 'LineString' as const,
            coordinates,
          },
        },
      ],
    };
  };

  const shortest = routeWithPreference(false);
  return {
    shortest,
    moreShade: shade.features.length ? routeWithPreference(true) : shortest,
  };
}

export function splitRouteByShade(
  route: FeatureCollection<LineString>,
  shade: FeatureCollection<MultiPolygon>
) {
  const features: Feature<
    LineString,
    { shaded: boolean; distanceMeters: number }
  >[] = [];
  let distanceMeters = 0;
  let shadedDistanceMeters = 0;

  for (const routeFeature of route.features) {
    const coordinates = routeFeature.geometry.coordinates as Coordinate[];
    for (let i = 1; i < coordinates.length; i += 1) {
      const start = coordinates[i - 1];
      const end = coordinates[i];
      const length = distance(start, end);
      const steps = Math.max(1, Math.ceil(length / 20));
      for (let step = 0; step < steps; step += 1) {
        const a: Coordinate = [
          start[0] + ((end[0] - start[0]) * step) / steps,
          start[1] + ((end[1] - start[1]) * step) / steps,
        ];
        const b: Coordinate = [
          start[0] + ((end[0] - start[0]) * (step + 1)) / steps,
          start[1] + ((end[1] - start[1]) * (step + 1)) / steps,
        ];
        const segmentDistance = distance(a, b);
        const midpoint: Coordinate = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const shaded = shade.features.some(feature =>
          isInsideGeometry(midpoint, feature.geometry)
        );
        distanceMeters += segmentDistance;
        if (shaded) shadedDistanceMeters += segmentDistance;
        features.push({
          type: 'Feature',
          properties: { shaded, distanceMeters: segmentDistance },
          geometry: { type: 'LineString', coordinates: [a, b] },
        });
      }
    }
  }

  return {
    type: 'FeatureCollection' as const,
    features,
    distanceMeters,
    shadedDistanceMeters,
  };
}
