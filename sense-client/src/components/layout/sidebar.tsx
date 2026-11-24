'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import {
  LayoutDashboard,
  Building2,
  LineChart,
  Network,
  BellRing,
  FileSpreadsheet,
  Settings,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Buildings & Floors', href: '/dashboard/buildings', icon: Building2 },
  { name: 'Analytics Studio', href: '/dashboard/analytics', icon: LineChart },
  { name: 'Hierarchy Tree', href: '/dashboard/hierarchy', icon: Network },
  { name: 'Alerts & Anomalies', href: '/dashboard/alerts', icon: BellRing, badge: 'Live' },
  { name: 'Reports & Export', href: '/dashboard/reports', icon: FileSpreadsheet },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar aside */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800/80 bg-slate-950/95 p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-14 items-center justify-between px-3">
          <Logo href="/dashboard" size="md" />
        </div>

        {/* Live Status Pill */}
        <div className="my-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                Telemetry Active
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              PostgreSQL
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Ingesting live time-series meter telemetry
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto py-2">
          {navItems.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'group flex min-h-11 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-slate-100'
                )}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0 transition-colors',
                      isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                    )}
                  />
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge ? (
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/30">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100',
                      isActive && 'opacity-60 text-emerald-400'
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer User Info */}
        <div className="mt-auto border-t border-slate-800/80 pt-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-2.5 ring-1 ring-slate-800/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-300">
              GA
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-200">
                Global Org Admin
              </p>
              <p className="truncate text-[11px] text-slate-400">
                admin@gridsense.internal
              </p>
            </div>
            <span
              title="Verified Role"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-slate-300"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-emerald-400" />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
