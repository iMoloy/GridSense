import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Building2,
  Layers,
  Gauge,
  Zap,
  Leaf,
  DollarSign,
  Activity,
  MapPin,
} from 'lucide-react';
import { getBuildingById } from '@/lib/api';
import { HierarchyView } from '@/components/buildings/hierarchy-view';
import type { BuildingDetail } from '@/types';
import { formatKwh, formatCurrency, formatCarbon, formatNumber } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

function getInitialBuildingDetail(id: string): BuildingDetail {
  return {
    id,
    orgId: 'org-dhaka-campus',
    name:
      id === 'b-eng'
        ? 'Engineering & Computing Tower'
        : id === 'b-lib'
        ? 'Central Library & Admin Hub'
        : 'Science Complex & Laboratories',
    address: 'North Quad, Sector 4, Dhaka Campus',
    latitude: 23.7771,
    longitude: 90.3994,
    totalArea: 145000,
    floorsCount: 4,
    metersCount: 16,
    dailyTotalKwh: 16400,
    monthlyTotalKwh: 492000,
    peakDemandKw: 840,
    carbonEmissionKg: 10660,
    energyScore: 92,
    floors: [
      {
        id: 'fl-1',
        buildingId: id,
        name: 'Ground Floor & Central Atrium',
        level: 0,
        totalLoadKw: 184.2,
        departments: [
          {
            id: 'dept-101',
            floorId: 'fl-1',
            name: 'Main Reception & Exhibition Lounge',
            type: 'COMMON_AREA',
            totalLoadKw: 62.4,
            meters: [
              {
                id: 'm-101-a',
                departmentId: 'dept-101',
                serialNumber: 'MTR-L1-01',
                name: 'Atrium Central HVAC Unit #1',
                meterType: 'HVAC',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-01-15',
                currentLoadKw: 42.1,
                dailyConsumptionKwh: 840,
                status: 'ONLINE',
              },
              {
                id: 'm-101-b',
                departmentId: 'dept-101',
                serialNumber: 'MTR-L1-02',
                name: 'LED Architectural Fixtures',
                meterType: 'LIGHTING',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-01-15',
                currentLoadKw: 20.3,
                dailyConsumptionKwh: 260,
                status: 'ONLINE',
              },
            ],
          },
          {
            id: 'dept-102',
            floorId: 'fl-1',
            name: 'Campus IT Main Switch Room',
            type: 'SERVER_ROOM',
            totalLoadKw: 121.8,
            meters: [
              {
                id: 'm-102-a',
                departmentId: 'dept-102',
                serialNumber: 'MTR-L1-03',
                name: 'Rack Power Distribution Unit #1',
                meterType: 'EQUIPMENT',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-01-15',
                currentLoadKw: 74.2,
                dailyConsumptionKwh: 1780,
                status: 'ONLINE',
              },
              {
                id: 'm-102-b',
                departmentId: 'dept-102',
                serialNumber: 'MTR-L1-04',
                name: 'Precision Cooling System',
                meterType: 'HVAC',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-01-15',
                currentLoadKw: 47.6,
                dailyConsumptionKwh: 1140,
                status: 'ONLINE',
              },
            ],
          },
        ],
      },
      {
        id: 'fl-2',
        buildingId: id,
        name: 'Second Floor • Nanotechnology Lab',
        level: 1,
        totalLoadKw: 236.5,
        departments: [
          {
            id: 'dept-201',
            floorId: 'fl-2',
            name: 'Cleanroom & Vacuum Chambers',
            type: 'RESEARCH_LAB',
            totalLoadKw: 154.5,
            meters: [
              {
                id: 'm-201-a',
                departmentId: 'dept-201',
                serialNumber: 'MTR-L2-01',
                name: 'Cryogenic Pumps & Exhaust',
                meterType: 'EQUIPMENT',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-02-01',
                currentLoadKw: 98.5,
                dailyConsumptionKwh: 2360,
                status: 'SPIKE_WARNING',
              },
              {
                id: 'm-201-b',
                departmentId: 'dept-201',
                serialNumber: 'MTR-L2-02',
                name: 'Cleanroom Filtration Airflow',
                meterType: 'HVAC',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-02-01',
                currentLoadKw: 56.0,
                dailyConsumptionKwh: 1340,
                status: 'ONLINE',
              },
            ],
          },
          {
            id: 'dept-202',
            floorId: 'fl-2',
            name: 'Graduate Researcher Desks',
            type: 'OFFICE',
            totalLoadKw: 82.0,
            meters: [
              {
                id: 'm-202-a',
                departmentId: 'dept-202',
                serialNumber: 'MTR-L2-03',
                name: 'Workstation Feeder Busbar',
                meterType: 'EQUIPMENT',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-02-01',
                currentLoadKw: 54.0,
                dailyConsumptionKwh: 760,
                status: 'ONLINE',
              },
              {
                id: 'm-202-b',
                departmentId: 'dept-202',
                serialNumber: 'MTR-L2-04',
                name: 'Perimeter Lighting Banks',
                meterType: 'LIGHTING',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-02-01',
                currentLoadKw: 28.0,
                dailyConsumptionKwh: 340,
                status: 'ONLINE',
              },
            ],
          },
        ],
      },
      {
        id: 'fl-3',
        buildingId: id,
        name: 'Rooftop Solar Array & HVAC Chiller Deck',
        level: 2,
        totalLoadKw: 142.0,
        departments: [
          {
            id: 'dept-301',
            floorId: 'fl-3',
            name: 'Solar Generation Inverter Room',
            type: 'RENEWABLE',
            totalLoadKw: 68.0,
            meters: [
              {
                id: 'm-301-a',
                departmentId: 'dept-301',
                serialNumber: 'MTR-PV-01',
                name: '120kW Rooftop Photovoltaic Bank',
                meterType: 'SOLAR_SOLAR',
                unit: 'kWh',
                isActive: true,
                installedAt: '2026-03-10',
                currentLoadKw: 68.0,
                dailyConsumptionKwh: 580,
                status: 'ONLINE',
              },
            ],
          },
        ],
      },
    ],
  };
}

