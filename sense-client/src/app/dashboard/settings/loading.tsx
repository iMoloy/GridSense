export default function SettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-60 rounded-xl bg-slate-800/80" />
          <div className="h-4 w-96 rounded-lg bg-slate-800/50" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="h-11 w-96 rounded-xl bg-slate-800/60" />

      {/* Main card skeleton */}
      <div className="h-96 w-full rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 space-y-4">
        <div className="h-8 w-64 rounded-xl bg-slate-800/80" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-14 rounded-xl bg-slate-800/50" />
          <div className="h-14 rounded-xl bg-slate-800/50" />
        </div>
        <div className="h-32 w-full rounded-xl bg-slate-800/40" />
      </div>
    </div>
  );
}
