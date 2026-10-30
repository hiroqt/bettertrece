import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from '../../lib/icons';
import {
  GeoJSONSource,
  Map as MapLibreMap,
  NavigationControl,
  ScaleControl,
  setWorkerUrl,
  type MapGeoJSONFeature,
} from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import type {
  Feature,
  FeatureCollection,
  Geometry,
  LineString,
  MultiPolygon,
  Point,
  Polygon,
} from 'geojson';
import {
  getShadowOffsetMeters,
  projectShadowPolygons,
  type BuildingGeometry,
  type SunPosition,
} from '../../lib/sunPosition';
import { createOutsideMask, isInsideGeometry } from '../../lib/mapBoundary';
import { findWalkingRoutes, splitRouteByShade } from '../../lib/walkingRoute';
import {
  dedupeCityPlaces,
  searchCityPlaces,
  type SearchableCityPlace,
} from '../../lib/placeSearch';

setWorkerUrl(workerUrl);

const MAP_CENTER: [number, number] = [120.8667, 14.2828];
const MAX_SHADOWS_PER_LAYER = 5_000;
const EMPTY_COLLECTION: FeatureCollection<MultiPolygon> = {
  type: 'FeatureCollection',
  features: [],
};
const EMPTY_ROUTE: FeatureCollection<LineString> = {
  type: 'FeatureCollection',
  features: [],
};
const EMPTY_POINTS: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [],
};
type Coordinate = [number, number];

function routeBearing(
  [longitude, latitude]: Coordinate,
  [endLongitude, endLatitude]: Coordinate
) {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitude1 = toRadians(latitude);
  const latitude2 = toRadians(endLatitude);
  const longitudeDelta = toRadians(endLongitude - longitude);
  const y = Math.sin(longitudeDelta) * Math.cos(latitude2);
  const x =
    Math.cos(latitude1) * Math.sin(latitude2) -
    Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(longitudeDelta);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function applyRouteSelection(map: MapLibreMap, selected: RoutePreference) {
  const activeId = `walking-route-${selected}-line`;
  const inactiveId = `walking-route-${selected === 'shortest' ? 'moreShade' : 'shortest'}-line`;
  map.setPaintProperty(activeId, 'line-color', [
    'case',
    ['boolean', ['get', 'shaded'], false],
    '#15803d',
    '#dc2626',
  ]);
  map.setPaintProperty(activeId, 'line-width', 8);
  map.setPaintProperty(activeId, 'line-opacity', 0.98);
  map.setPaintProperty(inactiveId, 'line-color', '#64748b');
  map.setPaintProperty(inactiveId, 'line-width', 5);
  map.setPaintProperty(inactiveId, 'line-opacity', 0.48);
  if (map.getLayer('walking-endpoint-circles')) {
    map.moveLayer(activeId, 'walking-endpoint-circles');
  }
}

function revealRoute(
  map: MapLibreMap,
  preference: RoutePreference,
  route: FeatureCollection<LineString>,
  animationFrame: { id: number }
) {
  const source = map.getSource(`walking-route-${preference}`) as
    GeoJSONSource | undefined;
  if (!source) return;
  cancelAnimationFrame(animationFrame.id);
  if (route.features.length === 0) {
    source.setData(EMPTY_ROUTE);
    return;
  }
  source.setData(EMPTY_ROUTE);
  const startedAt = performance.now();
  const animationSteps = Math.min(24, route.features.length);
  let previousCount = 0;
  const animate = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / 900);
    const step = Math.ceil(progress * animationSteps);
    const count = Math.max(
      1,
      Math.ceil((route.features.length * step) / animationSteps)
    );
    if (count !== previousCount) {
      source.setData({ ...route, features: route.features.slice(0, count) });
      previousCount = count;
    }
    if (progress < 1) {
      animationFrame.id = requestAnimationFrame(animate);
    }
  };
  animationFrame.id = requestAnimationFrame(animate);
}

export interface RouteEndpoint {
  coordinate: Coordinate;
  label: string;
}

export type RoutePreference = 'shortest' | 'moreShade';
type RouteMetrics = { distanceMeters: number; shadedDistanceMeters: number };

