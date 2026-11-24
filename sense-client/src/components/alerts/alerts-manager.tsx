'use client';

import { useState } from 'react';
import { AlertHeaderMetrics } from './alert-header-metrics';
import { AlertEventsList } from './alert-events-list';
import { AlertRulesTable } from './alert-rules-table';
import { CreateRuleModal } from './create-rule-modal';
import type { AlertEventItem, AlertRuleItem } from '@/types';

interface AlertsManagerProps {
  initialEvents: AlertEventItem[];
  initialRules: AlertRuleItem[];
}

export function AlertsManager({ initialEvents, initialRules }: AlertsManagerProps) {
  const [events, setEvents] = useState<AlertEventItem[]>(initialEvents);
  const [rules, setRules] = useState<AlertRuleItem[]>(initialRules);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRuleCreated = (newRule: AlertRuleItem) => {
    setRules((prev) => [newRule, ...prev]);
  };

  const criticalCount = events.filter(
    (e) => e.severity === 'CRITICAL' && e.status !== 'RESOLVED'
  ).length;

  const warningCount = events.filter(
    (e) => e.severity === 'WARNING' && e.status !== 'RESOLVED'
  ).length;

  const totalResolvedCount = events.filter((e) => e.status === 'RESOLVED').length;
  const activeRulesCount = rules.filter((r) => r.isActive).length;

  return (
    <div className="space-y-6">
      {/* KPI Metrics */}
      <AlertHeaderMetrics
        criticalCount={criticalCount}
        warningCount={warningCount}
        activeRulesCount={activeRulesCount}
        totalResolvedCount={totalResolvedCount}
      />

      {/* Main Alerts Feed */}
      <AlertEventsList initialEvents={events} />

      {/* Configured Threshold Rules Table */}
      <AlertRulesTable
        initialRules={rules}
        onOpenCreateModal={() => setIsModalOpen(true)}
      />

      {/* Create Rule Modal Dialog */}
      <CreateRuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRuleCreated={handleRuleCreated}
      />
    </div>
  );
}
