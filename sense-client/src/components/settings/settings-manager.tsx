'use client';

import { useState } from 'react';
import { OrgProfileCard } from './org-profile-card';
import { TariffRateCard } from './tariff-rate-card';
import { TeamMembersTable } from './team-members-table';
import { TelemetryApiCard } from './telemetry-api-card';
import type { OrgSettingsData } from '@/types';

interface SettingsManagerProps {
  initialSettings: OrgSettingsData;
}

export function SettingsManager({ initialSettings }: SettingsManagerProps) {
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'TARIFF' | 'TEAM' | 'TELEMETRY'>('PROFILE');

  const tabs: { label: string; value: typeof activeTab }[] = [
    { label: 'Facility Profile', value: 'PROFILE' },
    { label: 'Tariff & Carbon', value: 'TARIFF' },
    { label: 'Team & RBAC', value: 'TEAM' },
    { label: 'Telemetry & Ingestion', value: 'TELEMETRY' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-800 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`min-h-11 shrink-0 whitespace-nowrap px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === tab.value
                ? 'bg-slate-800 text-slate-100 ring-1 ring-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'PROFILE' && (
        <OrgProfileCard initialOrg={initialSettings.organization} />
      )}

      {activeTab === 'TARIFF' && (
        <TariffRateCard initialTariff={initialSettings.tariff} />
      )}

      {activeTab === 'TEAM' && (
        <TeamMembersTable initialTeam={initialSettings.team} />
      )}

      {activeTab === 'TELEMETRY' && (
        <TelemetryApiCard initialConfig={initialSettings.telemetry} />
      )}
    </div>
  );
}
