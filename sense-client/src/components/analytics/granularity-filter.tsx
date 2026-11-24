'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, Zap, DollarSign, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TimeframeOption = '24h' | '7d' | '30d' | '90d';
export type MetricOption = 'kwh' | 'cost' | 'carbon';

interface GranularityFilterProps {
  timeframe?: TimeframeOption;
  metric?: MetricOption;
  onTimeframeChange?: (tf: TimeframeOption) => void;
  onMetricChange?: (metric: MetricOption) => void;
}

export function GranularityFilter({
  timeframe = '7d',
  metric = 'kwh',
  onTimeframeChange,
  onMetricChange,
}: GranularityFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTimeframe = (tf: TimeframeOption) => {
    if (onTimeframeChange) {
      onTimeframeChange(tf);
    } else {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('timeframe', tf);
      router.push(`/dashboard/analytics?${params.toString()}`);
    }
  };

  const handleMetric = (m: MetricOption) => {
    if (onMetricChange) {
      onMetricChange(m);
    } else {
      const params = new URLSearchParams(searchParams?.toString() || '');
      params.set('metric', m);
      router.push(`/dashboard/analytics?${params.toString()}`);
    }
  };

  const timeframes: { label: string; value: TimeframeOption; sub: string }[] = [
    { label: '24h', value: '24h', sub: 'Hourly' },
    { label: '7D', value: '7d', sub: 'Daily' },
    { label: '30D', value: '30d', sub: 'Daily' },
    { label: '90D', value: '90d', sub: 'Weekly' },
  ];

  const metrics: { label: string; value: MetricOption; icon: React.ElementType }[] = [
    { label: 'Energy (kWh)', value: 'kwh', icon: Zap },
    { label: 'Utility (৳)', value: 'cost', icon: DollarSign },
    { label: 'Carbon (kg)', value: 'carbon', icon: Leaf },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4 backdrop-blur-sm">
      {/* Metric Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hidden lg:inline">
          Metric:
        </span>
        {metrics.map((m) => {
          const Icon = m.icon;
          const isActive = metric === m.value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => handleMetric(m.value)}
              className={cn(
                'flex min-h-11 shrink-0 whitespace-nowrap items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40 shadow-sm'
                  : 'border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              <Icon
                className={cn(
                  'h-3.5 w-3.5 shrink-0',
                  isActive ? 'text-emerald-400' : 'text-slate-400'
                )}
              />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Timeframe Selector Pill Group */}
      <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/90 p-1">
        <div className="flex items-center gap-1 px-2 text-slate-400 hidden xs:flex">
          <Calendar className="h-3.5 w-3.5" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Range:</span>
        </div>
        {timeframes.map((tf) => {
          const isActive = timeframe === tf.value;
          return (
            <button
              key={tf.value}
              type="button"
              onClick={() => handleTimeframe(tf.value)}
              className={cn(
                'min-h-11 shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100'
              )}
            >
              <span>{tf.label}</span>
              <span className="ml-1 text-[9px] opacity-70 hidden sm:inline">({tf.sub})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
