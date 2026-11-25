import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HierarchyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCampusHierarchy() {
    const org = await this.prisma.organization.findFirst({
      include: {
        buildings: {
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
        },
      },
    });

    if (!org) {
      // Return campus baseline structure
      return {
        organization: {
          id: 'org-dhaka-campus',
          name: 'Dhaka Smart Campus',
          slug: 'dhaka-campus',
          industry: 'Higher Education & Research',
          ratePerKwh: 8.5,
          currency: 'BDT',
          createdAt: new Date().toISOString(),
        },
        totalBuildings: 0,
        totalFloors: 0,
        totalDepartments: 0,
        totalMeters: 0,
        totalLoadKw: 0,
        buildings: [],
      };
    }

    let totalFloors = 0;
    let totalDepartments = 0;
    let totalMeters = 0;
    let totalLoadKw = 0;

    const buildings = org.buildings.map((b) => {
      let buildingLoadKw = 0;
      totalFloors += b.floors.length;

      const floors = b.floors.map((floor) => {
        let floorLoadKw = 0;
        totalDepartments += floor.departments.length;

        const departments = floor.departments.map((dept) => {
          let deptLoadKw = 0;
          totalMeters += dept.meters.length;

          const meters = dept.meters.map((meter) => {
            const latest = meter.readings[0];
            const loadKw = latest ? latest.value : 35.0;
            deptLoadKw += loadKw;

            return {
              id: meter.id,
              departmentId: meter.departmentId,
              serialNumber: meter.serialNumber,
              name: meter.name,
              meterType: meter.meterType,
              unit: meter.unit,
              isActive: meter.isActive,
              installedAt: meter.installedAt.toISOString(),
              currentLoadKw: loadKw,
              dailyConsumptionKwh: loadKw * 24,
              status: loadKw > 85 ? 'SPIKE_WARNING' : 'ONLINE',
            };
          });

          floorLoadKw += deptLoadKw;

          return {
            id: dept.id,
            floorId: dept.floorId,
            name: dept.name,
            type: dept.type || 'COMMERCIAL',
            totalLoadKw: deptLoadKw,
            meters,
          };
        });

        buildingLoadKw += floorLoadKw;

        return {
          id: floor.id,
          buildingId: floor.buildingId,
          name: floor.name,
          level: floor.level,
          totalLoadKw: floorLoadKw,
          departments,
        };
      });

      totalLoadKw += buildingLoadKw;

      return {
        id: b.id,
        orgId: b.orgId,
        name: b.name,
        address: b.address,
        totalArea: b.totalArea,
        floorsCount: b.floors.length,
        metersCount: floors.reduce((acc, f) => acc + f.departments.reduce((dAcc, d) => dAcc + d.meters.length, 0), 0),
        totalLoadKw: buildingLoadKw,
        floors,
      };
    });

    return {
      organization: {
        id: org.id,
        name: org.name,
        slug: org.slug,
        industry: org.industry,
        ratePerKwh: org.ratePerKwh,
        currency: org.currency,
        createdAt: org.createdAt.toISOString(),
      },
      totalBuildings: buildings.length,
      totalFloors,
      totalDepartments,
      totalMeters,
      totalLoadKw,
      buildings,
    };
  }
}
