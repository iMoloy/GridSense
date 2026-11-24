'use client';

import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HierarchySearchBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedMeterType: string;
  onMeterTypeChange: (t: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function HierarchySearchBar({
  searchQuery,
  onSearchChange,
  selectedMeterType,
  onMeterTypeChange,
  onExpandAll,
  onCollapseAll,
}: HierarchySearchBarProps) {
  const meterTypes = [
    { label: 'All Meter Types', value: 'ALL' },
    { label: 'HVAC Chiller / Air', value: 'HVAC' },
    { label: 'Lighting Banks', value: 'LIGHTING' },
    { label: 'Equipment & Servers', value: 'EQUIPMENT' },
    { label: 'Solar Generation', value: 'SOLAR_SOLAR' },
    { label: 'EV Charging', value: 'EV_CHARGER' },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="tree-search" className="sr-only">
            Search building hierarchy by name or serial
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="tree-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search meter serial (e.g. MTR-L1-01), floor, department..."
            className="h-11 w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
          />
        </div>

        {/* Tree Expand / Collapse Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExpandAll}
            className="flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronDown className="h-4 w-4 text-emerald-400" />
            <span>Expand All</span>
          </button>

          <button
            type="button"
            onClick={onCollapseAll}
            className="flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ChevronUp className="h-4 w-4 text-slate-400" />
            <span>Collapse All</span>
          </button>
        </div>
      </div>

      {/* Meter Type Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-t border-slate-800/60 pt-3 pb-1 sm:pb-0">
        <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 hidden lg:inline">
          Filter by Type:
        </span>
        {meterTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onMeterTypeChange(type.value)}
            className={cn(
              'min-h-11 shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
              selectedMeterType === type.value
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                : 'border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
            )}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
