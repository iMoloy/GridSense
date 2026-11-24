import { Building2, Layers, Briefcase, Gauge, Zap } from 'lucide-react';
import type { OrganizationHierarchy } from '@/types';

interface HierarchySummaryCardsProps {
  hierarchy: OrganizationHierarchy;
}

export function HierarchySummaryCards({ hierarchy }: HierarchySummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Facilities</span>
          <Building2 className="h-4 w-4 text-emerald-400" />
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
          {hierarchy.totalBuildings}
        </p>
        <p className="mt-1 text-[11px] text-slate-400">Major campus buildings</p>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Floors</span>
          <Layers className="h-4 w-4 text-cyan-400" />
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
          {hierarchy.totalFloors}
        </p>
        <p className="mt-1 text-[11px] text-slate-400">Structural levels</p>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Departments</span>
          <Briefcase className="h-4 w-4 text-amber-400" />
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
          {hierarchy.totalDepartments}
        </p>
        <p className="mt-1 text-[11px] text-slate-400">Cost &amp; operational centers</p>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Sub-Meters</span>
          <Gauge className="h-4 w-4 text-purple-400" />
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
          {hierarchy.totalMeters}
        </p>
        <p className="mt-1 text-[11px] text-slate-400">Telemetry sensors</p>
      </div>

      <div className="col-span-2 sm:col-span-1 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-lg backdrop-blur-sm sm:p-5">
        <div className="flex items-center justify-between text-emerald-400">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Coincident Draw
          </span>
          <Zap className="h-4 w-4" />
        </div>
        <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-emerald-300 sm:text-3xl">
          {hierarchy.totalLoadKw.toFixed(1)} <span className="text-sm font-sans font-normal text-emerald-400">kW</span>
        </p>
        <p className="mt-1 text-[11px] text-slate-400">Total campus instantaneous draw</p>
      </div>
    </div>
  );
}
