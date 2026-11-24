'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { FacilityComparisonItem } from '@/types';
import { formatKwh, formatNumber } from '@/lib/utils';

interface FacilityComparisonChartProps {
  data: FacilityComparisonItem[];
}

export function FacilityComparisonChart({ data }: FacilityComparisonChartProps) {
  const chartData = data.map((item) => ({
    name: item.name.length > 18 ? `${item.name.slice(0, 16)}…` : item.name,
    fullName: item.name,
    'Current Period': item.currentPeriodKwh,
    'Prior Baseline': item.previousPeriodKwh,
    changePercent: item.changePercent,
  }));

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      {/* Chart Title Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
              Campus Facilities Comparative Load
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Side-by-side consumption variance comparing active period against previous baseline
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-emerald-500" />
            <span className="text-slate-300">Current Period</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded bg-slate-700" />
            <span className="text-slate-400">Prior Baseline</span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  const currentVal = payload[0].value as number;
                  const priorVal = payload[1]?.value as number;
                  const change = item.changePercent;
                  const isUp = change > 0;

                  return (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs shadow-xl backdrop-blur-md">
                      <p className="font-semibold text-slate-100">{item.fullName}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-400">Current:</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {formatKwh(currentVal)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-slate-400">Baseline:</span>
                          <span className="font-mono text-slate-300">
                            {formatKwh(priorVal)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 border-t border-slate-800 pt-1">
                          <span className="text-slate-400">Variance:</span>
                          <span
                            className={
                              isUp
                                ? 'font-mono font-bold text-rose-400'
                                : 'font-mono font-bold text-emerald-400'
                            }
                          >
                            {isUp ? '+' : ''}
                            {change.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="Current Period" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Prior Baseline" fill="#334155" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
