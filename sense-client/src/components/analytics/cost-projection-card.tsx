import { DollarSign, TrendingDown, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import type { CostProjectionData } from '@/types';
import { formatCurrency, formatKwh } from '@/lib/utils';

interface CostProjectionCardProps {
  projection: CostProjectionData;
}

export function CostProjectionCard({ projection }: CostProjectionCardProps) {
  const percentUsed = Math.min(
    Math.round((projection.projectedMonthEndCost / projection.budgetLimitCost) * 100),
    100
  );

  const isUnderBudget = projection.projectedMonthEndCost <= projection.budgetLimitCost;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-cyan-400" />
            <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
              Utility Cost Projection &amp; Tariff Audit
            </h3>
          </div>

          <span
            className={
              isUnderBudget
                ? 'shrink-0 whitespace-nowrap rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/20'
                : 'shrink-0 whitespace-nowrap rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 ring-1 ring-rose-500/20'
            }
          >
            {isUnderBudget ? 'Within Budget' : 'Exceeding Budget'}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Monthly expenditure forecasting based on current burn rate and dual-tier tariff (৳8.50 Peak / ৳6.20 Off-Peak)
        </p>

        {/* Budget Progress Bar */}
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-slate-400">Projected Month-End</span>
            <div className="text-right">
              <span className="font-mono text-xl font-bold text-slate-100 sm:text-2xl">
                {formatCurrency(projection.projectedMonthEndCost)}
              </span>
              <span className="ml-1 text-xs text-slate-400">
                / {formatCurrency(projection.budgetLimitCost)} cap
              </span>
            </div>
          </div>

          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isUnderBudget ? 'bg-cyan-500' : 'bg-rose-500'
              }`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Burned to date: {formatCurrency(projection.actualToDateCost)}</span>
            <span className="font-mono">{percentUsed}% of budget cap</span>
          </div>
        </div>

        {/* Tariff Distribution Split */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-amber-400">
              Peak Hours Cost (36%)
            </p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-100">
              {formatCurrency(projection.peakTariffCost)}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">৳8.50/kWh Peak Tariff</p>
          </div>

          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-3">
            <p className="text-[10px] uppercase tracking-wider text-emerald-400">
              Off-Peak Cost (64%)
            </p>
            <p className="mt-1 font-mono text-sm font-bold text-slate-100">
              {formatCurrency(projection.offPeakTariffCost)}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">৳6.20/kWh Base Tariff</p>
          </div>
        </div>
      </div>

      {/* Optimization Savings Insight */}
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
          <TrendingDown className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-emerald-300">
            Load Shifting Opportunity: {formatCurrency(projection.potentialSavingsCost)}/mo
          </p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Shifting 15% of flexible lab chiller and pumping loads to off-peak slots saves approximately ৳38,500 monthly.
          </p>
        </div>
      </div>
    </article>
  );
}
