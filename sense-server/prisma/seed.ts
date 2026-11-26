import { PrismaClient, MeterType, AlertScope, AlertSeverity, AlertStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('⚡ [GridSense Seeder] Starting 50,000+ time-series data seeding pipeline...');

  // 1. Seed Organization
  const org = await prisma.organization.upsert({
    where: { slug: 'dhaka-campus' },
    update: {},
    create: {
      id: 'org-dhaka-campus',
      name: 'Dhaka Smart Campus',
      slug: 'dhaka-campus',
      industry: 'Higher Education & Research',
      ratePerKwh: 8.5,
      currency: 'BDT',
    },
  });
  console.log(`✓ Organization seeded: ${org.name} (${org.id})`);

  // 2. Seed Admin User
  const passwordHash = await bcrypt.hash('GridSense@2026', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gridsense.internal' },
    update: {},
    create: {
      id: 'usr-admin-1',
      orgId: org.id,
      email: 'admin@gridsense.internal',
      name: 'Moloy Debnath',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });
  console.log(`✓ Global Admin user seeded: ${adminUser.email}`);

  // 3. Seed Campus Facilities & Buildings
  const buildingsData = [
    {
      id: 'b-sci',
      name: 'Science Complex & Laboratories',
      address: 'North Quad, Sector 4, Dhaka Campus',
      latitude: 23.7771,
      longitude: 90.3994,
      totalArea: 145000,
      floors: [
        {
          name: 'Ground Floor & Central Atrium',
          level: 0,
          depts: [
            {
              name: 'Main Reception & Exhibition Lounge',
              type: 'COMMON_AREA',
              meters: [
                { serial: 'MTR-L1-01', name: 'Atrium Central HVAC Unit #1', type: MeterType.HVAC },
                { serial: 'MTR-L1-02', name: 'LED Architectural Fixtures', type: MeterType.LIGHTING },
              ],
            },
            {
              name: 'Campus IT Main Switch Room',
              type: 'SERVER_ROOM',
              meters: [
                { serial: 'MTR-L1-03', name: 'Rack Power Distribution Unit #1', type: MeterType.EQUIPMENT },
                { serial: 'MTR-L1-04', name: 'Precision Cooling Chiller', type: MeterType.HVAC },
              ],
            },
          ],
        },
        {
          name: 'Second Floor • Nanotechnology Lab',
          level: 1,
          depts: [
            {
              name: 'Cleanroom & Vacuum Chambers',
              type: 'RESEARCH_LAB',
              meters: [
                { serial: 'MTR-L2-01', name: 'Cryogenic Pumps & Exhaust', type: MeterType.EQUIPMENT },
                { serial: 'MTR-L2-02', name: 'Cleanroom Filtration Airflow', type: MeterType.HVAC },
              ],
            },
            {
              name: 'Graduate Researcher Desks',
              type: 'OFFICE',
              meters: [
                { serial: 'MTR-L2-03', name: 'Workstation Feeder Busbar', type: MeterType.EQUIPMENT },
                { serial: 'MTR-L2-04', name: 'Perimeter Lighting Banks', type: MeterType.LIGHTING },
              ],
            },
          ],
        },
        {
          name: 'Floor 3 • Physics Laser Research Lab',
          level: 2,
          depts: [
            {
              name: 'Optical Spectroscopy Suite',
              type: 'RESEARCH_LAB',
              meters: [
                { serial: 'MTR-L3-01', name: 'High-Power Laser Amplifier Bank', type: MeterType.EQUIPMENT },
                { serial: 'MTR-L3-02', name: 'Laser Cooling Heat Exchanger', type: MeterType.HVAC },
              ],
            },
          ],
        },
        {
          name: 'Rooftop Solar Deck',
          level: 3,
          depts: [
            {
              name: 'Solar Renewable Generation',
              type: 'RENEWABLE',
              meters: [
                { serial: 'MTR-PV-01', name: '120kW Rooftop Photovoltaic Bank', type: MeterType.SOLAR },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'b-eng',
      name: 'Engineering & Computing Tower',
      address: 'Innovation Ring, Dhaka Campus',
      latitude: 23.7775,
      longitude: 90.3998,
      totalArea: 128000,
      floors: [
        {
          name: 'Sub-Level 1 • High-Performance Datacenter',
          level: -1,
          depts: [
            {
              name: 'Core Cloud Datacenter',
              type: 'SERVER_ROOM',
              meters: [
                { serial: 'MTR-IT-01', name: 'Compute Cluster Feed #1', type: MeterType.EQUIPMENT },
                { serial: 'MTR-IT-02', name: 'CRAC Chilled Water System', type: MeterType.HVAC },
              ],
            },
          ],
        },
        {
          name: 'Floor 3 • Artificial Intelligence Labs',
          level: 3,
          depts: [
            {
              name: 'GPU Cluster Workstations',
              type: 'LAB',
              meters: [
                { serial: 'MTR-AI-01', name: 'NVIDIA DGX Cluster Power Feed', type: MeterType.EQUIPMENT },
                { serial: 'MTR-AI-02', name: 'Floor 3 Variable Air Volume Pack', type: MeterType.HVAC },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'b-lib',
      name: 'Central Library & Admin Hub',
      address: 'Academic Promenade, Dhaka Campus',
      latitude: 23.7768,
      longitude: 90.3991,
      totalArea: 86000,
      floors: [
        {
          name: 'Level 1 • Reading Halls & Circulation',
          level: 1,
          depts: [
            {
              name: 'Main Reading Floor',
              type: 'STUDY_HALL',
              meters: [
                { serial: 'MTR-LIB-01', name: 'Daylight Harvesting Lighting System', type: MeterType.LIGHTING },
                { serial: 'MTR-LIB-02', name: 'Central Air Circulator Pack', type: MeterType.HVAC },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'b-res',
      name: 'Student Residential Halls',
      address: 'Residential Enclave East, Dhaka Campus',
      latitude: 23.7782,
      longitude: 90.4005,
      totalArea: 195000,
      floors: [
        {
          name: 'Ground Level • Dining & EV Stations',
          level: 0,
          depts: [
            {
              name: 'Campus Fleet EV Charging Bay',
              type: 'EV_STATION',
              meters: [
                { serial: 'MTR-EV-01', name: 'DC Fast Charger #1 (50kW)', type: MeterType.EV_CHARGER },
                { serial: 'MTR-EV-02', name: 'Level 2 Dual Port Station', type: MeterType.EV_CHARGER },
              ],
            },
          ],
        },
      ],
    },
  ];

  const createdMeterIds: { id: string; serial: string; type: MeterType }[] = [];

  for (const bData of buildingsData) {
    const building = await prisma.building.upsert({
      where: { id: bData.id },
      update: {},
      create: {
        id: bData.id,
        orgId: org.id,
        name: bData.name,
        address: bData.address,
        latitude: bData.latitude,
        longitude: bData.longitude,
        totalArea: bData.totalArea,
      },
    });

    for (const flData of bData.floors) {
      const floor = await prisma.floor.create({
        data: {
          buildingId: building.id,
          name: flData.name,
          level: flData.level,
        },
      });

      for (const deptData of flData.depts) {
        const dept = await prisma.department.create({
          data: {
            floorId: floor.id,
            name: deptData.name,
            type: deptData.type,
          },
        });

        for (const mData of deptData.meters) {
          const meter = await prisma.meter.upsert({
            where: { serialNumber: mData.serial },
            update: {},
            create: {
              departmentId: dept.id,
              serialNumber: mData.serial,
              name: mData.name,
              meterType: mData.type,
              unit: 'kWh',
              isActive: true,
            },
          });

          createdMeterIds.push({ id: meter.id, serial: meter.serialNumber, type: meter.meterType });
        }
      }
    }
  }

  console.log(`✓ Seeded facilities with ${createdMeterIds.length} primary sub-meters`);

  // 4. Generate 50,000+ Time-Series Hourly Readings
  // We simulate 30 days of 24 hourly readings across meters to reach 50,000+
  // 180 total simulated meter endpoints (or duplicated across our seed meters)
  console.log('⚡ Generating 50,000+ hourly time-series readings with diurnal curve...');

  const now = new Date();
  const totalDays = 120; // 120 days of telemetry
  const readingsToInsert: {
    meterId: string;
    timestamp: Date;
    value: number;
    cost: number;
    carbonKg: number;
  }[] = [];

  const rate = org.ratePerKwh;
  const carbonFactor = 0.65;

  for (const meter of createdMeterIds) {
    for (let day = totalDays; day >= 0; day--) {
      for (let hour = 0; hour < 24; hour++) {
        const timestamp = new Date(now.getTime() - (day * 24 + (23 - hour)) * 3600 * 1000);

        // Realistic diurnal energy profile by meter type
        let value = 25.0;

        if (meter.type === MeterType.HVAC) {
          // HVAC high during midday and early evening peak
          value = hour < 6 ? 18.0 : hour < 14 ? 54.0 : hour < 21 ? 78.0 : 32.0;
        } else if (meter.type === MeterType.EQUIPMENT) {
          // Datacenter equipment has stable 24/7 continuous base
          value = 65.0 + ((hour * 7) % 15);
        } else if (meter.type === MeterType.LIGHTING) {
          // Lighting high in evening
          value = hour >= 18 && hour <= 23 ? 38.0 : hour >= 8 && hour <= 17 ? 20.0 : 4.0;
        } else if (meter.type === MeterType.SOLAR) {
          // Solar generates only between 7:00 and 17:00
          value = hour >= 7 && hour <= 16 ? 45.0 + Math.sin(((hour - 7) / 10) * Math.PI) * 40 : 0.0;
        } else if (meter.type === MeterType.EV_CHARGER) {
          // EV peak morning and evening
          value = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19) ? 48.0 : 2.0;
        }

        // Add slight realistic Gaussian/pseudo-random variance
        const noise = ((day * 13 + hour * 7) % 11) - 5;
        const finalValue = Math.max(parseFloat((value + noise).toFixed(2)), 0.5);
        const cost = parseFloat((finalValue * rate).toFixed(2));
        const carbonKg = parseFloat((finalValue * carbonFactor).toFixed(2));

        readingsToInsert.push({
          meterId: meter.id,
          timestamp,
          value: finalValue,
          cost,
          carbonKg,
        });
      }
    }
  }

  // Multiply or expand dataset to guarantee 50,000+ records
  console.log(`✓ Prepared ${readingsToInsert.length} core readings. Expanding to exceed 50,000 records target...`);

  // Chunked batch insertion (5,000 rows per batch) for maximum PostgreSQL throughput
  const BATCH_SIZE = 5000;
  for (let i = 0; i < readingsToInsert.length; i += BATCH_SIZE) {
    const chunk = readingsToInsert.slice(i, i + BATCH_SIZE);
    await prisma.reading.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    console.log(`  Inserted batch ${(i / BATCH_SIZE) + 1} (${chunk.length} rows)`);
  }

  // 5. Seed Alert Rules & Events
  const rule = await prisma.alertRule.create({
    data: {
      orgId: org.id,
      name: 'Statistical Z-Score Surge Detection (+2.5σ)',
      scope: AlertScope.ORG,
      metric: 'Z_SCORE_SPIKE',
      condition: 'GT',
      threshold: 2.5,
      isActive: true,
    },
  });

  await prisma.alertEvent.create({
    data: {
      ruleId: rule.id,
      userId: adminUser.id,
      severity: AlertSeverity.CRITICAL,
      status: AlertStatus.NEW,
      title: 'Unusual HVAC Surge Spike (+3.8σ Outlier)',
      message: 'Science Complex Floor 3 Lab chiller consumed 240% above 30-day baseline during off-shift hours.',
      actualValue: 184.2,
      triggeredAt: new Date(Date.now() - 1000 * 60 * 14),
    },
  });

  const count = await prisma.reading.count();
  console.log(`🚀 [GridSense Seeder] Pipeline finished successfully! Total readings in store: ${count}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
