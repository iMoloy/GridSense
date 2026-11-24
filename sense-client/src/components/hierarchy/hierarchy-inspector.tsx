'use client';

import Link from 'next/link';
import {
  Building2,
  Layers,
  Briefcase,
  Gauge,
  Zap,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';
import type { MeterWithReading } from '@/types';
import { cn, formatKwh } from '@/lib/utils';

export type SelectedNodeType = 'ORGANIZATION' | 'BUILDING' | 'FLOOR' | 'DEPARTMENT' | 'METER';

export interface SelectedNodeInfo {
  type: SelectedNodeType;
  id: string;
  name: string;
  subtitle?: string;
  path: string;
  currentLoadKw: number;
  buildingId?: string;
  meter?: MeterWithReading;
  childrenCount?: number;
}

interface HierarchyInspectorProps {
  selectedNode: SelectedNodeInfo | null;
  onClose: () => void;
}

export function HierarchyInspector({ selectedNode, onClose }: HierarchyInspectorProps) {
  if (!selectedNode) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 text-center backdrop-blur-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 ring-1 ring-slate-700">
          <Gauge className="h-6 w-6" />
        </div>
        <h4 className="mt-3 text-sm font-semibold text-slate-200">No Node Selected</h4>
        <p className="mt-1 max-w-xs text-xs text-slate-400">
          Click any facility, floor, department, or sub-meter in the tree to inspect real-time telemetry.
        </p>
      </div>
    );
  }

  const getNodeIcon = (type: SelectedNodeType) => {
    switch (type) {
      case 'BUILDING':
        return Building2;
      case 'FLOOR':
        return Layers;
      case 'DEPARTMENT':
        return Briefcase;
      case 'METER':
        return Gauge;
      default:
        return Building2;
    }
  };

  const Icon = getNodeIcon(selectedNode.type);

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div>
        {/* Top Header & Close */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {selectedNode.type} NODE
              </span>
              <h3 className="mt-1 text-base font-bold text-slate-100">
                {selectedNode.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close inspector"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Path Breadcrumb */}
        <div className="mt-3 text-[11px] font-mono text-slate-400">
          <span>Hierarchy: </span>
          <span className="text-slate-300">{selectedNode.path}</span>
        </div>

        {/* Live Draw Metric */}
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
            Instantaneous Load Draw
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold tracking-tight text-emerald-400">
              {selectedNode.currentLoadKw.toFixed(1)}
            </span>
            <span className="font-mono text-sm text-slate-400">kW</span>
          </div>

          {selectedNode.meter && (
            <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-2.5 text-xs">
              <span className="text-slate-400">Est. 24h Consumption:</span>
              <span className="font-mono font-bold text-slate-200">
                {formatKwh(selectedNode.meter.dailyConsumptionKwh)}
              </span>
            </div>
          )}
        </div>

        {/* Meter Details if selected is a sub-meter */}
        {selectedNode.meter && (
          <div className="mt-4 space-y-2 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Serial Number:</span>
              <span className="font-mono font-semibold text-slate-200">
                {selectedNode.meter.serialNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Classification:</span>
              <span className="font-semibold text-slate-200">
                {selectedNode.meter.meterType.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Telemetry Status:</span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{selectedNode.meter.status}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      {selectedNode.buildingId && (
        <div className="mt-6 border-t border-slate-800 pt-4">
          <Link
            href={`/dashboard/buildings/${selectedNode.buildingId}`}
            className="flex min-h-11 w-full items-center justify-between rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-100 transition-colors hover:bg-emerald-500 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span>Explore Building Details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </article>
  );
}
