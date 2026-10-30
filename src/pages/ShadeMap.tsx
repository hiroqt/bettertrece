import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FeatureCollection, MultiPolygon, Polygon } from 'geojson';
import {
  Compass,
  Clock3,
  LocateFixed,
  MapPinned,
  Route,
  Search,
  Sun,
} from '../lib/icons';
import SEO from '../components/SEO';
import ShadeMapCanvas, {
  type MapSearchResult,
  type RouteEndpoint,
  type RoutePreference,
} from '../components/shade/ShadeMapCanvas';
import { getSunPosition } from '../lib/sunPosition';
import { isInsideGeometry } from '../lib/mapBoundary';

const CITY_CENTER = { latitude: 14.2828, longitude: 120.8667 };
const FEATURED_DESTINATION_COORDINATE: [number, number] = [
  120.8707909, 14.2809048,
];

function philippinesTimeParts(date: Date) {
  const values = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  })
    .formatToParts(date)
    .reduce<Record<string, number>>((parts, part) => {
      if (part.type !== 'literal') parts[part.type] = Number(part.value);
      return parts;
    }, {});

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    minutes: values.hour * 60 + values.minute,
  };
}

function dateAtPhilippineMinutes(date: Date, minutes: number) {
  const parts = philippinesTimeParts(date);
  return new Date(
    Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      Math.floor(minutes / 60) - 8,
      minutes % 60
    )
  );
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minute = String(minutes % 60).padStart(2, '0');
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minute} ${hours >= 12 ? 'PM' : 'AM'} PHT`;
}

export default function ShadeMap() {
  const { t, i18n } = useTranslation();
  const [now, setNow] = useState(() => new Date());
  const [isLive, setIsLive] = useState(true);
  const [previewMinutes, setPreviewMinutes] = useState(
    () => philippinesTimeParts(new Date()).minutes
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [start, setStart] = useState<RouteEndpoint | null>(null);
  const [destination, setDestination] = useState<RouteEndpoint | null>(null);
  const [activeEndpoint, setActiveEndpoint] = useState<'start' | 'destination'>(
    'start'
  );
  const [startQuery, setStartQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MapSearchResult[]>([]);
  const [selectedRoute, setSelectedRoute] =
    useState<RoutePreference>('shortest');
  const [routeSelectionVersion, setRouteSelectionVersion] = useState(0);
  const [routeSummary, setRouteSummary] = useState<{
    shortest: { distanceMeters: number; shadedDistanceMeters: number };
    moreShade: { distanceMeters: number; shadedDistanceMeters: number };
  } | null>(null);
  const [routePending, setRoutePending] = useState(false);
  const [routeNotice, setRouteNotice] = useState('');
  const [placeDirectory, setPlaceDirectory] = useState<{
    count: number;
    retrievedAt: string;
  } | null>(null);
  const [boundary, setBoundary] = useState<FeatureCollection<
    Polygon | MultiPolygon
  > | null>(null);
  const currentMinutes = philippinesTimeParts(now).minutes;
  const selectedMinutes = isLive ? currentMinutes : previewMinutes;
  const selectedDateTime = useMemo(
    () => dateAtPhilippineMinutes(now, selectedMinutes),
    [now, selectedMinutes]
  );
  const sunPosition = useMemo(
    () =>
      getSunPosition(
        CITY_CENTER.latitude,
        CITY_CENTER.longitude,
        selectedDateTime
      ),
    [selectedDateTime]
  );
  const dateLabel = new Intl.DateTimeFormat(
    i18n.language.startsWith('fil') ? 'fil-PH' : 'en-PH',
    { timeZone: 'Asia/Manila', dateStyle: 'full' }
  ).format(now);
  const featuredDestination: RouteEndpoint = {
    coordinate: FEATURED_DESTINATION_COORDINATE,
    label: t('shadeMap.thirteenMartyrs'),
  };

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isFullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isFullscreen]);

  const adjustPreview = (minutes: number) => {
    setPreviewMinutes(minutes);
    setIsLive(false);
  };

  const setEndpoint = (
    endpoint: 'start' | 'destination',
    value: RouteEndpoint
  ) => {
    setRoutePending(
      endpoint === 'start' ? Boolean(destination) : Boolean(start)
    );
    if (endpoint === 'start') {
      setStart(value);
      setStartQuery(value.label);
      setActiveEndpoint('destination');
    } else {
      setDestination(value);
      setDestinationQuery(value.label);
      setActiveEndpoint('destination');
    }
    setRouteSummary(null);
    setSearchResults([]);
    setRouteNotice('');
  };

  const onMapPoint = (
    coordinate: [number, number],
    insideBoundary: boolean
  ) => {
    if (!insideBoundary) {
      setRouteNotice(t('shadeMap.outsideBoundary'));
      return;
    }
    setEndpoint(activeEndpoint, {
      coordinate,
      label: `${coordinate[1].toFixed(5)}, ${coordinate[0].toFixed(5)}`,
    });
  };

  const searchQuery =
    activeEndpoint === 'start' ? startQuery : destinationQuery;
  const updateEndpointQuery = (
    endpoint: 'start' | 'destination',
    value: string
  ) => {
    setActiveEndpoint(endpoint);
    setSearchResults([]);
    if (endpoint === 'start') {
      setStart(null);
      setStartQuery(value);
    } else {
      setDestination(null);
      setDestinationQuery(value);
    }
    setRouteSummary(null);
    setRoutePending(false);
  };

  const selectSearchResult = (result: MapSearchResult) => {
    setEndpoint(activeEndpoint, {
      coordinate: result.coordinate,
      label: result.label,
    });
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setRouteNotice(t('shadeMap.locationUnavailable'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        const coordinate: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        const insideBoundary = Boolean(
          boundary?.features.some(feature =>
            isInsideGeometry(coordinate, feature.geometry)
          )
        );
        if (!insideBoundary) {
          setRouteNotice(t('shadeMap.outsideBoundary'));
          return;
        }
        setEndpoint('start', {
          coordinate,
          label: t('shadeMap.myLocation'),
        });
      },
      () => setRouteNotice(t('shadeMap.locationUnavailable')),
      { enableHighAccuracy: true, timeout: 10_000 }
    );
  };

  const timeCard = (
    <section className="rounded-2xl border border-primary-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Clock3 className="h-4 w-4 text-primary-700" aria-hidden="true" />
            {t('shadeMap.previewTime')}
          </div>
          <p className="mt-1 text-xs text-slate-500">{dateLabel} · PHT</p>
        </div>
        <button
          type="button"
          onClick={() => setIsLive(true)}
          aria-pressed={isLive}
          className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${
            isLive
              ? 'bg-emerald-700 text-white'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          {t('shadeMap.liveNow')}
        </button>
      </div>
      <label
        htmlFor="shade-time"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        {formatTime(selectedMinutes)}
      </label>
      <input
        id="shade-time"
        aria-label={t('shadeMap.previewTime')}
        type="range"
        min="0"
        max="1439"
        step="1"
        value={selectedMinutes}
        onChange={event => adjustPreview(Number(event.currentTarget.value))}
        className="h-2 w-full cursor-pointer accent-emerald-700"
      />
      <div className="mt-1 flex justify-between text-[11px] text-slate-500">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>11:59 PM</span>
      </div>
    </section>
  );

  const endpointField = (
    endpoint: 'start' | 'destination',
    label: string,
    query: string
  ) => {
    const selectedEndpoint = endpoint === 'start' ? start : destination;
    return (
      <div className="relative">
        <label
          htmlFor={`walk-${endpoint}`}
          className="mb-1.5 block text-xs font-semibold text-slate-600"
        >
          {label}
        </label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id={`walk-${endpoint}`}
            value={query}
            onFocus={() => setActiveEndpoint(endpoint)}
            onChange={event =>
              updateEndpointQuery(endpoint, event.currentTarget.value)
            }
            placeholder={t('shadeMap.searchPlaceholder')}
            autoComplete="off"
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        {activeEndpoint === endpoint && searchResults.length > 0 && (
          <p className="mb-1 mt-2 text-xs font-semibold text-slate-600">
            {query.trim()
              ? t('shadeMap.searchSuggestions')
              : t('shadeMap.nearbyLandmarks')}
          </p>
        )}
        {activeEndpoint === endpoint && searchResults.length > 0 && (
          <ul className="absolute inset-x-0 top-full z-30 mt-1 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
            {searchResults.map(result => (
              <li key={result.id}>
                <button
                  type="button"
                  onClick={() => selectSearchResult(result)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-800 hover:bg-emerald-50 focus:bg-emerald-50"
                >
                  <span>{result.label}</span>
                  <span className="shrink-0 text-[10px] capitalize text-slate-500">
                    {(result.subclass || result.class).replaceAll('_', ' ')}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {activeEndpoint === endpoint &&
          query.trim().length >= 2 &&
          selectedEndpoint?.label !== query &&
          searchResults.length === 0 && (
            <p className="mt-1 text-xs text-slate-500">
              {t('shadeMap.noLocalResults')}
            </p>
          )}
      </div>
    );
  };

  const routePanel = (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-slate-950">
          <Route className="h-5 w-5 text-emerald-700" aria-hidden="true" />
          {t('shadeMap.routeTitle')}
        </h2>
      </div>
      {endpointField('start', t('shadeMap.start'), startQuery)}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-slate-500">{t('shadeMap.orTapMap')}</span>
        <button
          type="button"
          onClick={useCurrentLocation}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900 hover:bg-emerald-100"
        >
          <LocateFixed className="h-4 w-4" aria-hidden="true" />
          {t('shadeMap.useMyLocation')}
        </button>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-slate-600">
          {t('shadeMap.featuredDestination')}
        </p>
        <button
          type="button"
          onClick={() => setEndpoint('destination', featuredDestination)}
          className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-xs font-semibold text-emerald-950 hover:bg-emerald-100"
        >
          {t('shadeMap.thirteenMartyrs')}
        </button>
        <a
          href="https://www.openstreetmap.org/node/8280402597"
          target="_blank"
          rel="noreferrer"
          className="ml-2 text-[11px] text-slate-500 underline underline-offset-2"
        >
          OpenStreetMap
        </a>
      </div>
      {placeDirectory && (
        <p className="text-[11px] leading-4 text-slate-500">
          {t('shadeMap.placeSource', {
            count: placeDirectory.count,
            date: new Intl.DateTimeFormat(
              i18n.language.startsWith('fil') ? 'fil-PH' : 'en-PH',
              { dateStyle: 'medium', timeZone: 'Asia/Manila' }
            ).format(new Date(placeDirectory.retrievedAt)),
          })}{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {t('shadeMap.placeSourceLink')}
          </a>
        </p>
      )}
      {endpointField(
        'destination',
        t('shadeMap.destination'),
        destinationQuery
      )}
      {routeNotice && (
        <p
          role="status"
          className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900"
        >
          {routeNotice}
        </p>
      )}
      {routeSummary || (start && destination && routePending) ? (
        <div className="rounded-xl bg-emerald-50 p-3">
          <p className="mb-2 text-xs font-semibold text-emerald-950">
            {t('shadeMap.selectedTime', { time: formatTime(selectedMinutes) })}
          </p>
          <div
            role="group"
            aria-label={t('shadeMap.routeChoices')}
            className="grid grid-cols-2 gap-2"
          >
            {(['shortest', 'moreShade'] as const).map(preference => {
              const route = routeSummary?.[preference];
              const shadePercent = route
                ? Math.round(
                    route.distanceMeters > 0
                      ? (route.shadedDistanceMeters / route.distanceMeters) *
                          100
                      : 0
                  )
                : null;
              return (
                <button
                  key={preference}
                  type="button"
                  aria-pressed={selectedRoute === preference}
                  disabled={!route}
                  onClick={() => {
                    setSelectedRoute(preference);
                    setRouteSelectionVersion(version => version + 1);
                  }}
                  className={`rounded-lg border p-2 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 ${
                    selectedRoute === preference
                      ? 'border-emerald-700 bg-white shadow-sm'
                      : 'border-emerald-100 bg-emerald-100/60 hover:bg-white'
                  }`}
                >
                  <span className="block text-xs font-bold text-slate-900">
                    {t(
                      preference === 'shortest'
                        ? 'shadeMap.shortestRoute'
                        : 'shadeMap.moreShadeRoute'
                    )}
                  </span>
                  <span className="mt-1 block text-[11px] text-slate-700">
                    {route && shadePercent !== null
                      ? t('shadeMap.routeOptionEstimate', {
                          distance: Math.round(route.distanceMeters),
                          percent: shadePercent,
                        })
                      : t('shadeMap.routeCalculating')}
                  </span>
                </button>
              );
            })}
          </div>
          {routeSummary &&
            routeSummary.moreShade.shadedDistanceMeters <=
              routeSummary.shortest.shadedDistanceMeters && (
              <p className="mt-2 text-[11px] leading-4 text-slate-600">
                {sunPosition.elevationDegrees <= 0 &&
                routeSummary.moreShade.distanceMeters ===
                  routeSummary.shortest.distanceMeters
                  ? t('shadeMap.sameRouteNoSun')
                  : t('shadeMap.noExtraShade')}
              </p>
            )}
          <p className="mt-2 text-[11px] leading-4 text-emerald-950">
            {t('shadeMap.shadePreferenceNote')}
          </p>
        </div>
      ) : start && destination ? (
        <p
          role="status"
          className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900"
        >
          {t('shadeMap.noRoute')}
        </p>
      ) : (
        <p className="text-xs leading-5 text-slate-600">
          {t('shadeMap.routePrompt')}
        </p>
      )}
      <p className="text-xs leading-5 text-slate-500">
        {t('shadeMap.routeDisclaimer')}
      </p>
      {isFullscreen && timeCard}
    </section>
  );

  return (
    <>
      <SEO
        title="Trece Martires Shade Map | BetterTrece"
        description="Explore Trece Martires in 3D with estimated building and tree-canopy shadows."
        keywords="Trece Martires shade map, MapLibre, 3D buildings, sun shadows, Cavite"
      />
      <main
        className={
          isFullscreen
            ? 'fixed inset-0 z-[100] h-[100dvh] bg-white'
            : 'flex-grow bg-slate-50 pb-12 pt-40 sm:pt-32'
        }
      >
        <div
          className={
            isFullscreen ? 'h-full' : 'container mx-auto max-w-7xl px-4'
          }
        >
          {!isFullscreen && (
            <>
              <header className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-3xl">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                    {t('shadeMap.eyebrow')}
                  </p>
                  <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    {t('shadeMap.title')}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    {t('shadeMap.description')}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
                  <MapPinned className="h-4 w-4" aria-hidden="true" />
                  {t('shadeMap.boundaryBadge')}
                </span>
              </header>

              <div
                role="note"
                className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950"
              >
                {t('shadeMap.boundaryNote')}
              </div>
            </>
          )}

          <div
            className={
              isFullscreen
                ? 'relative h-full'
                : 'grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]'
            }
          >
            <section
              aria-label={t('shadeMap.mapLabel')}
              className={isFullscreen ? 'h-full min-h-0' : 'min-w-0'}
            >
              <ShadeMapCanvas
                sunPosition={sunPosition}
                isFullscreen={isFullscreen}
                start={start}
                destination={destination}
                selectedRoute={selectedRoute}
                routeSelectionVersion={routeSelectionVersion}
                searchQuery={searchQuery}
                onMapPoint={onMapPoint}
                onBoundaryLoaded={setBoundary}
                onPlacesLoaded={(count, retrievedAt) =>
                  setPlaceDirectory({ count, retrievedAt })
                }
                onSearchResults={results => {
                  const query = searchQuery.trim().toLocaleLowerCase();
                  const featured =
                    query &&
                    featuredDestination.label
                      .toLocaleLowerCase()
                      .includes(query)
                      ? [
                          {
                            ...featuredDestination,
                            id: 'thirteen-martyrs',
                            class: 'historic',
                            subclass: 'memorial',
                            categories: ['historic:memorial'],
                          },
                        ]
                      : [];
                  setSearchResults([
                    ...featured,
                    ...results.filter(
                      result =>
                        !featured.some(
                          item =>
                            Math.abs(
                              item.coordinate[0] - result.coordinate[0]
                            ) < 0.00001 &&
                            Math.abs(
                              item.coordinate[1] - result.coordinate[1]
                            ) < 0.00001
                        )
                    ),
                  ]);
                }}
                onRouteSummary={summary => {
                  setRouteSummary(summary);
                  setRoutePending(false);
                }}
                onToggleFullscreen={() => setIsFullscreen(value => !value)}
                labels={{
                  loading: t('shadeMap.loading'),
                  mapError: t('shadeMap.mapError'),
                  mapLabel: t('shadeMap.mapLabel'),
                  buildingsModeled: t('shadeMap.buildingsModeled'),
                  canopyUnavailable: t('shadeMap.canopyUnavailable'),
                  buildingUnavailable: t('shadeMap.buildingUnavailable'),
                  openFullscreen: t('shadeMap.openFullscreen'),
                  closeFullscreen: t('shadeMap.closeFullscreen'),
                  mapClickHint: t('shadeMap.mapClickHint'),
                }}
              />
              {!isFullscreen && (
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-[#263244] opacity-70" />
                    {t('shadeMap.shadowLegend')}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-[#23834a] opacity-80" />
                    {t('shadeMap.canopyLegend')}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm border border-dashed border-amber-700 bg-amber-100" />
                    {t('shadeMap.boundaryLegend')}
                  </span>
                  <span>
                    © OpenStreetMap contributors · OpenMapTiles · OpenFreeMap
                  </span>
                </div>
              )}
            </section>

            {isFullscreen ? (
              <aside className="absolute inset-x-3 bottom-3 z-20 max-h-[58vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:inset-x-auto sm:bottom-auto sm:right-3 sm:top-3 sm:max-h-[calc(100%-1.5rem)] sm:w-[24rem] sm:p-5">
                {routePanel}
              </aside>
            ) : (
              <aside className="space-y-4">
                {timeCard}

                <section className="rounded-2xl border border-primary-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Sun
                      className="h-4 w-4 text-primary-700"
                      aria-hidden="true"
                    />
                    {t('shadeMap.sunPosition')}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        {t('shadeMap.elevation')}
                      </p>
                      <p className="mt-1 text-xl font-bold tabular-nums text-slate-900">
                        {sunPosition.elevationDegrees.toFixed(1)}°
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">
                        {t('shadeMap.direction')}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xl font-bold tabular-nums text-slate-900">
                        <Compass
                          className="h-4 w-4 text-primary-700"
                          aria-hidden="true"
                        />
                        {sunPosition.azimuthDegrees.toFixed(0)}°
                      </p>
                    </div>
                  </div>
                  {sunPosition.elevationDegrees <= 0 && (
                    <p className="mt-3 text-xs leading-5 text-slate-600">
                      {t('shadeMap.sunBelowHorizon')}
                    </p>
                  )}
                </section>

                <section className="rounded-2xl border border-primary-200 bg-emerald-50/80 p-5">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-emerald-950">
                    <Sun className="h-4 w-4" aria-hidden="true" />
                    {t('shadeMap.buildingShadows')}
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-emerald-950/80">
                    {t('shadeMap.coverage')}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-emerald-950/80">
                    {t('shadeMap.buildingData')}{' '}
                    <a
                      className="font-semibold underline underline-offset-2"
                      href="https://sites.research.google/gr/open-buildings/temporal/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Google Research · Open Buildings 2.5D Temporal
                    </a>
                  </p>
                  <p className="mt-2 text-xs font-semibold leading-5 text-emerald-950">
                    {t('shadeMap.canopyData')}{' '}
                    <a
                      className="underline underline-offset-2"
                      href="https://registry.opendata.aws/dataforgood-fb-forestsv2/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Meta/WRI CHMv2 source
                    </a>
                  </p>
                </section>

                <section className="rounded-2xl border border-primary-200 bg-white p-5 shadow-sm">
                  <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Route
                      className="h-4 w-4 text-primary-700"
                      aria-hidden="true"
                    />
                    {t('shadeMap.routeTitle')}
                  </h2>
                  <p
                    role="note"
                    className="mt-2 text-xs leading-5 text-slate-600"
                  >
                    {t('shadeMap.routeNote')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="mt-3 w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                  >
                    {t('shadeMap.planWalk')}
                  </button>
                </section>
              </aside>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
