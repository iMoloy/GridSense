export default function AlertsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-60 rounded-xl bg-slate-800/80" />
          <div className="h-4 w-80 rounded-lg bg-slate-800/50" />
        </div>
      </div>

      {/* 4 Metric cards skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4"
          />
        ))}
      </div>

      {/* Events feed skeleton */}
      <div className="h-96 rounded-2xl border border-slate-800/80 bg-slate-900/60" />

      {/* Rules table skeleton */}
      <div className="h-72 rounded-2xl border border-slate-800/80 bg-slate-900/60" />
    </div>
  );
}
