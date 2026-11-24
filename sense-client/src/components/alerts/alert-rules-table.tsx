'use client';

import { useState } from 'react';
import { ShieldCheck, Plus, ToggleLeft, ToggleRight, SlidersHorizontal } from 'lucide-react';
import type { AlertRuleItem } from '@/types';
import { cn } from '@/lib/utils';

interface AlertRulesTableProps {
  initialRules: AlertRuleItem[];
  onOpenCreateModal: () => void;
}

export function AlertRulesTable({
  initialRules,
  onOpenCreateModal,
}: AlertRulesTableProps) {
  const [rules, setRules] = useState<AlertRuleItem[]>(initialRules);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const getScopeBadge = (scope: string) => {
    switch (scope) {
      case 'ORG':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'BUILDING':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'FLOOR':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'DEPT':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'METER':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      {/* Title & Add Rule Button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
              Configured Threshold &amp; Anomaly Rules
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            Automated monitoring rules across campus hierarchy levels
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Plus className="h-4 w-4" />
          <span>New Alert Rule</span>
        </button>
      </div>

      {/* Rules Table */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 text-[10px] uppercase tracking-wider text-slate-400">
              <th className="pb-3 font-semibold">Rule Name</th>
              <th className="pb-3 font-semibold">Scope</th>
              <th className="pb-3 font-semibold">Metric &amp; Condition</th>
              <th className="pb-3 font-semibold">Threshold</th>
              <th className="pb-3 text-right font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {rules.map((rule) => (
              <tr key={rule.id} className="transition-colors hover:bg-slate-950/40">
                <td className="py-3.5 pr-3">
                  <p className="font-semibold text-slate-100">{rule.name}</p>
                  {rule.scopeTargetName && (
                    <p className="text-[11px] text-slate-400">{rule.scopeTargetName}</p>
                  )}
                </td>

                <td className="py-3.5 pr-3">
                  <span
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                      getScopeBadge(rule.scope)
                    )}
                  >
                    {rule.scope}
                  </span>
                </td>

                <td className="py-3.5 pr-3">
                  <span className="font-mono text-slate-300">
                    {rule.metric.replace(/_/g, ' ')} ({rule.condition})
                  </span>
                </td>

                <td className="py-3.5 pr-3">
                  <span className="font-mono font-bold text-emerald-400">
                    {rule.threshold} {rule.unit}
                  </span>
                </td>

                <td className="py-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => toggleRule(rule.id)}
                    aria-label={`Toggle rule ${rule.name}`}
                    className="inline-flex min-h-11 items-center gap-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg px-2"
                  >
                    <span
                      className={cn(
                        'text-[10px] font-semibold uppercase',
                        rule.isActive ? 'text-emerald-400' : 'text-slate-400'
                      )}
                    >
                      {rule.isActive ? 'Active' : 'Paused'}
                    </span>
                    {rule.isActive ? (
                      <ToggleRight className="h-6 w-6 text-emerald-400" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-slate-400" />
                    )}
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
