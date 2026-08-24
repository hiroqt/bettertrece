import { useState, useMemo } from 'react';
import {
  TRECE_BARANGAYS_PSGC,
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
  BarangayPsgcData,
} from '../../data/psaClassifications';
import AnimatedCounter from '../ui/AnimatedCounter';
import {
  Search,
  Copy,
  Check,
  Building2,
  TrendingUp,
  Users,
  MapPin,
  ArrowUpDown,
  Vote,
  CheckSquare2,
  Layers,
  School,
  X,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function BarangayPsgcTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedBarangay, setSelectedBarangay] =
    useState<BarangayPsgcData | null>(null);
  const [sortBy, setSortBy] = useState<
    'name' | 'population2024' | 'population2020' | 'growth'
  >('population2024');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(identifier);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredBarangays = useMemo(() => {
    return TRECE_BARANGAYS_PSGC.filter((brgy: BarangayPsgcData) => {
      const matchesSearch =
        brgy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brgy.psgcCode.includes(searchQuery) ||
        brgy.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brgy.historicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (brgy.captain &&
          brgy.captain.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter =
        filterType === 'All' || brgy.urbanRural === filterType;

      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'population2024') {
        comparison = a.population2024 - b.population2024;
      } else if (sortBy === 'population2020') {
        comparison = a.population2020 - b.population2020;
      } else if (sortBy === 'growth') {
        const growthA =
          (a.population2024 - a.population2015) / a.population2015;
        const growthB =
          (b.population2024 - b.population2015) / b.population2015;
        comparison = growthA - growthB;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchQuery, filterType, sortBy, sortOrder]);

  const toggleSort = (
    field: 'name' | 'population2024' | 'population2020' | 'growth'
  ) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. ELECTORAL & REGISTERED VOTERS PROFILE (COMELEC 2025) */}
      <div className="bg-gradient-to-br from-slate-900 via-[#00225e] to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-900/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1.5">
                <Vote className="w-3.5 h-3.5" />
                <span>Electoral &amp; Voters Profile</span>
              </span>
              <span className="text-[11px] font-mono text-blue-200">
                {TRECE_VOTER_STATISTICS_2025.electionName}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              City of Trece Martires — Official Voter Registry
            </h3>
            <p className="text-xs text-blue-200">
              Official data verified by the{' '}
              <strong>{TRECE_VOTER_STATISTICS_2025.sourceAgency}</strong> as of{' '}
              <strong>{TRECE_VOTER_STATISTICS_2025.asOfDate}</strong>.
            </p>
          </div>

          <div className="text-right shrink-0 hidden sm:block">
            <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold">
              Cavite Province Total
            </div>
            <div className="text-lg font-bold font-mono text-white">
              <AnimatedCounter
                value={TRECE_VOTER_STATISTICS_2025.caviteProvinceTotalVoters}
              />{' '}
              voters
            </div>
          </div>
        </div>

        {/* 4 Voter Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/15">
            <div className="flex items-center justify-between text-blue-200 text-xs font-semibold mb-2">
              <span>REGISTERED VOTERS</span>
              <Users className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              <AnimatedCounter
                value={TRECE_VOTER_STATISTICS_2025.registeredVoters}
              />
            </div>
            <div className="text-[11px] text-blue-200 mt-2">
              City of Trece Martires
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/15">
            <div className="flex items-center justify-between text-blue-200 text-xs font-semibold mb-2">
              <span>VOTING CENTERS</span>
              <School className="w-4 h-4 text-emerald-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              <AnimatedCounter
                value={TRECE_VOTER_STATISTICS_2025.votingCenters}
              />
            </div>
            <div className="text-[11px] text-blue-200 mt-2">
              Designated school centers
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/15">
            <div className="flex items-center justify-between text-blue-200 text-xs font-semibold mb-2">
              <span>CLUSTERED PRECINCTS</span>
              <CheckSquare2 className="w-4 h-4 text-blue-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              <AnimatedCounter
                value={TRECE_VOTER_STATISTICS_2025.clusteredPrecincts}
              />
            </div>
            <div className="text-[11px] text-blue-200 mt-2">
              Active clustered precincts
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/15">
            <div className="flex items-center justify-between text-blue-200 text-xs font-semibold mb-2">
              <span>ESTABLISHED PRECINCTS</span>
              <Layers className="w-4 h-4 text-purple-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">
              <AnimatedCounter
                value={TRECE_VOTER_STATISTICS_2025.establishedPrecincts}
              />
            </div>
            <div className="text-[11px] text-blue-200 mt-2">
              Total established precincts
            </div>
          </div>
        </div>
      </div>

      {/* 2. DEMOGRAPHIC & GEOGRAPHIC INDICATORS (2024 POPCEN) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>TOTAL POPULATION (2024)</span>
            <Users className="w-4 h-4 text-[#003893]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
            <AnimatedCounter
              value={TRECE_MUNICIPAL_PROFILE.totalPopulation2024}
            />
          </div>
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">
              {TRECE_MUNICIPAL_PROFILE.populationGrowthRate}
            </span>{' '}
            (vs{' '}
            <AnimatedCounter
              value={TRECE_MUNICIPAL_PROFILE.totalPopulation2020}
            />{' '}
            in 2020)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>CITY PSGC CODE</span>
            <MapPin className="w-4 h-4 text-[#003893]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900 font-mono">
              {TRECE_MUNICIPAL_PROFILE.psgcCityCode}
            </span>
            <button
              onClick={() =>
                copyToClipboard(
                  TRECE_MUNICIPAL_PROFILE.psgcCityCode,
                  'city-psgc'
                )
              }
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              title="Copy City PSGC Code"
            >
              {copiedCode === 'city-psgc' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Region IV-A (04) • Cavite (21)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>HIGHEST POPULATION</span>
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-gray-900 truncate">
            Brgy. Hugo Perez
          </div>
          <div className="text-xs text-gray-600 mt-2 flex items-center justify-between">
            <span>
              <AnimatedCounter value={52860} /> residents (2024)
            </span>
            <span className="font-mono text-[11px] text-gray-400 font-medium">
              <AnimatedCounter value={23.2} decimals={1} />% of city
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>FASTEST GROWING</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-gray-900 truncate">
            Brgy. Aguado
          </div>
          <div className="text-xs text-gray-600 mt-2 flex items-center justify-between">
            <span className="text-emerald-700 font-bold">
              +<AnimatedCounter value={77.4} decimals={1} />% growth
            </span>
            <span className="font-mono text-[11px] text-gray-400 font-medium">
              <AnimatedCounter value={39240} /> residents (2024)
            </span>
          </div>
        </div>
      </div>

      {/* 3. 13 CONSTITUENT BARANGAYS & DEMOGRAPHICS DIRECTORY */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Table Top Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                13 Constituent Barangays
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Official PSA 2024 POPCEN &amp; 2020 Census</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Barangay Demographics &amp; Geographic Directory
            </h3>
            <p className="text-xs text-blue-100/90 max-w-2xl leading-relaxed">
              Explore the official population census records, PSGC location
              codes, and elected Barangay Captains for all 13 constituent
              barangays of Trece Martires City.
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-white border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search barangay, captain, or PSGC..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap hidden sm:inline">
              Classification:
            </span>
            {['All', 'Urban', 'Suburban'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === type
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Barangays Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">PSGC Code</th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Barangay &amp; Martyr Honor</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Classification</th>
                <th
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('population2020')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>2020 Census</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('population2024')}
                >
                  <div className="flex items-center justify-end gap-1 text-[#003893]">
                    <span className="font-extrabold">
                      2024 Population (Latest)
                    </span>
                    <ArrowUpDown className="w-3 h-3 text-[#003893]" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('growth')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Growth (%)</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredBarangays.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No barangay found matching &quot;{searchQuery}&quot;.
                  </td>
                </tr>
              ) : (
                filteredBarangays.map((brgy: BarangayPsgcData) => (
                  <tr
                    key={brgy.psgcCode}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => setSelectedBarangay(brgy)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#003893] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{brgy.psgcCode}</span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            copyToClipboard(brgy.psgcCode, brgy.psgcCode);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-100 rounded text-gray-500 hover:text-blue-700 transition-all cursor-pointer"
                          title="Copy PSGC"
                        >
                          {copiedCode === brgy.psgcCode ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">
                        Brgy. {brgy.name}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {brgy.historicalName}
                      </div>
                      {brgy.captain && (
                        <div className="text-[11px] font-semibold text-[#003893] mt-0.5 flex items-center gap-1">
                          <span className="text-gray-400 font-normal">
                            Captain:
                          </span>
                          <span>{brgy.captain}</span>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          brgy.urbanRural === 'Urban'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {brgy.urbanRural}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-gray-500 text-xs">
                      {brgy.population2020.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-black text-[#003893] text-xs bg-blue-50/50">
                      {brgy.population2024.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {brgy.growthRate}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedBarangay(brgy);
                        }}
                        className="text-xs font-bold text-[#003893] hover:underline cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-gray-50/80 px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <span>
            Showing{' '}
            <strong>
              <AnimatedCounter value={filteredBarangays.length} />
            </strong>{' '}
            of{' '}
            <strong>
              <AnimatedCounter value={TRECE_BARANGAYS_PSGC.length} />
            </strong>{' '}
            constituent barangays
          </span>
          <div className="flex items-center gap-1.5 font-medium text-gray-600">
            <Info className="w-3.5 h-3.5 text-[#003893]" />
            <span>
              All 13 barangays are named after the{' '}
              <strong>Thirteen Martyrs of Cavite</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* 4. BARANGAY DETAILS MODAL */}
      {selectedBarangay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedBarangay(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-[#003893]">
                PSGC: {selectedBarangay.psgcCode}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                {selectedBarangay.urbanRural}
              </span>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-1">
              Brgy. {selectedBarangay.name}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5 italic">
              {selectedBarangay.historicalName}
            </p>

            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500">
                  Punong Barangay (Captain):
                </span>
                <span className="font-bold text-gray-900">
                  {selectedBarangay.captain || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500">Zone Type:</span>
                <span className="font-bold text-gray-900">
                  {selectedBarangay.type}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500">Description:</span>
                <span className="text-gray-700 text-right max-w-[240px]">
                  {selectedBarangay.desc}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500 font-bold text-[#003893]">
                  2024 Population (Latest):
                </span>
                <span className="font-mono font-black text-[#003893] text-sm">
                  {selectedBarangay.population2024.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500">2020 Census:</span>
                <span className="font-mono font-semibold text-gray-800">
                  {selectedBarangay.population2020.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-gray-500">2015 Census:</span>
                <span className="font-mono text-gray-600">
                  {selectedBarangay.population2015.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">
                  Overall Growth (2015–2024):
                </span>
                <span className="font-mono font-bold text-emerald-700">
                  {selectedBarangay.growthRate}
                </span>
              </div>
            </div>

            {/* Growth Progress Bar */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>Population Share of City (2024)</span>
                <span>
                  {(
                    (selectedBarangay.population2024 /
                      TRECE_MUNICIPAL_PROFILE.totalPopulation2024) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#003893] h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(selectedBarangay.population2024 / 52860) * 100}%`,
                  }}
                />
              </div>
              <div className="text-[10px] text-gray-400 text-right">
                Relative to highest barangay (Hugo Perez: 52,860)
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() =>
                  copyToClipboard(selectedBarangay.psgcCode, 'modal-psgc')
                }
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode === 'modal-psgc' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>Copy PSGC Code</span>
              </button>

              <button
                onClick={() => setSelectedBarangay(null)}
                className="px-4 py-2.5 bg-[#003893] hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
