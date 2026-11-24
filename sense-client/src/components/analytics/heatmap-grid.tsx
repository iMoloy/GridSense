'use client';

import { useState } from 'react';
import { Grid, Sparkles, AlertCircle } from 'lucide-react';
import type { HeatmapPoint } from '@/types';
import { cn, formatKwh } from '@/lib/utils';

interface HeatmapGridProps {
  data: HeatmapPoint[];
}

export function HeatmapGrid({ data }: HeatmapGridProps) {
  const [hoveredCell, setHoveredCell] = useState<HeatmapPoint | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Group data by `${day}-${hour}` for O(1) lookup
  const lookup = new Map<string, HeatmapPoint>();
  for (const point of data) {
    lookup.set(`${point.day}-${point.hour}`, point);
  }

  // Color intensities matching GridSense dark theme
  const getCellColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return 'bg-slate-900 border-slate-800/80 hover:ring-1 hover:ring-slate-700'; // Minimal draw
      case 1:
        return 'bg-emerald-950/40 border-emerald-900/30 text-emerald-400 hover:ring-1 hover:ring-emerald-600'; // Light draw
      case 2:
        return 'bg-emerald-800/60 border-emerald-700/40 text-emerald-200 hover:ring-1 hover:ring-emerald-400'; // Standard working
      case 3:
        return 'bg-amber-600/60 border-amber-500/40 text-amber-100 hover:ring-1 hover:ring-amber-300'; // Elevated draw
      case 4:
        return 'bg-rose-600/80 border-rose-500/50 text-rose-50 shadow-sm shadow-rose-900/50 hover:ring-2 hover:ring-rose-400'; // Critical Peak
      default:
        return 'bg-slate-900 border-slate-800';
    }
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Grid className="h-4 w-4 text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
              Campus Load Intensity Matrix (Hour × Day)
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Heatmap revealing persistent nighttime baselines and high-tariff peak windows (6 PM – 10 PM)
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>Low</span>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-xs border border-slate-800 bg-slate-900" />
            <span className="h-3 w-3 rounded-xs border border-emerald-900/30 bg-emerald-950/60" />
            <span className="h-3 w-3 rounded-xs border border-emerald-700/40 bg-emerald-800/60" />
            <span className="h-3 w-3 rounded-xs border border-amber-500/40 bg-amber-600/60" />
            <span className="h-3 w-3 rounded-xs border border-rose-500/50 bg-rose-600/80" />
          </div>
          <span>Critical Peak</span>
        </div>
      </div>

      {/* Responsive Horizontal Container */}
      <div className="mt-6 overflow-x-auto pb-3">
        <div className="min-w-[700px]">
          {/* Hour Headers (0 to 23) */}
          <div className="grid grid-cols-[48px_repeat(24,1fr)] gap-1 text-center font-mono text-[10px] text-slate-400">
            <div className="text-left font-sans text-xs">Day</div>
            {hours.map((h) => (
              <div key={h} className="truncate">
                {h % 3 === 0 ? `${h}h` : ''}
              </div>
            ))}
          </div>

          {/* Day Rows */}
          <div className="mt-2 space-y-1.5">
            {days.map((day) => (
              <div
                key={day}
                className="grid grid-cols-[48px_repeat(24,1fr)] items-center gap-1"
              >
                <span className="text-xs font-semibold text-slate-300">{day}</span>
                {hours.map((hour) => {
                  const cell = lookup.get(`${day}-${hour}`) || {
                    day,
                    hour,
                    value: 1200,
                    intensity: 0,
                  };

                  const isPeakHour = hour >= 18 && hour <= 22;

                  return (
                    <button
                      key={hour}
                      type="button"
                      onMouseEnter={() => setHoveredCell(cell)}
                      onFocus={() => setHoveredCell(cell)}
                      aria-label={`${day} at ${hour}:00 - ${formatKwh(cell.value)}`}
                      className={cn(
                        'h-7 w-full rounded border transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400',
                        getCellColor(cell.intensity),
                        isPeakHour && 'ring-offset-1 ring-offset-slate-950'
                      )}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Tooltip / Inspector Status Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs">
        {hoveredCell ? (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-200">
              <span className="font-semibold text-emerald-400">
                {hoveredCell.day} {hoveredCell.hour.toString().padStart(2, '0')}:00
              </span>
              <span>—</span>
              <span className="font-mono font-bold text-slate-100">
                {formatKwh(hoveredCell.value)}
              </span>
            </div>

            <span
              className={cn(
                'shrink-0 whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                hoveredCell.intensity === 4
                  ? 'bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/40'
                  : hoveredCell.intensity === 3
                  ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
              )}
            >
              {hoveredCell.intensity === 4
                ? 'High-Tariff Peak (৳8.50/kWh)'
                : hoveredCell.intensity === 3
                ? 'Heavy Afternoon Load'
                : 'Standard Campus Draw'}
            </span>
          </div>
        ) : (
          <span className="text-slate-400">
            Hover or tap any cell in the matrix to inspect hourly load draw and tariff status.
          </span>
        )}

        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>168 telemetry slots synthesized</span>
        </div>
      </div>
    </article>
  );
}
