'use client';

import { useState } from 'react';
import {
  Layers,
  Building,
  Gauge,
  Zap,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import type { FloorWithDepartments, MeterWithReading } from '@/types';
import { cn, formatKwh } from '@/lib/utils';

interface HierarchyViewProps {
  floors: FloorWithDepartments[];
}

export function HierarchyView({ floors }: HierarchyViewProps) {
  // By default expand the first floor
  const [expandedFloors, setExpandedFloors] = useState<Record<string, boolean>>({
    [floors[0]?.id || '']: true,
  });

  const toggleFloor = (floorId: string) => {
    setExpandedFloors((prev) => ({
      ...prev,
      [floorId]: !prev[floorId],
    }));
  };

  const getMeterBadge = (type: string) => {
    switch (type) {
      case 'HVAC':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'LIGHTING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'SOLAR':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'EV_CHARGER':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-4">
      {floors.map((floor) => {
        const isExpanded = !!expandedFloors[floor.id];
        const totalMeters = floor.departments.reduce(
          (acc, d) => acc + d.meters.length,
          0
        );

        return (
          <section
            key={floor.id}
            className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-lg backdrop-blur-sm"
          >
            {/* Floor Trigger Bar */}
            <button
              type="button"
              onClick={() => toggleFloor(floor.id)}
              className="flex min-h-14 w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:px-6"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3 pr-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300 ring-1 ring-slate-700">
                  <Layers className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-bold text-slate-100 sm:text-base">
                    {floor.name}
                  </h4>
                  <p className="truncate text-xs text-slate-400">
                    Level {floor.level} • {floor.departments.length} Departments •{' '}
                    {totalMeters} Connected Meters
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">
                    Floor Load
                  </span>
                  <p className="font-mono text-sm font-bold text-emerald-400">
                    {floor.totalLoadKw.toFixed(1)} kW
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </div>
            </button>

            {/* Expanded Department & Meters Container */}
            {isExpanded && (
              <div className="border-t border-slate-800/80 bg-slate-950/40 p-4 sm:p-6 space-y-6">
                {floor.departments.map((dept) => (
                  <div
                    key={dept.id}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4"
                  >
                    {/* Department Title */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-slate-200">
                          {dept.name}
                        </span>
                        <span className="shrink-0 whitespace-nowrap rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                          {dept.type || 'COMMERCIAL'}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 text-xs">
                        <span className="text-slate-400">Dept Draw:</span>
                        <span className="font-mono font-bold text-slate-200">
                          {dept.totalLoadKw.toFixed(1)} kW
                        </span>
                      </div>
                    </div>

                    {/* Department Meters Grid */}
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {dept.meters.map((meter) => (
                        <div
                          key={meter.id}
                          className="flex flex-col justify-between rounded-lg border border-slate-800/60 bg-slate-950/60 p-3 text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-semibold text-slate-200">
                                {meter.name}
                              </p>
                              <p className="font-mono text-[10px] text-slate-400">
                                SN: {meter.serialNumber}
                              </p>
                            </div>

                            <span
                              className={cn(
                                'shrink-0 whitespace-nowrap rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                                getMeterBadge(meter.meterType)
                              )}
                            >
                              {meter.meterType.replace(/_/g, ' ')}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={cn(
                                  'h-2 w-2 rounded-full',
                                  meter.status === 'ONLINE'
                                    ? 'bg-emerald-400'
                                    : meter.status === 'SPIKE_WARNING'
                                    ? 'bg-amber-400 animate-ping'
                                    : 'bg-slate-600'
                                )}
                              />
                              <span className="text-[11px] text-slate-400">
                                {meter.status === 'ONLINE' ? 'Online' : 'Spike Alert'}
                              </span>
                            </div>

                            <span className="font-mono font-bold text-emerald-400">
                              {meter.currentLoadKw.toFixed(1)} kW
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
