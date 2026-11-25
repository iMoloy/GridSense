'use client';

import { useState } from 'react';
import { ReportGeneratorControls } from './report-generator-controls';
import { ExecutiveReportPreview } from './executive-report-preview';
import { HistoricalReportsTable } from './historical-reports-table';
import type { ExecutiveReportData, ReportItem, ReportType } from '@/types';
import { getExecutiveReportPreview } from '@/lib/api';

interface ReportsStudioProps {
  initialReport: ExecutiveReportData;
  historicalReports: ReportItem[];
}

export function ReportsStudio({
  initialReport,
  historicalReports,
}: ReportsStudioProps) {
  const [reportType, setReportType] = useState<ReportType>(initialReport.type);
  const [period, setPeriod] = useState<string>('2026-11');
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'ARCHIVE'>('PREVIEW');
  const [currentReport, setCurrentReport] = useState<ExecutiveReportData>(initialReport);
  const [isLoading, setIsLoading] = useState(false);

  const handleReportTypeChange = async (type: ReportType) => {
    setReportType(type);
    setIsLoading(true);
    const res = await getExecutiveReportPreview(type, period);
    if (res.data) setCurrentReport(res.data);
    setIsLoading(false);
  };

  const handlePeriodChange = async (p: string) => {
    setPeriod(p);
    setIsLoading(true);
    const res = await getExecutiveReportPreview(reportType, p);
    if (res.data) setCurrentReport(res.data);
    setIsLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    // Generate actual formatted CSV
    const headers = ['Building Name', 'Consumption (kWh)', 'Cost (BDT)', 'Carbon (kg)', 'Share (%)', 'Efficiency Rating'];
    const rows = currentReport.buildingAllocations.map((b) => [
      `"${b.buildingName}"`,
      b.consumptionKwh,
      b.cost,
      b.carbonKg,
      `${b.sharePercent.toFixed(1)}%`,
      b.efficiencyRating,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GridSense-Audit-${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const jsonContent = JSON.stringify(currentReport, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GridSense-Audit-${period}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Generator Controls */}
      <ReportGeneratorControls
        reportType={reportType}
        onReportTypeChange={handleReportTypeChange}
        period={period}
        onPeriodChange={handlePeriodChange}
        onPrint={handlePrint}
        onDownloadCsv={handleDownloadCsv}
        onDownloadJson={handleDownloadJson}
      />

      {/* View Switcher Tabs (Print Hidden) */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 print:hidden">
        <button
          type="button"
          onClick={() => setActiveTab('PREVIEW')}
          className={`min-h-11 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'PREVIEW'
              ? 'bg-slate-800 text-slate-100 ring-1 ring-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Executive Audit Preview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ARCHIVE')}
          className={`min-h-11 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
            activeTab === 'ARCHIVE'
              ? 'bg-slate-800 text-slate-100 ring-1 ring-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Historical Archives ({historicalReports.length})
        </button>
      </div>

      {/* Main View Area */}
      {activeTab === 'PREVIEW' ? (
        <ExecutiveReportPreview report={currentReport} />
      ) : (
        <HistoricalReportsTable reports={historicalReports} />
      )}
    </div>
  );
}
