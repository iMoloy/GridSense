'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, Search, Sparkles, Building2, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  orgName?: string;
}

export function Header({ onToggleSidebar, orgName = 'Dhaka Smart Campus' }: HeaderProps) {
  const [activeOrg, setActiveOrg] = useState(orgName);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left: Mobile Toggle & Org Selector */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Current Organization Pill */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5">
          <Building2 className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200 sm:text-sm">
            {activeOrg}
          </span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            Multi-Tenant
          </span>
        </div>
      </div>

      {/* Right: Search, Notifications, Telemetry Status */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search trigger (visual preview) */}
        <button
          type="button"
          aria-label="Search meters or buildings"
          className="hidden min-h-11 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 md:flex"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span>Search meters, buildings...</span>
          <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
            ⌘K
          </kbd>
        </button>

        {/* Live Notification Indicator */}
        <Link
          href="/dashboard/alerts"
          aria-label="View recent alerts and anomalies"
          className="relative flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-slate-950" />
        </Link>

        {/* Live Rate Chip */}
        <div className="hidden items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-300 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>Rate: ৳8.50/kWh</span>
        </div>
      </div>
    </header>
  );
}
