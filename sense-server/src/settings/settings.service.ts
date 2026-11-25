import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings() {
    const org = await this.prisma.organization.findFirst();

    return {
      organization: {
        id: org?.id || 'org-dhaka-campus',
        name: org?.name || 'Dhaka Smart Campus',
        slug: org?.slug || 'dhaka-campus',
        industry: org?.industry || 'Higher Education & Research',
        ratePerKwh: org?.ratePerKwh || 8.5,
        currency: org?.currency || 'BDT',
        createdAt: org?.createdAt?.toISOString() || '2026-01-01T00:00:00Z',
      },
      tariff: {
        peakRatePerKwh: 8.5,
        offPeakRatePerKwh: 6.2,
        peakHoursStart: '18:00',
        peakHoursEnd: '22:00',
        currency: 'BDT',
        carbonFactorKgPerKwh: 0.65,
      },
      telemetry: {
        zScoreThreshold: 2.5,
        rollupCadenceMinutes: 60,
        dbStatus: 'CONNECTED',
        dbLatencyMs: 18,
        iotIngestionToken: 'sk_live_gridsense_9f4a8b2c1e7d3f0a',
        webhookUrl: 'https://api.internal.gridsense/dispatch/campus-alerts',
      },
      team: [
        {
          id: 'usr-1',
          orgId: 'org-dhaka-campus',
          name: 'Moloy Debnath',
          email: 'admin@gridsense.internal',
          role: 'SUPER_ADMIN',
          status: 'ACTIVE',
          lastActiveAt: new Date().toISOString(),
        },
        {
          id: 'usr-2',
          orgId: 'org-dhaka-campus',
          name: 'Dr. Shahrier Hossain',
          email: 'shahrier@dhaka-campus.edu.bd',
          role: 'ORG_ADMIN',
          status: 'ACTIVE',
          lastActiveAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        },
        {
          id: 'usr-3',
          orgId: 'org-dhaka-campus',
          name: 'Fatema Khatun',
          email: 'fatema.energy@dhaka-campus.edu.bd',
          role: 'ANALYST',
          status: 'ACTIVE',
          lastActiveAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        },
        {
          id: 'usr-4',
          orgId: 'org-dhaka-campus',
          name: 'Engr. Rakibul Islam',
          email: 'rakib.facilities@dhaka-campus.edu.bd',
          role: 'BUILDING_MANAGER',
          status: 'ACTIVE',
          lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        },
      ],
    };
  }
}
