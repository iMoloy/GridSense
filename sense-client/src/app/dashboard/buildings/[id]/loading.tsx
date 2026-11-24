export default function BuildingDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 rounded bg-slate-800" />

      {/* Header skeleton */}
      <div className="h-36 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="h-6 w-72 rounded bg-slate-800" />
        <div className="mt-4 flex gap-4">
          <div className="h-10 w-28 rounded-lg bg-slate-950" />
          <div className="h-10 w-28 rounded-lg bg-slate-950" />
        </div>
      </div>

      {/* Floor Hierarchy Accordion Skeleton */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
          />
        ))}
      </div>
    </div>
  );
}
