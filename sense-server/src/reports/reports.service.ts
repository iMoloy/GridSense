import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPreview(type: string = 'MONTHLY_AUDIT', period: string = '2026-11') {
    const org = await this.prisma.organization.findFirst();

    return {
      reportId: 'REP-2026-11-AUDIT',
      title: 'Monthly Campus Energy Consumption & Tariff Audit',
      type: type || 'MONTHLY_AUDIT',
      periodLabel: 'November 2026 (Month-to-Date)',
      generatedAt: new Date().toISOString(),
      organization: {
        id: org?.id || 'org-dhaka-campus',
        name: org?.name || 'Dhaka Smart Campus',
        slug: org?.slug || 'dhaka-campus',
        industry: org?.industry || 'Higher Education & Research',
        ratePerKwh: org?.ratePerKwh || 8.5,
        currency: org?.currency || 'BDT',
        createdAt: org?.createdAt?.toISOString() || '2026-01-01T00:00:00Z',
      },
      preparedBy: 'Campus Chief Energy Officer (CEO / Facilities)',
      executiveSummary:
        'Total campus energy consumption across all 180 monitored sub-meters totaled 342,600 kWh during the reporting window, incurring gross utility expenses of ৳2,912,100 BDT. Continuous Z-score anomaly surveillance suppressed off-shift baseline leakage by 6.4%, achieving an estimated ৳38,500 monthly load-shifting cost savings. Carbon emission intensity remained within regional compliance thresholds at 222.7 metric tons of CO₂ equivalent.',
      totalConsumptionKwh: 342600,
      totalCost: 2912100,
      totalCarbonTons: 222.7,
      peakDemandKw: 840,
      savingsAchievedCost: 38500,
      buildingAllocations: [
        {
          id: 'b-sci',
          buildingName: 'Science Complex & Laboratories',
          consumptionKwh: 114800,
          cost: 975800,
          carbonKg: 74620,
          sharePercent: 33.5,
          peakKw: 310,
          efficiencyRating: 'Grade A',
        },
        {
          id: 'b-eng',
          buildingName: 'Engineering & Computing Tower',
          consumptionKwh: 99400,
          cost: 844900,
          carbonKg: 64610,
          sharePercent: 29.0,
          peakKw: 285,
          efficiencyRating: 'Grade B+',
        },
        {
          id: 'b-lib',
          buildingName: 'Central Library & Admin Hub',
          consumptionKwh: 68600,
          cost: 583100,
          carbonKg: 44590,
          sharePercent: 20.0,
          peakKw: 140,
          efficiencyRating: 'Grade A+',
        },
        {
          id: 'b-res',
          buildingName: 'Student Residential Halls',
          consumptionKwh: 59800,
          cost: 508300,
          carbonKg: 38870,
          sharePercent: 17.5,
          peakKw: 105,
          efficiencyRating: 'Grade B',
        },
      ],
    };
  }

  async getArchive() {
    return [
      {
        id: 'REP-2026-10',
        title: 'October 2026 Full Campus Energy Audit',
        type: 'MONTHLY_AUDIT',
        period: 'October 2026',
        format: 'PDF',
        sizeKb: 482,
        generatedAt: '2026-11-01T08:00:00Z',
        author: 'Global Org Admin',
        status: 'READY',
      },
      {
        id: 'REP-2026-Q3-TARIFF',
        title: 'Q3 2026 Peak vs Off-Peak Tariff Variance Analysis',
        type: 'PEAK_TARIFF',
        period: 'Q3 2026 (Jul - Sep)',
        format: 'CSV',
        sizeKb: 215,
        generatedAt: '2026-10-05T10:30:00Z',
        author: 'Senior Energy Analyst',
        status: 'READY',
      },
      {
        id: 'REP-2026-09-ESG',
        title: 'Green Campus Carbon Offset & ESG Sustainability Report',
        type: 'CARBON_COMPLIANCE',
        period: 'September 2026',
        format: 'PDF',
        sizeKb: 610,
        generatedAt: '2026-10-01T09:15:00Z',
        author: 'Sustainability Officer',
        status: 'READY',
      },
      {
        id: 'REP-2026-09-DEPT',
        title: 'Department Sub-Meter Allocation & Invoicing Ledger',
        type: 'DEPARTMENT_INVOICE',
        period: 'September 2026',
        format: 'CSV',
        sizeKb: 144,
        generatedAt: '2026-10-01T11:45:00Z',
        author: 'Finance Controller',
        status: 'READY',
      },
    ];
  }
}
