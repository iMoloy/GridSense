import Link from 'next/link';
import { AlertCircle, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import type { AlertEventItem } from '@/types';
import { cn, formatRelativeTime } from '@/lib/utils';

interface RecentAlertsFeedProps {
  alerts: AlertEventItem[];
}

export function RecentAlertsFeed({ alerts }: RecentAlertsFeedProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          icon: AlertCircle,
          badgeClass: 'bg-rose-500/10 text-rose-400 ring-rose-500/30',
          dotClass: 'bg-rose-500',
        };
      case 'WARNING':
        return {
          icon: AlertTriangle,
          badgeClass: 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
          dotClass: 'bg-amber-500',
        };
      default:
        return {
          icon: Info,
          badgeClass: 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/30',
          dotClass: 'bg-cyan-500',
        };
    }
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <h3 className="text-base font-semibold text-slate-100">
            Real-Time Anomaly &amp; Alert Feed
          </h3>
        </div>

        <Link
          href="/dashboard/alerts"
          className="flex min-h-11 items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
        >
          <span>All Alerts</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="mt-0.5 text-xs text-slate-400">
        Statistical Z-Score outliers ($|z| &gt; 2.5$) and configured threshold alerts
      </p>

      {/* Alerts list */}
      <div className="mt-4 space-y-3">
        {alerts.length === 0 ? (
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-6 text-center text-xs text-slate-400">
            No active threshold alerts. All meter telemetry operating within normal bounds.
          </div>
        ) : (
          alerts.map((alert) => {
            const badge = getSeverityBadge(alert.severity);
            const Icon = badge.icon;

            return (
              <div
                key={alert.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-slate-800/60 bg-slate-950/60 p-3.5 transition-colors hover:border-slate-700"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset',
                      badge.badgeClass
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200">
                        {alert.title}
                      </span>
                      <span
                        className={cn(
                          'rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1',
                          badge.badgeClass
                        )}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{alert.message}</p>
                    {alert.locationName && (
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        Location: {alert.locationName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right text-[11px] text-slate-400">
                  {formatRelativeTime(alert.triggeredAt)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
}