export default async function BuildingDetailPage({ params }: PageProps) {
  // Next.js 16 requires awaiting params
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const { data: serverDetail } = await getBuildingById(id);
  const building = serverDetail || getInitialBuildingDetail(id);

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <Link
          href="/dashboard/buildings"
          className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Facilities</span>
        </Link>
      </nav>

      {/* Facility Header Card */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30 sm:h-14 sm:w-14">
              <Building2 className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="text-lg font-bold text-slate-100 sm:text-2xl">
                  {building.name}
                </h1>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/30">
                  Telemetry Active
                </span>
              </div>
              {building.address && (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">{building.address}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Efficiency Index
              </p>
              <p className="font-mono text-base font-bold text-emerald-400">
                {building.energyScore}/100
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-center">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Total Area
              </p>
              <p className="font-mono text-base font-semibold text-slate-200">
                {building.totalArea ? `${formatNumber(building.totalArea)} sqft` : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Facility KPI Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-800/80 pt-6 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-950/60 p-3.5 border border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              <span>Daily Draw</span>
            </div>
            <p className="mt-1.5 font-mono text-lg font-bold text-slate-100">
              {formatKwh(building.dailyTotalKwh)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-950/60 p-3.5 border border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <DollarSign className="h-3.5 w-3.5 text-cyan-400" />
              <span>Est. Daily Cost</span>
            </div>
            <p className="mt-1.5 font-mono text-lg font-bold text-slate-100">
              {formatCurrency(building.dailyTotalKwh * 8.5)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-950/60 p-3.5 border border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Leaf className="h-3.5 w-3.5 text-lime-400" />
              <span>Carbon CO₂</span>
            </div>
            <p className="mt-1.5 font-mono text-lg font-bold text-slate-100">
              {formatCarbon(building.carbonEmissionKg)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-950/60 p-3.5 border border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Activity className="h-3.5 w-3.5 text-amber-400" />
              <span>Peak Demand</span>
            </div>
            <p className="mt-1.5 font-mono text-lg font-bold text-slate-100">
              {building.peakDemandKw} kW
            </p>
          </div>
        </div>
      </div>

      {/* Hierarchy Drill-Down Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-100">
            Facility Hierarchy: Floors, Departments &amp; Sub-Meters
          </h2>
          <p className="text-xs text-slate-400">
            Expand floors to inspect department load splits and connected sensor serials
          </p>
        </div>

        <HierarchyView floors={building.floors} />
      </div>
    </div>
  );
}
