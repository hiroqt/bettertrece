import React, { useState } from 'react';
import {
  CITY_BUDGET_REVENUE_DATA,
  SOURCE_ATTRIBUTION,
} from '../../data/cityBudgetRevenue';
import {
  Landmark,
  Receipt,
  Coins,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

interface CityRevenueWidgetProps {
  initialYear?: number;
  showExpandableDetails?: boolean;
  className?: string;
  isFullWidthSection?: boolean;
}

export const CityRevenueWidget: React.FC<CityRevenueWidgetProps> = ({
  initialYear = 2026,
  showExpandableDetails = true,
  className = '',
  isFullWidthSection = false,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [detailsTab, setDetailsTab] = useState<
    'receipts' | 'expenditures' | 'comparison'
  >('receipts');

  const currentData =
    CITY_BUDGET_REVENUE_DATA[selectedYear] || CITY_BUDGET_REVENUE_DATA[2026];

  return (
    <div
      className={`w-full ${
        isFullWidthSection
          ? ''
          : 'bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-sm'
      } ${className}`}
    >
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6">
        <div className="space-y-3 max-w-2xl">
          {/* Year Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Year Selector Tabs */}
            <div
              role="tablist"
              aria-label="Fiscal Year Selection"
              className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold"
            >
              {[2026, 2025, 2024].map(year => (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  id={`tab-year-${year}`}
                  aria-selected={selectedYear === year}
                  aria-controls={`panel-year-${year}`}
                  tabIndex={selectedYear === year ? 0 : -1}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-lg transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] ${
                    selectedYear === year
                      ? 'bg-[#00225e] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {year === 2026 ? 'FY 2026 (Latest)' : `FY ${year}`}
                </button>
              ))}
            </div>
          </div>

          {/* Main Headline */}
          <h2
            id="city-revenue-headline"
            className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-900 tracking-tight leading-[1.15]"
          >
            Trece Martires collected{' '}
            <span className="text-[#003893]">
              <AnimatedCounter
                value={currentData.totalReceipts / 1000}
                prefix="₱"
                suffix=" billion"
                decimals={4}
              />
            </span>{' '}
            in{' '}
            <span className="whitespace-nowrap font-sans">
              FY {selectedYear}
            </span>
          </h2>
        </div>

        {/* Right side subtitle */}
        <div className="lg:max-w-md text-slate-600 text-sm sm:text-base leading-relaxed lg:pt-8 font-normal">
          <p>{currentData.subtitle}</p>
        </div>
      </div>

      {/* 2. Four Deep Navy Stat Cards (Theme color: #00225e to #003893) */}
      <div
        id={`panel-year-${selectedYear}`}
        role="region"
        aria-labelledby={`tab-year-${selectedYear}`}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-6"
      >
        {/* Card 1: City Taxes */}
        <div className="bg-gradient-to-br from-[#00225e] to-[#003893] text-white p-6 rounded-2xl shadow-sm border border-blue-900/30 flex flex-col justify-between hover:shadow-md transition-all group">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white">
              <AnimatedCounter
                value={currentData.cards.cityTaxes.rawAmount}
                prefix="₱"
                suffix="M"
                decimals={1}
              />
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 mt-2">
              From city taxes
            </div>
          </div>
          <div className="text-xs sm:text-sm text-amber-300 mt-4 pt-3 border-t border-white/15 font-semibold flex items-center justify-between">
            <span>
              <AnimatedCounter
                value={parseFloat(currentData.cards.cityTaxes.percentage)}
                suffix="% of the total"
                decimals={1}
              />
            </span>
            <Receipt className="w-4 h-4 text-blue-200" aria-hidden="true" />
          </div>
        </div>

        {/* Card 2: Non-Tax Sources */}
        <div className="bg-gradient-to-br from-[#00225e] to-[#003893] text-white p-6 rounded-2xl shadow-sm border border-blue-900/30 flex flex-col justify-between hover:shadow-md transition-all group">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white">
              <AnimatedCounter
                value={currentData.cards.nonTaxSources.rawAmount}
                prefix="₱"
                suffix="M"
                decimals={1}
              />
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 mt-2">
              From non-tax sources
            </div>
          </div>
          <div className="text-xs sm:text-sm text-amber-300 mt-4 pt-3 border-t border-white/15 font-semibold flex items-center justify-between">
            <span>
              <AnimatedCounter
                value={parseFloat(currentData.cards.nonTaxSources.percentage)}
                suffix="% of the total"
                decimals={1}
              />
            </span>
            <Coins className="w-4 h-4 text-blue-200" aria-hidden="true" />
          </div>
        </div>

        {/* Card 3: National Tax Share */}
        <div className="bg-gradient-to-br from-[#00225e] to-[#003893] text-white p-6 rounded-2xl shadow-sm border border-blue-900/30 flex flex-col justify-between hover:shadow-md transition-all group">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white">
              <AnimatedCounter
                value={currentData.cards.nationalTaxShare.rawAmount}
                prefix="₱"
                suffix="M"
                decimals={1}
              />
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 mt-2">
              From the national tax share
            </div>
          </div>
          <div className="text-xs sm:text-sm text-amber-300 mt-4 pt-3 border-t border-white/15 font-semibold flex items-center justify-between">
            <span>
              <AnimatedCounter
                value={parseFloat(
                  currentData.cards.nationalTaxShare.percentage
                )}
                suffix="% of the total"
                decimals={1}
              />
            </span>
            <Landmark className="w-4 h-4 text-blue-200" aria-hidden="true" />
          </div>
        </div>

        {/* Card 4: Change in Total Revenue */}
        <div className="bg-gradient-to-br from-[#00225e] to-[#003893] text-white p-6 rounded-2xl shadow-sm border border-blue-900/30 flex flex-col justify-between hover:shadow-md transition-all group">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white flex items-center gap-1.5">
              {selectedYear === 2024 ? (
                <span>Baseline</span>
              ) : (
                <AnimatedCounter
                  value={parseFloat(currentData.cards.yoyChange.value)}
                  prefix={currentData.cards.yoyChange.isPositive ? '+' : ''}
                  suffix="%"
                  decimals={1}
                />
              )}
              {currentData.cards.yoyChange.isPositive &&
                selectedYear !== 2024 && (
                  <ArrowUpRight
                    className="w-6 h-6 text-amber-300"
                    aria-hidden="true"
                  />
                )}
            </div>
            <div className="text-sm sm:text-base font-medium text-blue-100 mt-2">
              Change in total revenue
            </div>
          </div>
          <div className="text-xs sm:text-sm text-amber-300 mt-4 pt-3 border-t border-white/15 font-semibold">
            {currentData.cards.yoyChange.label}
          </div>
        </div>
      </div>

      {/* 3. About the math callout banner (WCAG High Contrast compliant) */}
      <div className="bg-amber-50/90 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-2xl text-slate-900 text-xs sm:text-sm leading-relaxed shadow-2xs">
        <p>
          <strong className="text-slate-950 font-bold">About the math:</strong>{' '}
          {currentData.mathNote}
        </p>
      </div>

      {/* 4. Mandatory Source Attribution */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-medium pt-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck
            className="w-4 h-4 text-[#003893] shrink-0"
            aria-hidden="true"
          />
          <span>
            <strong>Source:</strong> {SOURCE_ATTRIBUTION.primary} &amp;{' '}
            {SOURCE_ATTRIBUTION.secondary}
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          DOF-BLGF SRE Tables F.13–F.15
        </span>
      </div>

      {/* 5. Interactive Expandable Details (Full SRE breakdown) */}
      {showExpandableDetails && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls="detailed-sre-panel"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-blue-50/70 rounded-xl text-xs sm:text-sm font-bold text-[#003893] transition-all border border-slate-200/80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#003893]" aria-hidden="true" />
              <span>
                {isExpanded
                  ? 'Hide Detailed Statement of Receipts & Expenditures'
                  : `Explore Full FY ${selectedYear} Financial Breakdown & 3-Year Comparison`}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronDown
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            )}
          </button>

          {isExpanded && (
            <div
              id="detailed-sre-panel"
              className="mt-6 space-y-6 animate-fadeIn"
            >
              {/* Tabs for Details */}
              <div
                role="tablist"
                aria-label="Financial Details Navigation"
                className="flex flex-wrap gap-2 border-b border-gray-200 pb-3"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={detailsTab === 'receipts'}
                  onClick={() => setDetailsTab('receipts')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] cursor-pointer ${
                    detailsTab === 'receipts'
                      ? 'bg-[#00225e] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Receipts Breakdown
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={detailsTab === 'expenditures'}
                  onClick={() => setDetailsTab('expenditures')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] cursor-pointer ${
                    detailsTab === 'expenditures'
                      ? 'bg-[#00225e] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Expenditures &amp; Services
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={detailsTab === 'comparison'}
                  onClick={() => setDetailsTab('comparison')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] cursor-pointer ${
                    detailsTab === 'comparison'
                      ? 'bg-[#00225e] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  3-Year Multi-Year Comparison (2024–2026)
                </button>
              </div>

              {/* Tab 1: Detailed Receipts */}
              {detailsTab === 'receipts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Local Tax Revenue */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Receipt
                        className="w-4 h-4 text-[#003893]"
                        aria-hidden="true"
                      />
                      Local Tax Revenue Breakdown (
                      <AnimatedCounter
                        value={currentData.details.taxes.total}
                        prefix="₱"
                        suffix="M"
                        decimals={2}
                      />
                      )
                    </h3>
                    <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Basic Real Property Tax (RPT)
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          <AnimatedCounter
                            value={currentData.details.taxes.basicRpt}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Special Education Fund (SEF)
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          <AnimatedCounter
                            value={currentData.details.taxes.sef}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Business Tax (Largest Local Tax)
                        </span>
                        <span className="font-mono font-bold text-[#003893]">
                          <AnimatedCounter
                            value={currentData.details.taxes.businessTax}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Other Local Taxes
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          <AnimatedCounter
                            value={currentData.details.taxes.otherTaxes}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Local Non-Tax & External Revenue */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Coins
                        className="w-4 h-4 text-[#003893]"
                        aria-hidden="true"
                      />
                      Non-Tax &amp; External Allotments
                    </h3>
                    <div className="divide-y divide-slate-200 text-xs sm:text-sm">
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Regulatory Fees (Permits/Licenses)
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          <AnimatedCounter
                            value={currentData.details.nonTax.regulatoryFees}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Service / User Charges
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          <AnimatedCounter
                            value={currentData.details.nonTax.userCharges}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          National Tax Allotment (NTA Share)
                        </span>
                        <span className="font-mono font-bold text-[#003893]">
                          <AnimatedCounter
                            value={currentData.details.external.nta}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Grants / Aids / Donations
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          <AnimatedCounter
                            value={currentData.details.external.grantsAids}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                      <div className="py-2 flex justify-between">
                        <span className="text-slate-600">
                          Loan Acquisitions / Borrowings
                        </span>
                        <span className="font-mono font-bold text-slate-900">
                          <AnimatedCounter
                            value={currentData.details.nonIncome.loanProceeds}
                            prefix="₱"
                            suffix="M"
                            decimals={2}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Detailed Expenditures */}
              {detailsTab === 'expenditures' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">
                        GENERAL SERVICES
                      </span>
                      <span className="text-xl font-bold font-mono text-slate-900 block mt-1">
                        <AnimatedCounter
                          value={
                            currentData.details.expenditures.generalServices
                          }
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Admin, governance, operations
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">
                        ECONOMIC SERVICES
                      </span>
                      <span className="text-xl font-bold font-mono text-slate-900 block mt-1">
                        <AnimatedCounter
                          value={
                            currentData.details.expenditures.economicServices
                          }
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Commerce, agriculture, livelihood
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">
                        SOCIAL SERVICES
                      </span>
                      <span className="text-xl font-bold font-mono text-slate-900 block mt-1">
                        <AnimatedCounter
                          value={
                            currentData.details.expenditures.socialServices
                          }
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Health, education, welfare
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <span className="text-xs text-slate-500 font-semibold block">
                        CAPITAL OUTLAY (PPE)
                      </span>
                      <span className="text-xl font-bold font-mono text-slate-900 block mt-1">
                        <AnimatedCounter
                          value={currentData.details.expenditures.capitalOutlay}
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Infrastructure &amp; public equipment
                      </span>
                    </div>
                  </div>

                  {/* Cash Position summary */}
                  <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-200 text-xs sm:text-sm space-y-2">
                    <div className="font-bold text-[#00225e] flex items-center justify-between">
                      <span>
                        Fund &amp; Cash Position Summary (FY {selectedYear})
                      </span>
                      <span className="font-mono text-base text-[#003893]">
                        Ending Cash:{' '}
                        <AnimatedCounter
                          value={currentData.details.endingCash}
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-slate-800 font-mono">
                      <div>
                        <span className="text-[11px] text-slate-600 block font-sans">
                          Beginning Cash
                        </span>
                        <AnimatedCounter
                          value={currentData.details.beginningCash}
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-600 block font-sans">
                          Total Receipts
                        </span>
                        <AnimatedCounter
                          value={currentData.totalReceipts}
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-600 block font-sans">
                          Total Expenditures
                        </span>
                        <AnimatedCounter
                          value={
                            currentData.details.expenditures.totalExpenditures
                          }
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-600 block font-sans">
                          Continuing Approp.
                        </span>
                        <AnimatedCounter
                          value={currentData.details.continuingAppropriations}
                          prefix="₱"
                          suffix="M"
                          decimals={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: 3-Year Comparison Table */}
              {detailsTab === 'comparison' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 sm:p-3.5">Category</th>
                        <th className="p-3 sm:p-3.5 text-right">FY 2024</th>
                        <th className="p-3 sm:p-3.5 text-right">FY 2025</th>
                        <th className="p-3 sm:p-3.5 text-right">FY 2026</th>
                        <th className="p-3 sm:p-3.5 text-right text-[#003893]">
                          2-Year Growth
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white font-mono">
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-800">
                          Local Tax Revenue
                        </td>
                        <td className="p-3 text-right">₱478.30M</td>
                        <td className="p-3 text-right">₱576.48M</td>
                        <td className="p-3 text-right font-bold text-slate-900">
                          ₱630.55M
                        </td>
                        <td className="p-3 text-right font-bold text-[#003893]">
                          +31.8%
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-800">
                          Local Non-Tax Revenue
                        </td>
                        <td className="p-3 text-right">₱174.26M</td>
                        <td className="p-3 text-right">₱197.35M</td>
                        <td className="p-3 text-right font-bold text-slate-900">
                          ₱223.60M
                        </td>
                        <td className="p-3 text-right font-bold text-[#003893]">
                          +28.3%
                        </td>
                      </tr>
                      <tr className="bg-blue-50/40 font-bold">
                        <td className="p-3 font-sans text-[#003893]">
                          Total Local Sources
                        </td>
                        <td className="p-3 text-right">₱652.56M</td>
                        <td className="p-3 text-right">₱773.83M</td>
                        <td className="p-3 text-right text-[#003893]">
                          ₱854.16M
                        </td>
                        <td className="p-3 text-right text-[#003893]">
                          +30.9%
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-800">
                          National Tax Allotment (NTA)
                        </td>
                        <td className="p-3 text-right">₱859.71M</td>
                        <td className="p-3 text-right">₱1,019.88M</td>
                        <td className="p-3 text-right font-bold text-slate-900">
                          ₱1,169.45M
                        </td>
                        <td className="p-3 text-right font-bold text-[#003893]">
                          +36.0%
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-800">
                          Loans &amp; Borrowings
                        </td>
                        <td className="p-3 text-right">₱400.00M</td>
                        <td className="p-3 text-right">₱70.47M</td>
                        <td className="p-3 text-right font-bold text-slate-900">
                          ₱74.70M
                        </td>
                        <td className="p-3 text-right text-slate-500">
                          -81.3%
                        </td>
                      </tr>
                      <tr className="bg-slate-100 font-bold text-slate-950">
                        <td className="p-3 font-sans">TOTAL CITY RECEIPTS</td>
                        <td className="p-3 text-right">₱1,927.77M</td>
                        <td className="p-3 text-right">₱1,874.20M</td>
                        <td className="p-3 text-right text-[#003893]">
                          ₱2,108.33M
                        </td>
                        <td className="p-3 text-right text-[#003893]">+9.4%</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-sans font-medium text-slate-800">
                          Total Expenditures
                        </td>
                        <td className="p-3 text-right">₱1,262.03M</td>
                        <td className="p-3 text-right">₱1,643.56M</td>
                        <td className="p-3 text-right font-bold text-slate-900">
                          ₱1,843.48M
                        </td>
                        <td className="p-3 text-right font-bold text-amber-700">
                          +46.1%
                        </td>
                      </tr>
                      <tr className="bg-blue-50/60 font-bold">
                        <td className="p-3 font-sans text-[#00225e]">
                          Ending Cash Reserves
                        </td>
                        <td className="p-3 text-right">₱1,644.73M</td>
                        <td className="p-3 text-right">₱1,476.94M</td>
                        <td className="p-3 text-right text-[#003893]">
                          ₱1,311.74M
                        </td>
                        <td className="p-3 text-right text-[#003893]">
                          ₱1.31B Liquid
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CityRevenueWidget;
