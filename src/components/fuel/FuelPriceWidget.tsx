import { useState } from 'react';
import {
  TRECE_DOE_FUEL_META,
  TRECE_FUEL_PRODUCTS,
  TRECE_BRAND_SUMMARIES,
  getFuelDataFreshness,
} from '../../data/fuel/fuelPriceData';
import {
  TRECE_GAS_STATIONS,
  type GasStation,
} from '../../data/fuel/fuelStationsData';
import {
  getCommunityReports,
  type CommunityFuelReport,
} from '../../data/fuel/communityReports';
import FuelStationMap from './FuelStationMap';
import CommunityReportModal from './CommunityReportModal';
import {
  Fuel,
  TrendingDown,
  ShieldCheck,
  MapPin,
  Clock,
  Users,
  Building2,
  ExternalLink,
  Info,
  ArrowRight,
  Flame,
  CheckCircle2,
  PlusCircle,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router';

interface FuelPriceWidgetProps {
  isFullWidthSection?: boolean;
  className?: string;
  showMap?: boolean;
}

export default function FuelPriceWidget({
  isFullWidthSection = true,
  className = '',
  showMap = true,
}: FuelPriceWidgetProps) {
  const [selectedStation, setSelectedStation] = useState<GasStation | null>(
    null
  );
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [communityReports, setCommunityReports] = useState<
    CommunityFuelReport[]
  >(() => getCommunityReports());

  const freshness = getFuelDataFreshness(TRECE_DOE_FUEL_META.periodEnd);
  const activeProducts = TRECE_FUEL_PRODUCTS.filter(p => p.isAvailable);

  // Cheapest Stations in Trece
  const cheapestDieselStation = [...TRECE_GAS_STATIONS]
    .filter(s => s.fuels.diesel && s.estimatedPrices.diesel)
    .sort(
      (a, b) =>
        (a.estimatedPrices.diesel || 999) - (b.estimatedPrices.diesel || 999)
    )[0];

  const cheapestUnleadedStation = [...TRECE_GAS_STATIONS]
    .filter(s => s.fuels.ron91 && s.estimatedPrices.ron91)
    .sort(
      (a, b) =>
        (a.estimatedPrices.ron91 || 999) - (b.estimatedPrices.ron91 || 999)
    )[0];

  const handleStationSelected = (station: GasStation) => {
    setSelectedStation(station);
  };

  return (
    <div
      id="fuel-price-module"
      className={`w-full ${
        isFullWidthSection
          ? ''
          : 'bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md'
      } ${className}`}
    >
      {/* 1. OFFICIAL DOE HEADER WITH FRESHNESS & COMMUNITY BADGES */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-3 max-w-3xl">
          {/* Top Badges Strip */}
          <div className="flex flex-wrap items-center gap-2">
            {/* DOE Bureau Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#003893]/10 text-[#003893] border border-[#003893]/20">
              <Building2 className="w-3.5 h-3.5" />
              <span>DOE Oil Industry Management Bureau</span>
            </span>

            {/* Freshness / Outdated / Updated Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${freshness.badgeClass}`}
            >
              <span className={`w-2 h-2 rounded-full ${freshness.dotClass}`} />
              <span>{freshness.label}</span>
            </span>

            {/* Community Reports Count Badge */}
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300/80 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{communityReports.length} Community Reports</span>
            </button>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
              <Fuel className="w-7 h-7 text-[#003893] shrink-0" />
              <span>Trece Martires City Fuel Price Monitor</span>
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Curated official liquid fuel pump prices for the City of Trece
              Martires, Cavite (Region IV-A), covering Unleaded, Premium
              Gasoline, Automotive Diesel, and Kerosene.
            </p>
          </div>

          {/* Monitoring Period Metadata */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Monitoring Period: </span>
              <strong className="text-slate-800 font-semibold">
                {TRECE_DOE_FUEL_META.periodLabel}
              </strong>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Coverage: </span>
              <strong className="text-slate-800 font-semibold">
                Trece Martires City & Major Corridors
              </strong>
            </span>
          </div>
        </div>

        {/* Action Controls: Report Price & Full Explorer Link */}
        <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2.5 shrink-0">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#003893] hover:bg-blue-800 text-white px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Pump Price</span>
          </button>

          <Link
            to="/fuel-prices"
            className="inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#003893] bg-slate-50 hover:bg-slate-100 px-3.5 py-2 rounded-2xl border border-slate-200 font-semibold transition-all"
          >
            <span>Full Fuel Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. OFFICIAL DOE DISCLAIMER CARD */}
      <div className="my-5 p-4 sm:p-5 bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-amber-50/90 border border-amber-200/90 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-2xs">
        <div className="p-2.5 bg-amber-100/80 rounded-2xl text-amber-800 shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs text-amber-900 leading-relaxed flex-grow">
          <strong className="font-bold text-amber-950 block mb-0.5">
            Official DOE Reference Notice & Price Disclaimer:
          </strong>
          <span>
            {TRECE_DOE_FUEL_META.disclaimer} Always check the actual digital LED
            board at the retail pump.
          </span>
        </div>
      </div>

      {/* 3. CORE FUEL PRICE CARDS GRID (RON 91, RON 95, DIESEL, KEROSENE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {activeProducts.map(product => {
          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${product.badgeBg} ${product.badgeBorder} ${product.badgeText}`}
                  >
                    {product.shortName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {product.unit}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 mb-1 group-hover:text-[#003893] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 leading-snug line-clamp-2 mb-4">
                  {product.description}
                </p>
              </div>

              {/* Price Range Display */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">
                    Trece City Price Range
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight flex items-baseline gap-1">
                    <span>₱{product.overallMin.toFixed(2)}</span>
                    <span className="text-slate-400 text-base font-normal">
                      –
                    </span>
                    <span>₱{product.overallMax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Lowest Price & Potential Savings */}
                <div className="bg-emerald-50/80 rounded-xl p-2.5 border border-emerald-200/70 flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-bold flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Lowest in City:</span>
                  </span>
                  <span className="font-black text-emerald-900 font-mono">
                    ₱{product.lowestPrice.toFixed(2)} / L
                  </span>
                </div>

                {/* Major vs Independent Comparison */}
                <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                  {product.petronMin !== null &&
                    product.petronMin !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Petron (Major):</span>
                        <span className="font-bold text-slate-800 font-mono">
                          ₱{product.petronMin.toFixed(2)}
                          {product.petronMax !== product.petronMin
                            ? ` - ₱${product.petronMax?.toFixed(2)}`
                            : ''}
                        </span>
                      </div>
                    )}
                  {product.independentMin !== null &&
                    product.independentMin !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Independents:</span>
                        <span className="font-bold text-slate-800 font-mono">
                          ₱{product.independentMin.toFixed(2)}
                          {product.independentMax !== product.independentMin
                            ? ` - ₱${product.independentMax?.toFixed(2)}`
                            : ''}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. QUICK HIGHLIGHTS: CHEAPEST FUEL SPOTS IN TRECE MARTIRES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Cheapest Diesel Spot */}
        {cheapestDieselStation && (
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-amber-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-amber-600" />
                <span>Lowest Diesel in Trece</span>
              </div>
              <h4 className="font-black text-slate-900 text-sm sm:text-base truncate">
                {cheapestDieselStation.name}
              </h4>
              <p className="text-xs text-slate-600 truncate">
                📍 {cheapestDieselStation.street},{' '}
                {cheapestDieselStation.barangay}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl sm:text-2xl font-black text-amber-900 font-mono">
                ₱
                {(cheapestDieselStation.estimatedPrices.diesel || 85.2).toFixed(
                  2
                )}
              </div>
              <a
                href={cheapestDieselStation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#003893] hover:underline font-bold mt-1"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Cheapest Unleaded Spot */}
        {cheapestUnleadedStation && (
          <div className="bg-gradient-to-r from-sky-500/10 via-sky-50/50 to-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-sky-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-sky-800 bg-sky-100/80 px-2.5 py-0.5 rounded-full">
                <Fuel className="w-3 h-3 text-sky-600" />
                <span>Lowest Unleaded 91 in Trece</span>
              </div>
              <h4 className="font-black text-slate-900 text-sm sm:text-base truncate">
                {cheapestUnleadedStation.name}
              </h4>
              <p className="text-xs text-slate-600 truncate">
                📍 {cheapestUnleadedStation.street},{' '}
                {cheapestUnleadedStation.barangay}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl sm:text-2xl font-black text-sky-900 font-mono">
                ₱
                {(
                  cheapestUnleadedStation.estimatedPrices.ron91 || 71.4
                ).toFixed(2)}
              </div>
              <a
                href={cheapestUnleadedStation.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#003893] hover:underline font-bold mt-1"
              >
                <span>Navigate</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 5. INTERACTIVE LEAFLET GAS STATION MAP */}
      {showMap && (
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#003893]" />
                <span>Interactive Gas Station Map & Price Directory</span>
              </h3>
              <p className="text-xs text-slate-500">
                Locate 25+ verified retail stations in Trece Martires with
                directions, estimated rates, and operating hours.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="text-xs font-bold text-[#003893] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Report Missing Station / Update Price</span>
              </button>
            </div>
          </div>

          {/* Leaflet Map Component */}
          <FuelStationMap
            onSelectStation={handleStationSelected}
            selectedStationId={selectedStation?.id}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        </div>
      )}

      {/* 6. BRAND SCHEDULE BREAKDOWN TABLE */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-2xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#003893]" />
              <span>DOE Price Schedule by Brand (Trece Martires City)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Official price comparison between major oil companies and
              independent retail outlets.
            </p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full self-start">
            Region IV-A Monitoring
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-y border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Brand / Category</th>
                <th className="py-3 px-4">Unleaded (RON 91)</th>
                <th className="py-3 px-4">Premium (RON 95)</th>
                <th className="py-3 px-4">Diesel</th>
                <th className="py-3 px-4">Kerosene</th>
                <th className="py-3 px-4">Monitoring Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TRECE_BRAND_SUMMARIES.map((brandSummary, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{brandSummary.brand}</div>
                    <span className="text-[10px] font-normal text-slate-500">
                      {brandSummary.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {brandSummary.ron91Range}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {brandSummary.ron95Range}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {brandSummary.dieselRange}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {brandSummary.keroseneRange}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        brandSummary.status.includes('Lowest')
                          ? 'bg-emerald-100 text-emerald-800'
                          : brandSummary.status.includes('Active')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {brandSummary.status.includes('Active') && (
                        <CheckCircle2 className="w-3 h-3 text-current" />
                      )}
                      <span>{brandSummary.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. COMMUNITY REPORTS ACTIVITY FEED */}
      <div className="bg-slate-50/80 rounded-2xl sm:rounded-3xl border border-slate-200/90 p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#003893]" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recent Community Pump Price Updates
              </h3>
              <p className="text-xs text-slate-500">
                Real-time crowd-sourced verification from drivers and commuters
                in Trece Martires.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#003893] hover:bg-blue-800 px-3.5 py-2 rounded-xl transition-all shadow-2xs self-start cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit Live Price</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {communityReports.slice(0, 4).map(report => (
            <div
              key={report.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 truncate">
                  {report.stationName}
                </span>
                <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-1">
                  {report.relativeTime}
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500 text-[11px]">
                  {report.fuelName}:
                </span>
                <span className="text-sm font-black text-slate-900 font-mono">
                  ₱{report.reportedPrice.toFixed(2)}
                </span>
              </div>
              {report.notes && (
                <p className="text-[11px] text-slate-600 italic bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  "{report.notes}"
                </p>
              )}
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>By: {report.reportedBy}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Report Modal */}
      <CommunityReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        initialStation={selectedStation}
        onReportSubmitted={() => {
          setCommunityReports(getCommunityReports());
        }}
      />
    </div>
  );
}
