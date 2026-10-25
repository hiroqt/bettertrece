import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
  Position,
} from 'geojson';

type BoundaryGeometry = Polygon | MultiPolygon;

function insideRing(point: Position, ring: Position[]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [x, y] = point;
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

export function isInsideGeometry(point: Position, geometry: BoundaryGeometry) {
  const polygons =
    geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;
  return polygons.some(
    rings =>
      insideRing(point, rings[0]) &&
      !rings.slice(1).some(ring => insideRing(point, ring))
  );
}

function exteriorRings(boundary: FeatureCollection<BoundaryGeometry>) {
  return boundary.features.flatMap(feature => {
    const geometry = feature.geometry;
    if (!geometry) return [];
    return geometry.type === 'Polygon'
      ? [geometry.coordinates[0]]
      : geometry.coordinates.map(polygon => polygon[0]);
  });
}

function signedArea(ring: Position[]) {
  return ring.slice(0, -1).reduce((area, point, index) => {
    const next = ring[index + 1];
    return area + point[0] * next[1] - next[0] * point[1];
  }, 0);
}

function orient(ring: Position[], clockwise: boolean) {
  return signedArea(ring) < 0 === clockwise ? ring : [...ring].reverse();
}

export function createOutsideMask(
  boundary: FeatureCollection<BoundaryGeometry>
): Feature<Polygon> {
  const rings = exteriorRings(boundary).filter(ring => ring.length >= 4);
  const positions = rings.flat();
  if (positions.length === 0) throw new Error('Boundary geometry is empty.');

  const longitudes = positions.map(point => point[0]);
  const latitudes = positions.map(point => point[1]);
  const padding = 2;
  const west = Math.min(...longitudes) - padding;
  const east = Math.max(...longitudes) + padding;
  const south = Math.min(...latitudes) - padding;
  const north = Math.max(...latitudes) + padding;
  const outer: Position[] = [
    [west, south],
    [east, south],
    [east, north],
    [west, north],
    [west, south],
  ];

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        orient(outer, false),
        ...rings.map(ring => orient(ring, true)),
      ],
    },
  };
}
