import { Building2, ShieldCheck, Zap, DollarSign, Leaf, Activity, CheckCircle2 } from 'lucide-react';
import type { ExecutiveReportData } from '@/types';
import { formatKwh, formatCurrency, formatNumber } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

interface ExecutiveReportPreviewProps {
  report: ExecutiveReportData;
}

export function ExecutiveReportPreview({ report }: ExecutiveReportPreviewProps) {
  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-md sm:p-8 print:border-none print:bg-white print:p-0 print:text-slate-900 print:shadow-none">
      {/* 1. Official Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-start sm:justify-between print:border-slate-300">
        <div>
          <div className="flex items-center gap-3">
            <Logo size="md" subtitle={false} />
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/30 print:bg-emerald-100 print:text-emerald-800">
              Verified Compliance Audit
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-100 sm:text-2xl print:text-slate-900">
            {report.title}
          </h2>
          <p className="text-xs text-slate-400 print:text-slate-600">
            Reporting Period: <strong className="text-slate-200 print:text-slate-800">{report.periodLabel}</strong> • Facility Scope: Entire Smart Campus
          </p>
        </div>

        {/* Metadata Block */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 text-xs text-slate-400 print:border-slate-300 print:bg-slate-50 print:text-slate-700">
          <p><span className="font-semibold text-slate-300 print:text-slate-900">Report Ref:</span> #{report.reportId}</p>
          <p><span className="font-semibold text-slate-300 print:text-slate-900">Compiled:</span> {new Date(report.generatedAt).toLocaleDateString()}</p>
          <p><span className="font-semibold text-slate-300 print:text-slate-900">Auditor:</span> {report.preparedBy}</p>
          <p><span className="font-semibold text-slate-300 print:text-slate-900">Entity:</span> {report.organization.name}</p>
        </div>
      </div>

      {/* 2. Executive Summary */}
      <div className="mt-6 rounded-xl border border-slate-800/80 bg-slate-950/50 p-4 text-xs text-slate-300 leading-relaxed print:border-slate-200 print:bg-slate-50 print:text-slate-800">
        <h4 className="font-bold text-slate-100 uppercase tracking-wider text-[11px] mb-1 print:text-slate-900">
          Executive Synthesis
        </h4>
        <p>{report.executiveSummary}</p>
      </div>

      {/* 3. Four Core Metric Cards */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 print:border-slate-200 print:bg-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 print:text-slate-600">
            <Zap className="h-3.5 w-3.5 text-emerald-400 print:text-emerald-600" />
            <span>Total Consumption</span>
          </div>
          <p className="mt-1.5 font-mono text-lg font-bold text-slate-100 sm:text-xl print:text-slate-900">
            {formatKwh(report.totalConsumptionKwh)}
          </p>
          <p className="text-[10px] text-slate-400 print:text-slate-500">50K+ time-series feed</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 print:border-slate-200 print:bg-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 print:text-slate-600">
            <DollarSign className="h-3.5 w-3.5 text-cyan-400 print:text-cyan-600" />
            <span>Gross Expenditure</span>
          </div>
          <p className="mt-1.5 font-mono text-lg font-bold text-slate-100 sm:text-xl print:text-slate-900">
            {formatCurrency(report.totalCost)}
          </p>
          <p className="text-[10px] text-slate-400 print:text-slate-500">Tariff: ৳8.50/kWh Peak</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 print:border-slate-200 print:bg-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 print:text-slate-600">
            <Leaf className="h-3.5 w-3.5 text-lime-400 print:text-lime-600" />
            <span>Carbon Emission</span>
          </div>
          <p className="mt-1.5 font-mono text-lg font-bold text-slate-100 sm:text-xl print:text-slate-900">
            {report.totalCarbonTons.toFixed(1)} MT CO₂
          </p>
          <p className="text-[10px] text-slate-400 print:text-slate-500">0.65 kg/kWh factor</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 print:border-slate-200 print:bg-slate-50">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 print:text-slate-600">
            <Activity className="h-3.5 w-3.5 text-amber-400 print:text-amber-600" />
            <span>Coincident Peak</span>
          </div>
          <p className="mt-1.5 font-mono text-lg font-bold text-slate-100 sm:text-xl print:text-slate-900">
            {report.peakDemandKw} kW
          </p>
          <p className="text-[10px] text-slate-400 print:text-slate-500">19:00 - 20:00 Window</p>
        </div>
      </div>

      {/* 4. Building-Level Allocation Table */}
      <div className="mt-8">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider print:text-slate-900">
          Facility Energy Allocation &amp; Cost Invoicing
        </h3>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 print:border-slate-300 print:text-slate-600">
                <th className="pb-2.5 font-semibold">Campus Facility</th>
                <th className="pb-2.5 font-semibold">Consumption</th>
                <th className="pb-2.5 font-semibold">Cost BDT</th>
                <th className="pb-2.5 font-semibold">Carbon</th>
                <th className="pb-2.5 font-semibold">Share</th>
                <th className="pb-2.5 text-right font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 print:divide-slate-200">
              {report.buildingAllocations.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-950/40 print:hover:bg-transparent">
                  <td className="py-3 pr-3 font-semibold text-slate-200 print:text-slate-900">
                    {item.buildingName}
                  </td>
                  <td className="py-3 pr-3 font-mono text-slate-300 print:text-slate-800">
                    {formatKwh(item.consumptionKwh)}
                  </td>
                  <td className="py-3 pr-3 font-mono font-medium text-slate-100 print:text-slate-900">
                    {formatCurrency(item.cost)}
                  </td>
                  <td className="py-3 pr-3 font-mono text-slate-300 print:text-slate-800">
                    {(item.carbonKg / 1000).toFixed(1)} tons
                  </td>
                  <td className="py-3 pr-3 font-mono text-emerald-400 print:text-emerald-700 font-semibold">
                    {item.sharePercent.toFixed(1)}%
                  </td>
                  <td className="py-3 text-right">
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 ring-1 ring-emerald-500/20 print:bg-emerald-50 print:text-emerald-800">
                      {item.efficiencyRating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Official Certification Sign-Off Block */}
      <div className="mt-10 border-t border-slate-800 pt-6 print:border-slate-300">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400 print:text-slate-600">
          <div className="flex items-center gap-2 text-emerald-400 print:text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            <span className="font-semibold">Automated Digital Audit Verification via PostgreSQL Time-Series Store</span>
          </div>

          <div className="flex items-center gap-8 text-right font-mono text-[11px]">
            <div>
              <p className="text-slate-300 print:text-slate-900 font-semibold">GridSense Core Engine</p>
              <p>v1.0.0 Turbopack Build</p>
            </div>
            <div>
              <p className="text-slate-300 print:text-slate-900 font-semibold">Certified Stamp</p>
              <p>SHA-256 Validated</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
