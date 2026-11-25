'use client';

import { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Clock,
  MapPin,
  Check,
} from 'lucide-react';
import type { AlertEventItem } from '@/types';
import { cn, formatRelativeTime } from '@/lib/utils';
import { updateAlertStatus } from '@/lib/api';

interface AlertEventsListProps {
  initialEvents: AlertEventItem[];
}

export function AlertEventsList({ initialEvents }: AlertEventsListProps) {
  const [events, setEvents] = useState<AlertEventItem[]>(initialEvents);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const handleAcknowledge = async (id: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: 'ACKNOWLEDGED' as const } : e
      )
    );
    await updateAlertStatus(id, 'ACKNOWLEDGED');
  };

  const handleResolve = async (id: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: 'RESOLVED' as const } : e
      )
    );
    await updateAlertStatus(id, 'RESOLVED');
  };

  const filteredEvents = events.filter((e) => {
    if (filterSeverity !== 'ALL' && e.severity !== filterSeverity) return false;
    if (filterStatus !== 'ALL' && e.status !== filterStatus) return false;
    return true;
  });

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          icon: AlertCircle,
          badgeColor: 'bg-rose-500/10 text-rose-400 ring-rose-500/30 border-rose-500/20',
        };
      case 'WARNING':
        return {
          icon: AlertTriangle,
          badgeColor: 'bg-amber-500/10 text-amber-400 ring-amber-500/30 border-amber-500/20',
        };
      default:
        return {
          icon: Info,
          badgeColor: 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/30 border-cyan-500/20',
        };
    }
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
            Live Anomaly &amp; Outlier Feed
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Real-time feed evaluated against statistical Z-scores and configured load thresholds
          </p>
        </div>

        {/* Severity Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: 'All', value: 'ALL' },
            { label: 'Critical', value: 'CRITICAL' },
            { label: 'Warning', value: 'WARNING' },
            { label: 'Info', value: 'INFO' },
          ].map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilterSeverity(chip.value)}
              className={cn(
                'min-h-11 shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                filterSeverity === chip.value
                  ? 'bg-slate-700 text-slate-100 ring-1 ring-slate-600'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="mt-5 space-y-3.5">
        {filteredEvents.length === 0 ? (
          <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-8 text-center text-xs text-slate-400">
            No events match the selected filter.
          </div>
        ) : (
          filteredEvents.map((event) => {
            const config = getSeverityConfig(event.severity);
            const Icon = config.icon;
            const isResolved = event.status === 'RESOLVED';
            const isAck = event.status === 'ACKNOWLEDGED';

            return (
              <div
                key={event.id}
                className={cn(
                  'flex flex-col gap-3 rounded-xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between',
                  isResolved
                    ? 'border-slate-800/40 bg-slate-950/30 opacity-70'
                    : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                )}
              >
                {/* Left: Icon & Details */}
                <div className="flex min-w-0 flex-1 items-start gap-3.5">
                  <div
                    className={cn(
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1',
                      config.badgeColor
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-100 sm:text-sm">
                        {event.title}
                      </h4>

                      <span
                        className={cn(
                          'shrink-0 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ring-1',
                          config.badgeColor
                        )}
                      >
                        {event.severity}
                      </span>

                      <span
                        className={cn(
                          'shrink-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider',
                          isResolved
                            ? 'bg-slate-800 text-slate-400'
                            : isAck
                            ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/30'
                            : 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/30 animate-pulse'
                        )}
                      >
                        {event.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-400">{event.message}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                      {event.locationName && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{event.locationName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 font-mono text-slate-400">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span>{formatRelativeTime(event.triggeredAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex shrink-0 items-center gap-2 border-t border-slate-800/60 pt-3 sm:border-0 sm:pt-0">
                  {!isResolved && (
                    <>
                      {!isAck && (
                        <button
                          type="button"
                          onClick={() => handleAcknowledge(event.id)}
                          className="flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Acknowledge</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleResolve(event.id)}
                        className="flex min-h-11 items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Resolve</span>
                      </button>
                    </>
                  )}

                  {isResolved && (
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>Resolved</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
}
