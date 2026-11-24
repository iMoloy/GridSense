'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error on server or monitoring in production
    console.error('GridSense Dashboard Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-slate-100">
        Failed to Load Telemetry Stream
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-400">
        The GridSense client could not connect to the NestJS analytics server or
        database.
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => reset()}
          className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
}
