'use client';

import { useState } from 'react';
import { DollarSign, Leaf, Clock, Save, Check } from 'lucide-react';
import type { TariffConfig } from '@/types';
import { updateTariffSettings } from '@/lib/api';

interface TariffRateCardProps {
  initialTariff: TariffConfig;
}

export function TariffRateCard({ initialTariff }: TariffRateCardProps) {
  const [peakRate, setPeakRate] = useState(initialTariff.peakRatePerKwh.toString());
  const [offPeakRate, setOffPeakRate] = useState(initialTariff.offPeakRatePerKwh.toString());
  const [peakStart, setPeakStart] = useState(initialTariff.peakHoursStart);
  const [peakEnd, setPeakEnd] = useState(initialTariff.peakHoursEnd);
  const [currency, setCurrency] = useState(initialTariff.currency);
  const [carbonFactor, setCarbonFactor] = useState(initialTariff.carbonFactorKgPerKwh.toString());
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateTariffSettings({
      peakRatePerKwh: parseFloat(peakRate) || 8.5,
      offPeakRatePerKwh: parseFloat(offPeakRate) || 6.2,
      peakHoursStart: peakStart,
      peakHoursEnd: peakEnd,
      currency,
      carbonFactorKgPerKwh: parseFloat(carbonFactor) || 0.65,
    });
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Electricity Tariff &amp; Carbon Emission Factors
            </h3>
            <p className="text-xs text-slate-400">
              Dual-tier tariff window schedules and greenhouse gas compliance constants
            </p>
          </div>
        </div>

        <span className="shrink-0 whitespace-nowrap rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 ring-1 ring-cyan-500/20">
          Dual-Tariff Active
        </span>
      </div>

      <form onSubmit={handleSave} className="mt-5 space-y-4">
        {/* Tariff Rates Split */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="peak-rate" className="block text-xs font-semibold text-slate-200">
              Peak Hours Tariff ({currency}/kWh) *
            </label>
            <input
              id="peak-rate"
              type="number"
              step="0.01"
              required
              value={peakRate}
              onChange={(e) => setPeakRate(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 font-mono text-sm text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="offpeak-rate" className="block text-xs font-semibold text-slate-200">
              Off-Peak Tariff ({currency}/kWh) *
            </label>
            <input
              id="offpeak-rate"
              type="number"
              step="0.01"
              required
              value={offPeakRate}
              onChange={(e) => setOffPeakRate(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 font-mono text-sm text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="currency-select" className="block text-xs font-semibold text-slate-200">
              Billing Currency
            </label>
            <select
              id="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 text-xs font-semibold text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="BDT">BDT (৳ Bangladeshi Taka)</option>
              <option value="USD">USD ($ US Dollar)</option>
              <option value="EUR">EUR (€ Euro)</option>
              <option value="GBP">GBP (£ British Pound)</option>
            </select>
          </div>
        </div>

        {/* Peak Window Hours & Carbon Factor */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="peak-start" className="block text-xs font-semibold text-slate-200">
              Peak Window Start (24h)
            </label>
            <input
              id="peak-start"
              type="text"
              value={peakStart}
              onChange={(e) => setPeakStart(e.target.value)}
              placeholder="18:00"
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 font-mono text-xs text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="peak-end" className="block text-xs font-semibold text-slate-200">
              Peak Window End (24h)
            </label>
            <input
              id="peak-end"
              type="text"
              value={peakEnd}
              onChange={(e) => setPeakEnd(e.target.value)}
              placeholder="22:00"
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 font-mono text-xs text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="carbon-factor" className="block text-xs font-semibold text-slate-200">
              Grid Emission Factor (kg CO₂/kWh)
            </label>
            <input
              id="carbon-factor"
              type="number"
              step="0.01"
              value={carbonFactor}
              onChange={(e) => setCarbonFactor(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 font-mono text-sm text-lime-400 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          {isSaved ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
              <Check className="h-4 w-4" />
              <span>Tariff schedules updated and applied to rollups</span>
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">Rates auto-calculate across all 50,000+ reading aggregations.</span>
          )}

          <button
            type="submit"
            className="flex min-h-11 items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <Save className="h-4 w-4" />
            <span>Update Rates</span>
          </button>
        </div>
      </form>
    </article>
  );
}
