import {
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Leaf,
  AlertTriangle,
  Clock,
  Gauge,
} from 'lucide-react';
import { cn, formatKwh, formatCurrency, formatCarbon } from '@/lib/utils';

export type KpiCardType = 'kwh' | 'cost' | 'carbon' | 'peak' | 'anomalies' | 'meters';

interface KpiCardProps {
  type: KpiCardType;
  title: string;
  value: number | string;
  unit?: string;
  changePercent?: number;
  subtitle?: string;
  isPositiveChangeGood?: boolean;
}

export function KpiCard({
  type,
  title,
  value,
  unit,
  changePercent,
  subtitle,
  isPositiveChangeGood = false,
}: KpiCardProps) {
  // Visual configs per type
  const config = {
    kwh: {
      icon: Zap,
      accentColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      format: (val: number | string) =>
        typeof val === 'number' ? formatKwh(val) : val,
    },
    cost: {
      icon: DollarSign,
      accentColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      format: (val: number | string) =>
        typeof val === 'number' ? formatCurrency(val) : val,
    },
    carbon: {
      icon: Leaf,
      accentColor: 'text-lime-400',
      bgColor: 'bg-lime-500/10',
      borderColor: 'border-lime-500/20',
      format: (val: number | string) =>
        typeof val === 'number' ? formatCarbon(val) : val,
    },
    peak: {
      icon: Clock,
      accentColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      format: (val: number | string) =>
        typeof val === 'number' ? `${val.toLocaleString()} kW` : val,
    },
    anomalies: {
      icon: AlertTriangle,
      accentColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      format: (val: number | string) => String(val),
    },
    meters: {
      icon: Gauge,
      accentColor: 'text-violet-400',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/20',
      format: (val: number | string) => String(val),
    },
  }[type];

  const Icon = config.icon;
  const formattedValue = config.format(value);

  const hasTrend = typeof changePercent === 'number';
  const isUp = hasTrend && changePercent > 0;
  const isGood = hasTrend
    ? isPositiveChangeGood
      ? isUp
      : !isUp
    : true;

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl border bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm transition-all hover:bg-slate-900/90 hover:shadow-xl',
        config.borderColor
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-mono text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              {formattedValue}
            </span>
            {unit && (
              <span className="text-xs font-medium text-slate-400">{unit}</span>
            )}
          </div>
        </div>

        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset',
            config.bgColor,
            config.accentColor,
            config.borderColor
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Subtitle / Trend Footer */}
      <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-400">
        {hasTrend ? (
          <div
            className={cn(
              'flex min-w-0 flex-1 items-center gap-1 font-medium',
              isGood ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {isUp ? (
              <TrendingUp className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 shrink-0" />
            )}
            <span className="shrink-0">
              {isUp ? '+' : ''}
              {changePercent.toFixed(1)}%
            </span>
            <span className="truncate text-[11px] text-slate-400">vs prior period</span>
          </div>
        ) : (
          <span className="truncate">{subtitle || 'Real-time telemetry'}</span>
        )}

        <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-400">
          Live
        </span>
      </div>
    </article>
  );
}
