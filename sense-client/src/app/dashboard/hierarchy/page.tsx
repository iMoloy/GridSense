import { Network, Sparkles } from 'lucide-react';
import { getOrganizationHierarchy } from '@/lib/api';
import { HierarchyExplorer } from '@/components/hierarchy/hierarchy-explorer';
import type { OrganizationHierarchy } from '@/types';

// Fallback campus hierarchy dataset (dynamically connects to NestJS backend when running)
function getInitialHierarchy(): OrganizationHierarchy {
  return {
    organization: {
      id: 'org-dhaka-campus',
      name: 'Dhaka Smart Campus',
      slug: 'dhaka-campus',
      industry: 'Higher Education & Research',
      ratePerKwh: 8.5,
      currency: 'BDT',
      createdAt: '2026-01-01',
    },
    totalBuildings: 6,
    totalFloors: 24,
    totalDepartments: 72,
    totalMeters: 180,
    totalLoadKw: 684.5,
    buildings: [
      {
        id: 'b-sci',
        orgId: 'org-dhaka-campus',
        name: 'Science Complex & Laboratories',
        address: 'North Quad, Sector 4, Dhaka Campus',
        floorsCount: 4,
        metersCount: 16,
        totalLoadKw: 236.5,
        floors: [
          {
            id: 'fl-sci-1',
            buildingId: 'b-sci',
            name: 'Ground Floor & Central Atrium',
            level: 0,
            totalLoadKw: 84.2,
            departments: [
              {
                id: 'dept-sci-101',
                floorId: 'fl-sci-1',
                name: 'Main Reception & Exhibition Lounge',
                type: 'COMMON_AREA',
                totalLoadKw: 38.4,
                meters: [
                  {
                    id: 'm-sci-101-a',
                    departmentId: 'dept-sci-101',
                    serialNumber: 'MTR-L1-01',
                    name: 'Atrium Central HVAC Unit #1',
                    meterType: 'HVAC',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-01-15',
                    currentLoadKw: 24.1,
                    dailyConsumptionKwh: 480,
                    status: 'ONLINE',
                  },
                  {
                    id: 'm-sci-101-b',
                    departmentId: 'dept-sci-101',
                    serialNumber: 'MTR-L1-02',
                    name: 'LED Architectural Fixtures',
                    meterType: 'LIGHTING',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-01-15',
                    currentLoadKw: 14.3,
                    dailyConsumptionKwh: 180,
                    status: 'ONLINE',
                  },
                ],
              },
            ],
          },
          {
            id: 'fl-sci-2',
            buildingId: 'b-sci',
            name: 'Second Floor • Nanotechnology Lab',
            level: 1,
            totalLoadKw: 152.3,
            departments: [
              {
                id: 'dept-sci-201',
                floorId: 'fl-sci-2',
                name: 'Cleanroom & Vacuum Chambers',
                type: 'RESEARCH_LAB',
                totalLoadKw: 152.3,
                meters: [
                  {
                    id: 'm-sci-201-a',
                    departmentId: 'dept-sci-201',
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
                    id: 'm-sci-201-b',
                    departmentId: 'dept-sci-201',
                    serialNumber: 'MTR-L2-02',
                    name: 'Cleanroom Filtration Airflow',
                    meterType: 'HVAC',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-02-01',
                    currentLoadKw: 53.8,
                    dailyConsumptionKwh: 1290,
                    status: 'ONLINE',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'b-eng',
        orgId: 'org-dhaka-campus',
        name: 'Engineering & Computing Tower',
        address: 'Innovation Ring, Dhaka Campus',
        floorsCount: 4,
        metersCount: 14,
        totalLoadKw: 218.4,
        floors: [
          {
            id: 'fl-eng-1',
            buildingId: 'b-eng',
            name: 'Sub-Level 1 • High-Performance Datacenter',
            level: -1,
            totalLoadKw: 144.2,
            departments: [
              {
                id: 'dept-eng-001',
                floorId: 'fl-eng-1',
                name: 'Campus IT Main Switch Room',
                type: 'SERVER_ROOM',
                totalLoadKw: 144.2,
                meters: [
                  {
                    id: 'm-eng-001-a',
                    departmentId: 'dept-eng-001',
                    serialNumber: 'MTR-IT-01',
                    name: 'Compute Rack Feeder Busbar #1',
                    meterType: 'EQUIPMENT',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-01-15',
                    currentLoadKw: 88.2,
                    dailyConsumptionKwh: 2110,
                    status: 'ONLINE',
                  },
                  {
                    id: 'm-eng-001-b',
                    departmentId: 'dept-eng-001',
                    serialNumber: 'MTR-IT-02',
                    name: 'CRAC Chilled Water Air Handling',
                    meterType: 'HVAC',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-01-15',
                    currentLoadKw: 56.0,
                    dailyConsumptionKwh: 1340,
                    status: 'ONLINE',
                  },
                ],
              },
            ],
          },
          {
            id: 'fl-eng-2',
            buildingId: 'b-eng',
            name: 'Floor 3 • Artificial Intelligence Labs',
            level: 3,
            totalLoadKw: 74.2,
            departments: [
              {
                id: 'dept-eng-301',
                floorId: 'fl-eng-2',
                name: 'GPU Cluster Workstations',
                type: 'LAB',
                totalLoadKw: 74.2,
                meters: [
                  {
                    id: 'm-eng-301-a',
                    departmentId: 'dept-eng-301',
                    serialNumber: 'MTR-AI-01',
                    name: 'NVIDIA DGX Cluster Power Feed',
                    meterType: 'EQUIPMENT',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-03-01',
                    currentLoadKw: 74.2,
                    dailyConsumptionKwh: 1780,
                    status: 'ONLINE',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'b-lib',
        orgId: 'org-dhaka-campus',
        name: 'Central Library & Admin Hub',
        address: 'Academic Promenade, Dhaka Campus',
        floorsCount: 3,
        metersCount: 10,
        totalLoadKw: 98.5,
        floors: [
          {
            id: 'fl-lib-1',
            buildingId: 'b-lib',
            name: 'Level 1 • Reading Halls & Circulation',
            level: 1,
            totalLoadKw: 54.0,
            departments: [
              {
                id: 'dept-lib-101',
                floorId: 'fl-lib-1',
                name: 'Main Reading Floor',
                type: 'STUDY_HALL',
                totalLoadKw: 54.0,
                meters: [
                  {
                    id: 'm-lib-101-a',
                    departmentId: 'dept-lib-101',
                    serialNumber: 'MTR-LIB-01',
                    name: 'Daylight Harvesting Lighting System',
                    meterType: 'LIGHTING',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-01-20',
                    currentLoadKw: 22.0,
                    dailyConsumptionKwh: 340,
                    status: 'ONLINE',
                  },
                  {
                    id: 'm-lib-101-b',
                    departmentId: 'dept-lib-101',
                    serialNumber: 'MTR-LIB-02',
                    name: 'Central Air Circulator Pack',
                    meterType: 'HVAC',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-01-20',
                    currentLoadKw: 32.0,
                    dailyConsumptionKwh: 760,
                    status: 'ONLINE',
                  },
                ],
              },
            ],
          },
          {
            id: 'fl-lib-2',
            buildingId: 'b-lib',
            name: 'Rooftop Solar Array Deck',
            level: 3,
            totalLoadKw: 44.5,
            departments: [
              {
                id: 'dept-lib-201',
                floorId: 'fl-lib-2',
                name: 'Renewable Photovoltaic Bank',
                type: 'RENEWABLE',
                totalLoadKw: 44.5,
                meters: [
                  {
                    id: 'm-lib-201-a',
                    departmentId: 'dept-lib-201',
                    serialNumber: 'MTR-LIB-PV',
                    name: '60kW Rooftop Solar Inverter',
                    meterType: 'SOLAR_SOLAR',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-02-15',
                    currentLoadKw: 44.5,
                    dailyConsumptionKwh: 420,
                    status: 'ONLINE',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'b-res',
        orgId: 'org-dhaka-campus',
        name: 'Student Residential Halls',
        address: 'Residential Enclave East, Dhaka Campus',
        floorsCount: 3,
        metersCount: 12,
        totalLoadKw: 86.4,
        floors: [
          {
            id: 'fl-res-1',
            buildingId: 'b-res',
            name: 'Ground Level • Dining & EV Stations',
            level: 0,
            totalLoadKw: 86.4,
            departments: [
              {
                id: 'dept-res-101',
                floorId: 'fl-res-1',
                name: 'Campus Fleet EV Charging Bay',
                type: 'EV_STATION',
                totalLoadKw: 86.4,
                meters: [
                  {
                    id: 'm-res-101-a',
                    departmentId: 'dept-res-101',
                    serialNumber: 'MTR-EV-01',
                    name: 'DC Fast Charger #1 (50kW)',
                    meterType: 'EV_CHARGER',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-03-01',
                    currentLoadKw: 48.2,
                    dailyConsumptionKwh: 380,
                    status: 'ONLINE',
                  },
                  {
                    id: 'm-res-101-b',
                    departmentId: 'dept-res-101',
                    serialNumber: 'MTR-EV-02',
                    name: 'Level 2 Dual Port Station',
                    meterType: 'EV_CHARGER',
                    unit: 'kWh',
                    isActive: true,
                    installedAt: '2026-03-01',
                    currentLoadKw: 38.2,
                    dailyConsumptionKwh: 290,
                    status: 'ONLINE',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'b-med',
        orgId: 'org-dhaka-campus',
        name: 'Health Sciences & Clinical Pavilion',
        address: 'South Campus Avenue, Dhaka Campus',
        floorsCount: 2,
        metersCount: 6,
        totalLoadKw: 45.0,
        floors: [],
      },
      {
        id: 'b-adm',
        orgId: 'org-dhaka-campus',
        name: 'Executive & Operations Headquarters',
        address: 'Central Plaza, Dhaka Campus',
        floorsCount: 2,
        metersCount: 6,
        totalLoadKw: 32.0,
        floors: [],
      },
    ],
  };
}

export default async function HierarchyPage() {
  const { data: serverHierarchy } = await getOrganizationHierarchy();
  const hierarchy = serverHierarchy || getInitialHierarchy();

  return (
    <div className="space-y-6">
      {/* Title & Context */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Network className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              Campus Asset Hierarchy Tree
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Interactive multi-level asset model: Organization → Buildings → Floors → Departments → Meters
          </p>
        </div>
      </div>

      {/* Main Interactive Explorer */}
      <HierarchyExplorer initialHierarchy={hierarchy} />
    </div>
  );
}