export interface MapSearchResult extends RouteEndpoint {
  id: string;
  class: string;
  subclass: string;
  categories?: string[];
}

interface DirectoryPlace extends SearchableCityPlace {
  coordinate: Coordinate;
}

type CityBoundary = FeatureCollection<Polygon | MultiPolygon> & {
  source?: string;
};

interface ShadeCoverage {
  buildings: number;
  buildingTotal: number;
  canopy: number;
  canopyTotal: number;
}

interface ShadeMapCanvasProps {
  sunPosition: SunPosition;
  isFullscreen: boolean;
  start: RouteEndpoint | null;
  destination: RouteEndpoint | null;
  selectedRoute: RoutePreference;
  routeSelectionVersion: number;
  searchQuery: string;
  onMapPoint: (point: Coordinate, insideBoundary: boolean) => void;
  onBoundaryLoaded: (
    boundary: FeatureCollection<Polygon | MultiPolygon>
  ) => void;
  onPlacesLoaded: (count: number, retrievedAt: string) => void;
  onSearchResults: (results: MapSearchResult[]) => void;
  onRouteSummary: (
    summary: { shortest: RouteMetrics; moreShade: RouteMetrics } | null
  ) => void;
  onToggleFullscreen: () => void;
  labels: {
    loading: string;
    mapError: string;
    mapLabel: string;
    buildingsModeled: string;
    canopyUnavailable: string;
    buildingUnavailable: string;
    openFullscreen: string;
    closeFullscreen: string;
    mapClickHint: string;
  };
}

function boundaryPolygons(geometry: Polygon | MultiPolygon) {
  return geometry.type === 'Polygon'
    ? [geometry.coordinates]
    : geometry.coordinates;
}

function getBounds(boundary: CityBoundary) {
  const points = boundary.features.flatMap(feature =>
    boundaryPolygons(feature.geometry).flatMap(polygon => polygon[0])
  );
  const longitudes = points.map(point => point[0]);
  const latitudes = points.map(point => point[1]);
  const padding = 0.12;

  return {
    west: Math.min(...longitudes) - padding,
    south: Math.min(...latitudes) - padding,
    east: Math.max(...longitudes) + padding,
    north: Math.max(...latitudes) + padding,
  };
}

function featureCoordinate(feature: {
  geometry: Geometry;
  properties?: Record<string, unknown> | null;
}): Coordinate | null {
  const geometry = feature.geometry;
  if (geometry.type === 'Point') return geometry.coordinates as Coordinate;
  if (geometry.type === 'LineString') {
    return geometry.coordinates[
      Math.floor(geometry.coordinates.length / 2)
    ] as Coordinate;
  }
  if (geometry.type === 'MultiLineString') {
    const line = geometry.coordinates[0];
    return (
      (line?.[Math.floor(line.length / 2)] as Coordinate | undefined) ?? null
    );
  }
  return null;
}

function searchLoadedPlaces(
  map: MapLibreMap,
  query: string,
  boundary: CityBoundary | null,
  directory: DirectoryPlace[]
) {
  const normalized = query.trim().toLocaleLowerCase();
  const results = new Map<string, MapSearchResult>();
  const seen = new Set<string>();
  const sourceLayers = normalized
    ? ['poi', 'place', 'transportation_name']
    : ['poi'];
  const add = (result: MapSearchResult) => {
    if (
      !boundary?.features.some(feature =>
        isInsideGeometry(result.coordinate, feature.geometry)
      )
    )
      return;
    const key = `${result.label.toLocaleLowerCase()}:${result.coordinate[0].toFixed(5)},${result.coordinate[1].toFixed(5)}`;
    if (!results.has(key)) results.set(key, result);
  };

  if (normalized.length >= 2) {
    for (const place of directory) {
      add({
        id: place.id,
        label: place.label,
        coordinate: place.coordinate,
        class: place.class,
        subclass: place.subclass,
        categories: place.categories,
      });
    }
  }

  for (const sourceLayer of sourceLayers) {
    for (const feature of map.querySourceFeatures('openmaptiles', {
      sourceLayer,
    })) {
      const coordinate = featureCoordinate(feature);
      const label = String(
        feature.properties?.name_en ??
          feature.properties?.['name:en'] ??
          feature.properties?.name ??
          feature.properties?.ref ??
          ''
      ).trim();
      if (!coordinate || !label) continue;
      const id = `${label}:${coordinate[0].toFixed(5)},${coordinate[1].toFixed(5)}`;
      if (seen.has(id)) continue;
      seen.add(id);
      add({
        id,
        label,
        coordinate,
        class: String(feature.properties?.class ?? ''),
        subclass: String(feature.properties?.subclass ?? ''),
      });
    }
  }
  const matches = dedupeCityPlaces(
    searchCityPlaces([...results.values()], query)
  );
  return normalized.length >= 2 ? matches : matches.slice(0, 8);
}

