import { FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { getReportsArchive, getExecutiveReportPreview } from '@/lib/api';
import { ReportsStudio } from '@/components/reports/reports-studio';
import type { ExecutiveReportData, ReportItem } from '@/types';

// Fallback executive report compilation (dynamically connects to NestJS backend when running)
function getInitialReportPreview(): ExecutiveReportData {
  return {
    reportId: 'REP-2026-11-AUDIT',
    title: 'Monthly Campus Energy Consumption & Tariff Audit',
    type: 'MONTHLY_AUDIT',
    periodLabel: 'November 2026 (Month-to-Date)',
    generatedAt: new Date().toISOString(),
    organization: {
      id: 'org-dhaka-campus',
      name: 'Dhaka Smart Campus',
      slug: 'dhaka-campus',
      industry: 'Higher Education & Research',
      ratePerKwh: 8.5,
      currency: 'BDT',
      createdAt: '2026-01-01',
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

// Fallback historical generated archives
function getInitialArchive(): ReportItem[] {
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

export default async function ReportsPage() {
  const [{ data: serverReport }, { data: serverArchive }] = await Promise.all([
    getExecutiveReportPreview(),
    getReportsArchive(),
  ]);

  const report = serverReport || getInitialReportPreview();
  const archive = serverArchive || getInitialArchive();

  return (
    <div className="space-y-6">
      {/* Title & Context */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
              Reports &amp; Compliance Studio
            </h1>
          </div>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Formal executive audits, printable PDF sheets, automated CSV exports, and tariff reconciliation
          </p>
        </div>
      </div>

      {/* Main Reports Studio */}
      <ReportsStudio initialReport={report} historicalReports={archive} />
    </div>
  );
}
