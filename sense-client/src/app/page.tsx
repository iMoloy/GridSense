import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/ui/logo';
import {
  ArrowRight,
  ShieldCheck,
  LineChart,
  Building2,
  BellRing,
  Database,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-400"
>
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo href="/" size="md" subtitle={false} />

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>Live Command Center</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          {/* Hero Architectural Background Image with Clean Dark Gradient Mask */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/hero-building.jpg"
              alt="GridSense Smart Facility Architecture"
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover object-center opacity-40"
            />
            {/* Deep Slate Gradient Mask so building is visible while text remains high-contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/75 to-slate-950" />
          </div>

          {/* Subtle glow backdrop */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 -translate-y-1/2">
            <div className="h-96 w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300 sm:px-3.5 sm:text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate sm:whitespace-normal">Smart Building Energy Intelligence &amp; Telemetry</span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-100 sm:text-6xl lg:text-7xl">
              Turn Raw Electricity Records Into{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Actionable Intelligence
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
              Enterprise-grade multi-tenant energy management designed for smart
              campuses and corporate facilities. Ingesting 50,000+ time-series
              readings with automated Z-score anomaly detection and carbon
              tracking.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
              >
                <span>Launch Analytics Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/buildings"
                className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-900 hover:text-slate-100"
              >
                <span>Explore Campus Buildings</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Feature Highlights */}
        <section className="border-t border-slate-800/80 bg-slate-950/60 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-100">
                  50,000+ Time-Series Store
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Compound indexed PostgreSQL tables designed for high-frequency
                  meter telemetry and aggregation rollups.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-100">
                  Server-Side Aggregations
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Automated rollups from hourly readings into daily, weekly, and
                  monthly cost and carbon projections.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
                  <BellRing className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-100">
                  Z-Score Anomaly Alerts
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Statistical outlier detection flags abnormal power consumption
                  spikes before they become utility surprises.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-100">
                  Multi-Tier Hierarchy
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Organization → Building → Floor → Department → Meter
                  modeling with isolated multi-tenancy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>GridSense — Enterprise Smart Building Energy Intelligence Platform</p>
        <p className="mt-1">
          Architected with Next.js 16, NestJS, PostgreSQL &amp; Prisma
        </p>
      </footer>
    </div>
  );
}
