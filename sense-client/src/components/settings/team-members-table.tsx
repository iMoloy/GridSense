'use client';

import { useState } from 'react';
import { Users, UserPlus, ShieldAlert, Check, X } from 'lucide-react';
import type { TeamUser, Role } from '@/types';
import { cn } from '@/lib/utils';

interface TeamMembersTableProps {
  initialTeam: TeamUser[];
}

export function TeamMembersTable({ initialTeam }: TeamMembersTableProps) {
  const [team, setTeam] = useState<TeamUser[]>(initialTeam);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('ANALYST');

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'ORG_ADMIN':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'BUILDING_MANAGER':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'ANALYST':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteName.trim()) return;

    const newUser: TeamUser = {
      id: `usr-${Date.now()}`,
      orgId: 'org-dhaka-campus',
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      status: 'INVITED',
      lastActiveAt: new Date().toISOString(),
    };

    setTeam((prev) => [...prev, newUser]);
    setInviteEmail('');
    setInviteName('');
    setIsInviteOpen(false);
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/30">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Team Access &amp; Role-Based Access Control (RBAC)
              </h3>
              <p className="text-xs text-slate-400">
                Operator accounts with scoped permissions (SUPER_ADMIN, ORG_ADMIN, ANALYST)
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsInviteOpen(true)}
          className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <UserPlus className="h-4 w-4" />
          <span>Invite Operator</span>
        </button>
      </div>

      {/* Team Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800/80 text-[10px] uppercase tracking-wider text-slate-400">
              <th className="pb-3 font-semibold">User</th>
              <th className="pb-3 font-semibold">Role</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Last Active</th>
              <th className="pb-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {team.map((user) => (
              <tr key={user.id} className="transition-colors hover:bg-slate-950/40">
                <td className="py-3.5 pr-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-300">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-100">{user.name}</p>
                      <p className="truncate text-[11px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 pr-3">
                  <span
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                      getRoleBadge(user.role)
                    )}
                  >
                    {user.role.replace(/_/g, ' ')}
                  </span>
                </td>

                <td className="py-3.5 pr-3">
                  <span
                    className={cn(
                      'shrink-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase',
                      user.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    )}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="py-3.5 pr-3 font-mono text-[11px] text-slate-400">
                  {new Date(user.lastActiveAt).toLocaleDateString()}
                </td>

                <td className="py-3.5 text-right">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {user.role === 'SUPER_ADMIN' ? 'Owner' : 'Scoped Org'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-slate-950/80"
        >
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100">Invite Campus Operator</h4>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-slate-400 hover:text-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-200">Full Name *</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Dr. Tanvir Ahmed"
                  className="mt-1 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200">Email Address *</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="tanvir@dhaka-campus.edu.bd"
                  className="mt-1 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200">Assigned Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Role)}
                  className="mt-1 h-11 w-full rounded-xl border border-slate-800 bg-slate-950 px-3 text-xs text-slate-100 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="ANALYST">Analyst (Read-only Analytics &amp; Reports)</option>
                  <option value="BUILDING_MANAGER">Building Manager (Facility Scoped)</option>
                  <option value="ORG_ADMIN">Org Admin (Full Hierarchy &amp; Alert Rules)</option>
                  <option value="VIEWER">Viewer (Basic Summaries Only)</option>
                </select>
              </div>

              <div className="mt-5 flex justify-end gap-2 border-t border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="min-h-11 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-11 rounded-xl bg-emerald-500 px-5 py-2 font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </article>
  );
}
