export type Role =
  | 'SUPER_ADMIN'
  | 'ORG_ADMIN'
  | 'BUILDING_MANAGER'
  | 'ANALYST'
  | 'VIEWER';

export type MeterType =
  | 'MAIN_GRID'
  | 'HVAC'
  | 'LIGHTING'
  | 'EQUIPMENT'
  | 'SOLAR_SOLAR'
  | 'EV_CHARGER';

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';
export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'RESOLVED';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  industry?: string;
  ratePerKwh: number;
  currency: string;
  createdAt: string;
}

export interface Building {
  id: string;
  orgId: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  totalArea?: number;
  floorsCount?: number;
  metersCount?: number;
  currentLoadKwh?: number;
}

export interface Floor {
  id: string;
  buildingId: string;
  name: string;
  level: number;
}

export interface Department {
  id: string;
  floorId: string;
  name: string;
  type?: string;
}

export interface Meter {
  id: string;
  departmentId: string;
  serialNumber: string;
  name: string;
  meterType: MeterType;
  unit: string;
  isActive: boolean;
  installedAt: string;
  lastReading?: number;
}

export interface MeterWithReading extends Meter {
  currentLoadKw: number;
  dailyConsumptionKwh: number;
  status: 'ONLINE' | 'OFFLINE' | 'SPIKE_WARNING';
}

export interface DepartmentWithMeters extends Department {
  meters: MeterWithReading[];
  totalLoadKw: number;
}

export interface FloorWithDepartments extends Floor {
  departments: DepartmentWithMeters[];
  totalLoadKw: number;
}

export interface BuildingDetail extends Building {
  floors: FloorWithDepartments[];
  dailyTotalKwh: number;
  monthlyTotalKwh: number;
  peakDemandKw: number;
  carbonEmissionKg: number;
  energyScore: number;
}

export interface Reading {
  id: string;
  meterId: string;
  timestamp: string;
  value: number;
  cost: number;
  carbonKg: number;
}

export interface TimeSeriesPoint {
  timestamp: string;
  label: string;
  kwh: number;
  cost: number;
  carbonKg: number;
  predictedKwh?: number;
}

export interface KpiMetrics {
  totalConsumptionKwh: number;
  totalCost: number;
  totalCarbonKg: number;
  peakDemandKwh: number;
  peakHourLabel: string;
  activeAnomaliesCount: number;
  consumptionChangePercent: number;
  costChangePercent: number;
  carbonChangePercent: number;
  activeMetersCount: number;
  totalMetersCount: number;
}

export interface BuildingEnergyShare {
  buildingId: string;
  buildingName: string;
  consumptionKwh: number;
  percentage: number;
  activeMeters: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface PeakDistribution {
  peakKwh: number;
  offPeakKwh: number;
  peakPercentage: number;
  offPeakPercentage: number;
}

export interface AlertEventItem {
  id: string;
  ruleId?: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  message: string;
  actualValue: number;
  triggeredAt: string;
  locationName?: string;
}

export interface DashboardOverviewData {
  organization: Organization;
  metrics: KpiMetrics;
  timeSeries: TimeSeriesPoint[];
  buildingShares: BuildingEnergyShare[];
  peakDistribution: PeakDistribution;
  recentAlerts: AlertEventItem[];
}

export interface HeatmapPoint {
  day: string;
  hour: number;
  value: number;
  intensity: 0 | 1 | 2 | 3 | 4;
}

export interface FacilityComparisonItem {
  id: string;
  name: string;
  currentPeriodKwh: number;
  previousPeriodKwh: number;
  cost: number;
  carbonKg: number;
  changePercent: number;
}

export interface CostProjectionData {
  actualToDateKwh: number;
  actualToDateCost: number;
  projectedMonthEndCost: number;
  budgetLimitCost: number;
  projectedVariancePercent: number;
  peakTariffCost: number;
  offPeakTariffCost: number;
  potentialSavingsCost: number;
}

export interface AnalyticsStudioData {
  organization: Organization;
  timeframe: string;
  metric: 'kwh' | 'cost' | 'carbon';
  totalConsumptionKwh: number;
  totalCost: number;
  totalCarbonKg: number;
  peakDemandKw: number;
  heatmap: HeatmapPoint[];
  facilityComparison: FacilityComparisonItem[];
  projection: CostProjectionData;
  timeSeries: TimeSeriesPoint[];
}
