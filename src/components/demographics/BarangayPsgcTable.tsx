import { useState, useMemo } from 'react';
import {
  TRECE_BARANGAYS_PSGC,
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
  BarangayPsgcData,
} from '../../data/demographics/psaClassifications';
import AnimatedCounter from '../ui/AnimatedCounter';
import {
  Search,
  Copy,
  Check,
  ArrowUpDown,
  X,
  CheckCircle2,
  Info,
  Globe2,
  History,
} from 'lucide-react';

export default function BarangayPsgcTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [codeFormat, setCodeFormat] = useState<'10digit' | '9digit'>('10digit');
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
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        brgy.name.toLowerCase().includes(q) ||
        brgy.psgcCode.includes(q) ||
        (brgy.psgc10DigitCode && brgy.psgc10DigitCode.includes(q)) ||
        brgy.type.toLowerCase().includes(q) ||
        brgy.historicalName.toLowerCase().includes(q) ||
        (brgy.oldBarangayName &&
          brgy.oldBarangayName.toLowerCase().includes(q)) ||
        (brgy.captain && brgy.captain.toLowerCase().includes(q));

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
      {/* 1. PSGC GEOGRAPHIC HIERARCHY & ADMINISTRATIVE PROFILE */}
      <div className="bg-gradient-to-br from-slate-900 via-[#00225e] to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-900/40 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Official Geographic Classification (PSGC Q2_2024)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/10 text-blue-100">
                PSGC 0402122000 / 042122000
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              City of Trece Martires Geographic Profile
            </h3>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Official standard geographic hierarchy, administrative
              classifications, census demographics, and 13 constituent barangays
              established by the Philippine Statistics Authority (PSA).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/15 text-center">
              <div className="text-[11px] text-blue-200 uppercase tracking-wider font-semibold">
                Income &amp; City Class
              </div>
              <div className="font-bold text-white text-sm mt-0.5">
                1st Class Component City
              </div>
              <div className="text-[11px] text-amber-300 font-medium">
                Provincial Capital of Cavite
              </div>
            </div>
          </div>
        </div>

        {/* 4 Geographic Hierarchy Level Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-blue-300 font-semibold text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span>Level 1: Region</span>
                <span className="font-mono text-white font-bold bg-white/10 px-1.5 py-0.2 rounded">
                  04
                </span>
              </div>
              <div className="font-bold text-white text-base mt-1">
                Region IV-A (CALABARZON)
              </div>
            </div>
            <div className="text-blue-200/70 text-[11px] mt-2 pt-2 border-t border-white/10">
              Island Group: Luzon
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-blue-300 font-semibold text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span>Level 2: Province</span>
                <span className="font-mono text-white font-bold bg-white/10 px-1.5 py-0.2 rounded">
                  21
                </span>
              </div>
              <div className="font-bold text-white text-base mt-1">
                Province of Cavite
              </div>
            </div>
            <div className="text-blue-200/70 text-[11px] mt-2 pt-2 border-t border-white/10">
              PSGC Code: 0402100000
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-blue-300 font-semibold text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span>Level 3: City</span>
                <span className="font-mono text-white font-bold bg-white/10 px-1.5 py-0.2 rounded">
                  22
                </span>
              </div>
              <div className="font-bold text-white text-base mt-1">
                City of Trece Martires
              </div>
            </div>
            <div className="text-blue-200/70 text-[11px] mt-2 pt-2 border-t border-white/10">
              Chartered under RA 981 (1954)
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-blue-300 font-semibold text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span>Level 4: Barangays</span>
                <span className="font-mono text-amber-300 font-bold bg-amber-400/20 px-1.5 py-0.2 rounded">
                  13 Units
                </span>
              </div>
              <div className="font-bold text-white text-base mt-1">
                13 Constituent Barangays
              </div>
            </div>
            <div className="text-blue-200/70 text-[11px] mt-2 pt-2 border-t border-white/10">
              Named after Cavite Martyrs
            </div>
          </div>
        </div>

        {/* Electoral & Demographics Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
          <div>
            <div className="text-blue-200/80">2024 Population (POPCEN)</div>
            <div className="text-lg sm:text-xl font-black text-white font-mono mt-0.5">
              <AnimatedCounter
                value={TRECE_MUNICIPAL_PROFILE.totalPopulation2024}
              />
            </div>
          </div>

          <div>
            <div className="text-blue-200/80">Registered Voters (2025)</div>
            <div className="text-lg sm:text-xl font-black text-amber-300 font-mono mt-0.5">
              <AnimatedCounter
                value={TRECE_VOTER_STATISTICS_2025.registeredVoters}
              />
            </div>
          </div>

          <div>
            <div className="text-blue-200/80">Voting Centers (COMELEC)</div>
            <div className="text-lg sm:text-xl font-black text-white font-mono mt-0.5">
              {TRECE_VOTER_STATISTICS_2025.votingCenters} Schools
            </div>
          </div>

          <div>
            <div className="text-blue-200/80">Clustered Precincts</div>
            <div className="text-lg sm:text-xl font-black text-white font-mono mt-0.5">
              {TRECE_VOTER_STATISTICS_2025.clusteredPrecincts} Precincts
            </div>
          </div>
        </div>
      </div>

      {/* 2. BARANGAY DEMOGRAPHIC DIRECTORY & PSGC TABLE */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Table Top Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Official PSA 2024 POPCEN &amp; 2020 Census</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              13 Constituent Barangays Directory
            </h3>
            <p className="text-xs text-blue-100/90 max-w-2xl leading-relaxed">
              Explore the official population census records, PSGC geocodes,
              historical native names, and elected Barangay Captains for all 13
              barangays of Trece Martires City.
            </p>
          </div>

          {/* 10-Digit vs 9-Digit Code Format Toggle */}
          <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/20 shrink-0">
            <button
              onClick={() => setCodeFormat('10digit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                codeFormat === '10digit'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              10-Digit PSGC
            </button>
            <button
              onClick={() => setCodeFormat('9digit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                codeFormat === '9digit'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              9-Digit Standard
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-white border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search barangay, historical name, captain, or PSGC..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
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
                <th className="py-3.5 px-4">
                  {codeFormat === '10digit' ? '10-Digit PSGC' : '9-Digit Code'}
                </th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Barangay &amp; Martyr Namesake</span>
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
                filteredBarangays.map((brgy: BarangayPsgcData) => {
                  const displayedCode =
                    codeFormat === '10digit'
                      ? brgy.psgc10DigitCode || brgy.psgcCode
                      : brgy.psgcCode;

                  return (
                    <tr
                      key={brgy.psgcCode}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedBarangay(brgy)}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#003893] whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{displayedCode}</span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              copyToClipboard(displayedCode, displayedCode);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-100 rounded text-gray-500 hover:text-blue-700 transition-all cursor-pointer"
                            title="Copy PSGC Code"
                          >
                            {copiedCode === displayedCode ? (
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
                  );
                })
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

      {/* 3. BARANGAY DETAILS MODAL */}
      {selectedBarangay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedBarangay(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-[#003893]">
                10-Digit:{' '}
                {selectedBarangay.psgc10DigitCode || selectedBarangay.psgcCode}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200">
                9-Digit: {selectedBarangay.psgcCode}
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
            {selectedBarangay.oldBarangayName && (
              <div className="text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/80 mt-2 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  Historical / Native Village Name:{' '}
                  <strong>{selectedBarangay.oldBarangayName}</strong>
                </span>
              </div>
            )}

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
                  copyToClipboard(
                    selectedBarangay.psgc10DigitCode ||
                      selectedBarangay.psgcCode,
                    'modal-psgc'
                  )
                }
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode === 'modal-psgc' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>Copy 10-Digit PSGC</span>
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
