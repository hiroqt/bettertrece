import { useMemo } from 'react';
import type { DPWHProject } from '../../types/dpwh';
import type { DpwhProject } from '../../data/transparency/dpwhTransparency';
import { getTreceAnalytics } from '../../services/dpwh';
import { useCountUp } from '../../hooks/useCountUp';
import {
  PieChart,
  HardHat,
  Wallet,
  TrendingUp,
  Building,
  CheckCircle2,
  Layers,
  Award,
} from 'lucide-react';

interface DpwhAnalyticsCardsProps {
  projects: (DPWHProject | DpwhProject)[];
}

export default function DpwhAnalyticsCards({
  projects,
}: DpwhAnalyticsCardsProps) {
  const analytics = useMemo(() => {
    return getTreceAnalytics(projects);
  }, [projects]);

  const animatedTotalBudget = useCountUp(analytics.totalBudget, 1000);
  const animatedTotalPaid = useCountUp(analytics.totalPaid, 1000);
  const animatedAvgProgress = useCountUp(analytics.averageProgress, 900);
  const animatedActiveCount = useCountUp(analytics.ongoingCount, 750);

  const formatPHP = (val: number) => {
    if (val >= 1_000_000_000) {
      return `₱${(val / 1_000_000_000).toFixed(2)}B`;
    }
    if (val >= 1_000_000) {
      return `₱${(val / 1_000_000).toFixed(2)}M`;
    }
    return `₱${val.toLocaleString()}`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/60 rounded-3xl p-5 sm:p-6 border border-blue-200/70 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-blue-800">
            <span className="text-xs font-bold uppercase tracking-wider">
              Total Budget
            </span>
            <Wallet className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-blue-950 truncate tracking-tight">
            {formatPHP(animatedTotalBudget)}
          </p>
          <div className="text-xs text-blue-700/90 font-medium">
            ₱
            {analytics.totalBudget.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{' '}
            Total GAA
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-3xl p-5 sm:p-6 border border-emerald-200/70 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-emerald-800">
            <span className="text-xs font-bold uppercase tracking-wider">
              Amount Disbursed
            </span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-950 truncate tracking-tight">
            {formatPHP(animatedTotalPaid)}
          </p>
          <div className="text-xs text-emerald-700/90 font-medium">
            {analytics.totalBudget > 0
              ? `${Math.round((analytics.totalPaid / analytics.totalBudget) * 100)}% Disbursement Rate`
              : '0% Disbursed'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/60 rounded-3xl p-5 sm:p-6 border border-indigo-200/70 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-indigo-800">
            <span className="text-xs font-bold uppercase tracking-wider">
              Average Progress
            </span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
            {animatedAvgProgress}%
          </p>
          <div className="text-xs text-indigo-700/90 font-medium">
            Across {analytics.totalProjects} Public Works Projects
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 rounded-3xl p-5 sm:p-6 border border-amber-200/70 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-xs font-bold uppercase tracking-wider">
              Active Projects
            </span>
            <HardHat className="w-5 h-5" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
            {animatedActiveCount}
          </p>
          <div className="text-xs text-amber-700/90 font-medium">
            {analytics.completedCount} Completed &bull;{' '}
            {analytics.terminatedCount} Terminated
          </div>
        </div>
      </div>

      {/* Two Column Layout: Budget by Category & Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Card 1: Budget by Infrastructure Category */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100 mb-1">
                <PieChart className="w-3.5 h-3.5" />
                Capital Outlay Distribution
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Budget by Category
              </h3>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {analytics.categories.length} Sectors
            </span>
          </div>

          <div className="space-y-4">
            {analytics.categories.map((cat, idx) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="font-bold text-gray-800">
                      {cat.category}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      ({cat.count} {cat.count === 1 ? 'project' : 'projects'})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-gray-900">
                      {formatPHP(cat.totalBudget)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1.5 font-bold">
                      ({cat.percentage}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${
                      idx === 0
                        ? 'bg-blue-600'
                        : idx === 1
                          ? 'bg-emerald-500'
                          : idx === 2
                            ? 'bg-indigo-500'
                            : idx === 3
                              ? 'bg-amber-500'
                              : 'bg-slate-500'
                    }`}
                    style={{ width: `${Math.max(5, cat.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Status Breakdown & Delivery Ratios */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 mb-1">
                <Layers className="w-3.5 h-3.5" />
                Physical Implementation
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Project Status Breakdown
              </h3>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {analytics.totalProjects} Total
            </span>
          </div>

          <div className="space-y-4">
            {analytics.statusDistribution.map(stat => (
              <div key={stat.status} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        stat.status === 'Completed'
                          ? 'bg-emerald-500'
                          : stat.status === 'On-Going'
                            ? 'bg-amber-500'
                            : stat.status === 'Terminated'
                              ? 'bg-rose-500'
                              : 'bg-blue-500'
                      }`}
                    />
                    <span className="font-bold text-gray-800">
                      {stat.status}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      ({stat.count} {stat.count === 1 ? 'project' : 'projects'})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-gray-900">
                      {formatPHP(stat.totalBudget)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1.5 font-bold">
                      ({stat.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${
                      stat.status === 'Completed'
                        ? 'bg-emerald-500'
                        : stat.status === 'On-Going'
                          ? 'bg-amber-500'
                          : stat.status === 'Terminated'
                            ? 'bg-rose-500'
                            : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.max(5, stat.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Takeaway insight badge */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-700 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Delivery Efficiency Rate
            </div>
            <p className="text-slate-600 leading-relaxed">
              {analytics.totalProjects > 0
                ? `${Math.round((analytics.completedCount / analytics.totalProjects) * 100)}% of tracked Trece Martires public works have reached 100% completion, representing ${formatPHP(
                    analytics.statusDistribution.find(
                      s => s.status === 'Completed'
                    )?.totalBudget || 0
                  )} in delivered civic infrastructure.`
                : 'Evaluating project execution.'}
            </p>
          </div>
        </div>
      </div>

      {/* Top Contractors Leaderboard */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-1">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Procurement &amp; Awardees
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              Top Contractors by Total Awarded Value
            </h3>
          </div>
          <p className="text-xs text-gray-500">
            Ranked by cumulative GAA project appropriation under Cavite 1st DEO
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4 min-w-[240px]">Contractor Entity</th>
                <th className="py-3 px-4 text-center">Projects</th>
                <th className="py-3 px-4 text-right">Total Awarded (PHP)</th>
                <th className="py-3 px-4 text-center">Avg Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {analytics.topContractors.map((c, i) => (
                <tr
                  key={c.name}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                    #{i + 1}
                  </td>
                  <td className="py-3.5 px-4 text-gray-900 font-bold">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-md text-xs">
                      {c.projectCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900 whitespace-nowrap">
                    ₱{c.totalBudget.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="w-20 mx-auto space-y-1">
                      <div className="text-[11px] font-bold text-slate-700">
                        {c.averageProgress}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            c.averageProgress === 100
                              ? 'bg-emerald-500'
                              : c.averageProgress >= 50
                                ? 'bg-blue-600'
                                : 'bg-amber-500'
                          }`}
                          style={{ width: `${c.averageProgress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
