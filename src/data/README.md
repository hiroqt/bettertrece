# BetterTrece Data Architecture

This directory contains all localized datasets, classifications, governmental registries, transparency records, and portal schemas for BetterTrece.

The data layer is structured into modular domain categories with type definitions, barrel exports, and direct domain access.

---

## Directory Structure

```
src/data/
├── index.ts                      # Central barrel export for all data domains
├── README.md                     # This documentation file
│
├── education/                    # Schools, Senior High School tracks, DepEd datasets
│   ├── index.ts                  # Barrel export
│   ├── schoolsData.ts            # Basic education & BEIS school profiles
│   ├── seniorHighSchools.ts      # SHS academic/TVL tracks, strands & career info
│   └── trece_schools_deped_2020_2021.json # Raw DepEd school masterlist
│
├── coa/                          # Commission on Audit (COA) Reports
│   ├── index.ts                  # Barrel export
│   └── coaAuditReport2024.ts     # 2024 Annual Audit Report (AAR) findings & observations
│
├── transparency/                 # Infrastructure, budget, national appropriations
│   ├── index.ts                  # Barrel export
│   ├── dpwhTransparency.ts       # DPWH project registry & summary metrics
│   ├── gaaTransparencyData.ts    # GAA national appropriations breakdown (2020–2026)
│   ├── cityBudgetRevenue.ts      # Trece Martires LGU budget, revenue & expenditure
│   ├── gaa_dpwh_projects.json    # DPWH GAA raw records
│   ├── gaa_records_compact.json  # Compact GAA records
│   ├── trece_martires_gaa_2020_2026.csv # Full GAA dataset (CSV)
│   ├── trece_martires_gaa_2020_2026.json # Full GAA dataset (JSON)
│   └── trece_martires_gaa_summary.json  # GAA summary aggregation
│
├── demographics/                 # PSA classifications, PSGC codes, population
│   ├── index.ts                  # Barrel export
│   └── psaClassifications.ts     # Philippine Statistics Authority & PSGC datasets
│
├── government/                   # City officials, legislative board, departments
│   ├── index.ts                  # Barrel export
│   ├── electedOfficials.ts       # Executive, Sanggunian, and Barangay officials
│   └── government.yaml           # Government departments & public directory metadata
│
├── services/                     # Citizen services directory & dynamic YAML loader
│   ├── index.ts                  # Barrel export
│   ├── services.yaml             # Core service taxonomy & categories
│   └── yamlLoader.ts             # Service & government YAML loader utility
│
└── navigation/                   # Portal navigation & menu configurations
    ├── index.ts                  # Barrel export
    └── navigation.ts             # Header mega-menu, footer links, and route config
```

---

## Domain Overview

### 1. Education (`src/data/education`)

- **`schoolsData.ts`**: Master list of all 46 DepEd-managed and private basic education campuses in Trece Martires City (Preschool, Elementary, JHS, SHS, and Integrated Schools). Contains `TRECE_ALL_SCHOOLS`, `SCHOOL_LEVEL_CONFIG`, `SCHOOLS_STATISTICS`, and `TRECE_BARANGAYS_WITH_SCHOOLS`.
- **`seniorHighSchools.ts`**: Comprehensive directory of Senior High School offerings, Academic (STEM, ABM, HUMSS, GAS) and TVL strands (HE, ICT, IA), student career pathways, and institutional statistics.
- **`trece_schools_deped_2020_2021.json`**: Official DepEd BEIS dataset baseline.

### 2. COA (`src/data/coa`)

- **`coaAuditReport2024.ts`**: Independent audit observations from the Commission on Audit Regional Office IV-A (Local Government Audit Sector R4A-02, Team B). Includes financial ratios, SASDC collections, SEF statutory compliance, and prior-year recommendation tracking.

### 3. Transparency & Public Finance (`src/data/transparency`)

- **`dpwhTransparency.ts`**: DPWH national infrastructure projects across all 13 Trece Martires barangays, including contractor analytics, civil works status, and budget allocations.
- **`gaaTransparencyData.ts`**: Line-item General Appropriations Act (GAA) national budget tracking for Trece Martires (FY 2020–2026).
- **`cityBudgetRevenue.ts`**: City Government annual budget, National Tax Allotment (NTA), local tax revenues, and expenditure sectoral allocations.
- **Raw Datasets**: Includes downloadable CSV and JSON files for open citizen research.

### 4. Demographics (`src/data/demographics`)

- **`psaClassifications.ts`**: Official Philippine Statistics Authority (PSA) and Philippine Standard Geographic Code (PSGC) data for Trece Martires City (`042122000`) and its 13 component barangays.

### 5. Government (`src/data/government`)

- **`electedOfficials.ts`**: City executive leadership, Sangguniang Panlungsod members, and Barangay Captains with official terms, committee assignments, and contact directory.
- **`government.yaml`**: Hierarchical organization of city departments and municipal services.

### 6. Services (`src/data/services`)

- **`services.yaml`**: Citizen-facing service catalog organized by citizen need (civil registry, health, business permits, social welfare, agriculture, etc.).
- **`yamlLoader.ts`**: Synchronous and asynchronous loader utilities for content pages and markdown integration.

### 7. Navigation (`src/data/navigation`)

- **`navigation.ts`**: Central navigation schema powering Navbar mega-menus, featured service links, mobile drawers, and Footer site maps.

---

## Import Conventions

You can import data either from specific domain subdirectories or through the central barrel:

```ts
// Option A: Specific domain import (Recommended)
import { TRECE_ALL_SCHOOLS, SCHOOLS_STATISTICS } from '@/data/education';
import { COA_AUDIT_REPORT_2024_META } from '@/data/coa';
import { TRECE_DPWH_PROJECTS } from '@/data/transparency';
import { TRECE_BARANGAYS_PSGC } from '@/data/demographics';
import { CITY_COUNCILORS } from '@/data/government';
import { serviceCategories } from '@/data/services';
import { mainNavigation } from '@/data/navigation';

// Option B: Central root import
import {
  TRECE_ALL_SCHOOLS,
  TRECE_DPWH_PROJECTS,
  TRECE_BARANGAYS_PSGC,
} from '@/data';
```
