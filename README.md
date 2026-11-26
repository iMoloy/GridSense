<div align="center">

<img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/zap.svg" width="64" height="64" alt="GridSense Logo" />

# GridSense

### Smart Building Energy Intelligence Platform

> **Enterprise-Grade Multi-Tenant Energy Analytics & Building Telemetry**
> Ingesting, aggregating, and analyzing 50,000+ time-series electricity meter readings across multi-tier building hierarchies — with automated Z-score anomaly detection, carbon footprint tracking, and real-time cost projection.

<br/>

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.9-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![pnpm Workspaces](https://img.shields.io/badge/pnpm-Workspaces-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

<br/>

[**Live Demo**](https://gridsense.vercel.app) · [**API Docs**](http://localhost:5000/api/docs) · [**Report a Bug**](https://github.com/iMoloy/GridSense/issues)

</div>

---

## 📖 Overview

**GridSense** is an advanced ClimateTech and Smart Building Energy Intelligence platform. Built for **university campuses**, **corporate headquarters**, **hospitals**, and **industrial facilities** — it eliminates the operational blindness of lump-sum utility bills by delivering granular, real-time electricity monitoring at every level of a building's hierarchy.

The platform tracks electricity flow down to individual sub-meters, categorizes consumption by floor and department, detects unusual energy spikes using Z-score statistical modeling, and delivers cost & carbon emission projections with multi-currency support.

---

## ✨ Key Features

| Feature | Description |
| :---: | :--- |
| 🏢 **Multi-Tenant Hierarchy** | `Organization → Buildings → Floors → Departments → Meters` with strict data isolation |
| 📈 **Time-Series Analytics** | 50,000+ hourly readings with compound `(meterId, timestamp)` indexes and server-side rollups |
| 🔔 **Anomaly Detection** | Z-score statistical engine (&#124;z&#124; > 2.5σ) with configurable threshold rules and event alerts |
| 🌱 **Carbon Intelligence** | Real-time CO₂ tracking at 0.65 kg/kWh with ESG-ready reporting |
| 💰 **Cost Projection** | Dynamic peak/off-peak tariff calculation and monthly budget forecasting |
| 🛡️ **5-Tier RBAC** | `SUPER_ADMIN` → `ORG_ADMIN` → `BUILDING_MANAGER` → `ANALYST` → `VIEWER` |
| 📊 **Analytics Studio** | Heatmap grid, facility comparison charts, and cost projection cards |
| 📄 **Report Generation** | Monthly audits, peak tariff, carbon compliance & department invoice reports |

---

## 🏛️ System Architecture

```
GridSense/                          ← pnpm Monorepo Root
│
├── sense-client/                   ← Next.js 16 (App Router) Frontend
│   └── src/
│       ├── app/                    ← Server & Client Components, Route Segments
│       │   └── dashboard/          ← Overview, Buildings, Analytics, Alerts, Reports, Settings
│       ├── components/             ← Feature-scoped UI components (dashboard, alerts, analytics…)
│       ├── lib/
│       │   ├── api.ts              ← Type-safe API client with graceful fallback
│       │   └── utils.ts            ← Formatters (kWh, currency, carbon, relative time)
│       └── types/index.ts          ← Shared TypeScript interfaces & enums
│
└── sense-server/                   ← NestJS 11 Modular REST API
    ├── src/
    │   ├── analytics/              ← Overview & Studio endpoints (batched queries, no N+1)
    │   ├── buildings/              ← Building hierarchy with real energy score calculation
    │   ├── alerts/                 ← Alert events, rules CRUD, Z-score detection
    │   ├── hierarchy/              ← Full org tree with live load aggregation
    │   ├── reports/                ← Report archive & executive preview generation
    │   ├── settings/               ← Org profile, tariff config, telemetry status
    │   └── prisma/                 ← Prisma service singleton
    └── prisma/
        └── schema.prisma           ← PostgreSQL models & compound time-series indexes
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript 5.8, Tailwind CSS v4, Recharts, Lucide Icons |
| **Backend API** | NestJS 11, Node.js 22+, Passport JWT, Bcrypt, Swagger OpenAPI, `@nestjs/throttler` |
| **Database & ORM** | PostgreSQL on Neon Serverless, Prisma ORM 6.9 |
| **Monorepo** | pnpm 12 Workspaces, Concurrently |
| **Validation** | Zod (frontend), `class-validator` & `class-transformer` (backend) |
| **Dev Tooling** | ESLint, TypeScript strict mode, Prisma migrations |

---

## 🗂️ Database Schema

```
Organization ──< Building ──< Floor ──< Department ──< Meter ──< Reading
     │
     └──< AlertRule ──< AlertEvent
     └──< User
```

**Key indexes for time-series performance:**
- `(meterId, timestamp)` — compound index on all readings
- `(timestamp)` — standalone index for time-window queries
- `(orgId)` — tenant isolation indexes on all child models

---

## 🚀 Quickstart

### 1. Clone & Install

```bash
git clone https://github.com/iMoloy/GridSense.git
cd GridSense
pnpm install
```

### 2. Configure Environment

```bash
# Backend
cp sense-server/.env.example sense-server/.env

# Frontend
cp sense-client/.env.example sense-client/.env.local
```

**`sense-server/.env` required keys:**

```env
DATABASE_URL=postgresql://...          # Neon pooled connection string
DATABASE_URL_UNPOOLED=postgresql://... # Neon direct connection string
JWT_SECRET=your-jwt-secret
CLIENT_URL=http://localhost:3000
PORT=5000

# Optional
IOT_INGESTION_TOKEN=sk_live_...
WEBHOOK_URL=https://...
```

**`sense-client/.env.local` required keys:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Generate Prisma Client & Seed Database

```bash
# Generate Prisma Client
pnpm --filter sense-server prisma:generate

# Run migrations
pnpm --filter sense-server prisma:migrate

# Seed with 50,000+ sample readings
pnpm --filter sense-server prisma:seed
```

### 4. Run Dev Servers (Concurrent)

```bash
pnpm dev
```

| Service | URL |
| :--- | :--- |
| 🌐 **Frontend** | http://localhost:3000 |
| ⚡ **Backend API** | http://localhost:5000/api |
| 📚 **Swagger Docs** | http://localhost:5000/api/docs |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/overview` | Dashboard KPIs, time-series, building shares |
| `GET` | `/api/analytics/studio` | Heatmap, facility comparison, cost projection |
| `GET` | `/api/buildings` | All buildings with live meter counts |
| `GET` | `/api/buildings/:id` | Building detail with full floor hierarchy |
| `GET` | `/api/hierarchy` | Full org tree with real-time load aggregation |
| `GET` | `/api/alerts/events` | Alert events (filterable by status/severity) |
| `PATCH` | `/api/alerts/events/:id/status` | Acknowledge or resolve an alert |
| `GET` | `/api/alerts/rules` | Configured threshold & anomaly rules |
| `POST` | `/api/alerts/rules` | Create a new alert rule |
| `GET` | `/api/reports/archive` | Historical report archive |
| `GET` | `/api/reports/preview` | Executive report preview |
| `GET` | `/api/settings` | Org profile, tariff, telemetry & team |
| `PATCH` | `/api/settings/org` | Update organization profile |
| `PATCH` | `/api/settings/tariff` | Update tariff configuration |

> Full interactive documentation available at **`/api/docs`** (Swagger UI).

---

## 🗺️ Dashboard Pages

```
/                           → Landing redirect
/dashboard                  → Command Center — KPIs, consumption curve, building breakdown
/dashboard/buildings        → Buildings directory with search & filter
/dashboard/buildings/[id]   → Building detail — floors, departments, meters
/dashboard/analytics        → Analytics Studio — heatmap, comparisons, projections
/dashboard/hierarchy        → Interactive org tree explorer
/dashboard/alerts           → Alert events feed & rule management
/dashboard/reports          → Report generation & archive
/dashboard/settings         → Org settings, tariff config, team RBAC
```

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

<div align="center">

Developed with precision by **[Moloy Krishna Paul (@iMoloy)](https://github.com/iMoloy)**

*GridSense — Because every kilowatt tells a story.*

</div>
