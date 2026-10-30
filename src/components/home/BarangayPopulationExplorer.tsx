import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
  Position,
} from 'geojson';
import { TRECE_BARANGAYS_PSGC } from '../../data/demographics/psaClassifications';

type BarangayFeature = Feature<
  Polygon | MultiPolygon,
  { name: string; psgcCode: string }
>;
type MapStreets = { major: Position[][]; minor: Position[][] };
type Project = (position: Position) => readonly [number, number];

function ringsFor(geometry: Polygon | MultiPolygon): Position[][] {
  return geometry.type === 'Polygon'
    ? geometry.coordinates
    : geometry.coordinates.flat();
}

function findBarangay(name: string) {
  const canonicalName =
    name === 'Perez'
      ? 'Hugo Perez'
      : name === 'San Agustin'
        ? 'San Agustin (Poblacion)'
        : name;
  return TRECE_BARANGAYS_PSGC.find(item => item.name === canonicalName);
}

function populationColor(population: number) {
  if (population >= 35000) return '#2f609f';
  if (population >= 15000) return '#80afe8';
  return '#ceddf2';
}

function pathFor(geometry: Polygon | MultiPolygon, project: Project) {
  return ringsFor(geometry)
    .map(
      ring =>
        `${ring
          .map((position, index) => {
            const [x, y] = project(position);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
          })
          .join(' ')} Z`
    )
    .join(' ');
}

