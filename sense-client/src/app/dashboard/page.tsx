import { Suspense } from 'react';
import { getDashboardOverview } from '@/lib/api';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { ConsumptionChart } from '@/components/dashboard/consumption-chart';
import { PeakDistributionChart } from '@/components/dashboard/peak-distribution-chart';
import { BuildingBreakdown } from '@/components/dashboard/building-breakdown';
import { RecentAlertsFeed } from '@/components/dashboard/recent-alerts-feed';
import type { DashboardOverviewData } from '@/types';

// Fallback initial dataset structure (purely dynamic layout ready for live backend API stream)
function getInitialTelemetry(): DashboardOverviewData {
  const hours = [
    '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
    '12:00', '14:00', '16:00', '18:00', '20:00', '22:00',
  ];

  const timeSeries = hours.map((hour, idx) => {
    // Typical university/commercial campus diurnal load curve
    const isPeak = idx >= 8 && idx <= 10;
    const baseKwh = idx < 3 ? 1200 : idx < 7 ? 2800 : isPeak ? 4600 : 3400;
    const kwh = baseKwh + (idx * 37) % 250;
    const cost = kwh * 8.5;
    const carbonKg = kwh * 0.65;

    return {
      timestamp: `2026-11-24T${hour}:00Z`,
      label: hour,
      kwh,
      cost,
      carbonKg,
    };
  });

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
    metrics: {
      totalConsumptionKwh: 48920,
      totalCost: 415820,
      totalCarbonKg: 31798,
      peakDemandKwh: 4850,
      peakHourLabel: '19:00 - 20:00',
      activeAnomaliesCount: 2,
      consumptionChangePercent: -4.2,
      costChangePercent: -4.2,
      carbonChangePercent: -4.2,
      activeMetersCount: 174,
      totalMetersCount: 180,
    },
    timeSeries,
    buildingShares: [
      {
        buildingId: 'b-sci',
        buildingName: 'Science Complex & Laboratories',
        consumptionKwh: 16400,
        percentage: 33.5,
        activeMeters: 42,
        trend: 'up',
      },
      {
        buildingId: 'b-eng',
        buildingName: 'Engineering & Computing Tower',
        consumptionKwh: 14200,
        percentage: 29.0,
        activeMeters: 38,
        trend: 'down',
      },
      {
        buildingId: 'b-lib',
        buildingName: 'Central Library & Admin Hub',
        consumptionKwh: 9800,
        percentage: 20.0,
        activeMeters: 26,
        trend: 'down',
      },
      {
        buildingId: 'b-res',
        buildingName: 'Student Residential Halls',
        consumptionKwh: 8520,
        percentage: 17.5,
        activeMeters: 68,
        trend: 'neutral',
      },
    ],
    peakDistribution: {
      peakKwh: 17850,
      offPeakKwh: 31070,
      peakPercentage: 36.5,
      offPeakPercentage: 63.5,
    },
    recentAlerts: [
      {
        id: 'alt-1',
        severity: 'CRITICAL',
        status: 'NEW',
        title: 'Unusual HVAC Surge Spike (Z-Score: +3.8σ)',
        message:
          'Science Complex Floor 3 Lab chiller consumed 240% above 30-day baseline during off-shift hours.',
        actualValue: 184.2,
        triggeredAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
        locationName: 'Science Complex • Lab 304',
      },
      {
        id: 'alt-2',
        severity: 'WARNING',
        status: 'NEW',
        title: 'Threshold Exceeded (> 45 kWh/hr)',
        message:
          'Server Room Meter #4 exceeded pre-configured threshold by 12.4 kWh.',
        actualValue: 57.4,
        triggeredAt: new Date(Date.now() - 1000 * 60 * 58).toISOString(),
        locationName: 'Engineering Tower • Data Center',
      },
    ],
  };
}

export default async function DashboardPage() {
  // Query backend analytics overview endpoint
  const { data: serverData, error } = await getDashboardOverview('24h');

  // If live server returned data use it; otherwise seamlessly fall back to initial dataset
  const overview = serverData || getInitialTelemetry();

  return (
    <div className="space-y-6">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
            Command Center Telemetry
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Live energy distribution, Z-score anomalies, and 50K+ time-series database feed.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300">
            Running in preview mode • Connect NestJS server on port 5000
          </div>
        )}
      </div>

      {/* 4 Primary KPI Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          type="kwh"
          title="Campus Electricity"
          value={overview.metrics.totalConsumptionKwh}
          changePercent={overview.metrics.consumptionChangePercent}
          isPositiveChangeGood={false}
        />
        <KpiCard
          type="cost"
          title="Utility Cost"
          value={overview.metrics.totalCost}
          changePercent={overview.metrics.costChangePercent}
          isPositiveChangeGood={false}
        />
        <KpiCard
          type="carbon"
          title="Carbon Footprint"
          value={overview.metrics.totalCarbonKg}
          changePercent={overview.metrics.carbonChangePercent}
          isPositiveChangeGood={false}
        />
        <KpiCard
          type="peak"
          title="Peak Demand Draw"
          value={overview.metrics.peakDemandKwh}
          subtitle={`Peak window: ${overview.metrics.peakHourLabel}`}
        />
      </section>

      {/* Main Consumption Canvas */}
      <Suspense fallback={<div className="h-80 rounded-2xl bg-slate-900/60" />}>
        <ConsumptionChart data={overview.timeSeries} />
      </Suspense>

      {/* 2-Column Split: Peak Distribution & Building Energy Breakdown */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <PeakDistributionChart distribution={overview.peakDistribution} />
        </div>
        <div className="lg:col-span-7">
          <BuildingBreakdown buildings={overview.buildingShares} />
        </div>
      </section>

      {/* Anomaly & Alert Real-Time Feed */}
      <RecentAlertsFeed alerts={overview.recentAlerts} />
    </div>
  );
}
