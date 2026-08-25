import { useState, useMemo } from 'react';
import {
  TRECE_ALL_SCHOOLS,
  SCHOOLS_STATISTICS,
  SCHOOL_LEVEL_CONFIG,
  TRECE_BARANGAYS_WITH_SCHOOLS,
  type SchoolLevel,
  type SchoolSector,
} from '../../data/schoolsData';
import { SHS_STRANDS } from '../../data/seniorHighSchools';
import AnimatedCounter from '../ui/AnimatedCounter';
import {
  GraduationCap,
  Search,
  X,
  Copy,
  Check,
  Building2,
  CheckCircle2,
  Grid,
  List as ListIcon,
  Layers,
  MapPin,
  Baby,
  BookOpen,
  School,
  Sparkles,
  Filter,
  ShieldCheck,
} from 'lucide-react';

const LEVEL_ICONS: Record<
  SchoolLevel,
  React.ComponentType<{ className?: string }>
> = {
  Preschool: Baby,
  Elementary: BookOpen,
  'Junior High School': School,
  'Senior High School': GraduationCap,
  'Integrated School': Layers,
};

export default function SchoolsExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<SchoolLevel | 'ALL'>(
    'ALL'
  );
  const [selectedSector, setSelectedSector] = useState<SchoolSector | 'ALL'>(
    'ALL'
  );
  const [selectedBarangay, setSelectedBarangay] = useState<string>('ALL');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'table'>('grid');
  const [copiedSchoolId, setCopiedSchoolId] = useState<string | null>(null);

  // Copy DepEd BEIS ID handler
  const handleCopyId = (schoolId: string) => {
    navigator.clipboard.writeText(schoolId);
    setCopiedSchoolId(schoolId);
    setTimeout(() => setCopiedSchoolId(null), 2000);
  };

  // Filter schools
  const filteredSchools = useMemo(() => {
    return TRECE_ALL_SCHOOLS.filter(school => {
      // Level filter
      if (selectedLevel !== 'ALL') {
        if (selectedLevel === 'Senior High School') {
          // If filtering by SHS, show either Purely SHS or Integrated schools that offer SHS
          const isShs =
            school.level === 'Senior High School' ||
            !!school.shsStrands?.length;
          if (!isShs) return false;
        } else if (school.level !== selectedLevel) {
          return false;
        }
      }

      // Sector filter
      if (selectedSector !== 'ALL' && school.sector !== selectedSector) {
        return false;
      }

      // Barangay filter
      if (selectedBarangay !== 'ALL' && school.barangay !== selectedBarangay) {
        return false;
      }

      // Search Query filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchesName = school.name.toLowerCase().includes(q);
      const matchesId = school.id.toLowerCase().includes(q);
      const matchesBarangay = school.barangay.toLowerCase().includes(q);
      const matchesAddress = school.address.toLowerCase().includes(q);
      const matchesProgram = school.program.toLowerCase().includes(q);
      const matchesOffering = school.offeringCode.toLowerCase().includes(q);
      const matchesSubclass = school.subclassification
        .toLowerCase()
        .includes(q);
      const matchesStrands = school.shsStrands?.some(
        s =>
          s.toLowerCase().includes(q) ||
          SHS_STRANDS[s]?.name.toLowerCase().includes(q)
      );

      return (
        matchesName ||
        matchesId ||
        matchesBarangay ||
        matchesAddress ||
        matchesProgram ||
        matchesOffering ||
        matchesSubclass ||
        matchesStrands
      );
    });
  }, [searchQuery, selectedLevel, selectedSector, selectedBarangay]);

  // Level counts for badges in tabs
  const levelCounts = useMemo(() => {
    return {
      ALL: TRECE_ALL_SCHOOLS.length,
      Preschool: TRECE_ALL_SCHOOLS.filter(s => s.level === 'Preschool').length,
      Elementary: TRECE_ALL_SCHOOLS.filter(s => s.level === 'Elementary')
        .length,
      'Junior High School': TRECE_ALL_SCHOOLS.filter(
        s => s.level === 'Junior High School'
      ).length,
      'Senior High School': TRECE_ALL_SCHOOLS.filter(
        s => s.level === 'Senior High School' || !!s.shsStrands?.length
      ).length,
      'Integrated School': TRECE_ALL_SCHOOLS.filter(
        s => s.level === 'Integrated School'
      ).length,
    };
  }, []);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLevel('ALL');
    setSelectedSector('ALL');
    setSelectedBarangay('ALL');
  };

  const LEVEL_TABS: (SchoolLevel | 'ALL')[] = [
    'ALL',
    'Preschool',
    'Elementary',
    'Junior High School',
    'Senior High School',
    'Integrated School',
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header Overview & Summary Statistics */}
      <div className="bg-gradient-to-br from-slate-900 via-[#00225e] to-[#003893] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
        {/* Background glow & accents */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>DepEd Masterlist of Schools (SY 2020–2021)</span>
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified City Masterlist</span>
              </span>
            </div>

            <div className="text-xs text-blue-200/90 font-mono">
              Trece Martires City &bull; Region IV-A (Cavite)
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Trece Martires City Schools Directory
            </h2>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Explore all {SCHOOLS_STATISTICS.totalSchools} DepEd-registered
              educational institutions ({SCHOOLS_STATISTICS.publicSchools}{' '}
              Public, {SCHOOLS_STATISTICS.privateSchools} Private) across Trece
              Martires City. Filter by education level, sector, offered
              curricular program, and barangay.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-xs text-blue-200 font-medium mb-1 flex items-center gap-1">
                <School className="w-3.5 h-3.5 text-blue-300" />
                <span>Total Schools</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                <AnimatedCounter value={SCHOOLS_STATISTICS.totalSchools} />
              </div>
              <div className="text-[11px] text-blue-200/80 mt-0.5">
                {SCHOOLS_STATISTICS.publicSchools} Public &bull;{' '}
                {SCHOOLS_STATISTICS.privateSchools} Private
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-xs text-emerald-200 font-medium mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Public Campuses</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
                <AnimatedCounter value={SCHOOLS_STATISTICS.publicSchools} />
              </div>
              <div className="text-[11px] text-blue-200/80 mt-0.5">
                15 ES &bull; 6 JHS &bull; 1 SHS
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-xs text-amber-200 font-medium mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Private Institutions</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                <AnimatedCounter value={SCHOOLS_STATISTICS.privateSchools} />
              </div>
              <div className="text-[11px] text-blue-200/80 mt-0.5">
                {SCHOOLS_STATISTICS.integratedSchools} Integrated &bull;{' '}
                {SCHOOLS_STATISTICS.preschools} Preschools
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="text-xs text-purple-200 font-medium mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-purple-300" />
                <span>Integrated Campuses</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-purple-300 font-mono">
                <AnimatedCounter value={SCHOOLS_STATISTICS.integratedSchools} />
              </div>
              <div className="text-[11px] text-blue-200/80 mt-0.5">
                {SCHOOLS_STATISTICS.allOfferingK12} K-to-12 &bull;{' '}
                {SCHOOLS_STATISTICS.kTo10Schools} K-to-10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4">
        {/* Level Navigation Tabs */}
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span>Select Education Level</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {LEVEL_TABS.map(lvl => {
              const isActive = selectedLevel === lvl;
              const IconComp = lvl === 'ALL' ? Sparkles : LEVEL_ICONS[lvl];
              const count = levelCounts[lvl];

              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#003893] text-white shadow-xs'
                      : 'bg-slate-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                  }`}
                >
                  <IconComp
                    className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-gray-500'}`}
                  />
                  <span>{lvl === 'ALL' ? 'All Levels' : lvl}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200/80 text-gray-700'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Second Row: Sector, Barangay, Search & View Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-gray-100 items-center">
          {/* Sector Pill Switcher */}
          <div className="sm:col-span-4 flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setSelectedSector('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSector === 'ALL'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({TRECE_ALL_SCHOOLS.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedSector('Public')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedSector === 'Public'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Public ({SCHOOLS_STATISTICS.publicSchools})</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSector('Private')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedSector === 'Private'
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              <Building2 className="w-3 h-3" />
              <span>Private ({SCHOOLS_STATISTICS.privateSchools})</span>
            </button>
          </div>

          {/* Barangay Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedBarangay}
              onChange={e => setSelectedBarangay(e.target.value)}
              aria-label="Filter by Barangay"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#003893] focus:bg-white text-gray-800 font-medium cursor-pointer"
            >
              <option value="ALL">All Barangays (13)</option>
              {TRECE_BARANGAYS_WITH_SCHOOLS.map(brgy => (
                <option key={brgy} value={brgy}>
                  Brgy. {brgy}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="sm:col-span-3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search school, ID, program..."
              className="w-full pl-8 pr-8 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#003893] focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="sm:col-span-2 flex items-center justify-end gap-1">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-white text-[#003893] shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('table')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  layoutMode === 'table'
                    ? 'bg-white text-[#003893] shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="Table View"
              >
                <ListIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedLevel !== 'ALL' ||
          selectedSector !== 'ALL' ||
          selectedBarangay !== 'ALL' ||
          searchQuery) && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 text-gray-600">
              <span className="font-semibold text-gray-700">
                Active Filters:
              </span>
              {selectedLevel !== 'ALL' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-medium text-[11px]">
                  Level: {selectedLevel}
                </span>
              )}
              {selectedSector !== 'ALL' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium text-[11px]">
                  Sector: {selectedSector}
                </span>
              )}
              {selectedBarangay !== 'ALL' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-medium text-[11px]">
                  Brgy: {selectedBarangay}
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium text-[11px]">
                  Query: &quot;{searchQuery}&quot;
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-[11px]">
                Showing{' '}
                <strong className="text-gray-900">
                  {filteredSchools.length}
                </strong>{' '}
                of {TRECE_ALL_SCHOOLS.length} schools
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-[#003893] hover:underline font-bold text-[11px] cursor-pointer"
              >
                Reset all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. School Directory Content */}
      {filteredSchools.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xs space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900">
              No schools match your search
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              We couldn&apos;t find any schools matching your selected filters.
              Try searching for a different name, barangay, or resetting your
              filter criteria.
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 bg-[#003893] hover:bg-[#00225e] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : layoutMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchools.map(school => {
            const levelConfig =
              SCHOOL_LEVEL_CONFIG[school.level] ||
              SCHOOL_LEVEL_CONFIG.Elementary;
            const IconComponent = LEVEL_ICONS[school.level] || School;
            const isPublic = school.sector === 'Public';

            return (
              <div
                key={school.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group hover:border-[#003893]/40"
              >
                <div className="space-y-3.5">
                  {/* Top Badges & BEIS ID */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Level Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border ${levelConfig.badgeColor.bg} ${levelConfig.badgeColor.text} ${levelConfig.badgeColor.border}`}
                      >
                        <IconComponent className="w-3 h-3" />
                        <span>{school.level}</span>
                      </span>

                      {/* Sector Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                          isPublic
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isPublic ? (
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Building2 className="w-3 h-3 text-slate-500" />
                        )}
                        <span>{school.sector}</span>
                      </span>
                    </div>

                    {/* Copy BEIS ID Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyId(school.id)}
                      title={`Copy DepEd BEIS ID: ${school.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-gray-500 hover:text-[#003893] bg-gray-50 hover:bg-blue-50 px-2 py-1 rounded-md border border-gray-200 transition-all shrink-0 cursor-pointer"
                    >
                      {copiedSchoolId === school.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>ID: {school.id}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* School Name */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#003893] transition-colors">
                      {school.name}
                    </h3>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5 flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400" />
                      <span>{school.subclassification}</span>
                      <span>&bull;</span>
                      <span>{school.legislativeDistrict}</span>
                    </div>
                  </div>

                  {/* Program / Curricular Offering Box */}
                  <div className="bg-slate-50/90 rounded-xl p-3 border border-gray-100 space-y-1.5">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                      Offered Curricular Program
                    </div>
                    <div className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#003893] shrink-0" />
                      <span className="line-clamp-2">{school.program}</span>
                    </div>

                    {/* SHS Strands if available */}
                    {school.shsStrands && school.shsStrands.length > 0 && (
                      <div className="pt-1.5 border-t border-gray-200/60">
                        <div className="text-[10px] font-bold text-purple-700 mb-1 flex items-center gap-1">
                          <GraduationCap className="w-3 h-3" />
                          <span>SHS Strands:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {school.shsStrands.map(strand => (
                            <span
                              key={strand}
                              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200"
                              title={SHS_STRANDS[strand]?.name}
                            >
                              {strand}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Location */}
                <div className="pt-3 mt-3 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-gray-900">
                      Brgy. {school.barangay}
                    </span>
                    {school.address && (
                      <span className="text-gray-500 block text-[10px] mt-0.5 truncate max-w-[240px]">
                        {school.address}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-bold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">BEIS ID</th>
                  <th className="py-3 px-4">School Name</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Offered Program</th>
                  <th className="py-3 px-4">Barangay &amp; Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSchools.map(school => {
                  const levelConfig =
                    SCHOOL_LEVEL_CONFIG[school.level] ||
                    SCHOOL_LEVEL_CONFIG.Elementary;
                  const isPublic = school.sector === 'Public';

                  return (
                    <tr
                      key={school.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* BEIS ID */}
                      <td className="py-3 px-4 font-mono font-bold text-gray-900 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleCopyId(school.id)}
                          className="flex items-center gap-1 hover:text-[#003893] transition-colors cursor-pointer"
                          title="Click to copy BEIS ID"
                        >
                          {copiedSchoolId === school.id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-400" />
                          )}
                          <span>{school.id}</span>
                        </button>
                      </td>

                      {/* School Name */}
                      <td className="py-3 px-4 font-bold text-gray-900 min-w-[220px]">
                        <div>{school.name}</div>
                        <div className="text-[10px] text-gray-500 font-normal mt-0.5">
                          {school.subclassification} &bull;{' '}
                          {school.legislativeDistrict}
                        </div>
                      </td>

                      {/* Level */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${levelConfig.badgeColor.bg} ${levelConfig.badgeColor.text} ${levelConfig.badgeColor.border}`}
                        >
                          {school.level}
                        </span>
                      </td>

                      {/* Sector */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                            isPublic
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {school.sector}
                        </span>
                      </td>

                      {/* Program */}
                      <td className="py-3 px-4 max-w-[280px]">
                        <div className="font-medium text-gray-800 text-[11px]">
                          {school.program}
                        </div>
                        {school.shsStrands && school.shsStrands.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {school.shsStrands.map(strand => (
                              <span
                                key={strand}
                                className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200"
                              >
                                {strand}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Barangay & Address */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" />
                          <span>Brgy. {school.barangay}</span>
                        </div>
                        {school.address && (
                          <div className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[200px]">
                            {school.address}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Data Citation & DepEd Footnote */}
      <div className="bg-slate-100 rounded-2xl p-4 sm:p-5 border border-gray-200 text-xs text-gray-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#003893] flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-gray-900">
              Department of Education (DepEd) Masterlist Reference
            </div>
            <div className="text-[11px] text-gray-500">
              Official Masterlist of Schools Address &amp; Curricular Offering
              Classification &bull; SDO Cavite Province &bull; Trece Martires
              City
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 self-end sm:self-center">
          <span>60 Verified Campuses</span>
          <span>&bull;</span>
          <span>SY 2020–2021 LIS</span>
        </div>
      </div>
    </div>
  );
}
