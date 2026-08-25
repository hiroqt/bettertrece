import React, { useState, useMemo } from 'react';
import {
  COA_AUDIT_REPORT_2024_META,
  COA_FINANCIAL_HIGHLIGHTS_2024,
  COA_AUDIT_OBSERVATIONS_2024,
  COA_SASDC_SUMMARY_2024,
  COA_PRIOR_YEAR_TRACKING_2024,
  COA_SEF_COMPLIANCE_AUDIT_2024,
  AuditCategory,
  ValidationStatus,
} from '../../data/coaAuditReport2024';
import {
  FileCheck2,
  AlertCircle,
  ShieldAlert,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  SlidersHorizontal,
  X,
  GraduationCap,
  Building2,
  Users,
  MapPin,
  Check,
  FileText,
  Scale,
} from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

interface CoaAuditWidgetProps {
  className?: string;
}

export const CoaAuditWidget: React.FC<CoaAuditWidgetProps> = ({
  className = '',
}) => {
  const meta = COA_AUDIT_REPORT_2024_META;
  const highlights = COA_FINANCIAL_HIGHLIGHTS_2024;
  const sasdc = COA_SASDC_SUMMARY_2024;
  const priorYear = COA_PRIOR_YEAR_TRACKING_2024;
  const sefAudit = COA_SEF_COMPLIANCE_AUDIT_2024;

  // Sub-view switcher state: Annual Audit Report (AAR) vs SEF Compliance Audit (CAR)
  const [activeReportView, setActiveReportView] = useState<'aar' | 'sef'>(
    'aar'
  );

  // State for observation explorer
  const [selectedCategory, setSelectedCategory] = useState<
    AuditCategory | 'all'
  >('all');
  const [selectedStatus, setSelectedStatus] = useState<
    ValidationStatus | 'all'
  >('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedObsIds, setExpandedObsIds] = useState<number[]>([1, 9]); // Default expand #1 and #9
  const [showOpinionExplainer, setShowOpinionExplainer] =
    useState<boolean>(false);

  const toggleObservation = (id: number) => {
    setExpandedObsIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedObsIds(COA_AUDIT_OBSERVATIONS_2024.map(o => o.id));
  };

  const collapseAll = () => {
    setExpandedObsIds([]);
  };

  // Filtered observations
  const filteredObservations = useMemo(() => {
    return COA_AUDIT_OBSERVATIONS_2024.filter(obs => {
      const matchesCategory =
        selectedCategory === 'all' || obs.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'all' || obs.coaValidationStatus === selectedStatus;

      if (!matchesCategory || !matchesStatus) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        obs.title.toLowerCase().includes(q) ||
        obs.findings.toLowerCase().includes(q) ||
        obs.responsibleOffice.toLowerCase().includes(q) ||
        obs.categoryLabel.toLowerCase().includes(q) ||
        obs.agencyActionPlan.toLowerCase().includes(q) ||
        (obs.amountFormatted && obs.amountFormatted.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const categories: {
    id: AuditCategory | 'all';
    label: string;
    count: number;
  }[] = [
    {
      id: 'all',
      label: 'All Findings',
      count: COA_AUDIT_OBSERVATIONS_2024.length,
    },
    {
      id: 'financial',
      label: 'Financial & Cash',
      count: COA_AUDIT_OBSERVATIONS_2024.filter(o => o.category === 'financial')
        .length,
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure & Works',
      count: COA_AUDIT_OBSERVATIONS_2024.filter(
        o => o.category === 'infrastructure'
      ).length,
    },
    {
      id: 'property',
      label: 'Property & Inventory',
      count: COA_AUDIT_OBSERVATIONS_2024.filter(o => o.category === 'property')
        .length,
    },
    {
      id: 'workforce',
      label: 'Workforce & HR',
      count: COA_AUDIT_OBSERVATIONS_2024.filter(o => o.category === 'workforce')
        .length,
    },
    {
      id: 'disaster_special',
      label: 'Disaster & Special Funds',
      count: COA_AUDIT_OBSERVATIONS_2024.filter(
        o => o.category === 'disaster_special'
      ).length,
    },
  ];

  const getStatusBadge = (status: ValidationStatus, label: string) => {
    switch (status) {
      case 'implemented':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{label}</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#00225e] border border-blue-300">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{label}</span>
          </span>
        );
      case 'for_monitoring':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{label}</span>
          </span>
        );
      case 'not_implemented':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{label}</span>
          </span>
        );
    }
  };

  return (
    <div className={`space-y-10 ${className}`}>
      {/* 1. EXECUTIVE AUDIT HEADER & OPINION BANNER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00225e] text-white">
                Commission on Audit (COA)
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                CY 2024 Audit Disclosures
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Official Release: June 2025
              </span>
            </div>

            <h2
              id="coa-audit-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight"
            >
              COA Annual Audit &amp; Special Education Fund Reports
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Official findings, independent financial audit statements,
              statutory compliance reports, and agency action plans prepared by
              the{' '}
              <strong className="text-gray-900 font-bold">
                COA Regional Office IV-A (Local Government Audit Sector R4A-02,
                Team B)
              </strong>{' '}
              for the Calendar Year ended December 31, 2024.
            </p>
          </div>

          {/* Audit Opinion Pill & Quick Info */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl lg:max-w-sm shrink-0 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Independent Auditor’s Opinion
              </span>
              <button
                type="button"
                onClick={() => setShowOpinionExplainer(!showOpinionExplainer)}
                className="text-xs font-bold text-[#003893] hover:underline inline-flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] rounded cursor-pointer"
                aria-expanded={showOpinionExplainer}
              >
                <Info className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {showOpinionExplainer ? 'Hide Guide' : 'What is this?'}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xs flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>{meta.auditOpinion}</span>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                Fair with specific exceptions noted
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {meta.auditOpinionSummary}
            </p>

            {showOpinionExplainer && (
              <div className="mt-3 p-3.5 bg-blue-50/90 border border-blue-200 rounded-xl text-xs text-slate-700 space-y-1.5 animate-fadeIn">
                <div className="font-bold text-[#00225e]">
                  Understanding COA Audit Opinions:
                </div>
                <p>
                  A <strong>Qualified Opinion</strong> means the government’s
                  financial statements are fairly presented in all material
                  respects, <em>except</em> for specific identified accounts
                  (such as PPE ledger variance, inventory discrepancies, or
                  unrecorded cutoff payables). It is a standard audit opinion
                  signaling areas requiring administrative reconciliation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SUB-VIEW SWITCHER: AAR vs SEF COMPLIANCE */}
        <div
          role="tablist"
          aria-label="COA Audit Sub-Reports"
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeReportView === 'aar'}
            onClick={() => setActiveReportView('aar')}
            className={`flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeReportView === 'aar'
                ? 'bg-white text-[#00225e] shadow-xs border border-gray-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-[#003893]" aria-hidden="true" />
            <span>Annual Audit Report (AAR)</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-blue-100 text-[#00225e]">
              15 Findings
            </span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeReportView === 'sef'}
            onClick={() => setActiveReportView('sef')}
            className={`flex items-center justify-center sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeReportView === 'sef'
                ? 'bg-white text-[#00225e] shadow-xs border border-gray-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <GraduationCap
              className="w-4 h-4 text-[#003893]"
              aria-hidden="true"
            />
            <span>Special Education Fund (CAR)</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-blue-100 text-[#00225e]">
              ₱86.00M Budget
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: COMPREHENSIVE ANNUAL AUDIT REPORT (AAR) */}
      {activeReportView === 'aar' && (
        <div className="space-y-10 animate-fadeIn">
          {/* 2. FOUR FINANCIAL HIGHLIGHT CARDS (2024 vs 2023) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-sm space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp
                className="w-5 h-5 text-[#003893]"
                aria-hidden="true"
              />
              <span>Key Financial Highlights (CY 2024 vs. CY 2023)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Assets */}
              <div className="bg-gradient-to-br from-[#00225e] to-[#003893] text-white p-5 rounded-2xl shadow-sm border border-blue-900/30 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-blue-200 text-xs font-semibold">
                    <span>Total City Assets</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold">
                      +{highlights.assets.percentageChange}%
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    <AnimatedCounter
                      value={highlights.assets.cy2024 / 1_000_000_000}
                      prefix="₱"
                      suffix=" B"
                      decimals={2}
                    />
                  </div>
                  <div className="text-[11px] text-blue-200 font-mono">
                    Exact: {highlights.assets.formatted2024}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-800/60 text-xs text-blue-200 flex justify-between">
                  <span>CY 2023 Baseline:</span>
                  <span className="font-mono font-bold text-white">
                    {highlights.assets.formatted2023}
                  </span>
                </div>
              </div>

              {/* Card 2: Operating Revenue */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-sm border border-slate-700 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-xs font-semibold">
                    <span>Operating Revenue</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold">
                      +{highlights.revenue.percentageChange}%
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                    <AnimatedCounter
                      value={highlights.revenue.cy2024 / 1_000_000_000}
                      prefix="₱"
                      suffix=" B"
                      decimals={2}
                    />
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono">
                    NTA: ₱859.7M &bull; Local Tax: ₱476.9M
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700 text-xs text-slate-300 flex justify-between">
                  <span>CY 2023 Revenue:</span>
                  <span className="font-mono font-bold text-white">
                    {highlights.revenue.formatted2023}
                  </span>
                </div>
              </div>

              {/* Card 3: Net Surplus */}
              <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
                    <span>Net Annual Surplus</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                      Surplus
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 tracking-tight">
                    <AnimatedCounter
                      value={highlights.netSurplus.cy2024 / 1_000_000}
                      prefix="₱"
                      suffix=" M"
                      decimals={2}
                    />
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">
                    Operating Balance: {highlights.netSurplus.formatted2024}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 flex justify-between">
                  <span>Budget Utilization:</span>
                  <span className="font-mono font-bold text-gray-900">
                    {highlights.budgetExecution.utilizationRate}%
                  </span>
                </div>
              </div>

              {/* Card 4: City Personnel & Workforce */}
              <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
                    <span>Personnel Complement</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#00225e] font-mono text-[11px] font-bold">
                      Workforce
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#003893] tracking-tight">
                    <AnimatedCounter
                      value={highlights.personnelComplement.total}
                      suffix=" Total"
                    />
                  </div>
                  <div className="text-[11px] text-gray-500 font-sans">
                    475 Permanent &bull; 1,692 Job Order (71.2%)
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 flex justify-between">
                  <span>Total Liabilities:</span>
                  <span className="font-mono font-bold text-gray-900">
                    ₱1.30 Billion
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. AUDIT OBSERVATIONS & RECOMMENDATIONS EXPLORER */}
          <section
            id="audit-observations"
            aria-labelledby="audit-observations-title"
            className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-sm space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3
                  id="audit-observations-title"
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight"
                >
                  15 Detailed Audit Observations &amp; Actions Taken
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Review specific COA findings, amounts involved, City agency
                  action plans, and COA validation status.
                </p>
              </div>

              {/* Expand / Collapse Controls */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  type="button"
                  onClick={expandAll}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Filter Categories Bar */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Filter by Category</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#00225e] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        selectedCategory === cat.id
                          ? 'bg-blue-800 text-blue-100'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status Pills & Live Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search observation, office (e.g. CAO, CGSO, BAC), topic, amount..."
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-gray-900 placeholder:text-slate-400 focus:bg-white focus:border-[#003893] focus:ring-2 focus:ring-[#003893]/20 focus:outline-hidden transition-all"
                  aria-label="Search audit findings"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                    aria-label="Clear search query"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Status Filter Dropdown / Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs text-slate-500 font-semibold shrink-0">
                  Status:
                </span>
                {(
                  [
                    { id: 'all', label: 'All' },
                    { id: 'implemented', label: 'Implemented' },
                    { id: 'in_progress', label: 'In Progress' },
                    { id: 'for_monitoring', label: 'For Monitoring' },
                    { id: 'not_implemented', label: 'Not Implemented' },
                  ] as const
                ).map(st => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setSelectedStatus(st.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                      selectedStatus === st.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Observations List */}
            <div className="space-y-4 pt-2">
              {filteredObservations.length === 0 ? (
                <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <AlertCircle
                    className="w-8 h-8 text-slate-400 mx-auto"
                    aria-hidden="true"
                  />
                  <div className="text-sm font-bold text-slate-700">
                    No matching audit observations found
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your keyword search, category filter, or
                    status filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                      setSearchQuery('');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#00225e] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                filteredObservations.map(obs => {
                  const isExpanded = expandedObsIds.includes(obs.id);
                  return (
                    <div
                      key={obs.id}
                      className="border border-gray-200/90 rounded-2xl bg-white hover:border-blue-200 transition-all overflow-hidden shadow-2xs"
                    >
                      {/* Accordion Header */}
                      <button
                        type="button"
                        onClick={() => toggleObservation(obs.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] rounded-2xl"
                        aria-expanded={isExpanded}
                        aria-controls={`obs-content-${obs.id}`}
                      >
                        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                          <span className="shrink-0 w-7 h-7 rounded-lg bg-[#00225e] text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                            #{obs.obsNumber}
                          </span>

                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                                {obs.categoryLabel}
                              </span>
                              {obs.amountFormatted && (
                                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                  {obs.amountFormatted}
                                </span>
                              )}
                              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                                Office:{' '}
                                <strong className="text-slate-800">
                                  {obs.responsibleOffice}
                                </strong>
                              </span>
                            </div>

                            <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                              {obs.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="hidden sm:block">
                            {getStatusBadge(
                              obs.coaValidationStatus,
                              obs.coaValidationLabel
                            )}
                          </div>
                          <div className="p-1 rounded-lg bg-slate-100 text-slate-600">
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
                          </div>
                        </div>
                      </button>

                      {/* Expanded Content Panel */}
                      {isExpanded && (
                        <div
                          id={`obs-content-${obs.id}`}
                          className="px-4 sm:px-6 pb-6 pt-2 border-t border-gray-100 space-y-5 animate-fadeIn"
                        >
                          {/* Mobile Status Badge if hidden on header */}
                          <div className="sm:hidden pt-2">
                            {getStatusBadge(
                              obs.coaValidationStatus,
                              obs.coaValidationLabel
                            )}
                          </div>

                          {/* Legal / Policy References */}
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                            <span className="font-semibold text-slate-500">
                              Regulatory Citation:
                            </span>
                            {obs.basis.map((b, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] border border-slate-200"
                              >
                                {b}
                              </span>
                            ))}
                          </div>

                          {/* Audit Findings */}
                          <div className="space-y-1.5">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-900 flex items-center gap-1.5">
                              <AlertCircle
                                className="w-3.5 h-3.5 text-rose-600"
                                aria-hidden="true"
                              />
                              <span>COA Audit Observation &amp; Finding</span>
                            </h5>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-rose-50/50 p-3.5 rounded-xl border border-rose-100">
                              {obs.findings}
                            </p>
                          </div>

                          {/* Recommendations */}
                          <div className="space-y-1.5">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2
                                className="w-3.5 h-3.5 text-emerald-600"
                                aria-hidden="true"
                              />
                              <span>Auditor Recommendations</span>
                            </h5>
                            <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 list-disc pl-5 bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100">
                              {obs.recommendations.map((rec, rIdx) => (
                                <li key={rIdx} className="leading-relaxed">
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Agency Action Plan & Status */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-[#00225e] flex items-center gap-1.5">
                                <Briefcase
                                  className="w-3.5 h-3.5 text-[#003893]"
                                  aria-hidden="true"
                                />
                                <span>City Agency Action Taken / Plan</span>
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                {obs.agencyActionPlan}
                              </p>
                              <div className="pt-2 text-[11px] text-slate-600 flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-slate-500">
                                  Responsible:
                                </span>
                                <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-blue-200">
                                  {obs.responsibleOffice}
                                </span>
                                <span className="font-semibold text-slate-500">
                                  Target:
                                </span>
                                <span className="font-mono text-slate-800">
                                  {obs.targetTimeline}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                <ShieldAlert
                                  className="w-3.5 h-3.5 text-slate-600"
                                  aria-hidden="true"
                                />
                                <span>COA Auditor Validation Remarks</span>
                              </h5>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                {obs.coaValidationRemarks}
                              </p>
                              <div className="pt-2 text-[11px] text-slate-500 font-medium">
                                Status verified as of October 2025 COA APMT
                                Review.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* 4. PRIOR YEAR AUDIT TRACKING & SASDC DISALLOWANCES LEDGER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Prior Year Recommendations Tracking */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-[#00225e]">
                    SIPYAR Status
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mt-1">
                    Prior Year (2023) Recommendations
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-[#003893]">
                    {priorYear.implementationRate}%
                  </span>
                  <div className="text-[11px] text-slate-500 font-semibold">
                    Resolution Rate
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-700">
                    Implemented: <strong>{priorYear.implemented}</strong> of{' '}
                    {priorYear.totalRecommendations}
                  </span>
                  <span className="text-rose-700">
                    Not Implemented: <strong>{priorYear.notImplemented}</strong>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-3.5 flex overflow-hidden p-0.5 border border-slate-200">
                  <div
                    style={{ width: `${priorYear.implementationRate}%` }}
                    className="bg-emerald-600 h-full rounded-l-full transition-all"
                    title={`Implemented: ${priorYear.implemented}`}
                  />
                  <div
                    style={{ width: `${100 - priorYear.implementationRate}%` }}
                    className="bg-rose-500 h-full rounded-r-full transition-all"
                    title={`Not Implemented: ${priorYear.notImplemented}`}
                  />
                </div>
              </div>
            </div>

            {/* Audit Suspensions, Disallowances & Charges (SASDC) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    SASDC Ledger
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mt-1">
                    Audit Suspensions, Disallowances &amp; Charges
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    As of Dec 31, 2024
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">
                    Suspensions
                  </div>
                  <div className="text-base sm:text-lg font-extrabold font-mono text-slate-900 mt-0.5">
                    ₱0.00
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Cleared
                  </div>
                </div>

                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-center">
                  <div className="text-[11px] font-bold text-amber-900 uppercase">
                    Disallowances
                  </div>
                  <div className="text-base sm:text-lg font-extrabold font-mono text-amber-900 mt-0.5">
                    ₱84.73M
                  </div>
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                    ₱74.75M in Appeal
                  </div>
                </div>

                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 text-center">
                  <div className="text-[11px] font-bold text-rose-900 uppercase">
                    Charges
                  </div>
                  <div className="text-base sm:text-lg font-extrabold font-mono text-rose-900 mt-0.5">
                    ₱9.15M
                  </div>
                  <div className="text-[10px] text-rose-700 font-semibold mt-0.5">
                    Liquidating Officer
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {sasdc.remarks}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SPECIAL EDUCATION FUND (SEF) COMPLIANCE AUDIT REPORT (CAR) */}
      {activeReportView === 'sef' && (
        <div className="space-y-10 animate-fadeIn">
          {/* Executive SEF Summary Banner */}
          <div className="bg-gradient-to-br from-[#00225e] via-[#003893] to-[#00142f] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md border border-blue-900/40 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-blue-800/40">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900">
                    Compliance Audit Report (CAR)
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-blue-100 border border-white/20">
                    Special Education Fund (SEF)
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Transmitted: {sefAudit.reportDate}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Special Education Fund (SEF) Allocation &amp; Utilization
                  Audit
                </h3>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  COA Management Letter auditing transparency, budget execution,
                  and public accountability of the City's Special Education Fund
                  under{' '}
                  <strong>DepEd-DBM-DILG Joint Circular No. 1, s. 2017</strong>.
                </p>
              </div>

              {/* Total SEF Budget Badge */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl lg:max-w-xs shrink-0 space-y-2 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Total Final SEF Budget
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
                  <AnimatedCounter
                    value={sefAudit.totalBudget / 1_000_000}
                    prefix="₱"
                    suffix=" M"
                    decimals={2}
                  />
                </div>
                <div className="text-xs text-blue-200 leading-snug">
                  ₱66.00M Annual + ₱20.00M Supplemental
                </div>
              </div>
            </div>

            {/* 4 SEF Key Execution Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="text-xs text-blue-200 font-semibold flex items-center gap-1.5">
                  <TrendingUp
                    className="w-3.5 h-3.5 text-emerald-300"
                    aria-hidden="true"
                  />
                  <span>Total SEF Revenues Collected</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-white">
                  ₱78.37M
                </div>
                <div className="text-[11px] text-blue-200">
                  {sefAudit.financialBreakdown.revenue.collectionRate}% of
                  ₱86.00M target
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="text-xs text-blue-200 font-semibold flex items-center gap-1.5">
                  <Briefcase
                    className="w-3.5 h-3.5 text-blue-300"
                    aria-hidden="true"
                  />
                  <span>MOOE Program Utilization</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-white">
                  ₱59.71M
                </div>
                <div className="text-[11px] text-blue-200">
                  {
                    sefAudit.financialBreakdown.expenditures.mooe
                      .utilizationRate
                  }
                  % of ₱62.54M budget
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="text-xs text-blue-200 font-semibold flex items-center gap-1.5">
                  <Building2
                    className="w-3.5 h-3.5 text-amber-300"
                    aria-hidden="true"
                  />
                  <span>Capital Outlay &amp; Facilities</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-white">
                  ₱23.28M
                </div>
                <div className="text-[11px] text-blue-200">
                  {
                    sefAudit.financialBreakdown.expenditures.capitalOutlay
                      .utilizationRate
                  }
                  % of ₱23.46M budget
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="text-xs text-blue-200 font-semibold flex items-center gap-1.5">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-emerald-300"
                    aria-hidden="true"
                  />
                  <span>Overall Program Execution</span>
                </div>
                <div className="text-xl font-extrabold font-mono text-white">
                  ₱82.99M
                </div>
                <div className="text-[11px] text-blue-200">
                  {
                    sefAudit.financialBreakdown.expenditures.total
                      .utilizationRate
                  }
                  % of ₱86.00M total budget
                </div>
              </div>
            </div>
          </div>

          {/* SEF STATEMENT OF COMPARISON OF BUDGET AND ACTUAL AMOUNTS (Annex E-2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Scale
                    className="w-5 h-5 text-[#003893]"
                    aria-hidden="true"
                  />
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                    Statement of Comparison of Budget &amp; Actual Amounts
                    (Annex E-2)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Official audited statement of SEF revenue collections and
                  educational program disbursements for Calendar Year 2024.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200 w-fit">
                Annex E-2 &bull; AAR Pages 8–9
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <tr>
                    <th scope="col" className="p-3.5 sm:p-4">
                      Particulars / Item
                    </th>
                    <th scope="col" className="p-3.5 sm:p-4 text-right">
                      Original Budget
                    </th>
                    <th scope="col" className="p-3.5 sm:p-4 text-right">
                      Final Budget
                    </th>
                    <th scope="col" className="p-3.5 sm:p-4 text-right">
                      Actual Amount
                    </th>
                    <th scope="col" className="p-3.5 sm:p-4 text-right">
                      Difference / Balance
                    </th>
                    <th scope="col" className="p-3.5 sm:p-4 text-right">
                      Execution Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800 font-mono text-xs">
                  {/* Revenue Header */}
                  <tr className="bg-slate-50/70 font-sans font-bold text-slate-900">
                    <td colSpan={6} className="p-3 sm:px-4 text-xs">
                      A. SEF Revenue &amp; Receipts
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-sans text-gray-900">
                      Real Property Tax — Special Education Tax (SET)
                    </td>
                    <td className="p-3 sm:p-4 text-right text-gray-600">
                      ₱66,000,000.00
                    </td>
                    <td className="p-3 sm:p-4 text-right font-bold text-gray-900">
                      ₱86,000,000.00
                    </td>
                    <td className="p-3 sm:p-4 text-right text-emerald-700 font-bold">
                      ₱78,231,823.09
                    </td>
                    <td className="p-3 sm:p-4 text-right text-slate-600">
                      ₱7,768,176.91
                    </td>
                    <td className="p-3 sm:p-4 text-right font-sans font-semibold text-emerald-700">
                      90.97%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-sans text-gray-900">
                      Non-Tax Revenue (Interest &amp; Other Receipts)
                    </td>
                    <td className="p-3 sm:p-4 text-right text-gray-600">
                      ₱0.00
                    </td>
                    <td className="p-3 sm:p-4 text-right font-bold text-gray-900">
                      ₱0.00
                    </td>
                    <td className="p-3 sm:p-4 text-right text-emerald-700 font-bold">
                      ₱137,066.78
                    </td>
                    <td className="p-3 sm:p-4 text-right text-slate-600">
                      (₱137,066.78)
                    </td>
                    <td className="p-3 sm:p-4 text-right font-sans font-semibold text-emerald-700">
                      100%
                    </td>
                  </tr>
                  <tr className="bg-blue-50/50 font-bold text-[#00225e]">
                    <td className="p-3 sm:p-4 font-sans">
                      Total SEF Revenues Collected
                    </td>
                    <td className="p-3 sm:p-4 text-right">₱66,000,000.00</td>
                    <td className="p-3 sm:p-4 text-right">₱86,000,000.00</td>
                    <td className="p-3 sm:p-4 text-right text-emerald-800">
                      ₱78,368,889.87
                    </td>
                    <td className="p-3 sm:p-4 text-right">₱7,631,110.13</td>
                    <td className="p-3 sm:p-4 text-right font-sans">91.13%</td>
                  </tr>

                  {/* Expenditures Header */}
                  <tr className="bg-slate-50/70 font-sans font-bold text-slate-900">
                    <td colSpan={6} className="p-3 sm:px-4 text-xs">
                      B. SEF Educational Expenditures &amp; Programs
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-sans text-gray-900">
                      Maintenance &amp; Other Operating Expenses (MOOE)
                    </td>
                    <td className="p-3 sm:p-4 text-right text-gray-600">
                      ₱43,844,000.00
                    </td>
                    <td className="p-3 sm:p-4 text-right font-bold text-gray-900">
                      ₱62,541,000.00
                    </td>
                    <td className="p-3 sm:p-4 text-right text-blue-900 font-bold">
                      ₱59,710,513.52
                    </td>
                    <td className="p-3 sm:p-4 text-right text-slate-600">
                      ₱2,830,486.48
                    </td>
                    <td className="p-3 sm:p-4 text-right font-sans font-semibold text-emerald-700">
                      95.47%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 sm:p-4 font-sans text-gray-900">
                      Capital Outlay (CO) — School Infrastructure &amp;
                      Facilities
                    </td>
                    <td className="p-3 sm:p-4 text-right text-gray-600">
                      ₱22,156,000.00
                    </td>
                    <td className="p-3 sm:p-4 text-right font-bold text-gray-900">
                      ₱23,459,000.00
                    </td>
                    <td className="p-3 sm:p-4 text-right text-blue-900 font-bold">
                      ₱23,279,421.01
                    </td>
                    <td className="p-3 sm:p-4 text-right text-slate-600">
                      ₱179,578.99
                    </td>
                    <td className="p-3 sm:p-4 text-right font-sans font-semibold text-emerald-700">
                      99.23%
                    </td>
                  </tr>
                  <tr className="bg-slate-100 font-black text-gray-900 border-t-2 border-slate-300">
                    <td className="p-3.5 sm:p-4 font-sans">
                      Total Special Education Fund Program Disbursements
                    </td>
                    <td className="p-3.5 sm:p-4 text-right">₱66,000,000.00</td>
                    <td className="p-3.5 sm:p-4 text-right">₱86,000,000.00</td>
                    <td className="p-3.5 sm:p-4 text-right text-[#00225e]">
                      ₱82,989,934.53
                    </td>
                    <td className="p-3.5 sm:p-4 text-right text-slate-700">
                      ₱3,010,065.47
                    </td>
                    <td className="p-3.5 sm:p-4 text-right font-sans text-[#00225e]">
                      96.50%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SEF SCHOOL SITES & CAPITAL INFRASTRUCTURE ASSETS (Annex H) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2
                    className="w-5 h-5 text-[#003893]"
                    aria-hidden="true"
                  />
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                    SEF School Sites &amp; Land Parcels (Annex H)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Elementary school campus sites and extension lots acquired
                  under the Special Education Fund totaling{' '}
                  <strong className="text-gray-900">
                    {sefAudit.financialBreakdown.formattedSchoolLotsValue}
                  </strong>
                  .
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-[#00225e] border border-blue-200 w-fit">
                Annex H &bull; AAR Page 65
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sefAudit.financialBreakdown.schoolLots.map((lot, lIdx) => (
                <div
                  key={lIdx}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-[#00225e]">
                        School Lot
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">
                        {lot.area}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-gray-900 leading-snug">
                      {lot.name}
                    </h5>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin
                        className="w-3.5 h-3.5 text-rose-500 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{lot.location}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      Book Value:
                    </span>
                    <span className="font-mono font-bold text-[#00225e]">
                      {lot.formattedAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEF Detailed Finding, Management Response & Action Taken */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* COA Findings & Recommendations */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                  COA Audit Observation
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  Non-Submission of Quarterly Utilization to DepEd/DBM &amp;
                  Missing Public Postings
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  Basis: Section 6.1 &amp; Annex B of DepEd-DBM-DILG Joint
                  Circular No. 1, s. 2017
                </p>
              </div>

              <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                <p>{sefAudit.finding}</p>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText
                    className="w-4 h-4 text-emerald-600"
                    aria-hidden="true"
                  />
                  <span>Auditor Recommendations</span>
                </h5>
                <ul className="space-y-2">
                  {sefAudit.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/80"
                    >
                      <Check
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* City Response & Corrective Actions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-[#00225e] border border-blue-300">
                  City Agency Remediation
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
                  Management Explanation &amp; Compliance Plan
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  Signed by Hon. Gemma Buendia-Lubigan, City Mayor
                </p>
              </div>

              <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2">
                <p className="font-semibold text-slate-900">
                  City Comment &amp; Context:
                </p>
                <p>{sefAudit.managementResponse}</p>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2
                    className="w-4 h-4 text-blue-600"
                    aria-hidden="true"
                  />
                  <span>Immediate Corrective Actions Instituted</span>
                </h5>
                <ul className="space-y-2">
                  {sefAudit.correctiveActions.map((action, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-gray-700 flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                  <MapPin
                    className="w-4 h-4 text-rose-600 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Verified Public Posting Location:</strong>{' '}
                    {sefAudit.proofOfPostingLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Local School Board (LSB) Composition */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users
                    className="w-5 h-5 text-[#003893]"
                    aria-hidden="true"
                  />
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                    Local School Board (LSB) Governance &amp; Membership
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  The statutory multi-sectoral body responsible for budgeting,
                  allocating, and overseeing the Special Education Fund (SEF).
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-[#00225e] border border-blue-200 w-fit">
                14 Board Members &amp; Secretariat
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {/* Chairperson */}
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00225e]">
                  Chairperson
                </span>
                <div className="font-bold text-slate-900 text-sm">
                  {sefAudit.boardComposition.chairperson}
                </div>
              </div>

              {/* Co-Chairpersons */}
              {sefAudit.boardComposition.coChairpersons.map((coChair, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00225e]">
                    Co-Chairperson (DepEd)
                  </span>
                  <div className="font-bold text-slate-900 text-sm">
                    {coChair}
                  </div>
                </div>
              ))}

              {/* Members */}
              {sefAudit.boardComposition.members.map((member, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5"
                >
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    Board Member
                  </span>
                  <div className="font-medium text-slate-900">{member}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. OFFICIAL DOCUMENTS DOWNLOAD HUB */}
      <section
        id="official-documents"
        aria-labelledby="official-documents-title"
        className="bg-gradient-to-br from-slate-900 via-[#00225e] to-[#003893] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md space-y-6"
      >
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-amber-400" aria-hidden="true" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-200">
              Official Transparency Disclosures
            </span>
          </div>
          <h3
            id="official-documents-title"
            className="text-2xl sm:text-3xl font-black text-white tracking-tight"
          >
            Official COA Transparency Documents
          </h3>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Direct public access to view the complete 189-page Commission on
            Audit Annual Audit Report, the Mayor’s signed Agency Action Plan
            (AAPSI), the Action Plan Monitoring Tool (APMT), and the Special
            Education Fund Compliance Audit Report.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Doc 1: AAR */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col justify-between hover:bg-white/15 transition-all space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900">
                  Full Report
                </span>
                <span className="text-xs font-mono text-blue-200">
                  {meta.documents.aar.pages}p &bull; {meta.documents.aar.size}
                </span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                {meta.documents.aar.name}
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                {meta.documents.aar.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/15">
              <a
                href={meta.documents.aar.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#00225e] text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink
                  className="w-4 h-4 text-[#003893]"
                  aria-hidden="true"
                />
                <span>View PDF Document</span>
              </a>
            </div>
          </div>

          {/* Doc 2: AAPSI */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col justify-between hover:bg-white/15 transition-all space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400 text-slate-900">
                  City Action Plan
                </span>
                <span className="text-xs font-mono text-blue-200">
                  {meta.documents.aapsi.pages}p &bull;{' '}
                  {meta.documents.aapsi.size}
                </span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                {meta.documents.aapsi.name}
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                {meta.documents.aapsi.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/15">
              <a
                href={meta.documents.aapsi.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#00225e] text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink
                  className="w-4 h-4 text-[#003893]"
                  aria-hidden="true"
                />
                <span>View PDF Document</span>
              </a>
            </div>
          </div>

          {/* Doc 3: APMT */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col justify-between hover:bg-white/15 transition-all space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-300 text-slate-900">
                  COA Scorecard
                </span>
                <span className="text-xs font-mono text-blue-200">
                  {meta.documents.apmt.pages}p &bull; {meta.documents.apmt.size}
                </span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                {meta.documents.apmt.name}
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                {meta.documents.apmt.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/15">
              <a
                href={meta.documents.apmt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#00225e] text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink
                  className="w-4 h-4 text-[#003893]"
                  aria-hidden="true"
                />
                <span>View PDF Document</span>
              </a>
            </div>
          </div>

          {/* Doc 4: SEF CAR */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 flex flex-col justify-between hover:bg-white/15 transition-all space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900">
                  SEF Audit
                </span>
                <span className="text-xs font-mono text-blue-200">
                  {meta.documents.car.pages}p &bull; {meta.documents.car.size}
                </span>
              </div>
              <h4 className="text-base font-bold text-white leading-snug">
                {meta.documents.car.name}
              </h4>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                {meta.documents.car.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/15">
              <a
                href={meta.documents.car.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#00225e] text-xs font-bold hover:bg-blue-50 transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
              >
                <ExternalLink
                  className="w-4 h-4 text-[#003893]"
                  aria-hidden="true"
                />
                <span>View PDF Document</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoaAuditWidget;
