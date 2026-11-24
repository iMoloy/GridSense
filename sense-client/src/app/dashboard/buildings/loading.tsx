export default function BuildingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 rounded-xl bg-slate-800" />
        <div className="h-4 w-96 rounded-lg bg-slate-900" />
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-11 w-full max-w-md rounded-xl bg-slate-900" />

      {/* Buildings Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-800" />
              <div className="space-y-1.5">
                <div className="h-4 w-32 rounded bg-slate-800" />
                <div className="h-3 w-24 rounded bg-slate-900" />
              </div>
            </div>
            <div className="mt-8 h-16 rounded-xl bg-slate-950" />
            <div className="mt-6 h-10 rounded-xl bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
