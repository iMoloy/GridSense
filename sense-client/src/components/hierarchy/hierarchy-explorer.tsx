'use client';

import { useState } from 'react';
import { HierarchySummaryCards } from './hierarchy-summary-cards';
import { HierarchySearchBar } from './hierarchy-search-bar';
import { HierarchyTreeNode } from './hierarchy-tree-node';
import { HierarchyInspector, type SelectedNodeInfo } from './hierarchy-inspector';
import type { OrganizationHierarchy } from '@/types';

interface HierarchyExplorerProps {
  initialHierarchy: OrganizationHierarchy;
}

export function HierarchyExplorer({ initialHierarchy }: HierarchyExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeterType, setSelectedMeterType] = useState('ALL');
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInfo | null>(null);

  // Initialize with the first building and first floor expanded
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    [initialHierarchy.buildings[0]?.id || '']: true,
    [initialHierarchy.buildings[0]?.floors[0]?.id || '']: true,
    [initialHierarchy.buildings[0]?.floors[0]?.departments[0]?.id || '']: true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    for (const b of initialHierarchy.buildings) {
      allExpanded[b.id] = true;
      for (const fl of b.floors) {
        allExpanded[fl.id] = true;
        for (const d of fl.departments) {
          allExpanded[d.id] = true;
        }
      }
    }
    setExpandedNodes(allExpanded);
  };

  const collapseAll = () => {
    setExpandedNodes({});
  };

  // Filter buildings if search matches building name or contains matching sub-meters
  const filteredBuildings = initialHierarchy.buildings.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    if (b.name.toLowerCase().includes(q)) return true;

    return b.floors.some((fl) =>
      fl.departments.some((dept) =>
        dept.meters.some(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.serialNumber.toLowerCase().includes(q)
        )
      )
    );
  });

  return (
    <div className="space-y-6">
      {/* 5-Card Aggregate Metrics */}
      <HierarchySummaryCards hierarchy={initialHierarchy} />

      {/* Filter and Search Bar */}
      <HierarchySearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedMeterType={selectedMeterType}
        onMeterTypeChange={setSelectedMeterType}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
      />

      {/* 2-Column Split: Interactive Tree (7 cols) + Node Inspector (5 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-4">
          {filteredBuildings.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-xs text-slate-400">
              No facilities or sub-meters matched your search query.
            </div>
          ) : (
            filteredBuildings.map((building) => (
              <HierarchyTreeNode
                key={building.id}
                building={building}
                expandedNodes={expandedNodes}
                onToggleNode={toggleNode}
                selectedNodeId={selectedNode?.id || null}
                onSelectNode={setSelectedNode}
                filterMeterType={selectedMeterType}
                searchQuery={searchQuery}
              />
            ))
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-20">
            <HierarchyInspector
              selectedNode={selectedNode}
              onClose={() => setSelectedNode(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
