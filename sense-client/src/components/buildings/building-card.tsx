import Link from 'next/link';
import { Building2, Layers, Gauge, ArrowRight, Zap, MapPin } from 'lucide-react';
import type { Building } from '@/types';
import { cn, formatKwh, formatNumber } from '@/lib/utils';

interface BuildingCardProps {
  building: Building;
}

export function BuildingCard({ building }: BuildingCardProps) {
  const loadKwh = building.currentLoadKwh || 0;

  // Determine load level
  const loadStatus =
    loadKwh > 12000
      ? { label: 'Heavy Load', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' }
      : loadKwh > 8000
      ? { label: 'Moderate Load', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' }
      : { label: 'Optimal Load', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl sm:p-6">
      <div>
        {/* Top Header & Status */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300 ring-1 ring-slate-700 transition-all group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:ring-emerald-500/30">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-bold text-slate-100 transition-colors group-hover:text-emerald-300 sm:text-base">
                {building.name}
              </h3>
              {building.address && (
                <p className="flex items-center gap-1 text-[11px] text-slate-400">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{building.address}</span>
                </p>
              )}
            </div>
          </div>

          <span
            className={cn(
              'shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
              loadStatus.color
            )}
          >
            {loadStatus.label}
          </span>
        </div>

        {/* Building Metrics Grid */}
        <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl bg-slate-950/60 p-3 text-center border border-slate-800/60">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Floors</p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-200">
              {building.floorsCount || 4}
            </p>
          </div>

          <div className="border-x border-slate-800">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Meters</p>
            <p className="mt-1 font-mono text-sm font-bold text-emerald-400">
              {building.metersCount || 24}
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Area</p>
            <p className="mt-1 font-mono text-xs font-semibold text-slate-300">
              {building.totalArea ? `${formatNumber(building.totalArea)} sqft` : 'N/A'}
            </p>
          </div>
        </div>

        {/* Live Draw Metric */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>24h Consumption</span>
          </div>
          <span className="font-mono font-bold text-slate-100">
            {formatKwh(loadKwh)}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 border-t border-slate-800/80 pt-4">
        <Link
          href={`/dashboard/buildings/${building.id}`}
          className="flex min-h-11 w-full items-center justify-between rounded-xl bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span>Explore Floors &amp; Meters</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
