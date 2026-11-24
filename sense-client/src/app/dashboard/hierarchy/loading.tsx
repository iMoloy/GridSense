export default function HierarchyLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 rounded-xl bg-slate-800/80" />
          <div className="h-4 w-96 rounded-lg bg-slate-800/50" />
        </div>
      </div>

      {/* 5-Card metrics skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4"
          />
        ))}
      </div>

      {/* Filter skeleton */}
      <div className="h-24 rounded-2xl border border-slate-800/80 bg-slate-900/60" />

      {/* 2-Column split skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-2xl border border-slate-800/80 bg-slate-900/60"
            />
          ))}
        </div>
        <div className="lg:col-span-5">
          <div className="h-96 rounded-2xl border border-slate-800/80 bg-slate-900/60" />
        </div>
      </div>
    </div>
  );
}
