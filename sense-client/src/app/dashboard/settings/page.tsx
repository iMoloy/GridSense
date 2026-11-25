import { Settings, Sliders } from 'lucide-react';
import { getOrgSettings } from '@/lib/api';
import { SettingsManager } from '@/components/settings/settings-manager';
import type { OrgSettingsData } from '@/types';

// Fallback configuration dataset (dynamically connects to NestJS backend when running)
function getInitialSettings(): OrgSettingsData {
  return {
    organization: {
      id: 'org-dhaka-campus',
      name: 'Dhaka Smart Campus',
      slug: 'dhaka-campus',
      industry: 'Higher Education & Research',
      ratePerKwh: 8.5,
      currency: 'BDT',
      createdAt: '2026-01-01T00:00:00Z',
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

export default async function SettingsPage() {
  const { data: serverSettings } = await getOrgSettings();
  const settings = serverSettings || getInitialSettings();

  return (
    <div className="space-y-6">
      {/* Title & Context */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              System Settings &amp; Configuration
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Facility parameters, dual-tier tariff schedules, operator RBAC access, and database pipelines
          </p>
        </div>
      </div>

      {/* Main Settings Manager */}
      <SettingsManager initialSettings={settings} />
    </div>
  );
}
