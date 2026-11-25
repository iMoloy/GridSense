export default function ReportsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-xl bg-slate-800/80" />
          <div className="h-4 w-96 rounded-lg bg-slate-800/50" />
        </div>
      </div>

      {/* Toolbar skeleton */}
      <div className="h-20 w-full rounded-2xl border border-slate-800/80 bg-slate-900/60" />

      {/* Tabs skeleton */}
      <div className="h-11 w-64 rounded-xl bg-slate-800/60" />

      {/* Executive Paper skeleton */}
      <div className="h-[500px] w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 space-y-6">
        <div className="h-12 w-80 rounded-xl bg-slate-800/80" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-800/50" />
          ))}
        </div>
        <div className="h-48 w-full rounded-xl bg-slate-800/40" />
      </div>
    </div>
  );
}
