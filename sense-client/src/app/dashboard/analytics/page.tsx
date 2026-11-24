import { Suspense } from 'react';
import Link from 'next/link';
import { LineChart, Download, FileSpreadsheet, Calendar, Sparkles } from 'lucide-react';
import { getAnalyticsStudio } from '@/lib/api';
import { GranularityFilter } from '@/components/analytics/granularity-filter';
import { HeatmapGrid } from '@/components/analytics/heatmap-grid';
import { FacilityComparisonChart } from '@/components/analytics/facility-comparison-chart';
import { CostProjectionCard } from '@/components/analytics/cost-projection-card';
import { KpiCard } from '@/components/dashboard/kpi-card';
import type { AnalyticsStudioData, HeatmapPoint } from '@/types';

interface PageProps {
  searchParams: Promise<{ timeframe?: string; metric?: string }>;
}

function generateInitialStudioData(
  timeframe: string = '7d',
  metric: string = 'kwh'
): AnalyticsStudioData {
  // Generate 7 days x 24 hours = 168 heatmap cells
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const heatmap: HeatmapPoint[] = [];

  for (const day of days) {
    const isWeekend = day === 'Sat' || day === 'Sun';
    for (let hour = 0; hour < 24; hour++) {
      let intensity: 0 | 1 | 2 | 3 | 4 = 0;
      let value = 1200;

      if (isWeekend) {
        if (hour >= 18 && hour <= 21) {
          intensity = 2;
          value = 2600;
        } else if (hour >= 9 && hour <= 17) {
          intensity = 1;
          value = 1800;
        } else {
          intensity = 0;
          value = 1100;
        }
      } else {
        // Weekday profile
        if (hour >= 18 && hour <= 21) {
          intensity = 4; // Peak tariff window
          value = 4850;
        } else if (hour >= 13 && hour <= 17) {
          intensity = 3; // Heavy afternoon
          value = 3900;
        } else if (hour >= 8 && hour <= 12) {
          intensity = 2; // Workday morning
          value = 3100;
        } else if (hour >= 6 && hour <= 7) {
          intensity = 1; // Ramp up
          value = 1900;
        } else {
          intensity = 0; // Off shift night
          value = 1250;
        }
      }

      heatmap.push({ day, hour, value, intensity });
    }
  }

  return {
    organization: {
      id: 'org-dhaka-campus',
      name: 'Dhaka Smart Campus',
      slug: 'dhaka-campus',
      industry: 'Higher Education & Research',
      ratePerKwh: 8.5,
      currency: 'BDT',
      createdAt: '2026-01-01',
    },
    timeframe,
    metric: (metric as 'kwh' | 'cost' | 'carbon') || 'kwh',
    totalConsumptionKwh: 342600,
    totalCost: 2912100,
    totalCarbonKg: 222690,
    peakDemandKw: 840,
    heatmap,
    facilityComparison: [
      {
        id: 'b-sci',
        name: 'Science Complex & Labs',
        currentPeriodKwh: 114800,
        previousPeriodKwh: 122400,
        cost: 975800,
        carbonKg: 74620,
        changePercent: -6.2,
      },
      {
        id: 'b-eng',
        name: 'Engineering Tower',
        currentPeriodKwh: 99400,
        previousPeriodKwh: 95200,
        cost: 844900,
        carbonKg: 64610,
        changePercent: 4.4,
      },
      {
        id: 'b-lib',
        name: 'Central Library Hub',
        currentPeriodKwh: 68600,
        previousPeriodKwh: 71200,
        cost: 583100,
        carbonKg: 44590,
        changePercent: -3.6,
      },
      {
        id: 'b-res',
        name: 'Residential Halls',
        currentPeriodKwh: 59800,
        previousPeriodKwh: 58400,
        cost: 508300,
        carbonKg: 38870,
        changePercent: 2.4,
      },
    ],
    projection: {
      actualToDateKwh: 242000,
      actualToDateCost: 2057000,
      projectedMonthEndCost: 428000,
      budgetLimitCost: 450000,
      projectedVariancePercent: -4.8,
      peakTariffCost: 154080,
      offPeakTariffCost: 273920,
      potentialSavingsCost: 38500,
    },
    timeSeries: [],
  };
}

export default async function AnalyticsStudioPage({ searchParams }: PageProps) {
  // Await searchParams as required by Next.js 16
  const { timeframe = '7d', metric = 'kwh' } = await searchParams;

  const { data: serverStudioData, error } = await getAnalyticsStudio(timeframe, metric);
  const studio = serverStudioData || generateInitialStudioData(timeframe, metric);

  return (
    <div className="space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              Analytics Studio &amp; Forecasting
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Interactive multi-dimensional load analysis, 168-hour intensity heatmap, and tariff audits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/reports"
            className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Analytics</span>
          </Link>
        </div>
      </div>

      {/* Interactive Granularity & Metric Controls */}
      <Suspense fallback={<div className="h-16 w-full rounded-2xl bg-slate-900/60" />}>
        <GranularityFilter
          timeframe={studio.timeframe as '24h' | '7d' | '30d' | '90d'}
          metric={studio.metric}
        />
      </Suspense>

      {/* 4 Summary Studio KPI Cards */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          type="kwh"
          title="Period Aggregate"
          value={studio.totalConsumptionKwh}
          changePercent={-3.8}
          isPositiveChangeGood={false}
        />
        <KpiCard
          type="cost"
          title="Incurred Utility"
          value={studio.totalCost}
          changePercent={-3.8}
          isPositiveChangeGood={false}
        />
        <KpiCard
          type="carbon"
          title="Carbon Balance"
          value={studio.totalCarbonKg}
          changePercent={-3.8}
          isPositiveChangeGood={false}
        />
        <KpiCard
          type="peak"
          title="Instantaneous Peak"
          value={studio.peakDemandKw}
          subtitle="Highest coincident load"
        />
      </section>

      {/* Hour x Day Load Intensity Heatmap Grid */}
      <HeatmapGrid data={studio.heatmap} />

      {/* 2-Column Split: Facility Comparison & Cost Projection */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FacilityComparisonChart data={studio.facilityComparison} />
        </div>
        <div className="lg:col-span-5">
          <CostProjectionCard projection={studio.projection} />
        </div>
      </section>
    </div>
  );
}
