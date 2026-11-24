'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Activity, Calendar } from 'lucide-react';
import type { TimeSeriesPoint } from '@/types';
import { cn, formatKwh } from '@/lib/utils';

interface ConsumptionChartProps {
  data: TimeSeriesPoint[];
  title?: string;
  onTimeframeChange?: (timeframe: string) => void;
}

export function ConsumptionChart({
  data,
  title = '24-Hour Energy Consumption Curve',
  onTimeframeChange,
}: ConsumptionChartProps) {
  const [activeRange, setActiveRange] = useState('24h');

  const handleRange = (range: string) => {
    setActiveRange(range);
    if (onTimeframeChange) {
      onTimeframeChange(range);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      {/* Header with Title & Granularity Switcher */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <h2 className="text-base font-semibold text-slate-100 sm:text-lg">
              {title}
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Continuous meter telemetry aggregated from PostgreSQL time-series store
          </p>
        </div>

        {/* Timeframe Toggles */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950 p-1">
          {[
            { label: '24h', value: '24h' },
            { label: '7D', value: '7d' },
            { label: '30D', value: '30d' },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleRange(item.value)}
              className={cn(
                'min-h-9 min-w-11 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                activeRange === item.value
                  ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Canvas */}
      <div className="mt-6 h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pt = payload[0].payload as TimeSeriesPoint;
                  return (
                    <div className="rounded-xl border border-slate-800 bg-slate-950/95 p-3 shadow-xl backdrop-blur-md">
                      <p className="text-[11px] font-medium text-slate-400">
                        {pt.label} • {pt.timestamp}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-mono text-lg font-bold text-emerald-400">
                          {formatKwh(pt.kwh)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center justify-between gap-4 border-t border-slate-800/80 pt-1 text-[11px] text-slate-400">
                        <span>Cost: ৳{pt.cost.toFixed(0)}</span>
                        <span>CO₂: {pt.carbonKg.toFixed(1)}kg</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="kwh"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#consumptionGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Summary Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-slate-800/60 pt-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Active Meter Telemetry</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Server Aggregation Pipeline</span>
          </div>
        </div>

        <span className="font-mono text-slate-400">
          Total data points: {data.length}
        </span>
      </div>
    </section>
  );
}
