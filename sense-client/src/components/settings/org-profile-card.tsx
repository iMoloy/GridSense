'use client';

import { useState } from 'react';
import { Building2, Save, Check, Globe, Loader2 } from 'lucide-react';
import type { Organization } from '@/types';
import { updateOrgProfile } from '@/lib/api';

interface OrgProfileCardProps {
  initialOrg: Organization;
}

export function OrgProfileCard({ initialOrg }: OrgProfileCardProps) {
  const [name, setName] = useState(initialOrg.name);
  const [industry, setIndustry] = useState(initialOrg.industry || 'Higher Education & Research');
  const [slug, setSlug] = useState(initialOrg.slug);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateOrgProfile({ name, industry, slug });
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Enterprise Facility Identity
            </h3>
            <p className="text-xs text-slate-400">
              Multi-tenant organizational scope and campus metadata
            </p>
          </div>
        </div>

        <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-mono text-slate-400">
          ID: {initialOrg.id}
        </span>
      </div>

      <form onSubmit={handleSave} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="org-name" className="block text-xs font-semibold text-slate-200">
              Facility / Campus Name *
            </label>
            <input
              id="org-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 text-sm text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="org-industry" className="block text-xs font-semibold text-slate-200">
              Operational Sector / Industry
            </label>
            <input
              id="org-industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 text-sm text-slate-100 placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="org-slug" className="block text-xs font-semibold text-slate-200">
              Tenant URL Slug
            </label>
            <div className="mt-1.5 flex h-11 items-center rounded-xl border border-slate-800 bg-slate-950 px-3.5 text-xs text-slate-400">
              <span>gridsense.app/</span>
              <input
                id="org-slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="ml-0.5 flex-1 bg-transparent font-mono text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200">
              Ingestion Architecture
            </label>
            <div className="mt-1.5 flex h-11 items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 px-3.5 text-xs text-slate-400">
              <span>Multi-Tenant Soft Partitioning</span>
              <span className="font-semibold text-emerald-400">PostgreSQL Isolated</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          {isSaved ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Check className="h-4 w-4" />
              <span>Facility settings saved successfully</span>
            </span>
          ) : (
            <span className="text-[11px] text-slate-400">All changes apply org-wide immediately.</span>
          )}

          <button
            type="submit"
            className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </article>
  );
}
