'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sun, Moon } from 'lucide-react';
import type { PeakDistribution } from '@/types';
import { formatKwh } from '@/lib/utils';

interface PeakDistributionChartProps {
  distribution: PeakDistribution;
}

export function PeakDistributionChart({ distribution }: PeakDistributionChartProps) {
  const chartData = [
    {
      name: 'Peak Hours (6PM - 10PM)',
      value: distribution.peakKwh,
      percentage: distribution.peakPercentage,
      color: '#f59e0b', // Amber
    },
    {
      name: 'Off-Peak Hours',
      value: distribution.offPeakKwh,
      percentage: distribution.offPeakPercentage,
      color: '#10b981', // Emerald
    },
  ];

  return (
    <article className="flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm">
      <div>
        <h3 className="text-base font-semibold text-slate-100">
          Peak vs Off-Peak Load
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">
          Tariff distribution analysis (6PM–10PM Peak Window)
        </p>
      </div>

      {/* Donut Chart Canvas */}
      <div className="relative my-auto h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="#090d16" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs shadow-lg">
                      <p className="font-semibold text-slate-200">{item.name}</p>
                      <p className="mt-1 font-mono text-emerald-400">
                        {formatKwh(item.value)} ({item.percentage.toFixed(1)}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-xl font-bold text-slate-100">
            {distribution.peakPercentage.toFixed(0)}%
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400">
            Peak Share
          </span>
        </div>
      </div>

      {/* Breakdown Legend */}
      <div className="mt-3 space-y-2 border-t border-slate-800/80 pt-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Sun className="h-3.5 w-3.5" />
            </span>
            <span className="text-slate-300">Peak Hours (Higher Tariff)</span>
          </div>
          <span className="font-mono font-semibold text-slate-200">
            {formatKwh(distribution.peakKwh)}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Moon className="h-3.5 w-3.5" />
            </span>
            <span className="text-slate-300">Off-Peak (Base Tariff)</span>
          </div>
          <span className="font-mono font-semibold text-slate-200">
            {formatKwh(distribution.offPeakKwh)}
          </span>
        </div>
      </div>
    </article>
  );
}
