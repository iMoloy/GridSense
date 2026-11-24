import Link from 'next/link';
import { Building2, ArrowUpRight, Gauge } from 'lucide-react';
import type { BuildingEnergyShare } from '@/types';
import { formatKwh } from '@/lib/utils';

interface BuildingBreakdownProps {
  buildings: BuildingEnergyShare[];
}

export function BuildingBreakdown({ buildings }: BuildingBreakdownProps) {
  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-100">
            Building Energy Distribution
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Proportional consumption across campus facilities
          </p>
        </div>

        <Link
          href="/dashboard/buildings"
          className="flex min-h-11 items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
        >
          <span>View All</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Buildings List with Progress Meters */}
      <div className="mt-5 space-y-4">
        {buildings.map((item) => (
          <div key={item.buildingId} className="group">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-slate-400 transition-colors group-hover:text-emerald-400" />
                <span className="font-medium text-slate-200">
                  {item.buildingName}
                </span>
                <span className="flex items-center gap-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                  <Gauge className="h-3 w-3" />
                  {item.activeMeters} meters
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-medium text-slate-300">
                  {formatKwh(item.consumptionKwh)}
                </span>
                <span className="w-10 text-right font-mono text-xs font-semibold text-emerald-400">
                  {item.percentage.toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500 group-hover:bg-emerald-400"
                style={{ width: `${Math.min(Math.max(item.percentage, 4), 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
