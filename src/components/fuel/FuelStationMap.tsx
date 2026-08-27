import { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  TRECE_GAS_STATIONS,
  type GasStation,
  CORRIDORS_LIST,
  BRAND_FILTERS,
} from '../../data/fuel/fuelStationsData';
import {
  Layers,
  Search,
  Fuel,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';

// Trece Martires City Center Coordinates
const TRECE_CENTER: [number, number] = [14.2828, 120.8667];
const DEFAULT_ZOOM = 13;

// Brand color schemes for custom map pins
const BRAND_COLORS: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  Petron: {
    bg: '#dc2626',
    text: '#ffffff',
    border: '#991b1b',
    label: 'Petron',
  },
  Shell: { bg: '#eab308', text: '#713f12', border: '#ca8a04', label: 'Shell' },
  Caltex: {
    bg: '#059669',
    text: '#ffffff',
    border: '#047857',
    label: 'Caltex',
  },
  Seaoil: {
    bg: '#0284c7',
    text: '#ffffff',
    border: '#0369a1',
    label: 'Seaoil',
  },
  'Petro Gazz': {
    bg: '#0891b2',
    text: '#ffffff',
    border: '#0e7490',
    label: 'Petro Gazz',
  },
  Cleanfuel: {
    bg: '#16a34a',
    text: '#ffffff',
    border: '#15803d',
    label: 'Cleanfuel',
  },
  'Uno Fuel': {
    bg: '#ea580c',
    text: '#ffffff',
    border: '#c2410c',
    label: 'Uno Fuel',
  },
  Jetti: { bg: '#2563eb', text: '#ffffff', border: '#1d4ed8', label: 'Jetti' },
  Rephil: {
    bg: '#0d9488',
    text: '#ffffff',
    border: '#0f766e',
    label: 'Rephil',
  },
  Unioil: {
    bg: '#4338ca',
    text: '#ffffff',
    border: '#3730a3',
    label: 'Unioil',
  },
  Independent: {
    bg: '#475569',
    text: '#ffffff',
    border: '#334155',
    label: 'Independent',
  },
};

