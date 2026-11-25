import type {
  DashboardOverviewData,
  Building,
  BuildingDetail,
  AlertEventItem,
  AnalyticsStudioData,
  AlertRuleItem,
  OrganizationHierarchy,
  ReportItem,
  ExecutiveReportData,
  OrgSettingsData,
} from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Server-safe fetcher for GridSense NestJS Backend
 */
export async function fetchFromApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Ensure explicit caching behavior
      cache: options.cache || 'no-store',
    });

    if (!res.ok) {
      return {
        data: null,
        error: `Server responded with status ${res.status}: ${res.statusText}`,
      };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Failed to connect to GridSense API';
    return { data: null, error: message };
  }
}

/**
 * Fetch overview dashboard telemetry data
 */
export async function getDashboardOverview(
  timeframe: string = '24h'
): Promise<{ data: DashboardOverviewData | null; error: string | null }> {
  return fetchFromApi<DashboardOverviewData>(
    `/analytics/overview?timeframe=${encodeURIComponent(timeframe)}`
  );
}

/**
 * Fetch buildings list
 */
export async function getBuildings(): Promise<{
  data: Building[] | null;
  error: string | null;
}> {
  return fetchFromApi<Building[]>('/buildings');
}

/**
 * Fetch active alerts
 */
export async function getRecentAlerts(): Promise<{
  data: AlertEventItem[] | null;
  error: string | null;
}> {
  return fetchFromApi<AlertEventItem[]>('/alerts/events?limit=10');
}

/**
 * Fetch building detail with full hierarchy (floors, departments, meters)
 */
export async function getBuildingById(
  id: string
): Promise<{ data: BuildingDetail | null; error: string | null }> {
  return fetchFromApi<BuildingDetail>(`/buildings/${encodeURIComponent(id)}`);
}

/**
 * Fetch Analytics Studio multi-facility comparison, heatmap, and cost projection
 */
export async function getAnalyticsStudio(
  timeframe: string = '7d',
  metric: string = 'kwh'
): Promise<{ data: AnalyticsStudioData | null; error: string | null }> {
  return fetchFromApi<AnalyticsStudioData>(
    `/analytics/studio?timeframe=${encodeURIComponent(timeframe)}&metric=${encodeURIComponent(metric)}`
  );
}

/**
 * Fetch all configured alert rules
 */
export async function getAlertRules(): Promise<{
  data: AlertRuleItem[] | null;
  error: string | null;
}> {
  return fetchFromApi<AlertRuleItem[]>('/alerts/rules');
}

/**
 * Fetch historical and active alert events
 */
export async function getAllAlertEvents(
  status?: string,
  severity?: string
): Promise<{ data: AlertEventItem[] | null; error: string | null }> {
  const query = new URLSearchParams();
  if (status && status !== 'ALL') query.set('status', status);
  if (severity && severity !== 'ALL') query.set('severity', severity);
  return fetchFromApi<AlertEventItem[]>(`/alerts/events?${query.toString()}`);
}

/**
 * Fetch complete campus organization hierarchy (Org -> Buildings -> Floors -> Depts -> Meters)
 */
export async function getOrganizationHierarchy(): Promise<{
  data: OrganizationHierarchy | null;
  error: string | null;
}> {
  return fetchFromApi<OrganizationHierarchy>('/hierarchy');
}

/**
 * Fetch historical generated report files list
 */
export async function getReportsArchive(): Promise<{
  data: ReportItem[] | null;
  error: string | null;
}> {
  return fetchFromApi<ReportItem[]>('/reports/archive');
}

/**
 * Fetch compiled executive audit report preview data
 */
export async function getExecutiveReportPreview(
  type: string = 'MONTHLY_AUDIT',
  period: string = '2026-11'
): Promise<{
  data: ExecutiveReportData | null;
  error: string | null;
}> {
  return fetchFromApi<ExecutiveReportData>(
    `/reports/preview?type=${encodeURIComponent(type)}&period=${encodeURIComponent(period)}`
  );
}

/**
 * Fetch organization profile, tariff, telemetry configuration, and RBAC team
 */
export async function getOrgSettings(): Promise<{
  data: OrgSettingsData | null;
  error: string | null;
}> {
  return fetchFromApi<OrgSettingsData>('/settings');
}

/**
 * Update organization profile
 */
export async function updateOrgProfile(payload: {
  name?: string;
  industry?: string;
  slug?: string;
}): Promise<{ data: unknown; error: string | null }> {
  return fetchFromApi('/settings/org', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Update tariff configuration
 */
export async function updateTariffSettings(payload: {
  peakRatePerKwh?: number;
  offPeakRatePerKwh?: number;
  peakHoursStart?: string;
  peakHoursEnd?: string;
  currency?: string;
  carbonFactorKgPerKwh?: number;
}): Promise<{ data: unknown; error: string | null }> {
  return fetchFromApi('/settings/tariff', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * Update alert status (ACKNOWLEDGED or RESOLVED)
 */
export async function updateAlertStatus(
  id: string,
  status: 'ACKNOWLEDGED' | 'RESOLVED'
): Promise<{ data: unknown; error: string | null }> {
  return fetchFromApi(`/alerts/events/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/**
 * Create new alert rule
 */
export async function createAlertRule(
  rule: Record<string, unknown>
): Promise<{ data: AlertRuleItem | null; error: string | null }> {
  return fetchFromApi<AlertRuleItem>('/alerts/rules', {
    method: 'POST',
    body: JSON.stringify(rule),
  });
}
