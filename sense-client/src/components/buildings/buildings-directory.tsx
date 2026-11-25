'use client';

import { useState } from 'react';
import { BuildingSearch } from './building-search';
import { BuildingCard } from './building-card';
import type { Building } from '@/types';

interface BuildingsDirectoryProps {
  initialBuildings: Building[];
}

export function BuildingsDirectory({ initialBuildings }: BuildingsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filtered = initialBuildings.filter((b) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = b.name.toLowerCase().includes(q);
      const matchAddr = b.address ? b.address.toLowerCase().includes(q) : false;
      if (!matchName && !matchAddr) return false;
    }

    // 2. Category Filter
    if (categoryFilter === 'ACADEMIC') {
      return (
        b.name.toLowerCase().includes('science') ||
        b.name.toLowerCase().includes('engineering') ||
        b.name.toLowerCase().includes('lab')
      );
    }
    if (categoryFilter === 'ADMIN') {
      return (
        b.name.toLowerCase().includes('library') ||
        b.name.toLowerCase().includes('admin') ||
        b.name.toLowerCase().includes('operations') ||
        b.name.toLowerCase().includes('headquarters')
      );
    }
    if (categoryFilter === 'RESIDENTIAL') {
      return (
        b.name.toLowerCase().includes('residential') ||
        b.name.toLowerCase().includes('hall') ||
        b.name.toLowerCase().includes('pavilion')
      );
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <BuildingSearch
        onSearchChange={setSearchQuery}
        onFilterChange={setCategoryFilter}
        totalCount={initialBuildings.length}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center text-xs text-slate-400">
          No campus facilities match &quot;{searchQuery}&quot;. Try clearing filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((building) => (
            <BuildingCard key={building.id} building={building} />
          ))}
        </div>
      )}
    </div>
  );
}
