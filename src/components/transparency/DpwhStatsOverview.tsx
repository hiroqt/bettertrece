import { DpwhSummaryStats } from '../../data/dpwhTransparency';
import {
  Building2,
  TrendingUp,
  Landmark,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface DpwhStatsOverviewProps {
  stats: DpwhSummaryStats;
  currentFilter: string;
}

export default function DpwhStatsOverview({
  stats,
  currentFilter,
}: DpwhStatsOverviewProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Trece Martires Investment */}
      <div className="bg-gradient-to-br from-[#00225e] to-[#003893] text-white p-5 rounded-2xl shadow-sm border border-blue-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between text-blue-200 text-xs font-semibold mb-2">
          <span>CITY INFRASTRUCTURE BUDGET</span>
          <Landmark className="w-4 h-4 text-amber-300" />
        </div>
        <div className="text-2xl sm:text-3xl font-black font-mono text-white">
          {formatPHP(stats.totalBudget)}
        </div>
        <div className="text-xs text-blue-100/90 mt-2 flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{stats.totalProjects} DPWH Projects in Trece Martires</span>
        </div>
      </div>

      {/* Disbursed Amount / Active Funding */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
          <span>DISBURSED / COMPLETED VALUE</span>
          <Building2 className="w-4 h-4 text-[#003893]" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
          {formatPHP(stats.totalPaid)}
        </div>
        <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-[#003893]" />
          <span>Cavite 1st District Engineering Office</span>
        </div>
      </div>

      {/* Average Progress */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
          <span>AVG. PHYSICAL COMPLETION</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono flex items-baseline gap-2">
          <span>{stats.avgProgress}%</span>
          <span className="text-xs font-semibold text-emerald-600">
            Completion
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, stats.avgProgress)}%` }}
          />
        </div>
      </div>

      {/* Project Status Breakdown */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
          <span>PROJECT STATUS BREAKDOWN</span>
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Completed</span>
            <span className="text-lg font-bold text-emerald-700 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {stats.completedCount}
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">On-Going</span>
            <span className="text-lg font-bold text-amber-600 font-mono">
              {stats.ongoingCount}
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">
              Terminated
            </span>
            <span className="text-lg font-bold text-gray-400 font-mono">
              {stats.terminatedCount}
            </span>
          </div>
        </div>
        <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Filter: {currentFilter}</span>
        </div>
      </div>
    </div>
  );
}
