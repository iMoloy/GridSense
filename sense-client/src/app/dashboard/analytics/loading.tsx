export default function AnalyticsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-xl bg-slate-800/80" />
          <div className="h-4 w-96 rounded-lg bg-slate-800/50" />
        </div>
        <div className="h-11 w-44 rounded-xl bg-slate-800/80" />
      </div>

      {/* Filter skeleton */}
      <div className="h-16 w-full rounded-2xl bg-slate-900/60 border border-slate-800/80" />

      {/* KPI Cards skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4"
          />
        ))}
      </div>

      {/* Heatmap skeleton */}
      <div className="h-80 w-full rounded-2xl border border-slate-800/80 bg-slate-900/60" />

      {/* 2-Column skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-96 rounded-2xl border border-slate-800/80 bg-slate-900/60" />
        <div className="h-96 rounded-2xl border border-slate-800/80 bg-slate-900/60" />
      </div>
    </div>
  );
}
