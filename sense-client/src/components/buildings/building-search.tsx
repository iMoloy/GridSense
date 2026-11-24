'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BuildingSearchProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (category: string) => void;
  totalCount: number;
}

export function BuildingSearch({
  onSearchChange,
  onFilterChange,
  totalCount,
}: BuildingSearchProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [query, setQuery] = useState('');

  const filterChips = [
    { label: 'All Facilities', value: 'ALL' },
    { label: 'Academic & Labs', value: 'ACADEMIC' },
    { label: 'Administration', value: 'ADMIN' },
    { label: 'Residential Halls', value: 'RESIDENTIAL' },
  ];

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearchChange(val);
  };

  const handleFilter = (val: string) => {
    setActiveFilter(val);
    onFilterChange(val);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <label htmlFor="facility-search" className="sr-only">
          Search buildings and facilities
        </label>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id="facility-search"
          type="text"
          value={query}
          onChange={handleQuery}
          placeholder="Search by facility name, address..."
          className="h-11 w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {filterChips.map((chip) => (
          <button
            key={chip.value}
            type="button"
            onClick={() => handleFilter(chip.value)}
            className={cn(
              'min-h-11 shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
              activeFilter === chip.value
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
