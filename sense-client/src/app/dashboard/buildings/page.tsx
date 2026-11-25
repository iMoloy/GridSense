import { getBuildings } from '@/lib/api';
import { BuildingsDirectory } from '@/components/buildings/buildings-directory';
import type { Building } from '@/types';

// Fallback campus buildings dataset (instantly active, seamlessly connects to NestJS backend when running)
function getInitialBuildings(): Building[] {
  return [
    {
      id: 'b-sci',
      orgId: 'org-dhaka-campus',
      name: 'Science Complex & Laboratories',
      address: 'North Quad, Sector 4, Dhaka Campus',
      latitude: 23.7771,
      longitude: 90.3994,
      totalArea: 145000,
      floorsCount: 6,
      metersCount: 42,
      currentLoadKwh: 16400,
    },
    {
      id: 'b-eng',
      orgId: 'org-dhaka-campus',
      name: 'Engineering & Computing Tower',
      address: 'Innovation Ring, Dhaka Campus',
      latitude: 23.7775,
      longitude: 90.3998,
      totalArea: 128000,
      floorsCount: 8,
      metersCount: 38,
      currentLoadKwh: 14200,
    },
    {
      id: 'b-lib',
      orgId: 'org-dhaka-campus',
      name: 'Central Library & Admin Hub',
      address: 'Academic Promenade, Dhaka Campus',
      latitude: 23.7768,
      longitude: 90.3991,
      totalArea: 86000,
      floorsCount: 4,
      metersCount: 26,
      currentLoadKwh: 9800,
    },
    {
      id: 'b-res',
      orgId: 'org-dhaka-campus',
      name: 'Student Residential Halls',
      address: 'Residential Enclave East, Dhaka Campus',
      latitude: 23.7782,
      longitude: 90.4005,
      totalArea: 195000,
      floorsCount: 5,
      metersCount: 68,
      currentLoadKwh: 8520,
    },
    {
      id: 'b-med',
      orgId: 'org-dhaka-campus',
      name: 'Health Sciences & Clinical Pavilion',
      address: 'South Campus Avenue, Dhaka Campus',
      latitude: 23.7761,
      longitude: 90.3985,
      totalArea: 92000,
      floorsCount: 4,
      metersCount: 28,
      currentLoadKwh: 11200,
    },
    {
      id: 'b-adm',
      orgId: 'org-dhaka-campus',
      name: 'Executive & Operations Headquarters',
      address: 'Central Plaza, Dhaka Campus',
      latitude: 23.7765,
      longitude: 90.3992,
      totalArea: 64000,
      floorsCount: 3,
      metersCount: 18,
      currentLoadKwh: 4800,
    },
  ];
}

export default async function BuildingsPage() {
  const { data: serverBuildings } = await getBuildings();
  const buildings = serverBuildings || getInitialBuildings();

  const totalMeters = buildings.reduce(
    (acc, b) => acc + (b.metersCount || 0),
    0
  );
  const totalArea = buildings.reduce(
    (acc, b) => acc + (b.totalArea || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Title & Context */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
            Campus Buildings &amp; Facilities
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Hierarchy management: {buildings.length} facilities, {totalMeters} active
            meters covering {totalArea.toLocaleString()} sqft.
          </p>
        </div>
      </div>

      {/* Buildings Directory with Live Search & Category Filtering */}
      <BuildingsDirectory initialBuildings={buildings} />
    </div>
  );
}
