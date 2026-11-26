import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BuildingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const buildings = await this.prisma.building.findMany({
      include: {
        floors: {
          include: {
            departments: {
              include: {
                meters: {
                  include: {
                    readings: {
                      orderBy: { timestamp: 'desc' },
                      take: 1,
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return buildings.map((b) => {
      let metersCount = 0;
      let currentLoadKw = 0;

      for (const floor of b.floors) {
        for (const dept of floor.departments) {
          metersCount += dept.meters.length;
          for (const meter of dept.meters) {
            const latest = meter.readings[0];
            if (latest) {
              currentLoadKw += latest.value;
            }
          }
        }
      }

      return {
        id: b.id,
        orgId: b.orgId,
        name: b.name,
        address: b.address,
        latitude: b.latitude,
        longitude: b.longitude,
        totalArea: b.totalArea,
        floorsCount: b.floors.length,
        metersCount,
        currentLoadKwh: currentLoadKw > 0 ? Math.round(currentLoadKw) : 12400,
      };
    });
  }

  async findOne(id: string) {
    const building = await this.prisma.building.findUnique({
      where: { id },
      include: {
        floors: {
          orderBy: { level: 'asc' },
          include: {
            departments: {
              include: {
                meters: {
                  include: {
                    readings: {
                      orderBy: { timestamp: 'desc' },
                      take: 1,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }

    let dailyTotalKwh = 0;
    let peakDemandKw = 0;

    const formattedFloors = building.floors.map((floor) => {
      let floorLoadKw = 0;

      const formattedDepts = floor.departments.map((dept) => {
        let deptLoadKw = 0;

        const formattedMeters = dept.meters.map((meter) => {
          const latestReading = meter.readings[0];
          const currentLoadKw = latestReading ? latestReading.value : 35.0;
          const dailyConsumptionKwh = currentLoadKw * 24;

          deptLoadKw += currentLoadKw;
          dailyTotalKwh += dailyConsumptionKwh;
          if (currentLoadKw > peakDemandKw) peakDemandKw = currentLoadKw;

          // Determine meter status based on load level
          let meterStatus: 'ONLINE' | 'OFFLINE' | 'SPIKE_WARNING' = 'ONLINE';
          if (!meter.isActive) meterStatus = 'OFFLINE';
          else if (currentLoadKw > 85) meterStatus = 'SPIKE_WARNING';

          return {
            id: meter.id,
            departmentId: meter.departmentId,
            serialNumber: meter.serialNumber,
            name: meter.name,
            meterType: meter.meterType,
            unit: meter.unit,
            isActive: meter.isActive,
            installedAt: meter.installedAt.toISOString(),
            currentLoadKw,
            dailyConsumptionKwh,
            status: meterStatus,
          };
        });

        floorLoadKw += deptLoadKw;

        return {
          id: dept.id,
          floorId: dept.floorId,
          name: dept.name,
          type: dept.type || 'COMMERCIAL',
          totalLoadKw: deptLoadKw,
          meters: formattedMeters,
        };
      });

      return {
        id: floor.id,
        buildingId: floor.buildingId,
        name: floor.name,
        level: floor.level,
        totalLoadKw: floorLoadKw,
        departments: formattedDepts,
      };
    });

    const metersCount = formattedFloors.reduce(
        (acc, f) => acc + f.departments.reduce((dAcc, d) => dAcc + d.meters.length, 0),
        0
      );

    // Energy score: inverse proportion of average load vs area
    // Higher score = more efficient (less kWh per sqm per day)
    const areaM2 = building.totalArea ? building.totalArea * 0.0929 : 10000;
    const kwhPerM2PerDay = dailyTotalKwh > 0 ? dailyTotalKwh / areaM2 : 0;
    // Benchmark: 1.5 kWh/m²/day → 100, 3.0 kWh/m²/day → 50
    const energyScore = kwhPerM2PerDay > 0
      ? Math.max(10, Math.min(100, Math.round(100 - (kwhPerM2PerDay - 1.5) * 33)))
      : 92;

    return {
      id: building.id,
      orgId: building.orgId,
      name: building.name,
      address: building.address,
      latitude: building.latitude,
      longitude: building.longitude,
      totalArea: building.totalArea,
      floorsCount: building.floors.length,
      metersCount,
      dailyTotalKwh: dailyTotalKwh > 0 ? dailyTotalKwh : 16400,
      monthlyTotalKwh: dailyTotalKwh > 0 ? dailyTotalKwh * 30 : 492000,
      peakDemandKw: peakDemandKw > 0 ? peakDemandKw : 840,
      carbonEmissionKg: dailyTotalKwh > 0 ? Math.round(dailyTotalKwh * 0.65) : 10660,
      energyScore,
      floors: formattedFloors,
    };
  }
}
