'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Building2,
  LayoutDashboard,
  LineChart,
  Network,
  BellRing,
  FileText,
  Settings,
  Zap,
  X,
  ArrowRight,
} from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Pages' | 'Buildings' | 'Meters';
  href: string;
  icon: typeof LayoutDashboard;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Pages
  {
    id: 'page-dashboard',
    title: 'Executive Command Center',
    subtitle: 'KPI overview, load curves, peak demand, and live telemetry',
    category: 'Pages',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'page-buildings',
    title: 'Campus Facilities Directory',
    subtitle: 'Browse all buildings, floor areas, and active meter counts',
    category: 'Pages',
    href: '/dashboard/buildings',
    icon: Building2,
  },
  {
    id: 'page-analytics',
    title: 'Analytics Studio & Heatmap',
    subtitle: '168-hour load intensity grid and facility comparisons',
    category: 'Pages',
    href: '/dashboard/analytics',
    icon: LineChart,
  },
  {
    id: 'page-hierarchy',
    title: '5-Tier Asset Hierarchy',
    subtitle: 'Org → Building → Floor → Dept → Meter visual tree',
    category: 'Pages',
    href: '/dashboard/hierarchy',
    icon: Network,
  },
  {
    id: 'page-alerts',
    title: 'Anomaly Center & Outliers',
    subtitle: 'Statistical Z-score spikes, active warnings, and threshold rules',
    category: 'Pages',
    href: '/dashboard/alerts',
    icon: BellRing,
  },
  {
    id: 'page-reports',
    title: 'Compliance Reports Studio',
    subtitle: 'Executive energy audit preview, CSV download, and JSON exports',
    category: 'Pages',
    href: '/dashboard/reports',
    icon: FileText,
  },
  {
    id: 'page-settings',
    title: 'System & Dual-Tariff Settings',
    subtitle: 'Utility rates, carbon emission factor, and team RBAC',
    category: 'Pages',
    href: '/dashboard/settings',
    icon: Settings,
  },

  // Buildings
  {
    id: 'bldg-sci',
    title: 'Science Complex & Laboratories',
    subtitle: '145,000 sq ft • 4 Floors • 11 Sub-meters',
    category: 'Buildings',
    href: '/dashboard/buildings/b-sci',
    icon: Building2,
  },
  {
    id: 'bldg-eng',
    title: 'Engineering Hall & Workshops',
    subtitle: '110,000 sq ft • 3 Floors • 8 Sub-meters',
    category: 'Buildings',
    href: '/dashboard/buildings/b-eng',
    icon: Building2,
  },
  {
    id: 'bldg-adm',
    title: 'Administration & Student Hub',
    subtitle: '65,000 sq ft • 2 Floors • 5 Sub-meters',
    category: 'Buildings',
    href: '/dashboard/buildings/b-adm',
    icon: Building2,
  },
  {
    id: 'bldg-it',
    title: 'IT & Data Center Annex',
    subtitle: '45,000 sq ft • 2 Floors • 6 Sub-meters (High Density)',
    category: 'Buildings',
    href: '/dashboard/buildings/b-it',
    icon: Building2,
  },

  // Sub-meters
  {
    id: 'meter-main',
    title: 'Main Grid Incomer (630 kVA)',
    subtitle: 'High-voltage substation feed • Science Complex',
    category: 'Meters',
    href: '/dashboard/hierarchy',
    icon: Zap,
  },
  {
    id: 'meter-hvac',
    title: 'Central Chiller HVAC Loop A',
    subtitle: 'Cooling plant feed • Engineering Hall',
    category: 'Meters',
    href: '/dashboard/hierarchy',
    icon: Zap,
  },
  {
    id: 'meter-server',
    title: 'HPC Server Room Primary Feed',
    subtitle: 'Continuous critical compute load • IT Annex',
    category: 'Meters',
    href: '/dashboard/hierarchy',
    icon: Zap,
  },
  {
    id: 'meter-solar',
    title: 'Rooftop Solar PV Inverter (150 kWp)',
    subtitle: 'Renewable distributed generation • Science Complex',
    category: 'Meters',
    href: '/dashboard/analytics',
    icon: Zap,
  },
  {
    id: 'meter-ev',
    title: 'EV Fleet Fast Charger (60 kW DC)',
    subtitle: 'Fleet & visitor mobility charging station',
    category: 'Meters',
    href: '/dashboard/analytics',
    icon: Zap,
  },
];

interface CommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandSearch({ isOpen, onClose }: CommandSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_ITEMS;
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Navigate to selected item
  const handleSelect = (item: SearchItem) => {
    onClose();
    router.push(item.href);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search meters, buildings, and telemetry"
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 p-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl ring-1 ring-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3 sm:px-6">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search buildings, sub-meters, analytics, alerts..."
            className="w-full bg-transparent text-base text-slate-100 placeholder-slate-500 focus:outline-none sm:text-sm"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden shrink-0 rounded bg-slate-800 px-2 py-1 text-[11px] font-mono font-medium text-slate-400 sm:inline-block">
            ESC to close
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="mx-auto h-8 w-8 text-slate-600" />
              <p className="mt-3 text-sm font-medium text-slate-300">
                No telemetry results found
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Try searching for &quot;Science&quot;, &quot;HVAC&quot;, &quot;Analytics&quot;, or &quot;Solar&quot;
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-slate-100">
                            {item.title}
                          </span>
                          <span className="shrink-0 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="truncate text-xs text-slate-400">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isSelected
                          ? 'translate-x-0.5 text-emerald-400'
                          : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="hidden items-center justify-between border-t border-slate-800/80 bg-slate-950/60 px-4 py-2.5 text-[11px] text-slate-500 sm:flex">
          <div className="flex items-center gap-4">
            <span>
              <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-400">↑</kbd>{' '}
              <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-400">↓</kbd>{' '}
              to navigate
            </span>
            <span>
              <kbd className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-slate-400">↵</kbd>{' '}
              to select
            </span>
          </div>
          <span>GridSense Telemetry Search</span>
        </div>
      </div>
    </div>
  );
}
