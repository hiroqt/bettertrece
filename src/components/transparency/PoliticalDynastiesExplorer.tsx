import { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Landmark,
  Users,
  Search,
  TrendingUp,
  Award,
  BookOpen,
  Download,
  AlertCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardContent } from '@bettergov/kapwa/card';
import {
  CAVITE_DYNASTY_RECORDS,
  DYNASTY_SUMMARY,
  UNIQUE_MUNICIPALITIES,
  UNIQUE_YEARS,
  UNIQUE_POSITIONS,
} from '../../data/transparency/politicalDynasties';

type TabType = 'trece' | 'cavite' | 'clans' | 'explorer' | 'methodology';

interface PoliticalDynastiesExplorerProps {
  initialTab?: TabType;
  hideHeroBanner?: boolean;
}

export default function PoliticalDynastiesExplorer({
  initialTab = 'trece',
  hideHeroBanner = false,
}: PoliticalDynastiesExplorerProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  // Search & Filter state for Explorer tab
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [selectedDynastyType, setSelectedDynastyType] = useState<string>('all');
  const [selectedClanFilter, setSelectedClanFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Clan Directory filter
  const [clanSearch, setClanSearch] = useState('');
  const [clanScope, setClanScope] = useState<'all' | 'trece'>('all');
  const [expandedClan, setExpandedClan] = useState<string | null>(null);

  // Filtered politicians for Explorer tab
  const filteredRecords = useMemo(() => {
    return CAVITE_DYNASTY_RECORDS.filter(rec => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = rec.fullName.toLowerCase().includes(q);
        const matchesClan = rec.clan.toLowerCase().includes(q);
        const matchesParty = rec.party.toLowerCase().includes(q);
        const matchesMuni = rec.municipality.toLowerCase().includes(q);
        if (!matchesName && !matchesClan && !matchesParty && !matchesMuni) {
          return false;
        }
      }

      // Municipality
      if (
        selectedMunicipality !== 'all' &&
        rec.municipality !== selectedMunicipality
      ) {
        return false;
      }

      // Year
      if (selectedYear !== 'all' && rec.year !== parseInt(selectedYear, 10)) {
        return false;
      }

      // Position
      if (selectedPosition !== 'all' && rec.position !== selectedPosition) {
        return false;
      }

      // Dynasty Type
      if (selectedDynastyType === 'fat' && !rec.isFatDynasty) {
        return false;
      }
      if (selectedDynastyType === 'non-fat' && rec.isFatDynasty) {
        return false;
      }

      // Clan filter
      if (selectedClanFilter !== 'all' && rec.clan !== selectedClanFilter) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    selectedMunicipality,
    selectedYear,
    selectedPosition,
    selectedDynastyType,
    selectedClanFilter,
  ]);

  // Paginated records
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  // Reset pagination when filters change
  const handleFilterChange = (setter: (val: string) => void, val: string) => {
    setter(val);
    setCurrentPage(1);
  };

  // CSV Export handler
  const exportToCSV = () => {
    const headers = [
      'Full Name',
      'Clan / Family',
      'Position',
      'Municipality',
      'Province',
      'Election Year',
      'Party',
      'Dynasty Status',
    ];

    const rows = filteredRecords.map(r => [
      `"${r.fullName}"`,
      `"${r.clan}"`,
      `"${r.position}"`,
      `"${r.municipality}"`,
      `"${r.province}"`,
      r.year,
      `"${r.party}"`,
      `"${r.dynastyType}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join(
      '\n'
    );
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `cavite_political_dynasties_${Date.now()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clan directory data
  const displayedClans = useMemo(() => {
    const list =
      clanScope === 'trece'
        ? DYNASTY_SUMMARY.treceSummary.keyClans
        : DYNASTY_SUMMARY.caviteSummary.topClans;

    if (!clanSearch.trim()) return list;
    const q = clanSearch.toLowerCase().trim();
    return list.filter(
      c =>
        c.clan.toLowerCase().includes(q) ||
        c.membersList.some(m => m.toLowerCase().includes(q))
    );
  }, [clanScope, clanSearch]);

  const treceSummary = DYNASTY_SUMMARY.treceSummary;
  const caviteSummary = DYNASTY_SUMMARY.caviteSummary;

  return (
    <div className="space-y-8">
      {/* Header Banner & Academic Notice */}
      {!hideHeroBanner && (
        <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-950 text-white rounded-2xl p-6 md:p-8 shadow-lg border border-primary-700/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-700/60 border border-primary-400/30 text-xs font-semibold text-primary-100 tracking-wide uppercase">
                <Landmark
                  className="w-3.5 h-3.5 text-primary-300"
                  aria-hidden="true"
                />
                Civic Governance & Transparency
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Trece Martires & Cavite Political Dynasties Tracker
              </h2>
              <p className="text-primary-100 text-sm md:text-base leading-relaxed">
                Curated empirical dataset on local political dynasties across 13
                election cycles (1987–2022). Based on research by the{' '}
                <strong className="text-white">
                  Ateneo School of Government (ASOG)
                </strong>{' '}
                and{' '}
                <strong className="text-white">
                  Ateneo Policy Center (APC)
                </strong>
                .
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15 text-center">
                <span className="block text-2xl md:text-3xl font-bold text-amber-300">
                  {treceSummary.overallFatShare}%
                </span>
                <span className="text-xs text-primary-100 font-medium">
                  Trece Fat Dynasty Share
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15 text-center">
                <span className="block text-2xl md:text-3xl font-bold text-blue-300">
                  {caviteSummary.overallFatShare2022}%
                </span>
                <span className="text-xs text-primary-100 font-medium">
                  Cavite 2022 Provincial Share
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Tabs Navigation (WCAG 2.1 AA Tablist) */}
      <div className="border-b border-gray-200">
        <nav
          className="flex space-x-2 md:space-x-4 overflow-x-auto pb-px"
          role="tablist"
          aria-label="Political Dynasties Sections"
        >
          <button
            role="tab"
            id="tab-trece"
            aria-selected={activeTab === 'trece'}
            aria-controls="panel-trece"
            onClick={() => setActiveTab('trece')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-t-md ${
              activeTab === 'trece'
                ? 'border-primary-600 text-primary-700 bg-primary-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            Trece Martires Spotlight
          </button>

          <button
            role="tab"
            id="tab-cavite"
            aria-selected={activeTab === 'cavite'}
            aria-controls="panel-cavite"
            onClick={() => setActiveTab('cavite')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-t-md ${
              activeTab === 'cavite'
                ? 'border-primary-600 text-primary-700 bg-primary-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-4 h-4" aria-hidden="true" />
            Cavite Province Trends
          </button>

          <button
            role="tab"
            id="tab-clans"
            aria-selected={activeTab === 'clans'}
            aria-controls="panel-clans"
            onClick={() => setActiveTab('clans')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-t-md ${
              activeTab === 'clans'
                ? 'border-primary-600 text-primary-700 bg-primary-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4" aria-hidden="true" />
            Dynasty Clans Directory
          </button>

          <button
            role="tab"
            id="tab-explorer"
            aria-selected={activeTab === 'explorer'}
            aria-controls="panel-explorer"
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-t-md ${
              activeTab === 'explorer'
                ? 'border-primary-600 text-primary-700 bg-primary-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Interactive Data Explorer ({filteredRecords.length})
          </button>

          <button
            role="tab"
            id="tab-methodology"
            aria-selected={activeTab === 'methodology'}
            aria-controls="panel-methodology"
            onClick={() => setActiveTab('methodology')}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-t-md ${
              activeTab === 'methodology'
                ? 'border-primary-600 text-primary-700 bg-primary-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Methodology & Notes
          </button>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TRECE MARTIRES SPOTLIGHT */}
      {/* ========================================================================= */}
      {activeTab === 'trece' && (
        <div
          id="panel-trece"
          role="tabpanel"
          aria-labelledby="tab-trece"
          className="space-y-8"
        >
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                    Total Terms Tracked
                  </span>
                  <Award
                    className="w-5 h-5 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 text-2xl font-bold text-gray-900">
                  {treceSummary.totalRecords} seats
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Across 13 election cycles (1987–2022)
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                    Fat Dynasty Seats
                  </span>
                  <Users
                    className="w-5 h-5 text-amber-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 text-2xl font-bold text-amber-600">
                  {treceSummary.fatDynastyTerms} / {treceSummary.totalRecords}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {treceSummary.overallFatShare}% held concurrent family
                  positions
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                    Dominant Family Clans
                  </span>
                  <Landmark
                    className="w-5 h-5 text-primary-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 text-2xl font-bold text-gray-900">
                  Lubigan & De Sagun
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  38 combined elected terms in Trece
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-gray-500 tracking-wider">
                    Non-Fat / Sequential
                  </span>
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-2 text-2xl font-bold text-emerald-600">
                  {treceSummary.nonFatTerms} seats
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Solo or non-concurrent elected officials
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trece Martires Historical Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Trece Martires City Election Timeline (1988–2022)
                </h3>
                <p className="text-xs text-gray-500">
                  Historical progression of leadership, council composition, and
                  fat dynasty share per term
                </p>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
                10 Election Terms
              </span>
            </div>

            <div className="divide-y divide-gray-200">
              {treceSummary.timeline.map(item => (
                <div
                  key={item.year}
                  className="p-5 sm:p-6 hover:bg-gray-50/60 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center justify-center bg-primary-50 text-primary-800 rounded-xl p-3 border border-primary-200 w-16 h-16 shrink-0">
                        <Calendar
                          className="w-4 h-4 text-primary-600 mb-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-bold">{item.year}</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-gray-900 text-base">
                            {item.mayor
                              ? `Mayor ${item.mayor}`
                              : 'Mayor (Unspecified)'}
                          </span>
                          {item.viceMayor && (
                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded font-medium">
                              Vice Mayor: {item.viceMayor}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-gray-600 flex flex-wrap items-center gap-3">
                          <span>
                            <strong>{item.totalSeats}</strong> Total Elected
                            Positions
                          </span>
                          <span>•</span>
                          <span>
                            <strong>{item.councilorsCount}</strong> Councilors
                            Recorded
                          </span>
                        </div>

                        {/* Top clans active this year */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-xs text-gray-500 font-medium">
                            Key Clans:
                          </span>
                          {item.topClans.map(tc => (
                            <span
                              key={tc.clan}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                            >
                              {tc.clan} ({tc.count})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fat Dynasty Share Progress Bar */}
                    <div className="lg:w-64 shrink-0 bg-gray-50 p-3 rounded-lg border border-gray-200/80">
                      <div className="flex items-center justify-between text-xs font-semibold mb-1">
                        <span className="text-gray-600">Fat Dynasty Share</span>
                        <span
                          className={`font-bold ${
                            item.fatDynastyShare > 40
                              ? 'text-amber-700'
                              : item.fatDynastyShare > 20
                                ? 'text-blue-700'
                                : 'text-emerald-700'
                          }`}
                        >
                          {item.fatDynastyShare}% ({item.fatDynastySeats}/
                          {item.totalSeats})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            item.fatDynastyShare > 40
                              ? 'bg-amber-500'
                              : item.fatDynastyShare > 20
                                ? 'bg-primary-500'
                                : 'bg-emerald-500'
                          }`}
                          style={{
                            width: `${Math.min(item.fatDynastyShare, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trece Martires Prominent Dynastic Families */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" aria-hidden="true" />
              Prominent Political Clans in Trece Martires City
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {treceSummary.keyClans.map(clan => (
                <Card
                  key={clan.clan}
                  className="border-gray-200 shadow-sm hover:border-primary-300 transition-colors"
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-base font-bold text-gray-900">
                          {clan.clan} Family
                        </h4>
                        <p className="text-xs text-gray-500">
                          {clan.uniqueMembers} recorded elected family members
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        {clan.fatRatio}% Fat Dynasty
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <div>
                        <span className="text-gray-500 block">
                          Total Terms Won:
                        </span>
                        <span className="font-bold text-gray-800">
                          {clan.totalTerms} terms
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">
                          Years Active:
                        </span>
                        <span className="font-bold text-gray-800">
                          {clan.yearsActive.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-gray-600 block mb-1">
                        Elected Family Members:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {clan.membersList.map(member => (
                          <span
                            key={member}
                            className="inline-block text-xs bg-primary-50 text-primary-800 px-2 py-0.5 rounded border border-primary-100 font-medium"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CAVITE PROVINCE TRENDS */}
      {/* ========================================================================= */}
      {activeTab === 'cavite' && (
        <div
          id="panel-cavite"
          role="tabpanel"
          aria-labelledby="tab-cavite"
          className="space-y-8"
        >
          {/* 30-Year Trend Chart Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Cavite Province: 30-Year Fat Dynasty Trend (1992–2022)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Percentage of all elected positions held by members of fat
                    political dynasties across Cavite
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  +17.9% Growth Over 30 Years
                </span>
              </div>
            </div>

            {/* Visual Bar Chart (Responsive CSS Chart) */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-11 gap-1.5 sm:gap-2 items-end h-56 pt-6 pb-2 border-b border-gray-200">
                {caviteSummary.longitudinalTrends.map(item => {
                  const heightPercent = Math.round(
                    (item.provincialFatShare / 50) * 100
                  );
                  const isPeak = item.provincialFatShare >= 40;
                  return (
                    <div
                      key={item.year}
                      className="flex flex-col items-center justify-end h-full group relative"
                    >
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-9 bg-gray-900 text-white text-[10px] sm:text-xs font-semibold py-1 px-2 rounded shadow whitespace-nowrap z-20 pointer-events-none">
                        {item.year}: {item.provincialFatShare}%
                      </div>

                      {/* Bar Value */}
                      <span className="text-[10px] sm:text-xs font-bold text-gray-700 mb-1">
                        {item.provincialFatShare}%
                      </span>

                      {/* Bar */}
                      <div
                        className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 group-hover:brightness-110 ${
                          isPeak ? 'bg-amber-500' : 'bg-primary-600'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-Axis Labels */}
              <div className="grid grid-cols-11 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-xs font-semibold text-gray-600">
                {caviteSummary.longitudinalTrends.map(item => (
                  <span key={item.year}>{item.year}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                <span className="text-xs text-primary-700 font-semibold block">
                  1992 Baseline
                </span>
                <span className="text-xl font-bold text-primary-900">
                  23.1% Fat Dynasty
                </span>
                <p className="text-xs text-primary-700 mt-1">
                  Post-1987 Constitution initial baseline
                </p>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <span className="text-xs text-amber-700 font-semibold block">
                  2013 Peak
                </span>
                <span className="text-xl font-bold text-amber-900">
                  41.1% Fat Dynasty
                </span>
                <p className="text-xs text-amber-700 mt-1">
                  Highest recorded provincial concentration
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <span className="text-xs text-blue-700 font-semibold block">
                  2022 Latest Election
                </span>
                <span className="text-xl font-bold text-blue-900">
                  41.0% Fat Dynasty
                </span>
                <p className="text-xs text-blue-700 mt-1">
                  Over 4 out of 10 positions held by dynastic clans
                </p>
              </div>
            </div>
          </div>

          {/* LGU Comparison Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Cavite Municipalities & Cities Dynasty Ranking
                </h3>
                <p className="text-xs text-gray-500">
                  Comparison of Fat Dynasty share across all 23 local government
                  units + provincial positions
                </p>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Sorted by Dynasty Share
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <caption className="sr-only">
                  Cavite Municipalities Dynasty Comparison
                </caption>
                <thead className="bg-gray-100/75 text-xs uppercase font-bold text-gray-700 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      Rank / LGU
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Total Seats Tracked
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Fat Dynasty Seats
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Dynasty Share (%)
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Prominent Clans
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {caviteSummary.muniComparison.map((m, idx) => {
                    const isTrece = m.municipality === 'Trece Martires City';
                    return (
                      <tr
                        key={m.municipality}
                        className={`hover:bg-gray-50 transition-colors ${
                          isTrece ? 'bg-primary-50/70 font-semibold' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 font-mono w-5">
                              #{idx + 1}
                            </span>
                            <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                              {m.municipality}
                              {isTrece && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-600 text-white">
                                  Trece Martires
                                </span>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{m.totalSeats}</td>
                        <td className="py-3 px-4">{m.fatSeats}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{m.fatShare}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full ${
                                  m.fatShare > 40
                                    ? 'bg-amber-500'
                                    : 'bg-primary-600'
                                }`}
                                style={{
                                  width: `${Math.min(m.fatShare, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {m.topClans.map(tc => (
                              <span
                                key={tc.clan}
                                className="inline-block text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded border border-gray-200"
                              >
                                {tc.clan} ({tc.count})
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: DYNASTY CLANS DIRECTORY */}
      {/* ========================================================================= */}
      {activeTab === 'clans' && (
        <div
          id="panel-clans"
          role="tabpanel"
          aria-labelledby="tab-clans"
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="relative flex-1">
              <Search
                className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="text"
                value={clanSearch}
                onChange={e => setClanSearch(e.target.value)}
                placeholder="Search political clan or member name (e.g. Lubigan, Remulla, Revilla, De Sagun)..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setClanScope('all')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  clanScope === 'all'
                    ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Cavite Clans (
                {DYNASTY_SUMMARY.caviteSummary.topClans.length})
              </button>
              <button
                onClick={() => setClanScope('trece')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  clanScope === 'trece'
                    ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Trece Martires Clans (
                {DYNASTY_SUMMARY.treceSummary.keyClans.length})
              </button>
            </div>
          </div>

          {/* Clans Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedClans.map(clan => {
              const isExpanded = expandedClan === clan.clan;
              return (
                <Card
                  key={clan.clan}
                  className="border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {clan.clan} Clan
                        </h4>
                        <p className="text-xs text-gray-500">
                          {clan.uniqueMembers} distinct elected officials
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {clan.fatRatio}% Fat Ratio
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                      <div>
                        <span className="text-gray-500 block">
                          Total Terms Won:
                        </span>
                        <span className="font-bold text-gray-800">
                          {clan.totalTerms} terms
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">
                          Fat Dynasty Terms:
                        </span>
                        <span className="font-bold text-amber-700">
                          {clan.fatTerms} terms
                        </span>
                      </div>
                    </div>

                    {clan.municipalities && (
                      <div>
                        <span className="text-xs font-semibold text-gray-600 block mb-1">
                          Base LGUs:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {clan.municipalities.slice(0, 3).map(m => (
                            <span
                              key={m}
                              className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                            >
                              {m}
                            </span>
                          ))}
                          {clan.municipalities.length > 3 && (
                            <span className="text-[11px] text-gray-500 px-1 py-0.5">
                              +{clan.municipalities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-600">
                          Family Members ({clan.membersList.length}):
                        </span>
                        {clan.membersList.length > 4 && (
                          <button
                            onClick={() =>
                              setExpandedClan(isExpanded ? null : clan.clan)
                            }
                            className="text-xs text-primary-600 hover:text-primary-800 font-semibold flex items-center gap-0.5"
                          >
                            {isExpanded ? (
                              <>
                                Show Less <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                View All ({clan.membersList.length}){' '}
                                <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {(isExpanded
                          ? clan.membersList
                          : clan.membersList.slice(0, 4)
                        ).map(m => (
                          <span
                            key={m}
                            className="inline-block text-xs bg-primary-50 text-primary-800 px-2 py-0.5 rounded border border-primary-100 font-medium"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: INTERACTIVE DATA EXPLORER */}
      {/* ========================================================================= */}
      {activeTab === 'explorer' && (
        <div
          id="panel-explorer"
          role="tabpanel"
          aria-labelledby="tab-explorer"
          className="space-y-6"
        >
          {/* Filter Toolbar */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="relative flex-1">
                <Search
                  className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e =>
                    handleFilterChange(setSearchQuery, e.target.value)
                  }
                  placeholder="Search by politician name, clan, party, or municipality..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  Export CSV ({filteredRecords.length})
                </button>
              </div>
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-gray-100 text-xs">
              <div>
                <label
                  htmlFor="filter-muni"
                  className="block text-gray-600 font-semibold mb-1"
                >
                  Municipality / City
                </label>
                <select
                  id="filter-muni"
                  value={selectedMunicipality}
                  onChange={e =>
                    handleFilterChange(setSelectedMunicipality, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                >
                  <option value="all">
                    All Municipalities ({UNIQUE_MUNICIPALITIES.length})
                  </option>
                  {UNIQUE_MUNICIPALITIES.map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="filter-year"
                  className="block text-gray-600 font-semibold mb-1"
                >
                  Election Year
                </label>
                <select
                  id="filter-year"
                  value={selectedYear}
                  onChange={e =>
                    handleFilterChange(setSelectedYear, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                >
                  <option value="all">All Years (1987–2022)</option>
                  {UNIQUE_YEARS.map(yr => (
                    <option key={yr} value={yr.toString()}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="filter-pos"
                  className="block text-gray-600 font-semibold mb-1"
                >
                  Position
                </label>
                <select
                  id="filter-pos"
                  value={selectedPosition}
                  onChange={e =>
                    handleFilterChange(setSelectedPosition, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                >
                  <option value="all">All Positions</option>
                  {UNIQUE_POSITIONS.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="filter-dynasty"
                  className="block text-gray-600 font-semibold mb-1"
                >
                  Dynasty Status
                </label>
                <select
                  id="filter-dynasty"
                  value={selectedDynastyType}
                  onChange={e =>
                    handleFilterChange(setSelectedDynastyType, e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-primary-500 outline-none"
                >
                  <option value="all">All Records</option>
                  <option value="fat">Fat Dynasty Only (Concurrent)</option>
                  <option value="non-fat">Non-Fat / Sequential Only</option>
                </select>
              </div>
            </div>

            {/* Active Quick Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-gray-500">
              <div
                aria-live="polite"
                className="font-medium flex items-center gap-1.5"
              >
                Showing{' '}
                <strong className="text-gray-900">
                  {filteredRecords.length}
                </strong>{' '}
                of {CAVITE_DYNASTY_RECORDS.length} total records
              </div>

              {(selectedMunicipality !== 'all' ||
                selectedYear !== 'all' ||
                selectedPosition !== 'all' ||
                selectedDynastyType !== 'all' ||
                searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedMunicipality('all');
                    setSelectedYear('all');
                    setSelectedPosition('all');
                    setSelectedDynastyType('all');
                    setSelectedClanFilter('all');
                    setCurrentPage(1);
                  }}
                  className="text-primary-600 hover:text-primary-800 font-semibold underline"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>

          {/* Results Table & Mobile View */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Desktop / Tablet Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <caption className="sr-only">
                  Political Dynasty Search Results
                </caption>
                <thead className="bg-gray-100/80 text-xs uppercase font-bold text-gray-700 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="py-3.5 px-4">
                      Politician Name
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Family Clan
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Position
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Municipality
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Year
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Party
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Dynasty Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedRecords.length > 0 ? (
                    paginatedRecords.map(rec => (
                      <tr
                        key={rec.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-semibold text-gray-900">
                          {rec.fullName}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-800 font-medium border border-gray-200">
                            {rec.clan}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-800">
                          {rec.position}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`${
                              rec.municipality === 'Trece Martires City'
                                ? 'font-bold text-primary-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {rec.municipality}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-gray-600">
                          {rec.year}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-gray-500">
                          {rec.party}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              rec.isFatDynasty
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {rec.isFatDynasty ? 'Fat Dynasty' : 'Non-Fat'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-12 text-center text-gray-500 text-sm"
                      >
                        <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        No politicians match your active search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-gray-200">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map(rec => (
                  <div key={rec.id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">
                          {rec.fullName}
                        </h4>
                        <span className="text-xs text-gray-500">
                          Clan: {rec.clan}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          rec.isFatDynasty
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {rec.isFatDynasty ? 'Fat Dynasty' : 'Non-Fat'}
                      </span>
                    </div>

                    <div className="text-xs text-gray-600 grid grid-cols-2 gap-1 pt-1">
                      <div>
                        <span className="text-gray-400 block">Position:</span>
                        <span className="font-medium text-gray-800">
                          {rec.position}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Year:</span>
                        <span className="font-medium text-gray-800">
                          {rec.year}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">LGU:</span>
                        <span className="font-medium text-gray-800">
                          {rec.municipality}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Party:</span>
                        <span className="font-medium text-gray-800">
                          {rec.party}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-gray-500 text-sm">
                  <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  No politicians match your active search filters.
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  Page <strong className="text-gray-900">{currentPage}</strong>{' '}
                  of <strong className="text-gray-900">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded border border-gray-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 font-semibold"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage(prev => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded border border-gray-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 font-semibold"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: METHODOLOGY & RESEARCH NOTES */}
      {/* ========================================================================= */}
      {activeTab === 'methodology' && (
        <div
          id="panel-methodology"
          role="tabpanel"
          aria-labelledby="tab-methodology"
          className="space-y-6"
        >
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Academic Methodology & Research Background
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The dataset presented on this page originates from the{' '}
                  <strong>Ateneo Policy Center (APC)</strong> and the{' '}
                  <strong>Ateneo School of Government (ASOG)</strong>,
                  representing the most extensive empirical research portfolio
                  on political dynasties and local governance in the Republic of
                  the Philippines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-2">
                  <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    Definition: Fat Dynasty
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A <strong>Fat Dynasty</strong> is defined as a scenario
                    where two or more members of the same family or clan hold
                    elected office <em>concurrently (simultaneously)</em> within
                    the same province during the same election term (e.g. spouse
                    as Mayor while partner is Vice Mayor or sibling is
                    Councilor).
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-2">
                  <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    Definition: Sequential (Thin) Dynasty
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A <strong>Sequential (or Thin) Dynasty</strong> occurs when
                    family members succeed one another across consecutive terms
                    in the same position (e.g. parent serving terms followed by
                    a child or spouse), without holding multiple seats at the
                    exact same time.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-base font-bold text-gray-900">
                  Formula for Fat Dynasty Share
                </h4>
                <div className="p-4 bg-gray-100 rounded-lg font-mono text-xs text-gray-800 border border-gray-200">
                  Fat Dynasty Share (%) = (Number of Fat Dynastic Elected
                  Positions in LGU / Total Elected Positions in LGU) × 100
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-base font-bold text-gray-900">
                  Methodology Notes & Data Provenance
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600 leading-relaxed">
                  <li>
                    <strong>Name Tracing Method:</strong> Surnames and family
                    linkages are tracked across each province based on official
                    COMELEC local election results.
                  </li>
                  <li>
                    <strong>Consanguinity & Limitations:</strong> As noted by
                    Querubin (2016) and Mendoza et al. (2016), surname tracing
                    may not capture all maternal or intermarriage ties, making
                    the empirical estimate a conservative lower bound of dynasty
                    concentration.
                  </li>
                  <li>
                    <strong>Offices Tracked:</strong> Includes Provincial
                    Governors, Vice Governors, District Representatives, Board
                    Members, City/Municipal Mayors, Vice Mayors, and Councilors.
                    Excludes party-list representatives and barangay officials.
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                <span>
                  Source:{' '}
                  <em>
                    Ateneo Policy Center Philippine Political Dynasties Dataset
                    (2022 Update)
                  </em>
                </span>
                <span className="font-semibold text-primary-700">
                  Curated for BetterTrece Civic Transparency
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