function explicitBuildingHeight(properties: MapGeoJSONFeature['properties']) {
  const estimatedHeight = Number.parseFloat(String(properties?.height_m ?? ''));
  if (Number.isFinite(estimatedHeight) && estimatedHeight > 0) {
    return estimatedHeight;
  }

  const height = Number.parseFloat(String(properties?.height ?? ''));
  if (Number.isFinite(height) && height > 0) return height;

  const levels = Number.parseFloat(
    String(properties?.['building:levels'] ?? properties?.levels ?? '')
  );
  if (Number.isFinite(levels) && levels > 0) return levels * 3;

  const renderedHeight = Number.parseFloat(
    String(properties?.render_height ?? '')
  );
  return Number.isFinite(renderedHeight) && renderedHeight > 0
    ? renderedHeight
    : null;
}

function updateShadows(
  map: MapLibreMap,
  sunPosition: SunPosition,
  lastStamp: { current: string },
  lastCoverage: { current: string },
  shadowsRef: { current: FeatureCollection<MultiPolygon> },
  setCoverage: (coverage: ShadeCoverage) => void
) {
  if (
    !map.isStyleLoaded() ||
    !map.areTilesLoaded() ||
    !map.getLayer('building-3d')
  )
    return;

  const stamp = [
    sunPosition.azimuthDegrees.toFixed(1),
    sunPosition.elevationDegrees.toFixed(1),
    map.getZoom().toFixed(1),
    ...map
      .getCenter()
      .toArray()
      .map(value => value.toFixed(4)),
  ].join(':');
  if (stamp === lastStamp.current) return;
  lastStamp.current = stamp;

  const buildings = map.queryRenderedFeatures(undefined, {
    layers: [
      map.getLayer('google-building-3d') ? 'google-building-3d' : 'building-3d',
    ],
  });
  const canopy = map.getLayer('canopy-patches')
    ? map.queryRenderedFeatures(undefined, { layers: ['canopy-patches'] })
    : [];
  const buildingSeen = new Set<string>();
  const canopySeen = new Set<string>();
  const shadows: Feature<MultiPolygon>[] = [];
  let buildingTotal = 0;
  let canopyTotal = 0;
  let modeledBuildings = 0;
  let modeledCanopy = 0;

  for (const building of buildings) {
    const key =
      building.id !== undefined
        ? `${building.sourceLayer}:${building.id}`
        : JSON.stringify(building.geometry);
    if (buildingSeen.has(key)) continue;
    buildingSeen.add(key);
    buildingTotal += 1;
    if (modeledBuildings >= MAX_SHADOWS_PER_LAYER) continue;

    const height = explicitBuildingHeight(building.properties);
    if (
      height === null ||
      (building.geometry.type !== 'Polygon' &&
        building.geometry.type !== 'MultiPolygon')
    ) {
      continue;
    }

    const offset = getShadowOffsetMeters(
      height,
      sunPosition.azimuthDegrees,
      sunPosition.elevationDegrees
    );
    const coordinates = projectShadowPolygons(
      building.geometry as BuildingGeometry,
      offset
    );
    if (coordinates.length === 0) continue;

    shadows.push({
      type: 'Feature',
      properties: {},
      geometry: { type: 'MultiPolygon', coordinates },
    });
    modeledBuildings += 1;
  }

  for (const patch of canopy) {
    const key =
      patch.id !== undefined
        ? String(patch.id)
        : JSON.stringify(patch.geometry);
    if (canopySeen.has(key)) continue;
    canopySeen.add(key);
    canopyTotal += 1;
    if (
      modeledCanopy >= MAX_SHADOWS_PER_LAYER ||
      (patch.geometry.type !== 'Polygon' &&
        patch.geometry.type !== 'MultiPolygon')
    ) {
      continue;
    }

    const height = Number.parseFloat(String(patch.properties?.height_m ?? ''));
    if (!Number.isFinite(height) || height < 3) continue;

    const offset = getShadowOffsetMeters(
      height,
      sunPosition.azimuthDegrees,
      sunPosition.elevationDegrees
    );
    const coordinates = projectShadowPolygons(
      patch.geometry as BuildingGeometry,
      offset
    );
    if (coordinates.length === 0) continue;

    shadows.push({
      type: 'Feature',
      properties: {},
      geometry: { type: 'MultiPolygon', coordinates },
    });
    modeledCanopy += 1;
  }

  const source = map.getSource('sun-shadows') as GeoJSONSource | undefined;
  const data = { type: 'FeatureCollection' as const, features: shadows };
  shadowsRef.current = data;
  source?.setData(data);

  const coverageKey = [
    modeledBuildings,
    buildingTotal,
    modeledCanopy,
    canopyTotal,
  ].join(':');
  if (lastCoverage.current !== coverageKey) {
    lastCoverage.current = coverageKey;
    setCoverage({
      buildings: modeledBuildings,
      buildingTotal,
      canopy: modeledCanopy,
      canopyTotal,
    });
  }
}

