import { useState, useMemo } from 'react';
import {
  TRECE_SENIOR_HIGH_SCHOOLS,
  SHS_STRANDS,
  SHS_STATISTICS,
  type ShsStrandCode,
} from '../../data/education/seniorHighSchools';
import AnimatedCounter from '../ui/AnimatedCounter';
import {
  Search,
  X,
  Copy,
  Check,
  Building2,
  Grid,
  List as ListIcon,
  Info,
  Layers,
  Award,
  Compass,
  Briefcase,
  School,
  MapPin,
} from 'lucide-react';

export default function SeniorHighSchoolsExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStrand, setSelectedStrand] = useState<ShsStrandCode | 'ALL'>(
    'ALL'
  );
  const [selectedSector, setSelectedSector] = useState<
    'ALL' | 'Public' | 'Private'
  >('ALL');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');
  const [copiedSchoolId, setCopiedSchoolId] = useState<string | null>(null);
  const [activeGuideStrand, setActiveGuideStrand] =
    useState<ShsStrandCode | null>(null);

  // Copy DepEd ID handler
  const handleCopyId = (schoolId: string) => {
    navigator.clipboard.writeText(schoolId);
    setCopiedSchoolId(schoolId);
    setTimeout(() => setCopiedSchoolId(null), 2000);
  };

  // Filtered schools
  const filteredSchools = useMemo(() => {
    return TRECE_SENIOR_HIGH_SCHOOLS.filter(school => {
      const matchesStrand =
        selectedStrand === 'ALL' || school.strands.includes(selectedStrand);

      if (!matchesStrand) return false;

      const matchesSector =
        selectedSector === 'ALL' || school.sector === selectedSector;

      if (!matchesSector) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchesName = school.name.toLowerCase().includes(q);
      const matchesId = school.schoolId.toLowerCase().includes(q);
      const matchesAddress =
        school.addressHint?.toLowerCase().includes(q) || false;
      const matchesStrands = school.strands.some(
        s =>
          s.toLowerCase().includes(q) ||
          SHS_STRANDS[s].name.toLowerCase().includes(q)
      );

      return matchesName || matchesId || matchesAddress || matchesStrands;
    });
  }, [searchQuery, selectedStrand, selectedSector]);

  const STRAND_KEYS: ShsStrandCode[] = ['STEM', 'ABM', 'HUMSS', 'GAS', 'TVL'];

  return (
    <div className="space-y-8">
      {/* 1. Header Overview & Summary Statistics */}
      <div className="bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-blue-900/40 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              <span className="text-amber-300">Senior High Schools</span> &amp;
              Strand Directory
            </h2>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Explore all {SHS_STATISTICS.totalSchools} DepEd-recognized Senior
              High Schools ({SHS_STATISTICS.publicSchools} Public,{' '}
              {SHS_STATISTICS.privateSchools} Private) in Trece Martires City.
              Find the right institution offering your preferred Academic track
              (STEM, ABM, HUMSS, GAS) or Technical-Vocational-Livelihood (TVL)
              track.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 border border-blue-400/20 text-white">
              <div className="text-xs text-blue-200 font-semibold mb-1">
                Total SHS Schools
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                <AnimatedCounter value={SHS_STATISTICS.totalSchools} />
              </div>
              <div className="text-xs text-blue-200/80 mt-0.5">
                {SHS_STATISTICS.publicSchools} Public &bull;{' '}
                {SHS_STATISTICS.privateSchools} Private
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 border border-blue-400/20 text-white">
              <div className="text-xs text-blue-200 font-semibold mb-1">
                Available Strands
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                <AnimatedCounter value={SHS_STATISTICS.totalStrands} />
              </div>
              <div className="text-xs text-blue-200/80 mt-0.5">
                Academic &amp; TVL Tracks
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 border border-blue-400/20 text-white">
              <div className="text-xs text-blue-200 font-semibold mb-1">
                DepEd Public SHS
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                <AnimatedCounter value={SHS_STATISTICS.publicSchools} />
              </div>
              <div className="text-xs text-blue-200/80 mt-0.5">
                Free Public Tuition
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 border border-blue-400/20 text-white">
              <div className="text-xs text-blue-200 font-semibold mb-1">
                5-Strand Campuses
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                <AnimatedCounter value={SHS_STATISTICS.allStrandsCount} />
              </div>
              <div className="text-xs text-blue-200/80 mt-0.5">
                Offering All 5 Strands
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Strand Distribution Visual Overview Bar */}
      <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-900" />
            <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
              Senior High School Strand Availability in Trece Martires (
              {SHS_STATISTICS.totalSchools} Institutions)
            </h3>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            Click any strand pill below to filter institutions
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          {STRAND_KEYS.map(code => {
            const count = SHS_STATISTICS.strandDistribution[code];
            const strand = SHS_STRANDS[code];
            const isSelected = selectedStrand === code;

            return (
              <button
                key={code}
                type="button"
                onClick={() => setSelectedStrand(isSelected ? 'ALL' : code)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#003893] text-white border-[#003893] shadow-2xs'
                    : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-black text-xs font-mono">{code}</span>
                  <span
                    className={`text-xs px-1.5 py-0.2 rounded-md font-mono font-bold ${
                      isSelected
                        ? 'bg-blue-800 text-white'
                        : 'bg-zinc-200 text-zinc-800'
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <div
                  className={`text-xs font-semibold line-clamp-1 ${
                    isSelected ? 'text-blue-100' : 'text-zinc-600'
                  }`}
                >
                  {code === 'GAS'
                    ? 'General Academic'
                    : code === 'TVL'
                      ? 'Tech-Voc Track'
                      : strand.name.split(',')[0]}
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full ${
                      code === 'STEM'
                        ? 'bg-emerald-500'
                        : code === 'ABM'
                          ? 'bg-amber-500'
                          : code === 'HUMSS'
                            ? 'bg-purple-500'
                            : code === 'GAS'
                              ? 'bg-blue-500'
                              : 'bg-rose-500'
                    }`}
                    style={{
                      width: `${(count / SHS_STATISTICS.totalSchools) * 100}%`,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Search & Filter Controls Strip */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs space-y-4">
        {/* Row 1: Search & Sector Switcher */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search school name, 6-digit DepEd ID, barangay, or strand (e.g. 342292, STEM, Gregorio)..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#003893] focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sector Filter: All, Public, Private */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setSelectedSector('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSector === 'ALL'
                  ? 'bg-white text-[#003893] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Sectors ({SHS_STATISTICS.totalSchools})
            </button>
            <button
              type="button"
              onClick={() => setSelectedSector('Public')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedSector === 'Public'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>Public ({SHS_STATISTICS.publicSchools})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSector('Private')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedSector === 'Private'
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Private ({SHS_STATISTICS.privateSchools})</span>
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-between lg:justify-end gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100">
            <span className="text-xs text-gray-500 font-semibold lg:hidden">
              {filteredSchools.length} schools found
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                title="Grid Card View"
                aria-label="Grid card view"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-white text-[#003893] shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('table')}
                title="Detailed Table View"
                aria-label="Detailed table view"
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  layoutMode === 'table'
                    ? 'bg-white text-[#003893] shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Strand Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-500 mr-1">
            Filter by Strand:
          </span>
          <button
            type="button"
            onClick={() => setSelectedStrand('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStrand === 'ALL'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
            }`}
          >
            All ({TRECE_SENIOR_HIGH_SCHOOLS.length})
          </button>

          {STRAND_KEYS.map(strand => {
            const isActive = selectedStrand === strand;
            const count = SHS_STATISTICS.strandDistribution[strand];
            return (
              <button
                key={strand}
                type="button"
                onClick={() => setSelectedStrand(strand)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                }`}
              >
                <span>{strand}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filters Summary */}
        {(selectedStrand !== 'ALL' ||
          selectedSector !== 'ALL' ||
          searchQuery) && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex flex-wrap items-center gap-2">
              <span>Filtering by:</span>
              {selectedSector !== 'ALL' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-900 font-bold border border-emerald-200">
                  Sector: {selectedSector}
                  <button
                    type="button"
                    onClick={() => setSelectedSector('ALL')}
                    className="hover:text-red-500 ml-1"
                  >
                    &times;
                  </button>
                </span>
              )}
              {selectedStrand !== 'ALL' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-blue-50 text-[#003893] font-bold border border-blue-200">
                  Strand: {selectedStrand} ({SHS_STRANDS[selectedStrand].name})
                  <button
                    type="button"
                    onClick={() => setSelectedStrand('ALL')}
                    className="hover:text-red-500 ml-1"
                  >
                    &times;
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-900 font-bold border border-amber-200">
                  Query: &quot;{searchQuery}&quot;
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="hover:text-red-500 ml-1"
                  >
                    &times;
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedStrand('ALL');
                setSelectedSector('ALL');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#003893] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 4. Schools Display (Grid or Table) */}
      {filteredSchools.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-gray-200 text-center max-w-lg mx-auto shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              No senior high schools found
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              No schools matched your current filter criteria &quot;
              {searchQuery || selectedStrand || selectedSector}&quot;.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedStrand('ALL');
              setSelectedSector('ALL');
              setSearchQuery('');
            }}
            className="bg-[#003893] text-white hover:bg-blue-800 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Clear Search &amp; Filters
          </button>
        </div>
      ) : layoutMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchools.map((school, idx) => (
            <div
              key={school.id}
              className={`group bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 flex flex-col justify-between ${
                school.sector === 'Public'
                  ? 'border-emerald-200 hover:border-emerald-400 hover:shadow-lg bg-gradient-to-b from-emerald-50/20 to-white'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                {/* Header: School ID & Sector Badge */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyId(school.schoolId)}
                    title="Click to copy DepEd School ID"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 text-gray-700 hover:bg-blue-50 hover:text-[#003893] border border-gray-200 transition-colors cursor-pointer"
                  >
                    <span>ID: {school.schoolId}</span>
                    {copiedSchoolId === school.schoolId ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
                    )}
                  </button>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      school.sector === 'Public'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {school.sector === 'Public' && (
                      <School className="w-3 h-3 text-emerald-600" />
                    )}
                    <span>{school.sector} SHS</span>
                  </span>
                </div>

                {/* School Name & Location */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 group-hover:text-[#003893] transition-colors leading-snug">
                    {school.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>
                      {school.addressHint ? `${school.addressHint}, ` : ''}
                      {school.municipality}
                    </span>
                  </div>
                </div>

                {/* Strands List */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>Offered SHS Strands ({school.strands.length})</span>
                    {school.strands.length === 5 && (
                      <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-bold">
                        Full Track (5)
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {school.strands.map(strandCode => {
                      const strand = SHS_STRANDS[strandCode];
                      const isHighlighted =
                        selectedStrand === strandCode ||
                        (searchQuery &&
                          strandCode
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()));

                      return (
                        <button
                          key={strandCode}
                          type="button"
                          onClick={() => setActiveGuideStrand(strandCode)}
                          title={`${strand.name} - Click for details`}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            strand.badgeColor.bg
                          } ${strand.badgeColor.border} ${
                            isHighlighted
                              ? 'ring-2 ring-[#003893] font-black'
                              : ''
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${strand.badgeColor.dot}`}
                          />
                          <span>{strandCode}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Info */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span className="font-mono text-[11px] text-gray-400">
                  #{idx + 1} &bull; DepEd Cavite
                </span>
                <button
                  type="button"
                  onClick={() => setActiveGuideStrand(school.strands[0])}
                  className="text-xs font-bold text-[#003893] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Strand Info</span>
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Detailed Table Layout */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-gray-700">
              <thead className="bg-slate-50 text-gray-900 uppercase font-black text-[11px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">DepEd School ID</th>
                  <th className="py-3.5 px-4">School Name</th>
                  <th className="py-3.5 px-4">Sector</th>
                  <th className="py-3.5 px-4">Location / Address</th>
                  <th className="py-3.5 px-4">Strands Offered</th>
                  <th className="py-3.5 px-4 text-center">Tracks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSchools.map((school, idx) => (
                  <tr
                    key={school.id}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-gray-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleCopyId(school.schoolId)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-gray-800 hover:bg-blue-100 hover:text-[#003893] transition-colors cursor-pointer"
                        title="Click to copy DepEd School ID"
                      >
                        <span>{school.schoolId}</span>
                        {copiedSchoolId === school.schoolId ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <span>{school.name}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          school.sector === 'Public'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {school.sector}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                      {school.addressHint ? `${school.addressHint}, ` : ''}Trece
                      Martires
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5">
                        {school.strands.map(strandCode => {
                          const strand = SHS_STRANDS[strandCode];
                          return (
                            <span
                              key={strandCode}
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold border ${strand.badgeColor.bg} ${strand.badgeColor.border}`}
                              title={strand.name}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${strand.badgeColor.dot}`}
                              />
                              <span>{strandCode}</span>
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-gray-900">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                        {school.strands.length}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Senior High School Strands Reference & Career Pathways Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#003893] font-bold text-xs uppercase tracking-wider">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>DepEd K to 12 Track &amp; Strand Reference</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              Understanding Senior High School Tracks &amp; Career Paths
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Learn about the specialization, competencies, and prospective
              college programs for each senior high strand.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">
              5 Official Strands
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STRAND_KEYS.map(code => {
            const strand = SHS_STRANDS[code];
            const offeringCount = SHS_STATISTICS.strandDistribution[code];
            const isModalActive = activeGuideStrand === code;

            return (
              <div
                key={code}
                className={`rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isModalActive
                    ? 'ring-2 ring-[#003893] bg-blue-50/40 border-[#003893]'
                    : 'bg-slate-50/60 border-gray-200 hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${strand.badgeColor.bg} ${strand.badgeColor.border}`}
                    >
                      {code} &bull; {strand.category}
                    </span>
                    <span className="text-xs font-bold font-mono text-gray-500">
                      {offeringCount} Schools
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 text-base leading-snug">
                      {strand.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {strand.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-gray-200/60">
                    <div className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-[#003893]" />
                      <span>Target College / Career Fields:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-gray-600">
                      {strand.careerPaths.slice(0, 3).map((career, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#003893] font-bold">
                            &bull;
                          </span>
                          <span className="line-clamp-1">{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedStrand(code)}
                    className="text-xs font-bold text-[#003893] hover:underline cursor-pointer"
                  >
                    View {offeringCount} Offering Schools &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. DepEd & City Educational Support Notice */}
      <div className="bg-slate-100/80 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-700">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#003893] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">
              Applying for Senior High School Vouchers or LGU Educational Aid?
            </div>
            <p className="text-slate-600 mt-0.5">
              Grade 10 completers from public schools are eligible for 100%
              DepEd SHS Voucher Program support. Students residing in Trece
              Martires can also apply for City Government Scholarships.
            </p>
          </div>
        </div>

        <a
          href="/services/education/apply-for-local-scholarships"
          className="inline-flex items-center gap-1.5 bg-[#003893] hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl shrink-0 transition-colors"
        >
          <span>City Scholarships</span>
          <Award className="w-3.5 h-3.5 text-amber-300" />
        </a>
      </div>
    </div>
  );
}
