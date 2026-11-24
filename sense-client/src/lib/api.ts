import type {
  DashboardOverviewData,
  Building,
  BuildingDetail,
  AlertEventItem,
  AnalyticsStudioData,
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
