import React, { useState, useMemo } from 'react';
import {
  gaaSummary,
  topGaaProjects,
} from '../../data/transparency/gaaTransparencyData';
import gaaRecordsData from '../../data/transparency/gaa_records_compact.json';
import {
  Landmark,
  GraduationCap,
  HardHat,
  Search,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Info,
  Layers,
  TrendingUp,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

interface CompactRecord {
  id: number;
  y: number; // year
  d: string; // department
  a: string; // agency
  u: string | null; // operating_unit
  desc: string; // item_description
  exp: string | null; // expense_class
  obj: string | null; // expense_object
  amt: number; // amount_php
  sec: string; // sector
  uacs: string | null; // prexc_fpap_id
}

const records: CompactRecord[] = gaaRecordsData as unknown as CompactRecord[];

export const GaaBudgetWidget: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  // Navigation sub-tabs
  const [subTab, setSubTab] = useState<
    'explorer' | 'schools' | 'infrastructure' | 'overview'
  >('explorer');

  // Filter States for Explorer
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedExpense, setSelectedExpense] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<
    'amount-desc' | 'amount-asc' | 'year-desc' | 'year-asc'
  >('amount-desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  // Selected item modal / details
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  // Filter options derived from data
  const years = useMemo(() => [2026, 2025, 2024, 2023, 2022, 2021, 2020], []);
  const sectors = useMemo(
    () => [
      'All Sectors',
      'Basic Education (DepEd)',
      'Flood Control & River Mitigation (DPWH)',
      'Roads & Bridges (DPWH)',
      'School Buildings & Education Infra (DPWH)',
      'Community & Public Buildings (DPWH)',
      'Higher Education (SUCs / CvSU)',
    ],
    []
  );

  // Filtered and sorted records
  const filteredRecords = useMemo(() => {
    return records
      .filter(r => {
        // Year filter
        if (selectedYear !== 'all' && r.y !== parseInt(selectedYear, 10)) {
          return false;
        }
        // Sector filter
        if (selectedSector !== 'all' && r.sec !== selectedSector) {
          return false;
        }
        // Expense Class filter
        if (selectedExpense !== 'all') {
          if (selectedExpense === 'None' && r.exp !== null) return false;
          if (selectedExpense !== 'None' && r.exp !== selectedExpense)
            return false;
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchDesc = r.desc?.toLowerCase().includes(q);
          const matchUnit = r.u?.toLowerCase().includes(q);
          const matchObj = r.obj?.toLowerCase().includes(q);
          const matchDept = r.d?.toLowerCase().includes(q);
          const matchUacs = r.uacs?.toLowerCase().includes(q);
          if (
            !matchDesc &&
            !matchUnit &&
            !matchObj &&
            !matchDept &&
            !matchUacs
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'amount-desc') return b.amt - a.amt;
        if (sortBy === 'amount-asc') return a.amt - b.amt;
        if (sortBy === 'year-desc') return b.y - a.y || b.amt - a.amt;
        if (sortBy === 'year-asc') return a.y - b.y || b.amt - a.amt;
        return 0;
      });
  }, [selectedYear, selectedSector, selectedExpense, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / itemsPerPage)
  );
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  // Responsive Pagination Range
  const paginationRange = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const siblingCount = 1;
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      const leftCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightCount },
        (_, i) => totalPages - rightCount + i + 1
      );
      return [1, '...', ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: rightSibling - leftSibling + 1 },
        (_, i) => leftSibling + i
      );
      return [1, '...', ...middleRange, '...', totalPages];
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages, currentPage]);

  const filteredTotalAmount = useMemo(() => {
    return filteredRecords.reduce((sum, r) => sum + r.amt, 0);
  }, [filteredRecords]);

  // Reset page when filter changes
  const handleFilterChange = <T,>(setter: (val: T) => void, val: T) => {
    setter(val);
    setCurrentPage(1);
  };

  // Helper formatter
  const formatCurrency = (val: number) => {
    if (val >= 1000000000) {
      return `₱${(val / 1000000000).toFixed(2)}B`;
    }
    if (val >= 1000000) {
      return `₱${(val / 1000000).toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `₱${(val / 1000).toFixed(2)}K`;
    }
    return `₱${val.toLocaleString()}`;
  };

  const getSectorBadge = (sec: string) => {
    if (sec.includes('Education')) {
      return 'bg-blue-50 text-[#00225e] border-blue-200';
    }
    if (sec.includes('Flood')) {
      return 'bg-cyan-50 text-cyan-900 border-cyan-200';
    }
    if (sec.includes('Roads')) {
      return 'bg-emerald-50 text-emerald-900 border-emerald-200';
    }
    if (sec.includes('Higher Education')) {
      return 'bg-indigo-50 text-indigo-900 border-indigo-200';
    }
    return 'bg-amber-50 text-amber-900 border-amber-200';
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* 1. Header & Hero Metric Cards */}
      <div className="bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-blue-900/40 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/15 pb-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                National <span className="text-amber-300">Budget</span>{' '}
                Allocations for Trece Martires City
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 max-w-3xl leading-relaxed">
                Curated from the BetterGov Hugging Face GAA dataset (
                <code className="bg-white/15 px-1.5 py-0.5 rounded text-white font-mono text-xs">
                  bettergovph/gaa
                </code>
                ). Complete line-item transparency of national appropriations
                enacted for public schools, national agencies, and DPWH
                infrastructure in Trece Martires City (FY 2020–2026).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="/src/data/transparency/trece_martires_gaa_2020_2026.csv"
                download="trece_martires_gaa_2020_2026.csv"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#00225e] text-xs font-bold hover:bg-blue-50 transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Download Trece Martires GAA Dataset as CSV"
              >
                <FileSpreadsheet
                  className="w-4 h-4 text-[#00225e]"
                  aria-hidden="true"
                />
                <span>Download CSV</span>
              </a>
              <a
                href="/src/data/transparency/trece_martires_gaa_2020_2026.json"
                download="trece_martires_gaa_2020_2026.json"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Download Trece Martires GAA Dataset as JSON"
              >
                <Download
                  className="w-4 h-4 text-blue-200"
                  aria-hidden="true"
                />
                <span>Download JSON</span>
              </a>
            </div>
          </div>

          {/* 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* KPI 1: Grand Total */}
            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-blue-400/20 hover:border-blue-400/40 transition-all text-white">
              <div className="flex items-center justify-between text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Grand Total (2020–2026)</span>
                <TrendingUp
                  className="w-4 h-4 text-amber-300"
                  aria-hidden="true"
                />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                <AnimatedCounter
                  value={gaaSummary.grand_total_php / 1000000000}
                  prefix="₱"
                  suffix="B"
                  decimals={3}
                />
              </div>
              <div className="text-xs text-blue-200/80 mt-1 font-mono">
                {gaaSummary.grand_total_formatted}
              </div>
            </div>

            {/* KPI 2: DPWH Infrastructure */}
            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-blue-400/20 hover:border-blue-400/40 transition-all text-white">
              <div className="flex items-center justify-between text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>DPWH Infrastructure</span>
                <HardHat
                  className="w-4 h-4 text-amber-300"
                  aria-hidden="true"
                />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                <AnimatedCounter
                  value={
                    gaaSummary.totals_by_department[
                      'Department of Public Works and Highways (DPWH)'
                    ]?.total_php / 1000000000 || 4.05
                  }
                  prefix="₱"
                  suffix="B"
                  decimals={2}
                />
              </div>
              <div className="text-xs text-blue-200/80 mt-1">
                793 Project Line Items (Flood &amp; Roads)
              </div>
            </div>

            {/* KPI 3: DepEd Public High Schools */}
            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-blue-400/20 hover:border-blue-400/40 transition-all text-white">
              <div className="flex items-center justify-between text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>DepEd Public Schools</span>
                <GraduationCap
                  className="w-4 h-4 text-amber-300"
                  aria-hidden="true"
                />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                <AnimatedCounter
                  value={
                    gaaSummary.totals_by_department[
                      'Department of Education (DepEd)'
                    ]?.total_php / 1000000000 || 2.01
                  }
                  prefix="₱"
                  suffix="B"
                  decimals={2}
                />
              </div>
              <div className="text-xs text-blue-200/80 mt-1">
                6 High Schools (Salaries &amp; MOOE)
              </div>
            </div>

            {/* KPI 4: Total Records */}
            <div className="bg-gradient-to-br from-[#001438]/80 to-[#00225e]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-blue-400/20 hover:border-blue-400/40 transition-all text-white">
              <div className="flex items-center justify-between text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Line-Item Records</span>
                <Layers className="w-4 h-4 text-amber-300" aria-hidden="true" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                <AnimatedCounter
                  value={gaaSummary.total_records}
                  decimals={0}
                />
              </div>
              <div className="text-xs text-blue-200/80 mt-1">
                7 Fiscal Years (UACS Classified)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-zinc-200 shadow-2xs flex flex-wrap gap-2">
        <button
          type="button"
          role="tab"
          id="subtab-explorer"
          aria-selected={subTab === 'explorer'}
          aria-controls="subpanel-explorer"
          onClick={() => setSubTab('explorer')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
            subTab === 'explorer'
              ? 'bg-[#003893] text-white shadow-2xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Search
            className={`w-4 h-4 ${subTab === 'explorer' ? 'text-blue-200' : 'text-zinc-400'}`}
            aria-hidden="true"
          />
          <span>Line-Item Explorer ({filteredRecords.length})</span>
        </button>

        <button
          type="button"
          role="tab"
          id="subtab-schools"
          aria-selected={subTab === 'schools'}
          aria-controls="subpanel-schools"
          onClick={() => setSubTab('schools')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
            subTab === 'schools'
              ? 'bg-[#003893] text-white shadow-2xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <GraduationCap
            className={`w-4 h-4 ${subTab === 'schools' ? 'text-blue-200' : 'text-zinc-400'}`}
            aria-hidden="true"
          />
          <span>Public High Schools (6 Schools)</span>
        </button>

        <button
          type="button"
          role="tab"
          id="subtab-infrastructure"
          aria-selected={subTab === 'infrastructure'}
          aria-controls="subpanel-infrastructure"
          onClick={() => setSubTab('infrastructure')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
            subTab === 'infrastructure'
              ? 'bg-[#003893] text-white shadow-2xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <HardHat
            className={`w-4 h-4 ${subTab === 'infrastructure' ? 'text-blue-200' : 'text-zinc-400'}`}
            aria-hidden="true"
          />
          <span>DPWH Infrastructure Highlights</span>
        </button>

        <button
          type="button"
          role="tab"
          id="subtab-overview"
          aria-selected={subTab === 'overview'}
          aria-controls="subpanel-overview"
          onClick={() => setSubTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
            subTab === 'overview'
              ? 'bg-[#003893] text-white shadow-2xs'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Calendar
            className={`w-4 h-4 ${subTab === 'overview' ? 'text-blue-200' : 'text-zinc-400'}`}
            aria-hidden="true"
          />
          <span>Yearly Trends (2020–2026)</span>
        </button>
      </div>

      {/* 3. SUBTAB CONTENT */}

      {/* SUBTAB 1: Line-Item Explorer */}
      {subTab === 'explorer' && (
        <div
          id="subpanel-explorer"
          role="tabpanel"
          aria-labelledby="subtab-explorer"
          className="space-y-6 animate-fadeIn"
        >
          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-grow max-w-xl">
                <label htmlFor="gaa-search" className="sr-only">
                  Search GAA line-items
                </label>
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" aria-hidden="true" />
                </div>
                <input
                  id="gaa-search"
                  type="search"
                  value={searchQuery}
                  onChange={e =>
                    handleFilterChange(setSearchQuery, e.target.value)
                  }
                  placeholder="Search project, school, barangay, salary item, or UACS code..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003893] focus:ring-2 focus:ring-[#003893]/20 focus-visible:outline-hidden"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <label
                  htmlFor="gaa-sort"
                  className="text-xs font-bold text-slate-600"
                >
                  Sort by:
                </label>
                <select
                  id="gaa-sort"
                  value={sortBy}
                  onChange={e =>
                    handleFilterChange(
                      setSortBy,
                      e.target.value as
                        'amount-desc' | 'amount-asc' | 'year-desc' | 'year-asc'
                    )
                  }
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white focus:border-[#003893] focus:ring-2 focus:ring-[#003893]/20 focus-visible:outline-hidden"
                >
                  <option value="amount-desc">Amount: Highest to Lowest</option>
                  <option value="amount-asc">Amount: Lowest to Highest</option>
                  <option value="year-desc">Year: Newest (2026) First</option>
                  <option value="year-asc">Year: Oldest (2020) First</option>
                </select>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              {/* Year Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  Fiscal Year:
                </span>
                <button
                  type="button"
                  onClick={() => handleFilterChange(setSelectedYear, 'all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedYear === 'all'
                      ? 'bg-[#00225e] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Years (2020–2026)
                </button>
                {years.map(yr => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() =>
                      handleFilterChange(setSelectedYear, yr.toString())
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedYear === yr.toString()
                        ? 'bg-[#00225e] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    FY {yr}
                  </button>
                ))}
              </div>

              {/* Sector Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
                  Sector:
                </span>
                {sectors.map(sec => {
                  const val = sec === 'All Sectors' ? 'all' : sec;
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => handleFilterChange(setSelectedSector, val)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedSector === val
                          ? 'bg-[#0a4d3c] text-white font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {sec}
                    </button>
                  );
                })}
              </div>

              {/* Expense Class Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  Expense Class:
                </span>
                {[
                  { label: 'All Expenses', value: 'all' },
                  {
                    label: 'Personnel Services (PS)',
                    value: 'Personnel Services',
                  },
                  {
                    label: 'MOOE',
                    value: 'Maintenance and Other Operating Expenses',
                  },
                  { label: 'Capital Outlays (CO)', value: 'Capital Outlays' },
                ].map(expItem => (
                  <button
                    key={expItem.value}
                    type="button"
                    onClick={() =>
                      handleFilterChange(setSelectedExpense, expItem.value)
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedExpense === expItem.value
                        ? 'bg-blue-900 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {expItem.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count & sum banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div>
                Showing{' '}
                <strong className="text-slate-900">
                  {filteredRecords.length}
                </strong>{' '}
                matching records
                {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
              </div>
              <div className="font-bold text-slate-800">
                Filtered Total:{' '}
                <span className="text-[#00225e] font-mono text-sm">
                  ₱
                  {filteredTotalAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Records Table / Cards */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table
                className="w-full text-left border-collapse"
                aria-label="GAA Line-Item Budget Table"
              >
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="py-3.5 px-4">
                      Year
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Sector / Dept
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Project / Activity / School
                    </th>
                    <th scope="col" className="py-3.5 px-4">
                      Expense Object
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-right">
                      Amount (PHP)
                    </th>
                    <th scope="col" className="py-3.5 px-4 text-center">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                  {paginatedRecords.map(item => {
                    const isExpanded = expandedRowId === item.id;
                    return (
                      <React.Fragment key={item.id}>
                        <tr
                          className={`hover:bg-blue-50/40 transition-colors ${isExpanded ? 'bg-blue-50/60' : ''}`}
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                              {item.y}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getSectorBadge(item.sec)}`}
                            >
                              {item.sec}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 max-w-md">
                            <div className="font-semibold text-slate-900 leading-snug">
                              {item.desc}
                            </div>
                            {item.u && (
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                Unit: {item.u}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-700 font-medium">
                              {item.obj ||
                                item.exp ||
                                'Capital Outlays / Project'}
                            </div>
                            {item.exp && (
                              <div className="text-[10px] text-slate-400 font-mono">
                                {item.exp}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                            {item.amt > 0 ? (
                              <span className="text-[#00225e]">
                                ₱
                                {item.amt.toLocaleString('en-US', {
                                  minimumFractionDigits: 2,
                                })}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-sans italic text-[11px]">
                                Included in sub-items
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedRowId(isExpanded ? null : item.id)
                              }
                              aria-expanded={isExpanded}
                              aria-label={`Toggle details for ${item.desc}`}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893]"
                            >
                              {isExpanded ? (
                                <ChevronUp
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ChevronDown
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Details Drawer */}
                        {isExpanded && (
                          <tr className="bg-slate-50/80">
                            <td
                              colSpan={6}
                              className="p-4 sm:p-6 border-b border-blue-100"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200">
                                  <span className="font-bold text-slate-500 uppercase text-[10px]">
                                    Department &amp; Agency
                                  </span>
                                  <div className="font-semibold text-slate-900">
                                    {item.d}
                                  </div>
                                  <div className="text-slate-600">{item.a}</div>
                                </div>
                                <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200">
                                  <span className="font-bold text-slate-500 uppercase text-[10px]">
                                    UACS Classification
                                  </span>
                                  <div className="font-mono text-slate-800">
                                    PREXC FPAP ID: {item.uacs || 'N/A'}
                                  </div>
                                  <div className="text-slate-600">
                                    Operating Unit:{' '}
                                    {item.u || 'National Office'}
                                  </div>
                                </div>
                                <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200">
                                  <span className="font-bold text-slate-500 uppercase text-[10px]">
                                    Appropriation Amount
                                  </span>
                                  <div className="text-base font-black text-[#00225e] font-mono">
                                    ₱
                                    {item.amt.toLocaleString('en-US', {
                                      minimumFractionDigits: 2,
                                    })}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    {formatCurrency(item.amt)} &bull; Fiscal
                                    Year {item.y}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {paginatedRecords.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 text-center text-slate-500 text-sm"
                      >
                        No GAA records found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Responsive Pagination Controls Bar */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              {/* Left Summary & Per-Page Controls */}
              <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
                <div>
                  Showing{' '}
                  <strong className="text-slate-900 font-extrabold font-mono">
                    {filteredRecords.length === 0
                      ? 0
                      : (currentPage - 1) * itemsPerPage + 1}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-slate-900 font-extrabold font-mono">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredRecords.length
                    )}
                  </strong>{' '}
                  of{' '}
                  <strong className="text-slate-900 font-extrabold font-mono">
                    {filteredRecords.length.toLocaleString()}
                  </strong>{' '}
                  line items
                </div>

                <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
                  <label
                    htmlFor="gaa-page-size"
                    className="text-slate-500 font-medium"
                  >
                    Per page:
                  </label>
                  <select
                    id="gaa-page-size"
                    value={itemsPerPage}
                    onChange={e => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003893] cursor-pointer min-h-[32px]"
                  >
                    <option value={15}>15 / page</option>
                    <option value={25}>25 / page</option>
                    <option value={50}>50 / page</option>
                    <option value={100}>100 / page</option>
                  </select>
                </div>
              </div>

              {/* Right Side: Responsive Page Number Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full md:w-auto flex-wrap">
                  {/* First Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    aria-label="Go to first page"
                    className="hidden sm:inline-flex items-center justify-center px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[34px]"
                  >
                    First
                  </button>

                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[34px]"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    <span>Prev</span>
                  </button>

                  {/* Mobile Compact Page Badge */}
                  <div className="sm:hidden px-3 py-1.5 text-xs font-bold text-slate-900 bg-white rounded-xl border border-slate-200 font-mono">
                    Page {currentPage} of {totalPages}
                  </div>

                  {/* Desktop / Tablet Numbered Buttons with Ellipses */}
                  <div className="hidden sm:flex items-center gap-1 font-mono">
                    {paginationRange.map((item, idx) => {
                      if (item === '...') {
                        return (
                          <span
                            key={`dots-${idx}`}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold text-xs"
                            aria-hidden="true"
                          >
                            &hellip;
                          </span>
                        );
                      }
                      const pageNum = item as number;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          aria-label={`Page ${pageNum}`}
                          aria-current={isActive ? 'page' : undefined}
                          className={`w-8 sm:w-9 h-8 sm:h-9 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
                            isActive
                              ? 'bg-[#00225e] text-white shadow-xs'
                              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(p => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[34px]"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  {/* Last Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to last page"
                    className="hidden sm:inline-flex items-center justify-center px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[34px]"
                  >
                    Last
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Public High Schools */}
      {subTab === 'schools' && (
        <div
          id="subpanel-schools"
          role="tabpanel"
          aria-labelledby="subtab-schools"
          className="space-y-6 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                Department of Education (DepEd) &bull; Division of Cavite
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                National Public High Schools Operating in Trece Martires City
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                National funding appropriations for Personnel Services
                (teachers&apos; basic salaries, bonuses, hazard pay, PhilHealth,
                Pag-IBIG, RLIP) and Maintenance and Other Operating Expenses
                (MOOE) across the 6 public high schools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(gaaSummary.schools_breakdown).map(
                ([schoolName, data]) => (
                  <div
                    key={schoolName}
                    className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">
                          DepEd High School
                        </span>
                        <span className="text-xs font-mono text-slate-500 font-semibold">
                          {data.record_count} Line Items
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {schoolName}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Located in Trece Martires City, Cavite under DepEd
                        Region IV-A.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        Total Budget (2020–2026):
                      </div>
                      <div className="text-sm sm:text-base font-black text-[#00225e] font-mono">
                        {data.total_formatted}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Infrastructure Highlights */}
      {subTab === 'infrastructure' && (
        <div
          id="subpanel-infrastructure"
          role="tabpanel"
          aria-labelledby="subtab-infrastructure"
          className="space-y-6 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                DPWH &amp; National Infrastructure Public Works
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Major National Infrastructure Projects in Trece Martires City
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Key flood mitigation dikes, river revetments, arterial bypass
                roads, and multi-storey public school buildings funded through
                the National Budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topGaaProjects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-900 text-white font-mono">
                        FY {proj.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-900">
                        {proj.sector}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">
                      {proj.department}
                    </span>
                    <span className="text-base font-black text-[#00225e] font-mono">
                      {proj.amount_formatted}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cross-Link Card to DPWH Contract Implementation Tracker */}
            <div className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] rounded-2xl p-5 sm:p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10 shadow-md">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200">
                  <HardHat
                    className="w-4 h-4 text-blue-300"
                    aria-hidden="true"
                  />
                  <span>
                    Cross-Reference: Implementation &amp; Contract Tracker
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  Track Awarded Contractors, Physical Progress % &amp; On-Site
                  Construction
                </h4>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  While GAA represents legislative budget authorization, you can
                  monitor contractor awards, physical completion %, and
                  disbursement records for these projects on the DPWH
                  Infrastructure Tracker.
                  <br />
                  <span className="text-[11px] text-blue-200 font-mono">
                    Source: DPWH Transparency Portal (transparency.dpwh.gov.ph)
                  </span>
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="/transparency?tab=explorer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#00225e] text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
                >
                  <HardHat
                    className="w-4 h-4 text-[#003893]"
                    aria-hidden="true"
                  />
                  <span>Open DPWH Tracker</span>
                  <ChevronRight
                    className="w-4 h-4 text-slate-400"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: Yearly Overview & Trends */}
      {subTab === 'overview' && (
        <div
          id="subpanel-overview"
          role="tabpanel"
          aria-labelledby="subtab-overview"
          className="space-y-6 animate-fadeIn"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="max-w-3xl space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200">
                Annual Appropriations Comparison
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                GAA Budget Trends (FY 2020 – FY 2026)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Year-over-year progression of national funding appropriations
                allocated specifically for Trece Martires City, Cavite.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(gaaSummary.totals_by_year).map(([year, data]) => (
                <div
                  key={year}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-slate-900">
                        FY {year}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        {data.record_count} items
                      </span>
                    </div>
                    <div className="text-xl font-black text-[#00225e] font-mono pt-1">
                      {formatCurrency(data.total_php)}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono border-t border-slate-200 pt-2">
                    {data.total_formatted}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Official Sources, Open Data Citations & Disclaimer */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Info
            className="w-5 h-5 text-amber-400 shrink-0"
            aria-hidden="true"
          />
          <h4 className="text-base sm:text-lg font-bold text-white">
            Official Data Sources, Methodology &amp; Civic Disclaimer
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <h5 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2
                className="w-4 h-4 text-emerald-400"
                aria-hidden="true"
              />
              <span>Data Source: BetterGov Hugging Face Datasets</span>
            </h5>
            <p>
              Data curated and extracted directly from the{' '}
              <strong>
                BetterGov Philippine General Appropriations Act (GAA)
              </strong>{' '}
              dataset on Hugging Face at{' '}
              <a
                href="https://huggingface.co/datasets/bettergovph/gaa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 underline font-mono font-bold inline-flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded"
              >
                <span>bettergovph/gaa</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              . This open dataset standardizes 3.7+ million line-items across
              the 2020–2026 GAA published by the Department of Budget and
              Management (DBM) using the Unified Accounts Code Structure (UACS).
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span>National vs. Local Appropriations</span>
            </h5>
            <p>
              The GAA records in this portal represent{' '}
              <strong>National Government appropriations</strong> enacted by
              Congress and the President for national agency operations (DepEd
              High Schools, DPWH Infrastructure, Cavite State University). For
              Trece Martires City&apos;s locally generated revenues, internal
              taxes, and municipal LGU budgets, consult the{' '}
              <strong>City Revenue &amp; Budget (DBM/BLGF)</strong> and{' '}
              <strong>COA Annual Audit Report</strong> tabs.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            Open data published for non-partisan transparency, educational
            awareness, and civic participation.
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="https://huggingface.co/datasets/bettergovph/gaa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-white underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Hugging Face Dataset</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <span className="text-slate-600">&bull;</span>
            <a
              href="https://www.dbm.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline inline-flex items-center gap-1"
            >
              <span>DBM Official Website</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaaBudgetWidget;