export default function ShadeMapCanvas({
  sunPosition,
  isFullscreen,
  start,
  destination,
  selectedRoute,
  routeSelectionVersion,
  searchQuery,
  onMapPoint,
  onBoundaryLoaded,
  onPlacesLoaded,
  onSearchResults,
  onRouteSummary,
  onToggleFullscreen,
  labels,
}: ShadeMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const sunPositionRef = useRef(sunPosition);
  const boundaryRef = useRef<CityBoundary | null>(null);
  const placesRef = useRef<DirectoryPlace[]>([]);
  const roadsRef = useRef<FeatureCollection<LineString> | null>(null);
  const shadowsRef = useRef(EMPTY_COLLECTION);
  const routeBuilderRef = useRef<() => void>(() => {});
  const lastRouteStampRef = useRef('');
  const selectedRouteRef = useRef(selectedRoute);
  const routeDataRef = useRef({
    shortest: EMPTY_ROUTE,
    moreShade: EMPTY_ROUTE,
  });
  const routeAnimationRef = useRef({ id: 0 });
  const callbacksRef = useRef({
    onMapPoint,
    onBoundaryLoaded,
    onPlacesLoaded,
    onSearchResults,
    onRouteSummary,
    onToggleFullscreen,
    start,
    destination,
    searchQuery,
  });
  const lastStampRef = useRef('');
  const lastCoverageRef = useRef('');
  const [coverage, setCoverage] = useState<ShadeCoverage>({
    buildings: 0,
    buildingTotal: 0,
    canopy: 0,
    canopyTotal: 0,
  });
  const [canopyUnavailable, setCanopyUnavailable] = useState(false);
  const [buildingUnavailable, setBuildingUnavailable] = useState(false);
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const routeAnimation = routeAnimationRef.current;
    selectedRouteRef.current = selectedRoute;
    const map = mapRef.current;
    if (mapState !== 'ready' || !map) return;
    if (routeDataRef.current[selectedRoute].features.length > 0) {
      const { start: routeStart, destination: routeEnd } = callbacksRef.current;
      map.flyTo({
        center:
          routeStart?.coordinate ?? (map.getCenter().toArray() as Coordinate),
        zoom: 16.5,
        pitch: 60,
        bearing:
          routeStart && routeEnd
            ? routeBearing(routeStart.coordinate, routeEnd.coordinate)
            : map.getBearing(),
        offset: window.matchMedia('(max-width: 639px)').matches
          ? [0, -window.innerHeight * 0.16]
          : [0, 0],
        duration: 1_000,
      });
    }
    applyRouteSelection(map, selectedRoute);
    revealRoute(
      map,
      selectedRoute,
      routeDataRef.current[selectedRoute],
      routeAnimation
    );
  }, [mapState, routeSelectionVersion, selectedRoute]);

  useEffect(() => {
    callbacksRef.current = {
      onMapPoint,
      onBoundaryLoaded,
      onPlacesLoaded,
      onSearchResults,
      onRouteSummary,
      onToggleFullscreen,
      start,
      destination,
      searchQuery,
    };
  }, [
    destination,
    onBoundaryLoaded,
    onPlacesLoaded,
    onMapPoint,
    onRouteSummary,
    onSearchResults,
    onToggleFullscreen,
    searchQuery,
    start,
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const routeAnimation = routeAnimationRef.current;
    let disposed = false;
    const map = new MapLibreMap({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: MAP_CENTER,
      zoom: 13,
      pitch: 52,
      bearing: -18,
      maxPitch: 65,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    mapRef.current = map;
    map.addControl(
      new NavigationControl({ visualizePitch: true }),
      'top-right'
    );
    map.addControl(new ScaleControl({ unit: 'metric' }), 'bottom-left');
    map.on('click', event => {
      const coordinate: Coordinate = [event.lngLat.lng, event.lngLat.lat];
      const boundary = boundaryRef.current;
      callbacksRef.current.onMapPoint(
        coordinate,
        Boolean(
          boundary?.features.some(feature =>
            isInsideGeometry(coordinate, feature.geometry)
          )
        )
      );
    });

    const renderShadows = () => {
      updateShadows(
        map,
        sunPositionRef.current,
        lastStampRef,
        lastCoverageRef,
        shadowsRef,
        setCoverage
      );
    };

    map.on('load', async () => {
      try {
        const response = await fetch('/data/trece-boundary-osm.geojson');
        if (!response.ok) throw new Error('Boundary data request failed.');
        const boundary = (await response.json()) as CityBoundary;
        if (disposed || boundary.features.length === 0) return;
        boundaryRef.current = boundary;
        callbacksRef.current.onBoundaryLoaded(boundary);

        try {
          const placesResponse = await fetch('/data/trece-places-osm.json');
          if (placesResponse.ok) {
            const directory = (await placesResponse.json()) as {
              retrievedAt: string;
              places: Array<{
                id: string;
                name: string;
                class: string;
                subclass: string;
                categories: string[];
                coordinate: Coordinate;
              }>;
            };
            placesRef.current = directory.places
              .map(place => ({ ...place, label: place.name }))
              .filter(place =>
                boundary.features.some(feature =>
                  isInsideGeometry(place.coordinate, feature.geometry)
                )
              );
            callbacksRef.current.onPlacesLoaded(
              placesRef.current.length,
              directory.retrievedAt
            );
          }
        } catch {
          placesRef.current = [];
        }

        try {
          const roadsResponse = await fetch(
            '/data/trece-walking-network-osm.geojson.gz'
          );
          if (roadsResponse.ok) {
            roadsRef.current =
              (await roadsResponse.json()) as FeatureCollection<LineString>;
          }
        } catch {
          roadsRef.current = null;
        }

        let buildingData: FeatureCollection<Polygon | MultiPolygon> | null =
          null;
        try {
          const buildingResponse = await fetch(
            '/data/trece-buildings-google-2023.geojson.gz'
          );
          if (!buildingResponse.ok) {
            throw new Error('Building data request failed.');
          }
          buildingData = (await buildingResponse.json()) as FeatureCollection<
            Polygon | MultiPolygon
          >;
        } catch {
          if (!disposed) setBuildingUnavailable(true);
        }

        let canopyData: FeatureCollection<Polygon | MultiPolygon> | null = null;
        try {
          const canopyResponse = await fetch(
            '/data/trece-canopy-6m.geojson.gz'
          );
          if (!canopyResponse.ok) {
            throw new Error('Canopy data request failed.');
          }
          canopyData = (await canopyResponse.json()) as FeatureCollection<
            Polygon | MultiPolygon
          >;
        } catch {
          if (!disposed) setCanopyUnavailable(true);
        }
        if (disposed) return;

        const bounds = getBounds(boundary);
        map.setMinZoom(11);
        map.setMaxBounds([
          [bounds.west, bounds.south],
          [bounds.east, bounds.north],
        ]);
        map.addSource('trece-boundary', { type: 'geojson', data: boundary });

        if (map.getLayer('building-3d')) {
          map.addLayer(
            {
              id: 'trece-boundary-fill',
              type: 'fill',
              source: 'trece-boundary',
              paint: { 'fill-color': '#d97706', 'fill-opacity': 0.06 },
            },
            'building-3d'
          );
        }

        if (map.getLayer('building-3d')) {
          map.setLayerZoomRange('building-3d', 12, 24);
          map.addSource('sun-shadows', {
            type: 'geojson',
            data: EMPTY_COLLECTION,
          });
          map.addLayer(
            {
              id: 'sun-shadows',
              type: 'fill',
              source: 'sun-shadows',
              paint: {
                'fill-color': '#263244',
                'fill-opacity': 0.28,
                'fill-outline-color': '#263244',
              },
            },
            'building-3d'
          );
        }

        if (canopyData && map.getLayer('building-3d')) {
          map.addSource('trece-canopy', { type: 'geojson', data: canopyData });
          map.addLayer(
            {
              id: 'canopy-patches',
              type: 'fill',
              source: 'trece-canopy',
              minzoom: 12,
              paint: {
                'fill-color': '#23834a',
                'fill-opacity': 0.38,
                'fill-outline-color': '#166534',
              },
            },
            'building-3d'
          );
        }

        if (buildingData && map.getLayer('building-3d')) {
          map.setLayoutProperty('building-3d', 'visibility', 'none');
          map.addSource('google-buildings', {
            type: 'geojson',
            data: buildingData,
          });
          map.addLayer(
            {
              id: 'google-building-3d',
              type: 'fill-extrusion',
              source: 'google-buildings',
              minzoom: 13,
              paint: {
                'fill-extrusion-base': 0,
                'fill-extrusion-color': '#c8c3b8',
                'fill-extrusion-height': ['get', 'height_m'],
                'fill-extrusion-opacity': 0.86,
              },
            },
            'building-3d'
          );
        }

        map.addSource('trece-display-mask', {
          type: 'geojson',
          data: createOutsideMask(boundary),
        });
        map.addLayer({
          id: 'trece-display-mask',
          type: 'fill',
          source: 'trece-display-mask',
          paint: { 'fill-color': '#f8fafc', 'fill-opacity': 1 },
        });

        map.addLayer({
          id: 'trece-boundary-line',
          type: 'line',
          source: 'trece-boundary',
          paint: {
            'line-color': '#b45309',
            'line-width': 2.5,
            'line-dasharray': [2, 1.5],
          },
        });

        for (const preference of ['shortest', 'moreShade'] as const) {
          map.addSource(`walking-route-${preference}`, {
            type: 'geojson',
            data: EMPTY_ROUTE,
          });
          map.addLayer({
            id: `walking-route-${preference}-line`,
            type: 'line',
            source: `walking-route-${preference}`,
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
              'line-color': '#64748b',
              'line-width': 5,
              'line-opacity': 0.48,
            },
          });
        }
        applyRouteSelection(map, selectedRouteRef.current);
        map.addSource('walking-endpoints', {
          type: 'geojson',
          data: EMPTY_POINTS,
        });
        map.addLayer({
          id: 'walking-endpoint-circles',
          type: 'circle',
          source: 'walking-endpoints',
          paint: {
            'circle-radius': 10,
            'circle-color': [
              'match',
              ['get', 'endpoint'],
              'A',
              '#2563eb',
              '#dc2626',
            ],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
          },
        });
        map.addLayer({
          id: 'walking-endpoint-labels',
          type: 'symbol',
          source: 'walking-endpoints',
          layout: {
            'text-field': ['get', 'endpoint'],
            'text-size': 12,
            'text-allow-overlap': true,
          },
          paint: { 'text-color': '#ffffff' },
        });

        const rebuildRoute = () => {
          if (!map.isStyleLoaded() && !map.areTilesLoaded()) return;
          const { start: routeStart, destination: routeEnd } =
            callbacksRef.current;
          const stamp = JSON.stringify([
            routeStart?.coordinate,
            routeEnd?.coordinate,
            sunPositionRef.current.azimuthDegrees,
            sunPositionRef.current.elevationDegrees,
            map.getBounds().toArray(),
          ]);
          if (stamp === lastRouteStampRef.current) return;
          lastRouteStampRef.current = stamp;
          const endpointSource = map.getSource('walking-endpoints') as
            GeoJSONSource | undefined;
          endpointSource?.setData({
            type: 'FeatureCollection',
            features: [
              ...(routeStart
                ? [
                    {
                      type: 'Feature' as const,
                      properties: { endpoint: 'A' },
                      geometry: {
                        type: 'Point' as const,
                        coordinates: routeStart.coordinate,
                      },
                    },
                  ]
                : []),
              ...(routeEnd
                ? [
                    {
                      type: 'Feature' as const,
                      properties: { endpoint: 'B' },
                      geometry: {
                        type: 'Point' as const,
                        coordinates: routeEnd.coordinate,
                      },
                    },
                  ]
                : []),
            ],
          });

          const routeSources = {
            shortest: map.getSource('walking-route-shortest') as
              GeoJSONSource | undefined,
            moreShade: map.getSource('walking-route-moreShade') as
              GeoJSONSource | undefined,
          };
          if (!routeStart || !routeEnd) {
            cancelAnimationFrame(routeAnimation.id);
            routeSources.shortest?.setData(EMPTY_ROUTE);
            routeSources.moreShade?.setData(EMPTY_ROUTE);
            routeDataRef.current = {
              shortest: EMPTY_ROUTE,
              moreShade: EMPTY_ROUTE,
            };
            callbacksRef.current.onRouteSummary(null);
            return;
          }
          const allowed = (point: Coordinate) =>
            Boolean(
              boundaryRef.current?.features.some(feature =>
                isInsideGeometry(point, feature.geometry)
              )
            );
          const roads =
            roadsRef.current?.features ??
            map.querySourceFeatures('openmaptiles', {
              sourceLayer: 'transportation',
            });
          const routes = findWalkingRoutes(
            roads as Parameters<typeof findWalkingRoutes>[0],
            routeStart.coordinate,
            routeEnd.coordinate,
            120,
            allowed,
            shadowsRef.current
          );
          if (!routes.shortest || !routes.moreShade) {
            cancelAnimationFrame(routeAnimation.id);
            routeSources.shortest?.setData(EMPTY_ROUTE);
            routeSources.moreShade?.setData(EMPTY_ROUTE);
            routeDataRef.current = {
              shortest: EMPTY_ROUTE,
              moreShade: EMPTY_ROUTE,
            };
            callbacksRef.current.onRouteSummary(null);
            return;
          }
          const shortest = splitRouteByShade(
            routes.shortest,
            shadowsRef.current
          );
          const moreShade = splitRouteByShade(
            routes.moreShade,
            shadowsRef.current
          );
          routeDataRef.current = { shortest, moreShade };
          const selected = selectedRouteRef.current;
          const inactive: RoutePreference =
            selected === 'shortest' ? 'moreShade' : 'shortest';
          routeSources[inactive]?.setData(routeDataRef.current[inactive]);
          applyRouteSelection(map, selected);
          revealRoute(
            map,
            selected,
            routeDataRef.current[selected],
            routeAnimation
          );
          callbacksRef.current.onRouteSummary({
            shortest: {
              distanceMeters: shortest.distanceMeters,
              shadedDistanceMeters: shortest.shadedDistanceMeters,
            },
            moreShade: {
              distanceMeters: moreShade.distanceMeters,
              shadedDistanceMeters: moreShade.shadedDistanceMeters,
            },
          });
        };
        routeBuilderRef.current = rebuildRoute;

        setMapState('ready');
        map.on('idle', () => {
          renderShadows();
          rebuildRoute();
        });
        renderShadows();
        rebuildRoute();
      } catch {
        if (!disposed) setMapState('error');
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(routeAnimation.id);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (mapState !== 'ready' || !map) return;
    const timeout = window.setTimeout(() => {
      callbacksRef.current.onSearchResults(
        searchLoadedPlaces(
          map,
          searchQuery,
          boundaryRef.current,
          placesRef.current
        )
      );
    }, 180);
    return () => window.clearTimeout(timeout);
  }, [mapState, searchQuery]);

  useEffect(() => {
    lastRouteStampRef.current = '';
    routeBuilderRef.current();
  }, [start, destination]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (start && destination) {
      const mobileSheet = window.matchMedia('(max-width: 639px)').matches;
      map.fitBounds([start.coordinate, destination.coordinate], {
        padding: mobileSheet
          ? {
              top: 48,
              right: 24,
              bottom: Math.round(window.innerHeight * 0.58) + 24,
              left: 24,
            }
          : { top: 48, right: 408, bottom: 48, left: 48 },
        maxZoom: 14,
        pitch: 60,
        bearing: -18,
        duration: 850,
      });
    } else if (start || destination) {
      map.flyTo({
        center: (start ?? destination)?.coordinate,
        zoom: 14,
        duration: 500,
      });
    }
  }, [destination, isFullscreen, start]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const frame = window.requestAnimationFrame(() => map.resize());
    return () => window.cancelAnimationFrame(frame);
  }, [isFullscreen]);

  useEffect(() => {
    sunPositionRef.current = sunPosition;
    lastStampRef.current = '';
    lastRouteStampRef.current = '';
    if (mapRef.current) {
      updateShadows(
        mapRef.current,
        sunPosition,
        lastStampRef,
        lastCoverageRef,
        shadowsRef,
        setCoverage
      );
      routeBuilderRef.current();
    }
  }, [sunPosition]);

  return (
    <div
      className={`relative isolate overflow-hidden bg-slate-100 ${
        isFullscreen
          ? 'h-full w-full'
          : 'h-[58vh] min-h-[420px] max-h-[760px] rounded-2xl border border-primary-200 shadow-sm sm:h-[66vh]'
      }`}
    >
      <div
        ref={containerRef}
        role="region"
        aria-label={labels.mapLabel}
        className="h-full w-full"
      />
      <button
        type="button"
        onClick={onToggleFullscreen}
        aria-label={
          isFullscreen ? labels.closeFullscreen : labels.openFullscreen
        }
        title={isFullscreen ? labels.closeFullscreen : labels.openFullscreen}
        className="absolute left-3 top-3 z-20 flex h-11 items-center gap-2 rounded-xl bg-white px-3 text-sm font-semibold text-slate-800 shadow-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        )}
        <span>
          {isFullscreen ? labels.closeFullscreen : labels.openFullscreen}
        </span>
      </button>
      {mapState === 'ready' && !isFullscreen && (
        <div className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-lg bg-white/90 px-3 py-2 text-xs text-slate-700 shadow-sm backdrop-blur-sm">
          {labels.mapClickHint}
        </div>
      )}
      {mapState === 'loading' && (
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-slate-100/80 text-sm font-semibold text-slate-600">
          {labels.loading}
        </div>
      )}
      {mapState === 'error' && (
        <div
          role="alert"
          className="absolute inset-x-4 top-4 z-20 rounded-xl border border-primary-200 bg-white px-4 py-3 text-sm text-primary-700 shadow-md"
        >
          {labels.mapError}
        </div>
      )}
      {mapState === 'ready' && coverage.buildings + coverage.canopy > 0 && (
        <div className="pointer-events-none absolute bottom-10 left-3 z-10 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm">
          {labels.buildingsModeled
            .replace('{{buildings}}', String(coverage.buildings))
            .replace('{{buildingTotal}}', String(coverage.buildingTotal))
            .replace('{{canopy}}', String(coverage.canopy))
            .replace('{{canopyTotal}}', String(coverage.canopyTotal))}
        </div>
      )}
      {mapState === 'ready' && canopyUnavailable && (
        <div
          role="status"
          className="pointer-events-none absolute bottom-10 left-3 z-10 max-w-56 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-amber-900 shadow-sm backdrop-blur-sm"
        >
          {labels.canopyUnavailable}
        </div>
      )}
      {mapState === 'ready' && buildingUnavailable && (
        <div
          role="status"
          className="pointer-events-none absolute bottom-10 right-3 z-10 max-w-56 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium text-amber-900 shadow-sm backdrop-blur-sm"
        >
          {labels.buildingUnavailable}
        </div>
      )}
    </div>
  );
}