function createCustomPin(brand: string, isSelected: boolean = false) {
  const brandInfo = BRAND_COLORS[brand] || BRAND_COLORS['Independent'];
  const size = isSelected ? 42 : 34;
  const pulseHtml = isSelected
    ? `<span class="absolute -top-1 -left-1 w-full h-full rounded-full bg-blue-500/40 animate-ping"></span>`
    : '';

  const html = `
    <div class="relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110" style="width: ${size}px; height: ${size}px;">
      ${pulseHtml}
      <div class="w-full h-full rounded-full shadow-lg flex items-center justify-center border-2" 
           style="background-color: ${brandInfo.bg}; border-color: ${isSelected ? '#ffffff' : brandInfo.border}; color: ${brandInfo.text};">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 22v-8.5a3.5 3.5 0 0 1 7 0V22"/>
          <path d="M4 9h5"/>
          <path d="M14 22V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v18"/>
          <path d="M14 13h8"/>
          <path d="M14 8h8"/>
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 rotate-45" style="background-color: ${brandInfo.bg};"></div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-gas-station-pin',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

interface FuelStationMapProps {
  onSelectStation?: (station: GasStation) => void;
  selectedStationId?: string | number | null;
  onOpenReportModal?: (station: GasStation) => void;
  className?: string;
}

export default function FuelStationMap({
  onSelectStation,
  selectedStationId,
  className = '',
}: FuelStationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedCorridor, setSelectedCorridor] = useState('All Corridors');
  const [selectedFuelType, setSelectedFuelType] = useState<
    'all' | 'diesel' | 'ron91' | 'ron95' | 'kerosene'
  >('all');
  const [tileLayerType, setTileLayerType] = useState<'osm' | 'hot'>('osm');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter gas stations
  const filteredStations = useMemo(() => {
    return TRECE_GAS_STATIONS.filter(station => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = station.name.toLowerCase().includes(q);
        const matchesStreet = station.street.toLowerCase().includes(q);
        const matchesBarangay = (station.barangay || '')
          .toLowerCase()
          .includes(q);
        const matchesBrand = station.brand.toLowerCase().includes(q);
        if (!matchesName && !matchesStreet && !matchesBarangay && !matchesBrand)
          return false;
      }

      // Brand filter
      if (selectedBrand !== 'All Brands') {
        if (selectedBrand === 'Independent') {
          if (station.isMajor) return false;
        } else if (station.brandCategory !== selectedBrand) {
          return false;
        }
      }

      // Corridor filter
      if (
        selectedCorridor !== 'All Corridors' &&
        station.corridor !== selectedCorridor
      ) {
        return false;
      }

      // Fuel type filter
      if (selectedFuelType !== 'all') {
        if (selectedFuelType === 'diesel' && !station.fuels.diesel)
          return false;
        if (selectedFuelType === 'ron91' && !station.fuels.ron91) return false;
        if (selectedFuelType === 'ron95' && !station.fuels.ron95) return false;
        if (selectedFuelType === 'kerosene' && !station.fuels.kerosene)
          return false;
      }

      return true;
    });
  }, [searchQuery, selectedBrand, selectedCorridor, selectedFuelType]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: TRECE_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: true,
    });

    // Add Zoom control at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Free OpenStreetMap Tile Layer (100% keyless, no watermark)
    const tileUrl =
      tileLayerType === 'osm'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution,
      subdomains: ['a', 'b', 'c'],
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tile layer when style changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    const tileUrl =
      tileLayerType === 'osm'
        ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        : 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: ['a', 'b', 'c'],
    }).addTo(mapInstanceRef.current);
  }, [tileLayerType]);

  // Render & Sync Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    filteredStations.forEach(station => {
      const isSelected = String(station.id) === String(selectedStationId);
      const customIcon = createCustomPin(station.brandCategory, isSelected);

      const marker = L.marker([station.latitude, station.longitude], {
        icon: customIcon,
        title: station.name,
      }).addTo(map);

      // Popup Content Template
      const popupHtml = `
        <div class="p-3 max-w-[280px] sm:max-w-[320px] font-sans text-slate-900">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              station.isMajor
                ? 'bg-blue-100 text-blue-800'
                : 'bg-emerald-100 text-emerald-800'
            }">
              ${station.brand} • ${station.isMajor ? 'Major Brand' : 'Independent'}
            </span>
            <span class="text-[10px] text-slate-500 font-medium">Trece Martires</span>
          </div>

          <h4 class="font-bold text-base text-slate-900 mb-1 leading-tight">${station.name}</h4>
          <p class="text-xs text-slate-600 mb-2.5 flex items-center gap-1">
            <span>📍</span> <span>${station.street}${station.barangay ? `, Brgy. ${station.barangay}` : ''}</span>
          </p>

          <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-200 mb-3 space-y-1.5">
            <div class="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Estimated Pump Rates</span>
              <span class="text-[10px] text-slate-500 font-normal">DOE Reference</span>
            </div>
            <div class="grid grid-cols-2 gap-1.5 text-xs">
              ${
                station.fuels.ron91
                  ? `<div class="bg-white p-1.5 rounded-lg border border-slate-200/80">
                      <div class="text-[10px] text-slate-500 font-semibold">Unleaded 91</div>
                      <div class="font-bold text-sky-700 font-mono">₱${(station.estimatedPrices.ron91 || 71.4).toFixed(2)}</div>
                    </div>`
                  : ''
              }
              ${
                station.fuels.ron95
                  ? `<div class="bg-white p-1.5 rounded-lg border border-slate-200/80">
                      <div class="text-[10px] text-slate-500 font-semibold">Premium 95</div>
                      <div class="font-bold text-rose-700 font-mono">₱${(station.estimatedPrices.ron95 || 71.45).toFixed(2)}</div>
                    </div>`
                  : ''
              }
              ${
                station.fuels.diesel
                  ? `<div class="bg-white p-1.5 rounded-lg border border-slate-200/80">
                      <div class="text-[10px] text-slate-500 font-semibold">Diesel</div>
                      <div class="font-bold text-amber-700 font-mono">₱${(station.estimatedPrices.diesel || 85.2).toFixed(2)}</div>
                    </div>`
                  : ''
              }
              ${
                station.fuels.kerosene
                  ? `<div class="bg-white p-1.5 rounded-lg border border-slate-200/80">
                      <div class="text-[10px] text-slate-500 font-semibold">Kerosene</div>
                      <div class="font-bold text-purple-700 font-mono">₱125.00</div>
                    </div>`
                  : ''
              }
            </div>
          </div>

          <div class="flex items-center justify-between text-[11px] text-slate-600 mb-3">
            <span class="flex items-center gap-1 font-medium">
              <span>🕒</span> <span>${station.openingHours}</span>
            </span>
            <span class="text-slate-400">•</span>
            <span class="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">
              ${station.corridor}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
            <a href="${station.googleMapsUrl}" target="_blank" rel="noopener noreferrer" 
               class="flex items-center justify-center gap-1 text-xs font-bold bg-[#003893] text-white py-2 px-2.5 rounded-xl hover:bg-blue-800 transition-colors shadow-2xs">
              <span>Google Maps</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <a href="${station.wazeUrl}" target="_blank" rel="noopener noreferrer" 
               class="flex items-center justify-center gap-1 text-xs font-bold bg-sky-500 text-white py-2 px-2.5 rounded-xl hover:bg-sky-600 transition-colors shadow-2xs">
              <span>Waze App</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 320,
        className: 'gas-station-leaflet-popup',
      });

      marker.on('click', () => {
        if (onSelectStation) onSelectStation(station);
      });

      markersRef.current[String(station.id)] = marker;
    });
  }, [filteredStations, selectedStationId]);

  // Handle selectedStationId changes from external props
  useEffect(() => {
    if (!selectedStationId || !mapInstanceRef.current) return;
    const targetStation = TRECE_GAS_STATIONS.find(
      s => String(s.id) === String(selectedStationId)
    );
    if (targetStation) {
      mapInstanceRef.current.flyTo(
        [targetStation.latitude, targetStation.longitude],
        16,
        {
          duration: 1.2,
        }
      );
      const marker = markersRef.current[String(selectedStationId)];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedStationId]);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(TRECE_CENTER, DEFAULT_ZOOM, { duration: 1 });
    }
  };

  return (
    <div
      className={`relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl' : 'w-full'
      } ${className}`}
    >
      {/* 1. MAP CONTROLS & FILTER HEADER */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200/90 flex flex-col gap-3">
        {/* Row 1: Search & Dropdowns */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search station name, brand, or street in Trece..."
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-slate-200 focus:border-[#003893] focus:ring-2 focus:ring-[#003893]/15 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold p-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Selectors & Map Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Brand Dropdown */}
            <select
              value={selectedBrand}
              onChange={e => setSelectedBrand(e.target.value)}
              className="text-xs bg-white text-slate-700 py-2 px-3 rounded-xl border border-slate-200 focus:border-[#003893] shadow-2xs font-semibold cursor-pointer"
            >
              {BRAND_FILTERS.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Corridor Dropdown */}
            <select
              value={selectedCorridor}
              onChange={e => setSelectedCorridor(e.target.value)}
              className="text-xs bg-white text-slate-700 py-2 px-3 rounded-xl border border-slate-200 focus:border-[#003893] shadow-2xs font-semibold cursor-pointer"
            >
              {CORRIDORS_LIST.map(corridor => (
                <option key={corridor} value={corridor}>
                  {corridor}
                </option>
              ))}
            </select>

            {/* Map Style Toggle */}
            <button
              onClick={() =>
                setTileLayerType(tileLayerType === 'osm' ? 'hot' : 'osm')
              }
              title="Toggle Map Style"
              className="inline-flex items-center gap-1 text-xs text-slate-700 bg-white py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs font-semibold cursor-pointer transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">
                {tileLayerType === 'osm' ? 'OSM Standard' : 'OSM Detailed'}
              </span>
            </button>

            {/* Recenter button */}
            <button
              onClick={handleRecenter}
              title="Recenter to Trece Martires Center"
              className="inline-flex items-center gap-1 text-xs text-slate-700 bg-white py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs font-semibold cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Fullscreen button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Map'}
              className="p-2 text-slate-700 bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs cursor-pointer transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Fuel Type Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Fuel className="w-3 h-3 text-[#003893]" />
            <span>Fuel Filter:</span>
          </span>

          {[
            { id: 'all', label: 'All Fuels' },
            { id: 'diesel', label: 'Diesel (₱85.20+)' },
            { id: 'ron91', label: 'Unleaded 91 (₱71.40+)' },
            { id: 'ron95', label: 'Premium 95 (₱71.45+)' },
            { id: 'kerosene', label: 'Kerosene (₱125.00)' },
          ].map(chip => {
            const isActive = selectedFuelType === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() =>
                  setSelectedFuelType(
                    chip.id as 'all' | 'diesel' | 'ron91' | 'ron95' | 'kerosene'
                  )
                }
                className={`text-xs px-3 py-1 rounded-full font-bold transition-all cursor-pointer shadow-2xs border ${
                  isActive
                    ? 'bg-[#003893] text-white border-[#003893] ring-2 ring-[#003893]/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {chip.label}
              </button>
            );
          })}

          <div className="ml-auto text-xs text-slate-500 font-semibold">
            <span>Showing </span>
            <span className="font-bold text-slate-900 font-mono">
              {filteredStations.length}
            </span>
            <span> stations</span>
          </div>
        </div>
      </div>

      {/* 2. LEAFLET MAP VIEW */}
      <div className="relative w-full flex-grow min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] z-0">
        <div
          ref={mapContainerRef}
          className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]"
        />

        {/* Floating City Banner & Quick Legend */}
        <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-md flex items-center gap-2.5 pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="font-black text-slate-900">
              Trece Martires Fuel Map
            </span>
            <span className="text-slate-500 block text-[10px]">
              25+ Monitored Gas Stations
            </span>
          </div>
        </div>

        {/* Floating Brand Legend Bar at Bottom */}
        <div className="absolute bottom-3 left-3 right-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-200/90 shadow-md flex flex-wrap items-center justify-between gap-2 pointer-events-auto text-[11px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Brand Legend:
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Petron
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> Shell
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600" /> Seaoil
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" /> Petro
              Gazz
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />{' '}
              Cleanfuel
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600" /> Uno
              Fuel
            </span>
            <span className="inline-flex items-center gap-1 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />{' '}
              Independents
            </span>
          </div>

          <div className="text-[10px] text-slate-500 font-medium ml-auto">
            Click any pin to inspect prices & directions
          </div>
        </div>
      </div>
    </div>
  );
}
