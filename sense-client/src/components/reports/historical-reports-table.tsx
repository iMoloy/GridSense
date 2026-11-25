'use client';

import { FileText, Download, CheckCircle2, Clock } from 'lucide-react';
import type { ReportItem } from '@/types';
import { cn } from '@/lib/utils';

interface HistoricalReportsTableProps {
  reports: ReportItem[];
}

export function HistoricalReportsTable({ reports }: HistoricalReportsTableProps) {
  const getFormatBadge = (fmt: string) => {
    switch (fmt) {
      case 'PDF':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'CSV':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6 print:hidden">
      <div>
        <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
          Historical Audit Archives &amp; Generated Documents
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">
          Pre-compiled compliance summaries, invoices, and regulatory archives
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 text-[10px] uppercase tracking-wider text-slate-400">
              <th className="pb-3 font-semibold">Document Title</th>
              <th className="pb-3 font-semibold">Period</th>
              <th className="pb-3 font-semibold">Format</th>
              <th className="pb-3 font-semibold">Size</th>
              <th className="pb-3 font-semibold">Compiled Date</th>
              <th className="pb-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {reports.map((item) => (
              <tr key={item.id} className="transition-colors hover:bg-slate-950/40">
                <td className="py-3.5 pr-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-100">{item.title}</p>
                      <p className="text-[11px] text-slate-400">Compiled by {item.author}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 pr-3 font-medium text-slate-300">
                  {item.period}
                </td>

                <td className="py-3.5 pr-3">
                  <span
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                      getFormatBadge(item.format)
                    )}
                  >
                    {item.format}
                  </span>
                </td>

                <td className="py-3.5 pr-3 font-mono text-slate-400">
                  {item.sizeKb} KB
                </td>

                <td className="py-3.5 pr-3 text-slate-400">
                  {new Date(item.generatedAt).toLocaleDateString()}
                </td>

                <td className="py-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      // Trigger client download of demo report artifact
                      const text = `Document: ${item.title}\nPeriod: ${item.period}\nCompiled: ${item.generatedAt}\nAuthor: ${item.author}`;
                      const blob = new Blob([text], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${item.id}-${item.period}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    <Download className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
