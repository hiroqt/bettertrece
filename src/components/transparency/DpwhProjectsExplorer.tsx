import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import type { DPWHProject } from '../../types/dpwh';
import {
  ALL_DPWH_PROJECTS,
  DPWH_CATEGORIES,
  DPWH_STATUSES,
  DPWH_YEARS,
  TRECE_BARANGAYS_FILTER,
  getDpwhSummaryStats,
  DpwhProject,
} from '../../data/transparency/dpwhTransparency';
import DpwhStatsOverview from './DpwhStatsOverview';
import DpwhProjectModal from './DpwhProjectModal';
import DpwhMapVisualizer from './DpwhMapVisualizer';
import DpwhAnalyticsCards from './DpwhAnalyticsCards';
import {
  Search,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building2,
  MapPin,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  HardHat,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  SlidersHorizontal,
  X,
  Layers,
  Activity,
  CalendarDays,
  ChevronDown,
  RotateCcw,
  Landmark,
  PieChart,
  Map as MapIcon,
} from 'lucide-react';

export default function DpwhProjectsExplorer() {
  const [projects] = useState<DpwhProject[]>(ALL_DPWH_PROJECTS);

  // Sub-view Tab: 'directory' | 'map' | 'analytics'
  const [activeExplorerTab, setActiveExplorerTab] = useState<
    'directory' | 'map' | 'analytics'
  >('directory');

  // View mode - Table (Default) or Grid
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Pagination state (default: 10 per page)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Filters state - Trece Martires Barangays & Categories
  const [selectedSource, setSelectedSource] = useState<'all' | 'dpwh' | 'gaa'>(
    'all'
  );
  const [selectedBarangay, setSelectedBarangay] =
    useState<string>('All 13 Barangays');
  const [selectedCategory, setSelectedCategory] =
    useState<string>('All Categories');
  const [selectedStatus, setSelectedStatus] = useState<string>('All Statuses');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting
  const [sortBy, setSortBy] = useState<
    'budget' | 'progress' | 'year' | 'id' | 'barangay'
  >('budget');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal inspection
  const [activeProject, setActiveProject] = useState<
    DPWHProject | DpwhProject | null
  >(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Search input ref for keyboard shortcut focus
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        document.activeElement?.tagName !== 'SELECT'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyContractId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Dynamic counts for dropdown categories, sources, and statuses
  const sourceCounts = useMemo(() => {
    return {
      all: projects.length,
      dpwh: projects.filter(p => !p.contractId.startsWith('GAA-')).length,
      gaa: projects.filter(p => p.contractId.startsWith('GAA-')).length,
    };
  }, [projects]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'All Categories': projects.length,
    };
    DPWH_CATEGORIES.forEach(cat => {
      if (cat !== 'All Categories') {
        counts[cat] = projects.filter(
          p => p.category === cat || p.category.includes(cat)
        ).length;
      }
    });
    return counts;
  }, [projects]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Statuses': projects.length };
    DPWH_STATUSES.forEach(st => {
      if (st !== 'All Statuses') {
        counts[st] = projects.filter(p =>
          p.status.toLowerCase().includes(st.toLowerCase())
        ).length;
      }
    });
    return counts;
  }, [projects]);

  const yearCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Years': projects.length };
    DPWH_YEARS.forEach(yr => {
      if (yr !== 'All Years') {
        counts[yr] = projects.filter(p => p.infraYear === yr).length;
      }
    });
    return counts;
  }, [projects]);

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        // Data Source Filter
        if (
          selectedSource === 'dpwh' &&
          project.contractId.startsWith('GAA-')
        ) {
          return false;
        }
        if (
          selectedSource === 'gaa' &&
          !project.contractId.startsWith('GAA-')
        ) {
          return false;
        }

        // Barangay Filter
        if (selectedBarangay !== 'All 13 Barangays') {
          if (
            project.location.barangay.toLowerCase() !==
              selectedBarangay.toLowerCase() &&
            !project.description
              .toLowerCase()
              .includes(selectedBarangay.toLowerCase())
          ) {
            return false;
          }
        }

        // Category Filter
        if (
          selectedCategory !== 'All Categories' &&
          project.category !== selectedCategory &&
          !project.category.includes(selectedCategory)
        ) {
          return false;
        }

        // Status Filter
        if (selectedStatus !== 'All Statuses') {
          if (
            !project.status.toLowerCase().includes(selectedStatus.toLowerCase())
          ) {
            return false;
          }
        }

        // Year Filter
        if (
          selectedYear !== 'All Years' &&
          project.infraYear !== selectedYear
        ) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matches =
            project.contractId.toLowerCase().includes(q) ||
            project.description.toLowerCase().includes(q) ||
            project.contractor.toLowerCase().includes(q) ||
            project.location.barangay.toLowerCase().includes(q) ||
            project.sourceOfFunds.toLowerCase().includes(q);
          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortBy === 'budget') {
          diff = (a.budget || 0) - (b.budget || 0);
        } else if (sortBy === 'progress') {
          diff = (a.progress || 0) - (b.progress || 0);
        } else if (sortBy === 'year') {
          diff = parseInt(a.infraYear || '0') - parseInt(b.infraYear || '0');
        } else if (sortBy === 'id') {
          diff = a.contractId.localeCompare(b.contractId);
        } else if (sortBy === 'barangay') {
          diff = a.location.barangay.localeCompare(b.location.barangay);
        }
        return sortOrder === 'asc' ? diff : -diff;
      });
  }, [
    projects,
    selectedSource,
    selectedBarangay,
    selectedCategory,
    selectedStatus,
    selectedYear,
    searchQuery,
    sortBy,
    sortOrder,
  ]);

  const summaryStats = useMemo(() => {
    return getDpwhSummaryStats(filteredProjects);
  }, [filteredProjects]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProjects = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, safePage, pageSize]);

  // Generate responsive pagination range with ellipses
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

  const updateFilter = <T,>(setter: (val: T) => void, val: T) => {
    setter(val);
    setCurrentPage(1);
  };

  const toggleSort = (
    field: 'budget' | 'progress' | 'year' | 'id' | 'barangay'
  ) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getSortAria = (
    field: 'budget' | 'progress' | 'year' | 'id' | 'barangay'
  ) => {
    if (sortBy !== field) return 'none';
    return sortOrder === 'asc' ? 'ascending' : 'descending';
  };

  const formatPHP = (val: number) => {
    return `₱${val.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatCompactPHP = (val: number) => {
    if (val >= 1_000_000) {
      return `₱${(val / 1_000_000).toFixed(2)}M`;
    }
    return `₱${val.toLocaleString()}`;
  };

  const resetFilters = () => {
    setSelectedBarangay('All 13 Barangays');
    setSelectedCategory('All Categories');
    setSelectedStatus('All Statuses');
    setSelectedYear('All Years');
    setSearchQuery('');
  };

  const isFiltered =
    selectedBarangay !== 'All 13 Barangays' ||
    selectedCategory !== 'All Categories' ||
    selectedStatus !== 'All Statuses' ||
    selectedYear !== 'All Years' ||
    Boolean(searchQuery.trim());

  const activeFiltersList = useMemo(() => {
    const list: { label: string; value: string; onClear: () => void }[] = [];
    if (selectedBarangay !== 'All 13 Barangays') {
      list.push({
        label: 'Barangay',
        value: selectedBarangay,
        onClear: () => setSelectedBarangay('All 13 Barangays'),
      });
    }
    if (selectedCategory !== 'All Categories') {
      list.push({
        label: 'Category',
        value: selectedCategory,
        onClear: () => setSelectedCategory('All Categories'),
      });
    }
    if (selectedStatus !== 'All Statuses') {
      list.push({
        label: 'Status',
        value: selectedStatus,
        onClear: () => setSelectedStatus('All Statuses'),
      });
    }
    if (selectedYear !== 'All Years') {
      list.push({
        label: 'Year',
        value: selectedYear,
        onClear: () => setSelectedYear('All Years'),
      });
    }
    if (searchQuery.trim()) {
      list.push({
        label: 'Search',
        value: `"${searchQuery}"`,
        onClear: () => setSearchQuery(''),
      });
    }
    return list;
  }, [
    selectedBarangay,
    selectedCategory,
    selectedStatus,
    selectedYear,
    searchQuery,
  ]);

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('complete')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2
            className="w-3.5 h-3.5 text-emerald-700"
            aria-hidden="true"
          />
          <span>Completed</span>
        </span>
      );
    }
    if (s.includes('on-going') || s.includes('ongoing')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <AlertCircle
            className="w-3.5 h-3.5 text-amber-700 animate-pulse"
            aria-hidden="true"
          />
          <span>On-Going</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900 border border-red-300">
        <XCircle className="w-3.5 h-3.5 text-red-700" aria-hidden="true" />
        <span>{status}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* KPI Overview Cards */}
      <DpwhStatsOverview
        stats={summaryStats}
        currentFilter={selectedBarangay}
      />

      {/* Main View Mode Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveExplorerTab('directory')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#003893] ${
              activeExplorerTab === 'directory'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>Projects Directory ({filteredProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveExplorerTab('map')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#003893] ${
              activeExplorerTab === 'map'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <MapIcon className="w-4 h-4" />
            <span>Interactive Project Map</span>
          </button>

          <button
            onClick={() => setActiveExplorerTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#003893] ${
              activeExplorerTab === 'analytics'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Budget &amp; Sector Analytics</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: PROJECTS DIRECTORY & FILTERS */}
      {activeExplorerTab === 'directory' && (
        <div className="space-y-6 animate-fadeIn">
          {/* GAA National Budget Integration Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] rounded-3xl p-5 sm:p-7 text-white shadow-md border border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
            <div className="space-y-2 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-blue-200 border border-white/20">
                <Landmark
                  className="w-3.5 h-3.5 text-blue-300"
                  aria-hidden="true"
                />
                <span>
                  Source: BetterGov Hugging Face Datasets (bettergovph/gaa)
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                ₱4.05B in National DPWH Appropriations for Trece Martires (GAA
                2020–2026)
              </h3>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                While this tracker monitors local contract execution and
                physical progress, Congress enacted{' '}
                <strong>793 national budget line items</strong> for Trece
                Martires flood control revetments (Cañas &amp; Timalan rivers),
                road bypass networks, and school facilities in the General
                Appropriations Act.
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <Link
                to="/transparency?tab=gaa"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#00225e] hover:bg-blue-50 text-xs font-bold transition-all shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <Landmark
                  className="w-4 h-4 text-[#003893]"
                  aria-hidden="true"
                />
                <span>View National GAA Budget</span>
                <ChevronRight
                  className="w-4 h-4 text-slate-400"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Enhanced Filter & Search Control Panel */}
          <section
            aria-label="Search and Categorization Filters"
            className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm space-y-6 transition-all"
          >
            {/* Top Header: Title, Active Filter Summary, and View Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-blue-50 text-[#003893] rounded-lg">
                    <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    Filter &amp; Search City Projects
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Explore public works contracts across the 13 Barangays of
                  Trece Martires City.
                </p>
              </div>

              {/* View Mode Toggle Switcher */}
              <div
                role="radiogroup"
                aria-label="View layout options"
                className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 shadow-inner"
              >
                <button
                  role="radio"
                  aria-checked={viewMode === 'table'}
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[34px] ${
                    viewMode === 'table'
                      ? 'bg-white text-[#003893] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Table</span>
                </button>
                <button
                  role="radio"
                  aria-checked={viewMode === 'grid'}
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[34px] ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#003893] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Grid</span>
                </button>
              </div>
            </div>

            {/* Data Source Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Landmark
                  className="w-3.5 h-3.5 text-[#003893]"
                  aria-hidden="true"
                />
                Data Source:
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedSource('all');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[34px] ${
                  selectedSource === 'all'
                    ? 'bg-[#00225e] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Datasets ({sourceCounts.all})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSource('dpwh');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[34px] ${
                  selectedSource === 'dpwh'
                    ? 'bg-[#00225e] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                DPWH Local Contracts ({sourceCounts.dpwh})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSource('gaa');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[34px] ${
                  selectedSource === 'gaa'
                    ? 'bg-[#00225e] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                GAA National Budget ({sourceCounts.gaa})
              </button>
            </div>

            {/* Enhanced Search Bar & Categorization Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Enhanced Search Bar (6 columns on MD+) */}
              <div className="md:col-span-12 lg:col-span-5">
                <label
                  htmlFor="search-dpwh-projects"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Search
                      className="w-3.5 h-3.5 text-[#003893]"
                      aria-hidden="true"
                    />
                    Keyword Search
                  </span>
                  <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
                    Press / to search
                  </kbd>
                </label>
                <div className="relative group">
                  <Search
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#003893] transition-colors pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    id="search-dpwh-projects"
                    type="search"
                    placeholder="Search contract ID, project title, contractor, fund..."
                    value={searchQuery}
                    onChange={e => updateFilter(setSearchQuery, e.target.value)}
                    className="w-full pl-10 pr-14 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-2xs min-h-[48px]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => updateFilter(setSearchQuery, '')}
                      aria-label="Clear search input"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 bg-slate-200/80 hover:bg-slate-300 p-1.5 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#003893]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Enhanced Category Dropdown (3 cols) */}
              <div className="md:col-span-4 lg:col-span-3">
                <label
                  htmlFor="category-select"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers
                      className="w-3.5 h-3.5 text-[#003893]"
                      aria-hidden="true"
                    />
                    Category
                  </span>
                  {selectedCategory !== 'All Categories' && (
                    <span className="w-2 h-2 rounded-full bg-[#003893] animate-ping" />
                  )}
                </label>
                <div className="relative group">
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={e =>
                      updateFilter(setSelectedCategory, e.target.value)
                    }
                    className={`w-full appearance-none pl-3.5 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] min-h-[48px] shadow-2xs cursor-pointer ${
                      selectedCategory !== 'All Categories'
                        ? 'bg-blue-50/70 border-[#003893] text-[#00225e]'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white focus:bg-white'
                    }`}
                  >
                    {DPWH_CATEGORIES.map(cat => (
                      <option
                        key={cat}
                        value={cat}
                        className="text-slate-900 py-1"
                      >
                        {cat} ({categoryCounts[cat] || 0})
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-700 pointer-events-none transition-transform group-focus-within:rotate-180"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Enhanced Status Dropdown (2.5 cols) */}
              <div className="md:col-span-4 lg:col-span-2">
                <label
                  htmlFor="status-select"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Activity
                      className="w-3.5 h-3.5 text-[#003893]"
                      aria-hidden="true"
                    />
                    Status
                  </span>
                  {selectedStatus !== 'All Statuses' && (
                    <span className="w-2 h-2 rounded-full bg-[#003893] animate-ping" />
                  )}
                </label>
                <div className="relative group">
                  <select
                    id="status-select"
                    value={selectedStatus}
                    onChange={e =>
                      updateFilter(setSelectedStatus, e.target.value)
                    }
                    className={`w-full appearance-none pl-3.5 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] min-h-[48px] shadow-2xs cursor-pointer ${
                      selectedStatus !== 'All Statuses'
                        ? 'bg-blue-50/70 border-[#003893] text-[#00225e]'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white focus:bg-white'
                    }`}
                  >
                    {DPWH_STATUSES.map(st => (
                      <option
                        key={st}
                        value={st}
                        className="text-slate-900 py-1"
                      >
                        {st} ({statusCounts[st] || 0})
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-700 pointer-events-none transition-transform group-focus-within:rotate-180"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Enhanced Year Dropdown (2.5 cols) */}
              <div className="md:col-span-4 lg:col-span-2">
                <label
                  htmlFor="year-select"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <CalendarDays
                      className="w-3.5 h-3.5 text-[#003893]"
                      aria-hidden="true"
                    />
                    Fiscal Year
                  </span>
                  {selectedYear !== 'All Years' && (
                    <span className="w-2 h-2 rounded-full bg-[#003893] animate-ping" />
                  )}
                </label>
                <div className="relative group">
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={e =>
                      updateFilter(setSelectedYear, e.target.value)
                    }
                    className={`w-full appearance-none pl-3.5 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] min-h-[48px] shadow-2xs cursor-pointer ${
                      selectedYear !== 'All Years'
                        ? 'bg-blue-50/70 border-[#003893] text-[#00225e]'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white focus:bg-white'
                    }`}
                  >
                    {DPWH_YEARS.map(yr => (
                      <option
                        key={yr}
                        value={yr}
                        className="text-slate-900 py-1"
                      >
                        {yr} ({yearCounts[yr] || 0})
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-slate-700 pointer-events-none transition-transform group-focus-within:rotate-180"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            {/* Barangay Focus Wrapping Pills */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span
                  id="barangay-filter-heading"
                  className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
                >
                  <MapPin
                    className="w-3.5 h-3.5 text-[#003893]"
                    aria-hidden="true"
                  />
                  Filter by Barangay
                </span>
                {selectedBarangay !== 'All 13 Barangays' && (
                  <button
                    onClick={() =>
                      updateFilter(setSelectedBarangay, 'All 13 Barangays')
                    }
                    className="text-xs text-[#003893] hover:underline font-bold focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] rounded"
                  >
                    Clear Barangay
                  </button>
                )}
              </div>

              <div
                role="group"
                aria-labelledby="barangay-filter-heading"
                className="flex flex-wrap items-center gap-1.5 sm:gap-2"
              >
                {TRECE_BARANGAYS_FILTER.map(brgy => {
                  const isSelected = selectedBarangay === brgy;
                  return (
                    <button
                      key={brgy}
                      onClick={() => updateFilter(setSelectedBarangay, brgy)}
                      aria-pressed={isSelected}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] focus-visible:ring-offset-2 min-h-[36px] flex items-center ${
                        isSelected
                          ? 'bg-[#003893] text-white shadow-xs scale-102'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {brgy}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Filter Chips & Sorting Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
              {/* Active Filter Badges */}
              <div
                className="flex items-center gap-2 flex-wrap"
                aria-live="polite"
              >
                <span className="font-semibold text-slate-500">
                  Showing{' '}
                  <strong className="text-slate-900 font-black">
                    {filteredProjects.length}
                  </strong>{' '}
                  of {projects.length}
                </span>

                {isFiltered && (
                  <div className="flex items-center gap-1.5 flex-wrap pl-2 border-l border-slate-200">
                    {activeFiltersList.map(filter => (
                      <button
                        key={filter.label}
                        onClick={filter.onClear}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#00225e] border border-blue-200/80 font-bold hover:bg-blue-100 transition-colors group"
                        title={`Remove ${filter.label} filter`}
                      >
                        <span>
                          {filter.label}: {filter.value}
                        </span>
                        <X className="w-3 h-3 text-blue-600 group-hover:text-red-600 transition-colors" />
                      </button>
                    ))}

                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 font-bold hover:underline px-2 py-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset All</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sort Controls */}
              <div
                role="group"
                aria-label="Sort projects"
                className="flex items-center gap-1.5 flex-wrap"
              >
                <span className="font-semibold flex items-center gap-1 text-slate-600 mr-1">
                  <SlidersHorizontal
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  />
                  Sort:
                </span>
                <button
                  onClick={() => toggleSort('budget')}
                  aria-pressed={sortBy === 'budget'}
                  className={`flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg text-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
                    sortBy === 'budget'
                      ? 'bg-blue-100 text-[#00225e] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Budget</span>
                  {sortBy === 'budget' ? (
                    sortOrder === 'asc' ? (
                      <ArrowUp className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <ArrowDown className="w-3 h-3" aria-hidden="true" />
                    )
                  ) : (
                    <ArrowUpDown
                      className="w-3 h-3 opacity-50"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <button
                  onClick={() => toggleSort('progress')}
                  aria-pressed={sortBy === 'progress'}
                  className={`flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg text-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
                    sortBy === 'progress'
                      ? 'bg-blue-100 text-[#00225e] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Progress</span>
                  {sortBy === 'progress' ? (
                    sortOrder === 'asc' ? (
                      <ArrowUp className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <ArrowDown className="w-3 h-3" aria-hidden="true" />
                    )
                  ) : (
                    <ArrowUpDown
                      className="w-3 h-3 opacity-50"
                      aria-hidden="true"
                    />
                  )}
                </button>
                <button
                  onClick={() => toggleSort('barangay')}
                  aria-pressed={sortBy === 'barangay'}
                  className={`flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg text-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
                    sortBy === 'barangay'
                      ? 'bg-blue-100 text-[#00225e] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>Barangay</span>
                  {sortBy === 'barangay' ? (
                    sortOrder === 'asc' ? (
                      <ArrowUp className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <ArrowDown className="w-3 h-3" aria-hidden="true" />
                    )
                  ) : (
                    <ArrowUpDown
                      className="w-3 h-3 opacity-50"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Content View: Table or Grid */}
          {filteredProjects.length === 0 ? (
            <div
              role="status"
              className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-xs space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#003893] flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                No infrastructure projects match your filters
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Try adjusting your search keywords or clearing selected filters.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-[#003893] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-[#003893]"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Responsive Grid Cards View */
            <div
              role="region"
              aria-label="Projects Grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {paginatedProjects.map(project => (
                <article
                  key={project.contractId}
                  onClick={() => setActiveProject(project)}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group"
                  aria-labelledby={`grid-title-${project.contractId}`}
                >
                  <div className="space-y-3">
                    {/* Header tags */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 text-slate-900 border border-slate-200">
                          {project.contractId}
                        </span>
                        <button
                          onClick={e => copyContractId(project.contractId, e)}
                          className="p-1 text-slate-500 hover:text-[#003893] transition-colors rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893]"
                          title={`Copy Contract ID ${project.contractId}`}
                          aria-label={`Copy Contract ID ${project.contractId}`}
                        >
                          {copiedId === project.contractId ? (
                            <Check
                              className="w-3.5 h-3.5 text-emerald-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        <MapPin
                          className="w-3 h-3 text-amber-700"
                          aria-hidden="true"
                        />
                        Brgy. {project.location.barangay}
                      </span>
                    </div>

                    {/* Scope / Title */}
                    <h4
                      id={`grid-title-${project.contractId}`}
                      className="text-sm sm:text-base font-bold text-slate-900 line-clamp-3 group-hover:text-[#003893] transition-colors leading-snug"
                    >
                      {project.description}
                    </h4>

                    {/* Category & Location */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <span className="font-semibold text-slate-800">
                        {project.category}
                      </span>
                      <span>•</span>
                      <span className="truncate">
                        {project.contractor || 'DPWH Project'}
                      </span>
                    </div>
                  </div>

                  {/* Progress & Budget Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        Approved Budget
                      </span>
                      <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                        {formatCompactPHP(project.budget)}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{project.progress}% Complete</span>
                        <span className="capitalize">{project.status}</span>
                      </div>
                      <div
                        className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={project.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Completion progress: ${project.progress}%`}
                      >
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            project.progress === 100
                              ? 'bg-emerald-500'
                              : project.progress > 50
                                ? 'bg-blue-600'
                                : 'bg-amber-500'
                          }`}
                          style={{
                            width: `${Math.min(100, project.progress)}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      {getStatusBadge(project.status)}
                      <span className="font-bold text-[#003893] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>Inspect</span>
                        <ChevronRight
                          className="w-3.5 h-3.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Enhanced Proportional Table View (Table on Desktop, Cards on Mobile/Tablet) */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Desktop Proportional Data Table (lg screens - fits container without horizontal scroll) */}
              <div className="hidden lg:block">
                <table
                  className="w-full text-left text-sm table-fixed"
                  aria-label="Trece Martires DPWH Infrastructure Projects Registry"
                >
                  <thead className="bg-slate-50 text-slate-800 font-extrabold uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th
                        scope="col"
                        aria-sort={getSortAria('id')}
                        className="w-[14%] py-4 px-4 font-extrabold"
                      >
                        <button
                          onClick={() => toggleSort('id')}
                          className="flex items-center gap-1.5 text-left uppercase text-slate-800 hover:text-[#003893] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] rounded"
                        >
                          <span>Contract ID</span>
                          <ArrowUpDown
                            className="w-3 h-3 text-slate-400"
                            aria-hidden="true"
                          />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="w-[34%] py-4 px-4 font-extrabold"
                      >
                        Project Scope &amp; Contractor
                      </th>
                      <th
                        scope="col"
                        aria-sort={getSortAria('barangay')}
                        className="w-[13%] py-4 px-4 font-extrabold"
                      >
                        <button
                          onClick={() => toggleSort('barangay')}
                          className="flex items-center gap-1.5 text-left uppercase text-slate-800 hover:text-[#003893] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] rounded"
                        >
                          <span>Barangay</span>
                          <ArrowUpDown
                            className="w-3 h-3 text-slate-400"
                            aria-hidden="true"
                          />
                        </button>
                      </th>
                      <th
                        scope="col"
                        aria-sort={getSortAria('budget')}
                        className="w-[15%] py-4 px-4 text-right font-extrabold"
                      >
                        <button
                          onClick={() => toggleSort('budget')}
                          className="flex items-center justify-end gap-1.5 w-full uppercase text-slate-800 hover:text-[#003893] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] rounded"
                        >
                          <span>Budget (PHP)</span>
                          <ArrowUpDown
                            className="w-3 h-3 text-slate-400"
                            aria-hidden="true"
                          />
                        </button>
                      </th>
                      <th
                        scope="col"
                        aria-sort={getSortAria('progress')}
                        className="w-[12%] py-4 px-4 text-center font-extrabold"
                      >
                        <button
                          onClick={() => toggleSort('progress')}
                          className="flex items-center justify-center gap-1.5 w-full uppercase text-slate-800 hover:text-[#003893] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] rounded"
                        >
                          <span>Progress</span>
                          <ArrowUpDown
                            className="w-3 h-3 text-slate-400"
                            aria-hidden="true"
                          />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="w-[12%] py-4 px-4 text-center font-extrabold"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {paginatedProjects.map(project => (
                      <tr
                        key={project.contractId}
                        onClick={() => setActiveProject(project)}
                        className="hover:bg-blue-50/60 transition-colors cursor-pointer group"
                      >
                        {/* Contract ID */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 text-xs">
                              {project.contractId}
                            </span>
                            <button
                              onClick={e =>
                                copyContractId(project.contractId, e)
                              }
                              className="p-1 text-slate-500 hover:text-[#003893] transition-colors rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893]"
                              title={`Copy Contract ID ${project.contractId}`}
                              aria-label={`Copy Contract ID ${project.contractId}`}
                            >
                              {copiedId === project.contractId ? (
                                <Check
                                  className="w-3.5 h-3.5 text-emerald-600"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Copy
                                  className="w-3.5 h-3.5"
                                  aria-hidden="true"
                                />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Scope & Contractor */}
                        <td className="py-4 px-4 align-top">
                          <div className="font-bold text-slate-900 group-hover:text-[#003893] transition-colors leading-snug line-clamp-2">
                            {project.description}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                            <span className="inline-flex items-center gap-1">
                              <HardHat
                                className="w-3 h-3 text-slate-400"
                                aria-hidden="true"
                              />
                              <span className="truncate max-w-[180px]">
                                {project.contractor || 'DPWH Project'}
                              </span>
                            </span>
                            <span>•</span>
                            <span className="font-semibold text-slate-600">
                              {project.category}
                            </span>
                            <span>•</span>
                            <span className="font-mono text-slate-500">
                              {project.infraYear} GAA
                            </span>
                          </div>
                        </td>

                        {/* Barangay */}
                        <td className="py-4 px-4 align-top">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <MapPin
                              className="w-3 h-3 text-amber-700"
                              aria-hidden="true"
                            />
                            <span>{project.location.barangay}</span>
                          </span>
                        </td>

                        {/* Budget */}
                        <td className="py-4 px-4 align-top text-right font-mono font-black text-slate-900 text-sm">
                          {formatPHP(project.budget)}
                        </td>

                        {/* Progress Gauge & Status */}
                        <td className="py-4 px-4 align-top text-center">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                              <span>{project.progress}%</span>
                              <span className="text-[10px] text-slate-500 capitalize">
                                {project.status}
                              </span>
                            </div>
                            <div
                              className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden"
                              role="progressbar"
                              aria-valuenow={project.progress}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`Completion progress: ${project.progress}%`}
                            >
                              <div
                                className={`h-1.5 rounded-full transition-all duration-500 ${
                                  project.progress === 100
                                    ? 'bg-emerald-500'
                                    : project.progress > 50
                                      ? 'bg-blue-600'
                                      : 'bg-amber-500'
                                }`}
                                style={{
                                  width: `${Math.min(100, project.progress)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Action Button */}
                        <td className="py-4 px-4 align-top text-center">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              setActiveProject(project);
                            }}
                            className="inline-flex items-center gap-1 text-[#003893] hover:text-white hover:bg-[#003893] bg-blue-50 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893]"
                            aria-label={`Inspect details for project ${project.contractId}`}
                          >
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile & Tablet Reflow Presentation (< lg screens: zero horizontal scroll) */}
              <div
                role="region"
                aria-label="Projects List"
                className="lg:hidden divide-y divide-slate-100"
              >
                {paginatedProjects.map(project => (
                  <article
                    key={project.contractId}
                    onClick={() => setActiveProject(project)}
                    className="p-4 sm:p-5 space-y-3 hover:bg-blue-50/50 transition-colors cursor-pointer"
                    aria-labelledby={`project-title-${project.contractId}`}
                  >
                    {/* Header row: Contract ID badge, Copy button, Barangay tag */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs bg-slate-100 text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200">
                          {project.contractId}
                        </span>
                        <button
                          onClick={e => copyContractId(project.contractId, e)}
                          className="p-1.5 text-slate-500 hover:text-[#003893] transition-colors rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-w-[32px] min-h-[32px] flex items-center justify-center"
                          title={`Copy Contract ID ${project.contractId}`}
                          aria-label={`Copy Contract ID ${project.contractId}`}
                        >
                          {copiedId === project.contractId ? (
                            <Check
                              className="w-3.5 h-3.5 text-emerald-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        <MapPin
                          className="w-3 h-3 text-amber-700"
                          aria-hidden="true"
                        />
                        Brgy. {project.location.barangay}
                      </span>
                    </div>

                    {/* Project Scope Title */}
                    <h4
                      id={`project-title-${project.contractId}`}
                      className="font-bold text-sm sm:text-base text-slate-900 leading-snug"
                    >
                      {project.description}
                    </h4>

                    {/* Sub details */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 pt-0.5">
                      <span className="font-semibold text-slate-700">
                        {project.category}
                      </span>
                      <span className="truncate max-w-[200px]">
                        {project.contractor || 'DPWH Project'}
                      </span>
                    </div>

                    {/* Progress bar gauge */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Physical Progress</span>
                        <span className="font-mono font-bold text-slate-900">
                          {project.progress}%
                        </span>
                      </div>
                      <div
                        className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={project.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Completion progress: ${project.progress}%`}
                      >
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            project.progress === 100
                              ? 'bg-emerald-500'
                              : project.progress > 50
                                ? 'bg-blue-600'
                                : 'bg-amber-500'
                          }`}
                          style={{
                            width: `${Math.min(100, project.progress)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer: Budget, Status, and Inspect */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2 flex-wrap">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Approved Budget
                        </span>
                        <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                          {formatCompactPHP(project.budget)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(project.status)}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setActiveProject(project);
                          }}
                          className="inline-flex items-center gap-1 text-[#003893] hover:text-white hover:bg-[#003893] bg-blue-50 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors min-h-[36px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893]"
                          aria-label={`Inspect contract ${project.contractId}`}
                        >
                          <span>Inspect</span>
                          <ChevronRight
                            className="w-3.5 h-3.5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Citizen-Friendly Responsive Pagination Control Bar */}
          {filteredProjects.length > 0 && (
            <nav
              aria-label="Projects directory pagination"
              className="bg-white rounded-3xl border border-slate-200/80 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
            >
              {/* Left Side: Summary and Page Size Selector */}
              <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                <span>
                  Showing{' '}
                  <strong className="text-slate-900 font-extrabold font-mono">
                    {(currentPage - 1) * pageSize + 1}
                  </strong>{' '}
                  to{' '}
                  <strong className="text-slate-900 font-extrabold font-mono">
                    {Math.min(currentPage * pageSize, filteredProjects.length)}
                  </strong>{' '}
                  of{' '}
                  <strong className="text-slate-900 font-extrabold font-mono">
                    {filteredProjects.length.toLocaleString()}
                  </strong>{' '}
                  projects
                </span>

                <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
                  <label
                    htmlFor="dpwh-page-size"
                    className="text-xs text-slate-500 font-medium"
                  >
                    Per page:
                  </label>
                  <select
                    id="dpwh-page-size"
                    value={pageSize}
                    onChange={e => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#003893] cursor-pointer min-h-[34px]"
                  >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                    <option value={100}>100 / page</option>
                  </select>
                </div>
              </div>

              {/* Page Number & Navigation Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full md:w-auto flex-wrap">
                  {/* First Page Quick Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    aria-label="Go to first page"
                    className="hidden sm:inline-flex items-center justify-center px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[36px]"
                  >
                    First
                  </button>

                  {/* Previous Page Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[36px]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  {/* Mobile Compact Page Indicator */}
                  <div className="sm:hidden px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 rounded-xl border border-slate-200 font-mono">
                    Page {currentPage} of {totalPages}
                  </div>

                  {/* Desktop / Tablet Numbered Page Buttons with Ellipses */}
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
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
                            isActive
                              ? 'bg-[#00225e] text-white shadow-xs'
                              : 'text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Page Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage(p => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[36px]"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Last Page Quick Button */}
                  <button
                    type="button"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Go to last page"
                    className="hidden sm:inline-flex items-center justify-center px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[36px]"
                  >
                    Last
                  </button>
                </div>
              )}
            </nav>
          )}
        </div>
      )}

      {/* VIEW 2: INTERACTIVE PROJECT MAP */}
      {activeExplorerTab === 'map' && (
        <DpwhMapVisualizer
          projects={filteredProjects}
          onSelectProject={setActiveProject}
        />
      )}

      {/* VIEW 3: BUDGET & SECTOR ANALYTICS */}
      {activeExplorerTab === 'analytics' && (
        <DpwhAnalyticsCards projects={filteredProjects} />
      )}

      {/* Project Inspector Modal */}
      <DpwhProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
