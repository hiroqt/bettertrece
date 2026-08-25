import { DpwhSummaryStats } from '../../data/transparency/dpwhTransparency';
import { useCountUp } from '../../hooks/useCountUp';
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
  // Smooth number counting animations on load / filter change
  const animatedBudget = useCountUp(stats.totalBudget, 1000);
  const animatedPaid = useCountUp(stats.totalPaid, 1000);
  const animatedProgress = useCountUp(stats.avgProgress, 900);
  const animatedCompleted = useCountUp(stats.completedCount, 750);
  const animatedOngoing = useCountUp(stats.ongoingCount, 750);
  const animatedTerminated = useCountUp(stats.terminatedCount, 750);
  const animatedProjects = useCountUp(stats.totalProjects, 750);

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
      {/* Total Trece Martires Investment - Blue Gradient Card */}
      <div className="bg-gradient-to-br from-[#00225e] to-[#003893] text-white p-5 rounded-2xl shadow-sm border border-blue-800/40 hover:shadow-md transition-all">
        <div className="flex items-center justify-between text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>City Infrastructure Budget</span>
          <Landmark className="w-4 h-4 text-amber-300" />
        </div>
        <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300 tracking-tight">
          {formatPHP(animatedBudget)}
        </div>
        <div className="text-xs text-blue-100/90 mt-2 flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-300" />
          <span>{animatedProjects} DPWH Projects in Trece Martires</span>
        </div>
      </div>

      {/* Disbursed Amount / Active Funding */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all">
        <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Disbursed / Completed Value</span>
          <Building2 className="w-4 h-4 text-zinc-900" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono tracking-tight">
          {formatPHP(animatedPaid)}
        </div>
        <div className="text-xs text-zinc-600 mt-2 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-zinc-900" />
          <span>Cavite 1st District Engineering Office</span>
        </div>
      </div>

      {/* Average Progress */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all">
        <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Avg. Physical Completion</span>
          <TrendingUp className="w-4 h-4 text-zinc-900" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono flex items-baseline gap-2">
          <span>{animatedProgress}%</span>
          <span className="text-xs font-semibold text-zinc-600">
            Completion
          </span>
        </div>
        <div className="w-full bg-zinc-100 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className="bg-zinc-900 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, animatedProgress)}%` }}
          />
        </div>
      </div>

      {/* Project Status Breakdown */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all">
        <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
          <span>Project Status Breakdown</span>
          <ShieldCheck className="w-4 h-4 text-zinc-900" />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-medium">Completed</span>
            <span className="text-lg font-bold text-zinc-900 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-zinc-900" />
              {animatedCompleted}
            </span>
          </div>
          <div className="h-8 w-px bg-zinc-200" />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-medium">On-Going</span>
            <span className="text-lg font-bold text-zinc-900 font-mono">
              {animatedOngoing}
            </span>
          </div>
          <div className="h-8 w-px bg-zinc-200" />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-medium">
              Terminated
            </span>
            <span className="text-lg font-bold text-zinc-400 font-mono">
              {animatedTerminated}
            </span>
          </div>
        </div>
        <div className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
          <Clock className="w-3 h-3 text-zinc-400" />
          <span>Filter: {currentFilter}</span>
        </div>
      </div>
    </div>
  );
}
