import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(timeframe: string = '24h') {
    const org = await this.prisma.organization.findFirst();
    const orgId = org ? org.id : 'org-dhaka-campus';
    const rate = org ? org.ratePerKwh : 8.5;

    // Time Series 24-Hour curve aggregation
    const hours = [
      '00:00', '02:00', '04:00', '06:00', '08:00', '10:00',
      '12:00', '14:00', '16:00', '18:00', '20:00', '22:00',
    ];

    const timeSeries = hours.map((hour, idx) => {
      const isPeak = idx >= 8 && idx <= 10;
      const baseKwh = idx < 3 ? 1200 : idx < 7 ? 2800 : isPeak ? 4600 : 3400;
      const kwh = baseKwh + (idx * 37) % 250;
      const cost = kwh * rate;
      const carbonKg = kwh * 0.65;

      return {
        timestamp: `2026-11-25T${hour}:00Z`,
        label: hour,
        kwh,
        cost,
        carbonKg,
      };
    });

    const totalConsumption = timeSeries.reduce((acc, p) => acc + p.kwh, 0);
    const totalCost = timeSeries.reduce((acc, p) => acc + p.cost, 0);
    const totalCarbon = timeSeries.reduce((acc, p) => acc + p.carbonKg, 0);

    const peakKwh = Math.round(totalConsumption * 0.365);
    const offPeakKwh = totalConsumption - peakKwh;

    // Get buildings for shares
    const buildings = await this.prisma.building.findMany({
      include: {
        floors: {
          include: {
            departments: {
              include: { meters: true },
            },
          },
        },
      },
    });

    const buildingShares =
      buildings.length > 0
        ? buildings.map((b, idx) => {
            const count = b.floors.reduce(
              (acc, f) => acc + f.departments.reduce((dAcc, d) => dAcc + d.meters.length, 0),
              0
            );
            const share = idx === 0 ? 33.5 : idx === 1 ? 29.0 : idx === 2 ? 20.0 : 17.5;
            return {
              buildingId: b.id,
              buildingName: b.name,
              consumptionKwh: Math.round(totalConsumption * (share / 100)),
              percentage: share,
              activeMeters: count > 0 ? count : 24,
              trend: (idx % 2 === 0 ? 'up' : 'down') as 'up' | 'down',
            };
          })
        : [
            {
              buildingId: 'b-sci',
              buildingName: 'Science Complex & Laboratories',
              consumptionKwh: 16400,
              percentage: 33.5,
              activeMeters: 42,
              trend: 'up' as const,
            },
            {
              buildingId: 'b-eng',
              buildingName: 'Engineering & Computing Tower',
              consumptionKwh: 14200,
              percentage: 29.0,
              activeMeters: 38,
              trend: 'down' as const,
            },
            {
              buildingId: 'b-lib',
              buildingName: 'Central Library & Admin Hub',
              consumptionKwh: 9800,
              percentage: 20.0,
              activeMeters: 26,
              trend: 'down' as const,
            },
            {
              buildingId: 'b-res',
              buildingName: 'Student Residential Halls',
              consumptionKwh: 8520,
              percentage: 17.5,
              activeMeters: 68,
              trend: 'neutral' as const,
            },
          ];

    return {
      organization: {
        id: orgId,
        name: org ? org.name : 'Dhaka Smart Campus',
        slug: org ? org.slug : 'dhaka-campus',
        industry: org?.industry || 'Higher Education & Research',
        ratePerKwh: rate,
        currency: org?.currency || 'BDT',
        createdAt: org ? org.createdAt.toISOString() : new Date().toISOString(),
      },
      metrics: {
        totalConsumptionKwh: totalConsumption,
        totalCost,
        totalCarbonKg: totalCarbon,
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
      buildingShares,
      peakDistribution: {
        peakKwh,
        offPeakKwh,
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

  async getStudio(timeframe: string = '7d', metric: string = 'kwh') {
    const org = await this.prisma.organization.findFirst();
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const heatmap: { day: string; hour: number; value: number; intensity: 0 | 1 | 2 | 3 | 4 }[] = [];

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
          }
        } else {
          if (hour >= 18 && hour <= 21) {
            intensity = 4;
            value = 4850;
          } else if (hour >= 13 && hour <= 17) {
            intensity = 3;
            value = 3900;
          } else if (hour >= 8 && hour <= 12) {
            intensity = 2;
            value = 3100;
          } else if (hour >= 6 && hour <= 7) {
            intensity = 1;
            value = 1900;
          }
        }

        heatmap.push({ day, hour, value, intensity });
      }
    }

    return {
      organization: {
        id: org?.id || 'org-dhaka-campus',
        name: org?.name || 'Dhaka Smart Campus',
        slug: org?.slug || 'dhaka-campus',
        industry: org?.industry || 'Higher Education & Research',
        ratePerKwh: org?.ratePerKwh || 8.5,
        currency: org?.currency || 'BDT',
        createdAt: org?.createdAt?.toISOString() || new Date().toISOString(),
      },
      timeframe,
      metric,
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
}
