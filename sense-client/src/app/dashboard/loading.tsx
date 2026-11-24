export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col gap-2">
        <div className="h-8 w-64 rounded-xl bg-slate-800" />
        <div className="h-4 w-96 rounded-lg bg-slate-900" />
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <div className="h-4 w-28 rounded bg-slate-800" />
            <div className="mt-3 h-8 w-36 rounded bg-slate-800" />
          </div>
        ))}
      </div>

      {/* Chart Canvas Skeleton */}
      <div className="h-96 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="h-6 w-56 rounded bg-slate-800" />
        <div className="mt-8 h-64 rounded-xl bg-slate-950" />
      </div>
    </div>
  );
}
