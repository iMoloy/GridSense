export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-sm sm:p-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          GridSense
        </h1>
        <p className="mt-3 text-base text-slate-400 sm:text-lg">
          Smart Building Energy Intelligence &amp; Time-Series Analytics Platform
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-slate-800 px-3.5 py-1 text-xs font-medium text-slate-300">
            Next.js 16 App Router
          </span>
          <span className="rounded-full bg-slate-800 px-3.5 py-1 text-xs font-medium text-slate-300">
            NestJS Backend
          </span>
          <span className="rounded-full bg-slate-800 px-3.5 py-1 text-xs font-medium text-slate-300">
            PostgreSQL &amp; Prisma
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
            Dynamic Server Telemetry
          </span>
        </div>
      </div>
    </main>
  );
}
