<div align="center">

# ⚡ GridSense — Smart Building Energy Intelligence Platform

> **Enterprise-Grade Multi-Tenant Energy Analytics & Building Telemetry Platform**  
> Ingesting, aggregating, and analyzing 50,000+ time-series electricity meter readings across multi-tier building hierarchies with automated Z-score anomaly detection and carbon footprint tracking.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![pnpm Workspaces](https://img.shields.io/badge/pnpm-Workspaces-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

</div>

---

## 📖 Overview

**GridSense** is an advanced ClimateTech and Smart Building Energy Intelligence platform. Built for university campuses, corporate headquarters, hospitals, and industrial facilities, it eliminates the operational blindness of lump-sum utility bills by providing granular, time-series electricity monitoring and telemetry.

The platform monitors electricity flow down to individual meters, categorizes consumption by floor and department, detects unusual energy spikes using Z-score statistical modeling, and provides cost and carbon emission projections.

---

## 🏛️ System Architecture

```text
GridSense/
├── sense-client/               # Next.js 16 (App Router) + React 19 + Tailwind v4 + Recharts
│   ├── src/app/                # Server & Client Components, Route Segments
│   └── src/lib/                # Type-safe API Client, Utilities, Auth Helpers
│
└── sense-server/               # NestJS 11 Modular REST API Server
    ├── src/                    # Controllers, Services, Guards, Interceptors
    └── prisma/                 # PostgreSQL Data Models & Compound Time-Series Indexes
```

---

## 🌟 Key Capabilities

1. **Multi-Tenant Hierarchy Modeling**
   * `Organization` $\to$ `Buildings` $\to$ `Floors` $\to$ `Departments` $\to$ `Meters`
   * Dynamic isolation ensuring organizations never leak or access competitor data.

2. **High-Throughput Time-Series Analytics (50,000+ Records)**
   * Granular hourly meter readings with compound indexes `(meterId, timestamp)`.
   * Real-time server-side rollups: Hourly $\to$ Daily $\to$ Weekly $\to$ Monthly.

3. **Automated Anomaly & Spike Detection**
   * Z-score statistical engine flagging unexpected consumption surges ($|z| > 2.5$).
   * Configurable threshold alert rules with automated event notification generation.

4. **Environmental & Financial Intelligence**
   * Real-time carbon emission calculations ($0.65\text{ kg CO}_2/\text{kWh}$).
   * Dynamic electricity rate multiplication and monthly budget forecasting.

5. **5-Tier Role-Based Access Control (RBAC)**
   * `SUPER_ADMIN`, `ORG_ADMIN`, `BUILDING_MANAGER`, `ANALYST`, and `VIEWER`.

---

## 🛠️ Tech Stack & Engineering Standards

| Layer | Technologies & Tools |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Recharts, Lucide Icons |
| **Backend API** | NestJS 11, Node.js 22+, Express, Passport JWT, Bcrypt, Swagger OpenAPI |
| **Database & ORM** | PostgreSQL (Neon Serverless), Prisma ORM 6.19 |
| **Monorepo & Package Management** | pnpm 12 Workspaces, Concurrently |
| **Validation & Safety** | Zod (Frontend), class-validator & class-transformer (Backend) |

---

## 🚀 Quickstart & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/iMoloy/GridSense.git
cd GridSense
pnpm install
```

### 2. Environment Configuration
```bash
# Server Environment
cp sense-server/.env.example sense-server/.env

# Client Environment
cp sense-client/.env.example sense-client/.env.local
```

### 3. Generate Database Client & Seed
```bash
# Generate Prisma Client
pnpm --filter sense-server prisma:generate
```

### 4. Run Both Client & Server Concurrently
```bash
pnpm dev
```
* **Frontend:** `http://localhost:3000`
* **Backend API:** `http://localhost:5000/api`
* **Interactive Swagger Docs:** `http://localhost:5000/api/docs`

---

## 📄 License
Licensed under the [MIT License](LICENSE).  
Developed with precision by **[Moloy Krishna Paul (@iMoloy)](https://github.com/iMoloy)**.