export default function BarangayPopulationExplorer() {
  const { t } = useTranslation();
  const [boundaries, setBoundaries] = useState<BarangayFeature[]>([]);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [mapError, setMapError] = useState(false);
  const [cityOutline, setCityOutline] = useState<Polygon | MultiPolygon | null>(
    null
  );
  const [streets, setStreets] = useState<MapStreets | null>(null);
  const activeName = hoveredName || selectedName;
  const barangay = TRECE_BARANGAYS_PSGC.find(item => item.name === activeName);

  useEffect(() => {
    let mounted = true;
    fetch('/data/trece-boundary-osm.geojson')
      .then(response => {
        if (!response.ok) throw new Error('City outline unavailable');
        return response.json() as Promise<
          FeatureCollection<Polygon | MultiPolygon>
        >;
      })
      .then(data => {
        if (mounted) setCityOutline(data.features[0].geometry);
      })
      .catch(() => {
        /* Retain barangay geometry if the city outline is unavailable. */
      });
    fetch('/data/trece-map-streets.json')
      .then(response => {
        if (!response.ok) throw new Error('Street detail unavailable');
        return response.json() as Promise<MapStreets>;
      })
      .then(data => {
        if (mounted) setStreets(data);
      })
      .catch(() => {
        /* Street detail is optional; keep the population map usable. */
      });
    fetch('/data/trece-barangays.geojson')
      .then(response => {
        if (!response.ok) throw new Error('Barangay boundaries unavailable');
        return response.json() as Promise<
          FeatureCollection<
            Polygon | MultiPolygon,
            { name: string; psgcCode: string }
          >
        >;
      })
      .then(data => {
        if (mounted) setBoundaries(data.features);
      })
      .catch(() => {
        if (mounted) setMapError(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const project = useMemo<Project | null>(() => {
    const positions = cityOutline
      ? ringsFor(cityOutline).flat()
      : boundaries.flatMap(feature => ringsFor(feature.geometry).flat());
    if (positions.length === 0) return null;
    const centerLongitude =
      (Math.min(...positions.map(position => position[0])) +
        Math.max(...positions.map(position => position[0]))) /
      2;
    const centerLatitude =
      (Math.min(...positions.map(position => position[1])) +
        Math.max(...positions.map(position => position[1]))) /
      2;
    const longitudeScale = Math.cos((centerLatitude * Math.PI) / 180);
    const angle = (30 * Math.PI) / 180;
    const rotate = (position: Position) => {
      const x = (position[0] - centerLongitude) * longitudeScale;
      const y = position[1] - centerLatitude;
      return [
        x * Math.cos(angle) - y * Math.sin(angle),
        x * Math.sin(angle) + y * Math.cos(angle),
      ] as const;
    };
    const rotated = positions.map(rotate);
    const minX = Math.min(...rotated.map(([x]) => x));
    const maxX = Math.max(...rotated.map(([x]) => x));
    const minY = Math.min(...rotated.map(([, y]) => y));
    const maxY = Math.max(...rotated.map(([, y]) => y));
    const scale = Math.min(952 / (maxX - minX), 652 / (maxY - minY));
    const offsetX = (1000 - (maxX - minX) * scale) / 2;
    const offsetY = (700 - (maxY - minY) * scale) / 2;
    return position => {
      const [x, y] = rotate(position);
      return [offsetX + (x - minX) * scale, offsetY + (maxY - y) * scale];
    };
  }, [boundaries, cityOutline]);

  const streetPaths = useMemo(() => {
    if (!streets || !project) return null;
    const linePath = (lines: Position[][]) =>
      lines
        .map(line =>
          line
            .map(
              (point, index) =>
                `${index ? 'L' : 'M'}${project(point).join(',')}`
            )
            .join(' ')
        )
        .join(' ');
    return { major: linePath(streets.major), minor: linePath(streets.minor) };
  }, [streets, project]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-start">
      <div className="flex flex-col rounded-2xl sm:rounded-3xl border border-primary-200 bg-white p-5 sm:p-7 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
              {t('populationMap.eyebrow', 'Barangay population')}
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              {barangay?.name ??
                t('populationMap.title', 'Explore Trece Martires')}
            </h3>
          </div>
          <span className="shrink-0 text-xs font-semibold text-slate-500">
            {t('populationMap.year', '2024 data')}
          </span>
        </div>
        {barangay ? (
          <div className="mt-5">
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-[#003893]">
              {barangay.population2024.toLocaleString()}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {t(
                'populationMap.residents',
                'estimated residents · current BetterTrece dataset'
              )}
            </p>
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-700">
                {t('populationMap.change', 'Change since 2015')}
              </span>
              <span className="font-bold text-slate-900">
                {barangay.growthRate}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${Math.max(8, (barangay.population2024 / 55000) * 100)}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {t('populationMap.population2015', {
                count: barangay.population2015.toLocaleString(),
                defaultValue: '{{count}} residents in 2015',
              })}
            </p>
          </div>
        ) : (
          <p className="mt-5 text-sm leading-6 text-slate-600">
            {t(
              'populationMap.prompt',
              'Hover over a barangay on the map or choose one below to see its population.'
            )}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-100 pt-4 sm:grid-cols-3">
          {TRECE_BARANGAYS_PSGC.map(item => (
            <button
              key={item.psgcCode}
              type="button"
              onMouseEnter={() => setHoveredName(item.name)}
              onMouseLeave={() => setHoveredName(null)}
              onFocus={() => setHoveredName(item.name)}
              onBlur={() => setHoveredName(null)}
              onClick={() => setSelectedName(item.name)}
              aria-pressed={selectedName === item.name}
              className={`rounded-lg px-2 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${activeName === item.name ? 'bg-blue-50 text-blue-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          {t(
            'populationMap.dataNote',
            'Population figures are from the existing local dataset and have not been reconciled with the citywide census total.'
          )}
        </p>
      </div>

      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-[#eef2ef] shadow-sm sm:h-[520px]">
        {boundaries.length > 0 && project && (
          <svg
            viewBox="0 0 1000 700"
            role="group"
            aria-label={t(
              'populationMap.mapLabel',
              'Interactive population map of Trece Martires barangays'
            )}
            className="absolute inset-0 h-full w-full"
          >
            <title>
              {t(
                'populationMap.mapTitle',
                'Trece Martires barangay population map'
              )}
            </title>
            <defs>
              <clipPath id="city-outline-clip">
                {cityOutline && <path d={pathFor(cityOutline, project)} />}
              </clipPath>
              <clipPath id="city-street-clip">
                {boundaries.map(feature => (
                  <path
                    key={feature.properties.name}
                    d={pathFor(feature.geometry, project)}
                  />
                ))}
              </clipPath>
              <pattern
                id="map-grain"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#c7d0da" fillOpacity="0.4" />
              </pattern>
              <filter
                id="map-shadow"
                x="-12%"
                y="-12%"
                width="124%"
                height="124%"
              >
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="3"
                  floodColor="#334155"
                  floodOpacity="0.2"
                />
              </filter>
            </defs>
            <rect width="1000" height="700" fill="url(#map-grain)" />
            <g filter="url(#map-shadow)">
              {cityOutline && (
                <path
                  d={pathFor(cityOutline, project)}
                  fill="#ceddf2"
                  stroke="#54758e"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
              )}
              <g clipPath={cityOutline ? 'url(#city-outline-clip)' : undefined}>
                {boundaries.map(feature => {
                  const data = findBarangay(feature.properties.name);
                  if (!data) return null;
                  const active = activeName === data.name;
                  return (
                    <g key={data.psgcCode}>
                      <path
                        d={pathFor(feature.geometry, project)}
                        fill={populationColor(data.population2024)}
                        fillOpacity={0.96}
                        stroke={active ? '#f59e0b' : '#ffffff'}
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                        className="cursor-pointer outline-none transition-colors duration-150 focus-visible:outline-none"
                        role="button"
                        tabIndex={0}
                        aria-label={`${data.name}: ${data.population2024.toLocaleString()} ${t('populationMap.residentsLabel', 'residents')}`}
                        onMouseEnter={() => setHoveredName(data.name)}
                        onMouseLeave={() => setHoveredName(null)}
                        onFocus={() => setHoveredName(data.name)}
                        onBlur={() => setHoveredName(null)}
                        onClick={() => setSelectedName(data.name)}
                        onKeyDown={event => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelectedName(data.name);
                          }
                        }}
                      />
                    </g>
                  );
                })}
              </g>
            </g>
            {streetPaths && (
              <g
                clipPath={
                  cityOutline
                    ? 'url(#city-outline-clip)'
                    : 'url(#city-street-clip)'
                }
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                pointerEvents="none"
                aria-hidden="true"
              >
                <path
                  d={streetPaths.minor}
                  stroke="#ffffff"
                  strokeWidth="1.1"
                  strokeOpacity="0.34"
                />
                <path
                  d={streetPaths.major}
                  stroke="#4b6c8c"
                  strokeWidth="4"
                  strokeOpacity="0.3"
                />
                <path
                  d={streetPaths.major}
                  stroke="#fff5d9"
                  strokeWidth="2.3"
                  strokeOpacity="0.95"
                />
              </g>
            )}
            <g pointerEvents="none" aria-hidden="true">
              {boundaries.map(feature => {
                const data = findBarangay(feature.properties.name);
                if (!data) return null;
                const points = ringsFor(feature.geometry)[0]
                  .slice(0, -1)
                  .map(project);
                const x =
                  points.reduce((sum, point) => sum + point[0], 0) /
                  points.length;
                const y =
                  points.reduce((sum, point) => sum + point[1], 0) /
                  points.length;
                return (
                  <text
                    key={data.psgcCode}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#183d61"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    paintOrder="stroke"
                    strokeLinejoin="round"
                    fontSize="15"
                    fontWeight="700"
                  >
                    {data.name.replace(' (Poblacion)', '')}
                  </text>
                );
              })}
            </g>
          </svg>
        )}
        <div className="pointer-events-none absolute left-5 top-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Cavite · Philippines
          </p>
          <p className="mt-0.5 text-lg font-black tracking-tight text-[#183d61]">
            Trece Martires
          </p>
        </div>
        {!mapError && boundaries.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-sm text-slate-500">
            {t('populationMap.loading', 'Loading barangay boundaries…')}
          </div>
        )}
        {mapError && (
          <div className="absolute inset-0 grid place-items-center bg-slate-50/95 p-8 text-center text-sm text-slate-700">
            {t(
              'populationMap.mapError',
              'Barangay map could not be loaded. Check your connection and refresh the page.'
            )}
          </div>
        )}
        <div className="pointer-events-none absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-xl bg-white/95 px-3 py-2 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {t('populationMap.legend', 'Barangay population · 2024 data')}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-600">
            <span>{t('populationMap.lower', 'Lower')}</span>
            <span className="h-2 w-24 rounded-full bg-gradient-to-r from-blue-100 via-blue-400 to-blue-800" />
            <span>{t('populationMap.higher', 'Higher')}</span>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 max-w-[50%] rounded-lg bg-white/90 px-2.5 py-1.5 text-right text-[9px] leading-4 text-slate-500">
          <a
            href="https://github.com/bendlikeabamboo/barangay-boundaries-repository/releases/tag/v2026.4.13.0"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
          >
            {t(
              'populationMap.boundarySource',
              'NAMRIA-derived 2023 boundaries · indicative only'
            )}
          </a>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
            className="block hover:text-blue-800"
          >
            © OpenStreetMap contributors
          </a>
        </div>
      </div>
    </div>
  );
}
