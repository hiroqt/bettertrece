import { readFile, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { XMLParser } from 'fast-xml-parser';

const boundary = JSON.parse(
  await readFile('public/data/trece-boundary-osm.geojson', 'utf8')
);
const rings = boundary.features.flatMap(feature =>
  feature.geometry.type === 'Polygon'
    ? feature.geometry.coordinates
    : feature.geometry.coordinates.flat()
);
const points = rings.flatMap(ring => ring);
const [west, south, east, north] = [
  Math.min(...points.map(point => point[0])),
  Math.min(...points.map(point => point[1])),
  Math.max(...points.map(point => point[0])),
  Math.max(...points.map(point => point[1])),
];
const middleLongitude = (west + east) / 2;
const middleLatitude = (south + north) / 2;
const boxes = [
  [west, south, middleLongitude, middleLatitude],
  [middleLongitude, south, east, middleLatitude],
  [west, middleLatitude, middleLongitude, north],
  [middleLongitude, middleLatitude, east, north],
];
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseAttributeValue: false,
  isArray: name =>
    ['node', 'way', 'relation', 'tag', 'nd', 'member'].includes(name),
});
const nodes = new Map();
const ways = new Map();
const relations = new Map();

async function loadBox(box, depth = 0) {
  const url = `https://api.openstreetmap.org/api/0.6/map?bbox=${box.join(',')}`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'BetterTrece/1.0 (civic shade map)' },
  });
  if (!response.ok) {
    const reason = await response.text();
    if (
      response.status === 400 &&
      reason.includes('too many nodes') &&
      depth < 5
    ) {
      const [left, bottom, right, top] = box;
      const middleLon = (left + right) / 2;
      const middleLat = (bottom + top) / 2;
      for (const part of [
        [left, bottom, middleLon, middleLat],
        [middleLon, bottom, right, middleLat],
        [left, middleLat, middleLon, top],
        [middleLon, middleLat, right, top],
      ]) {
        await loadBox(part, depth + 1);
      }
      return;
    }
    throw new Error(
      `OpenStreetMap API request failed (${response.status}): ${reason}`
    );
  }
  const osm = parser.parse(await response.text()).osm;
  for (const node of osm.node ?? []) nodes.set(node.id, node);
  for (const way of osm.way ?? []) ways.set(way.id, way);
  for (const relation of osm.relation ?? [])
    relations.set(relation.id, relation);
}

for (const box of boxes) await loadBox(box);

const placeKeys = [
  'amenity',
  'shop',
  'leisure',
  'tourism',
  'sport',
  'healthcare',
  'craft',
  'office',
  'historic',
  'public_transport',
];
const tagsOf = element =>
  Object.fromEntries((element.tag ?? []).map(({ k, v }) => [k, v]));
const hasPlaceType = tags => placeKeys.some(key => tags[key]);
const namedPlace = (element, type, coordinate) => {
  const tags = tagsOf(element);
  const name = String(tags['name:en'] ?? tags.name ?? '').trim();
  if (!name || !coordinate || !hasPlaceType(tags)) return null;
  const [category, subclass] = placeKeys
    .map(key => [key, tags[key]])
    .find(([, value]) => value) ?? ['', ''];
  return {
    id: `${type}/${element.id}`,
    name,
    class: category,
    subclass,
    categories: placeKeys
      .filter(key => tags[key])
      .map(key => `${key}:${tags[key]}`),
    coordinate,
    osmUrl: `https://www.openstreetmap.org/${type}/${element.id}`,
  };
};
const nodeCoordinates = element => {
  const lat = Number(element.lat);
  const lon = Number(element.lon);
  return Number.isFinite(lat) && Number.isFinite(lon) ? [lon, lat] : null;
};
const wayCoordinates = way => {
  const coordinates = (way.nd ?? [])
    .map(({ ref }) => nodeCoordinates(nodes.get(ref) ?? {}))
    .filter(Boolean);
  if (coordinates.length === 0) return null;
  return [
    coordinates.reduce((sum, point) => sum + point[0], 0) / coordinates.length,
    coordinates.reduce((sum, point) => sum + point[1], 0) / coordinates.length,
  ];
};
const places = [];
const roads = [];

for (const node of nodes.values()) {
  const place = namedPlace(node, 'node', nodeCoordinates(node));
  if (place) places.push(place);
}
for (const way of ways.values()) {
  const tags = tagsOf(way);
  const roadCoordinates = (way.nd ?? [])
    .map(({ ref }) => nodeCoordinates(nodes.get(ref) ?? {}))
    .filter(Boolean);
  if (tags.highway && roadCoordinates.length > 1) {
    roads.push({
      type: 'Feature',
      id: `way/${way.id}`,
      properties: {
        highway: tags.highway,
        access: tags.access ?? '',
        foot: tags.foot ?? '',
        name: tags['name:en'] ?? tags.name ?? '',
      },
      geometry: { type: 'LineString', coordinates: roadCoordinates },
    });
  }
  const place = namedPlace(way, 'way', wayCoordinates(way));
  if (place) places.push(place);
}
for (const relation of relations.values()) {
  const memberWays = (relation.member ?? [])
    .filter(member => member.type === 'way')
    .map(member => ways.get(member.ref))
    .filter(Boolean);
  const coordinates = memberWays.flatMap(way =>
    (way.nd ?? [])
      .map(({ ref }) => nodeCoordinates(nodes.get(ref) ?? {}))
      .filter(Boolean)
  );
  const center =
    coordinates.length > 0
      ? [
          coordinates.reduce((sum, point) => sum + point[0], 0) /
            coordinates.length,
          coordinates.reduce((sum, point) => sum + point[1], 0) /
            coordinates.length,
        ]
      : null;
  const place = namedPlace(relation, 'relation', center);
  if (place) places.push(place);
}

const unique = new Map(places.map(place => [place.id, place]));
const data = {
  source: 'OpenStreetMap API map extract',
  license: 'Open Database License (ODbL) 1.0',
  retrievedAt: new Date().toISOString(),
  coverage:
    'Named features tagged as amenities, shops, leisure, tourism, sport, healthcare, crafts, offices, historic places, and public transport inside the Trece Martires OSM boundary box.',
  places: [...unique.values()].sort((a, b) => a.name.localeCompare(b.name)),
};
await writeFile(
  'public/data/trece-places-osm.json',
  `${JSON.stringify(data)}\n`
);
const roadData = {
  type: 'FeatureCollection',
  source: data.source,
  license: data.license,
  retrievedAt: data.retrievedAt,
  features: roads,
};
await writeFile(
  'public/data/trece-walking-network-osm.geojson.gz',
  gzipSync(JSON.stringify(roadData))
);
console.log(
  `Wrote ${data.places.length} named places and ${roads.length} OSM road ways.`
);
