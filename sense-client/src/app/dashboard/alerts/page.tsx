import { getAllAlertEvents, getAlertRules } from '@/lib/api';
import { AlertsManager } from '@/components/alerts/alerts-manager';
import { BellRing, ShieldAlert } from 'lucide-react';
import type { AlertEventItem, AlertRuleItem } from '@/types';

// Fallback alert events dataset (dynamically connects to NestJS backend when running)
function getInitialEvents(): AlertEventItem[] {
  return [
    {
      id: 'alt-101',
      ruleId: 'r-1',
      severity: 'CRITICAL',
      status: 'NEW',
      title: 'Unusual HVAC Surge Spike (+3.8σ Outlier)',
      message:
        'Science Complex Floor 3 Lab Chiller consumed 184.2 kWh in off-shift hours (240% above 30-day baseline).',
      actualValue: 184.2,
      triggeredAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
      locationName: 'Science Complex • Lab 304 Chiller Deck',
    },
    {
      id: 'alt-102',
      ruleId: 'r-2',
      severity: 'WARNING',
      status: 'NEW',
      title: 'Threshold Exceeded (> 45 kWh/hr)',
      message:
        'Server Room Meter #4 exceeded pre-configured threshold by 12.4 kWh during scheduled maintenance.',
      actualValue: 57.4,
      triggeredAt: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
      locationName: 'Engineering Tower • IT Server Room 102',
    },
    {
      id: 'alt-103',
      ruleId: 'r-3',
      severity: 'WARNING',
      status: 'ACKNOWLEDGED',
      title: 'Elevated Nighttime Base Load',
      message:
        'Central Library administrative floor recorded continuous 42 kW draw between 01:00 and 04:00 AM.',
      actualValue: 42.0,
      triggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      locationName: 'Central Library • Level 2 Administration',
    },
    {
      id: 'alt-104',
      ruleId: 'r-4',
      severity: 'INFO',
      status: 'RESOLVED',
      title: 'Rooftop Solar Generation Resumed',
      message:
        '120kW Rooftop Photovoltaic Bank inverter successfully synchronized with main campus grid.',
      actualValue: 68.0,
      triggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      locationName: 'Campus Operations Hub • Inverter Deck',
    },
  ];
}

// Fallback alert rules dataset
function getInitialRules(): AlertRuleItem[] {
  return [
    {
      id: 'r-1',
      orgId: 'org-dhaka-campus',
      name: 'Statistical Z-Score Surge Detection',
      scope: 'ORG',
      scopeTargetName: 'All 180 Campus Meters',
      metric: 'Z_SCORE_SPIKE',
      condition: '> 2.5σ',
      threshold: 2.5,
      unit: 'σ',
      isActive: true,
      createdAt: '2026-01-15T00:00:00Z',
    },
    {
      id: 'r-2',
      orgId: 'org-dhaka-campus',
      name: 'Server Room Precision Cooling Cap',
      scope: 'DEPT',
      scopeTargetName: 'Campus IT Main Switch Room',
      metric: 'HOURLY_CONSUMPTION',
      condition: 'GREATER_THAN',
      threshold: 50.0,
      unit: 'kWh',
      isActive: true,
      createdAt: '2026-01-20T00:00:00Z',
    },
    {
      id: 'r-3',
      orgId: 'org-dhaka-campus',
      name: 'Cleanroom Cryogenic Vacuum Pump Limit',
      scope: 'METER',
      scopeTargetName: 'MTR-L2-01 (Cleanroom Filtration)',
      metric: 'HOURLY_CONSUMPTION',
      condition: 'GREATER_THAN',
      threshold: 85.0,
      unit: 'kWh',
      isActive: true,
      createdAt: '2026-02-05T00:00:00Z',
    },
    {
      id: 'r-4',
      orgId: 'org-dhaka-campus',
      name: 'Off-Shift Library Lighting Auto-Check',
      scope: 'BUILDING',
      scopeTargetName: 'Central Library & Admin Hub',
      metric: 'HOURLY_CONSUMPTION',
      condition: 'GREATER_THAN',
      threshold: 30.0,
      unit: 'kWh',
      isActive: true,
      createdAt: '2026-02-12T00:00:00Z',
    },
  ];
}

export default async function AlertsPage() {
  const [{ data: serverEvents }, { data: serverRules }] = await Promise.all([
    getAllAlertEvents(),
    getAlertRules(),
  ]);

  const events = serverEvents || getInitialEvents();
  const rules = serverRules || getInitialRules();

  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              Alerts &amp; Anomaly Detection Center
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Continuous statistical outlier monitoring, threshold triggers, and facility dispatch
          </p>
        </div>
      </div>

      {/* Main Alerts Management UI */}
      <AlertsManager initialEvents={events} initialRules={rules} />
    </div>
  );
}
