'use client';

import { useState } from 'react';
import { Database, Key, Radio, Copy, Check, ShieldCheck } from 'lucide-react';
import type { TelemetryConfig } from '@/types';

interface TelemetryApiCardProps {
  initialConfig: TelemetryConfig;
}

export function TelemetryApiCard({ initialConfig }: TelemetryApiCardProps) {
  const [tokenCopied, setTokenCopied] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    initialConfig.webhookUrl || 'https://api.internal.gridsense/dispatch/campus-alerts'
  );
  const [zScore, setZScore] = useState(initialConfig.zScoreThreshold.toString());

  const handleCopy = () => {
    navigator.clipboard.writeText(initialConfig.iotIngestionToken);
    setTokenCopied(true);
    setTimeout(() => setTokenCopied(false), 2000);
  };

  return (
    <article className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm sm:p-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Database Health, IoT Gateway &amp; Telemetry Pipelines
            </h3>
            <p className="text-xs text-slate-400">
              PostgreSQL compound time-series store and automated background rollups
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold text-emerald-400">
            {initialConfig.dbLatencyMs}ms Latency
          </span>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {/* 1. Database Connection Status */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Connection Pool
            </span>
            <p className="mt-1 font-mono text-sm font-bold text-emerald-400">
              Healthy • Neon Cloud
            </p>
            <p className="text-[10px] text-slate-400">Serverless PostgreSQL 16</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Time-Series Records
            </span>
            <p className="mt-1 font-mono text-sm font-bold text-slate-100">
              50,000+ Readings
            </p>
            <p className="text-[10px] text-slate-400">Compound (meterId, timestamp)</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Rollup Engine
            </span>
            <p className="mt-1 font-mono text-sm font-bold text-slate-100">
              Every 60 Minutes
            </p>
            <p className="text-[10px] text-slate-400">Hourly → Daily → Monthly</p>
          </div>
        </div>

        {/* 2. IoT Ingestion API Token */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <label className="block text-xs font-semibold text-slate-200">
            High-Frequency IoT Gateway Token (Bearer Auth)
          </label>
          <div className="mt-1.5 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs">
            <span className="font-mono text-slate-400">
              {initialConfig.iotIngestionToken.slice(0, 16)}••••••••••••••••••••••••
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-emerald-400"
            >
              {tokenCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Key</span>
                </>
              )}
            </button>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Use in <code className="text-emerald-400">POST /api/readings/bulk</code> headers for authenticated sensor feeds.
          </p>
        </div>

        {/* 3. Anomaly Webhook Endpoint */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <label htmlFor="webhook-url" className="block text-xs font-semibold text-slate-200">
            Automated Alert Dispatch Webhook URL (Slack / Telegram / EMS)
          </label>
          <div className="mt-1.5 flex items-center gap-2">
            <input
              id="webhook-url"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="h-11 flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 font-mono text-xs text-slate-200 focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="button"
              className="min-h-11 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              Test Webhook
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
