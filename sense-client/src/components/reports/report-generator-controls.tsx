'use client';

import { Printer, Download, FileSpreadsheet, FileJson, Calendar, Filter } from 'lucide-react';
import type { ReportType } from '@/types';

interface ReportGeneratorControlsProps {
  reportType: ReportType;
  onReportTypeChange: (type: ReportType) => void;
  period: string;
  onPeriodChange: (p: string) => void;
  onPrint: () => void;
  onDownloadCsv: () => void;
  onDownloadJson: () => void;
}

export function ReportGeneratorControls({
  reportType,
  onReportTypeChange,
  period,
  onPeriodChange,
  onPrint,
  onDownloadCsv,
  onDownloadJson,
}: ReportGeneratorControlsProps) {
  const reportTypes: { label: string; value: ReportType }[] = [
    { label: 'Campus Energy Audit', value: 'MONTHLY_AUDIT' },
    { label: 'Peak Tariff & Demand', value: 'PEAK_TARIFF' },
    { label: 'Carbon & ESG Compliance', value: 'CARBON_COMPLIANCE' },
    { label: 'Facility Cost Allocation', value: 'DEPARTMENT_INVOICE' },
  ];

  const periods = [
    { label: 'November 2026 (Current)', value: '2026-11' },
    { label: 'October 2026', value: '2026-10' },
    { label: 'September 2026', value: '2026-09' },
    { label: 'Q3 2026 Summary', value: '2026-Q3' },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-sm print:hidden">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Type & Period Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label htmlFor="report-type" className="sr-only">Report Type</label>
            <select
              id="report-type"
              value={reportType}
              onChange={(e) => onReportTypeChange(e.target.value as ReportType)}
              className="h-11 rounded-xl border border-slate-800 bg-slate-950 px-3.5 text-xs font-semibold text-slate-100 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {reportTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="report-period" className="sr-only">Billing Period</label>
            <select
              id="report-period"
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="h-11 rounded-xl border border-slate-800 bg-slate-950 px-3.5 text-xs font-semibold text-slate-100 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {periods.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onPrint}
            className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Printer className="h-4 w-4" />
            <span>Print / PDF Document</span>
          </button>

          <button
            type="button"
            onClick={onDownloadCsv}
            className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onDownloadJson}
            className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <FileJson className="h-4 w-4 text-cyan-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
}
