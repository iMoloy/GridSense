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
  | 'SOLAR'
  | 'EV_CHARGER';

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL';
export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'RESOLVED';
export type AlertScope = 'ORG' | 'BUILDING' | 'FLOOR' | 'DEPT' | 'METER';

export interface AlertRuleItem {
  id: string;
  orgId: string;
  name: string;
  scope: AlertScope;
  scopeTargetName?: string;
  metric: string;
  condition: string;
  threshold: number;
  unit: string;
  isActive: boolean;
  createdAt: string;
}

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

export interface HierarchyBuilding extends Building {
  floors: FloorWithDepartments[];
  totalLoadKw: number;
}

export interface OrganizationHierarchy {
  organization: Organization;
  totalBuildings: number;
  totalFloors: number;
  totalDepartments: number;
  totalMeters: number;
  totalLoadKw: number;
  buildings: HierarchyBuilding[];
}

export type ReportType =
  | 'MONTHLY_AUDIT'
  | 'PEAK_TARIFF'
  | 'CARBON_COMPLIANCE'
  | 'DEPARTMENT_INVOICE';

export type ReportFormat = 'PDF' | 'CSV' | 'JSON';

export interface ReportItem {
  id: string;
  title: string;
  type: ReportType;
  period: string;
  format: ReportFormat;
  sizeKb: number;
  generatedAt: string;
  author: string;
  status: 'READY' | 'COMPILING';
  downloadUrl?: string;
}

export interface BuildingAllocationReportItem {
  id: string;
  buildingName: string;
  consumptionKwh: number;
  cost: number;
  carbonKg: number;
  sharePercent: number;
  peakKw: number;
  efficiencyRating: string;
}

export interface ExecutiveReportData {
  reportId: string;
  title: string;
  type: ReportType;
  periodLabel: string;
  generatedAt: string;
  organization: Organization;
  preparedBy: string;
  executiveSummary: string;
  totalConsumptionKwh: number;
  totalCost: number;
  totalCarbonTons: number;
  peakDemandKw: number;
  savingsAchievedCost: number;
  buildingAllocations: BuildingAllocationReportItem[];
}

export interface TeamUser {
  id: string;
  orgId: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  status: 'ACTIVE' | 'INVITED' | 'SUSPENDED';
  lastActiveAt: string;
}

export interface TariffConfig {
  peakRatePerKwh: number;
  offPeakRatePerKwh: number;
  peakHoursStart: string;
  peakHoursEnd: string;
  currency: string;
  carbonFactorKgPerKwh: number;
}

export interface TelemetryConfig {
  zScoreThreshold: number;
  rollupCadenceMinutes: number;
  dbStatus: 'CONNECTED' | 'DISCONNECTED';
  dbLatencyMs: number;
  iotIngestionToken: string;
  webhookUrl?: string;
}

export interface OrgSettingsData {
  organization: Organization;
  tariff: TariffConfig;
  telemetry: TelemetryConfig;
  team: TeamUser[];
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
