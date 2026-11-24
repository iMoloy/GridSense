'use client';

import { useState } from 'react';
import { X, ShieldAlert, Check } from 'lucide-react';
import type { AlertRuleItem, AlertScope } from '@/types';

interface CreateRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRuleCreated: (rule: AlertRuleItem) => void;
}

export function CreateRuleModal({
  isOpen,
  onClose,
  onRuleCreated,
}: CreateRuleModalProps) {
  const [name, setName] = useState('');
  const [scope, setScope] = useState<AlertScope>('BUILDING');
  const [targetName, setTargetName] = useState('Science Complex & Laboratories');
  const [metric, setMetric] = useState('HOURLY_CONSUMPTION');
  const [condition, setCondition] = useState('GREATER_THAN');
  const [threshold, setThreshold] = useState('180');
  const [unit, setUnit] = useState('kWh');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRule: AlertRuleItem = {
      id: `rule-${Date.now()}`,
      orgId: 'org-dhaka-campus',
      name: name.trim(),
      scope,
      scopeTargetName: targetName,
      metric,
      condition,
      threshold: parseFloat(threshold) || 100,
      unit,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    onRuleCreated(newRule);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h3 id="modal-title" className="text-base font-bold text-slate-100">
                Configure New Alert Rule
              </h3>
              <p className="text-xs text-slate-400">
                Set threshold and anomaly monitoring criteria
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="rule-name" className="block text-xs font-semibold text-slate-200">
              Rule Name *
            </label>
            <input
              id="rule-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nanotech Cleanroom Spike Cap"
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rule-scope" className="block text-xs font-semibold text-slate-200">
                Monitoring Scope
              </label>
              <select
                id="rule-scope"
                value={scope}
                onChange={(e) => setScope(e.target.value as AlertScope)}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="CAMPUS">All Campus (Org-Wide)</option>
                <option value="BUILDING">Single Building</option>
                <option value="FLOOR">Single Floor</option>
                <option value="DEPT">Department Level</option>
                <option value="METER">Sub-Meter Direct</option>
              </select>
            </div>

            <div>
              <label htmlFor="rule-target" className="block text-xs font-semibold text-slate-200">
                Target Facility
              </label>
              <input
                id="rule-target"
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                placeholder="Facility or meter name"
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rule-metric" className="block text-xs font-semibold text-slate-200">
                Evaluation Metric
              </label>
              <select
                id="rule-metric"
                value={metric}
                onChange={(e) => {
                  setMetric(e.target.value);
                  if (e.target.value === 'Z_SCORE_SPIKE') {
                    setUnit('σ (StdDev)');
                    setThreshold('3.0');
                  } else {
                    setUnit('kWh');
                    setThreshold('180');
                  }
                }}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="HOURLY_CONSUMPTION">Hourly Consumption</option>
                <option value="PEAK_DEMAND">Peak Instantaneous Draw</option>
                <option value="Z_SCORE_SPIKE">Statistical Z-Score Spike</option>
              </select>
            </div>

            <div>
              <label htmlFor="rule-threshold" className="block text-xs font-semibold text-slate-200">
                Threshold Limit ({unit})
              </label>
              <input
                id="rule-threshold"
                type="number"
                step="any"
                required
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm font-mono text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex min-h-11 items-center gap-1.5 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
            >
              <Check className="h-4 w-4" />
              <span>Save &amp; Activate Rule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
