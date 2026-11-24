'use client';

import {
  ChevronDown,
  ChevronRight,
  Building2,
  Layers,
  Briefcase,
  Gauge,
  Zap,
} from 'lucide-react';
import type { HierarchyBuilding, FloorWithDepartments, DepartmentWithMeters, MeterWithReading } from '@/types';
import type { SelectedNodeInfo } from './hierarchy-inspector';
import { cn } from '@/lib/utils';

interface HierarchyTreeNodeProps {
  building: HierarchyBuilding;
  expandedNodes: Record<string, boolean>;
  onToggleNode: (id: string) => void;
  selectedNodeId: string | null;
  onSelectNode: (node: SelectedNodeInfo) => void;
  filterMeterType: string;
  searchQuery: string;
}

export function HierarchyTreeNode({
  building,
  expandedNodes,
  onToggleNode,
  selectedNodeId,
  onSelectNode,
  filterMeterType,
  searchQuery,
}: HierarchyTreeNodeProps) {
  const isBuildingExpanded = !!expandedNodes[building.id];

  const getMeterBadgeColor = (type: string) => {
    switch (type) {
      case 'HVAC':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'LIGHTING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'SOLAR_SOLAR':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'EV_CHARGER':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden shadow-lg backdrop-blur-sm">
      {/* 1. Building Level Row */}
      <div
        className={cn(
          'flex min-h-14 items-center justify-between p-3.5 sm:px-5 transition-colors cursor-pointer',
          selectedNodeId === building.id
            ? 'bg-emerald-500/10 border-l-4 border-emerald-500'
            : 'hover:bg-slate-900/90'
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            onToggleNode(building.id);
            onSelectNode({
              type: 'BUILDING',
              id: building.id,
              name: building.name,
              path: `Dhaka Campus > ${building.name}`,
              currentLoadKw: building.totalLoadKw,
              buildingId: building.id,
              childrenCount: building.floors.length,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onToggleNode(building.id);
            }
          }}
          className="flex min-w-0 flex-1 items-center gap-3 pr-2 text-left focus:outline-none"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleNode(building.id);
            }}
            aria-label={`Toggle ${building.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            {isBuildingExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="truncate text-xs font-bold text-slate-100 sm:text-sm">
              {building.name}
            </h4>
            <p className="truncate text-[11px] text-slate-400">
              {building.floors.length} Floors • {building.metersCount || 16} Meters
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 font-mono text-xs font-bold text-emerald-400">
          <Zap className="h-3.5 w-3.5" />
          <span>{building.totalLoadKw.toFixed(1)} kW</span>
        </div>
      </div>

      {/* 2. Floors Container */}
      {isBuildingExpanded && (
        <div className="border-t border-slate-800/80 bg-slate-950/40 p-3 sm:p-4 space-y-3">
          {building.floors.map((floor) => {
            const isFloorExpanded = !!expandedNodes[floor.id];

            return (
              <div
                key={floor.id}
                className="rounded-xl border border-slate-800/60 bg-slate-900/50 overflow-hidden"
              >
                {/* Floor Header Bar */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onToggleNode(floor.id);
                    onSelectNode({
                      type: 'FLOOR',
                      id: floor.id,
                      name: floor.name,
                      path: `Dhaka Campus > ${building.name} > Level ${floor.level}`,
                      currentLoadKw: floor.totalLoadKw,
                      buildingId: building.id,
                      childrenCount: floor.departments.length,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onToggleNode(floor.id);
                    }
                  }}
                  className={cn(
                    'flex min-h-12 items-center justify-between p-3 text-left transition-colors cursor-pointer',
                    selectedNodeId === floor.id
                      ? 'bg-cyan-500/10 border-l-4 border-cyan-400'
                      : 'hover:bg-slate-900'
                  )}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 pr-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleNode(floor.id);
                      }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400"
                    >
                      {isFloorExpanded ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>

                    <Layers className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span className="truncate text-xs font-semibold text-slate-200">
                      Level {floor.level}: {floor.name}
                    </span>
                  </div>

                  <span className="shrink-0 font-mono text-xs font-semibold text-cyan-400">
                    {floor.totalLoadKw.toFixed(1)} kW
                  </span>
                </div>

                {/* 3. Departments Container */}
                {isFloorExpanded && (
                  <div className="border-t border-slate-800/60 bg-slate-950/60 p-3 space-y-3">
                    {floor.departments.map((dept) => {
                      const isDeptExpanded = !!expandedNodes[dept.id];

                      return (
                        <div
                          key={dept.id}
                          className="rounded-lg border border-slate-800/60 bg-slate-900/30 overflow-hidden"
                        >
                          {/* Dept Header */}
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              onToggleNode(dept.id);
                              onSelectNode({
                                type: 'DEPARTMENT',
                                id: dept.id,
                                name: dept.name,
                                path: `Dhaka Campus > ${building.name} > Level ${floor.level} > ${dept.name}`,
                                currentLoadKw: dept.totalLoadKw,
                                buildingId: building.id,
                                childrenCount: dept.meters.length,
                              });
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                onToggleNode(dept.id);
                              }
                            }}
                            className={cn(
                              'flex min-h-11 items-center justify-between p-2.5 text-left transition-colors cursor-pointer',
                              selectedNodeId === dept.id
                                ? 'bg-amber-500/10 border-l-4 border-amber-400'
                                : 'hover:bg-slate-900/60'
                            )}
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-2 pr-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleNode(dept.id);
                                }}
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-800 text-slate-400"
                              >
                                {isDeptExpanded ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </button>

                              <Briefcase className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                              <span className="truncate text-xs font-medium text-slate-200">
                                {dept.name}
                              </span>
                              <span className="shrink-0 whitespace-nowrap rounded bg-slate-800 px-1.5 py-0.5 text-[9px] text-slate-400">
                                {dept.meters.length} meters
                              </span>
                            </div>

                            <span className="shrink-0 font-mono text-xs text-amber-300">
                              {dept.totalLoadKw.toFixed(1)} kW
                            </span>
                          </div>

                          {/* 4. Sub-Meters List */}
                          {isDeptExpanded && (
                            <div className="border-t border-slate-800/40 bg-slate-950/80 p-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {dept.meters
                                .filter((m) => {
                                  if (filterMeterType !== 'ALL' && m.meterType !== filterMeterType)
                                    return false;
                                  if (
                                    searchQuery &&
                                    !m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                    !m.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
                                  )
                                    return false;
                                  return true;
                                })
                                .map((meter) => (
                                  <button
                                    key={meter.id}
                                    type="button"
                                    onClick={() =>
                                      onSelectNode({
                                        type: 'METER',
                                        id: meter.id,
                                        name: meter.name,
                                        path: `Dhaka Campus > ${building.name} > Level ${floor.level} > ${dept.name} > ${meter.name}`,
                                        currentLoadKw: meter.currentLoadKw,
                                        buildingId: building.id,
                                        meter,
                                      })
                                    }
                                    className={cn(
                                      'flex min-h-11 items-center justify-between rounded-lg border p-2 text-left transition-colors',
                                      selectedNodeId === meter.id
                                        ? 'border-emerald-500 bg-emerald-500/10'
                                        : 'border-slate-800/80 bg-slate-900/60 hover:border-slate-700'
                                    )}
                                  >
                                    <div className="min-w-0 flex-1 pr-2">
                                      <div className="flex items-center gap-1.5">
                                        <Gauge className="h-3 w-3 shrink-0 text-slate-400" />
                                        <p className="truncate text-[11px] font-semibold text-slate-200">
                                          {meter.name}
                                        </p>
                                      </div>
                                      <p className="font-mono text-[9px] text-slate-400">
                                        SN: {meter.serialNumber}
                                      </p>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                      <span
                                        className={cn(
                                          'shrink-0 whitespace-nowrap rounded border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider',
                                          getMeterBadgeColor(meter.meterType)
                                        )}
                                      >
                                        {meter.meterType.replace(/_/g, ' ')}
                                      </span>
                                      <span className="font-mono text-xs font-bold text-emerald-400">
                                        {meter.currentLoadKw.toFixed(1)} kW
                                      </span>
                                    </div>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
