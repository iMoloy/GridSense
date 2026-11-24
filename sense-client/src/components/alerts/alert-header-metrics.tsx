import { AlertCircle, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

interface AlertHeaderMetricsProps {
  criticalCount: number;
  warningCount: number;
  activeRulesCount: number;
  totalResolvedCount: number;
}

export function AlertHeaderMetrics({
  criticalCount,
  warningCount,
  activeRulesCount,
  totalResolvedCount,
}: AlertHeaderMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {/* Critical Anomalies */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">
            Critical Anomalies
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400">
            <AlertCircle className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-rose-200 sm:text-3xl">
          {criticalCount}
        </p>
        <p className="mt-1 text-[11px] text-rose-300/80">Requires immediate dispatch</p>
      </div>

      {/* Warning Thresholds */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            Warning Alerts
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-amber-200 sm:text-3xl">
          {warningCount}
        </p>
        <p className="mt-1 text-[11px] text-amber-300/80">Threshold buffer excursions</p>
      </div>

      {/* Active Rules Monitored */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Monitored Rules
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
            <ShieldCheck className="h-4 w-4" />
          </div>
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
          {activeRulesCount}
        </p>
        <p className="mt-1 text-[11px] text-slate-400">Org &amp; sub-meter scopes</p>
      </div>

      {/* Automated Z-Score Engine */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Z-Score Engine
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Activity className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-lg font-bold text-emerald-300 sm:text-xl">
            Active
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-400">30-day rolling baseline</p>
      </div>
    </div>
  );
}
