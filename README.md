# 🏛️ BetterTreceMartires.org — Civic Tech Portal for Trece Martires City, Cavite

[![BetterGov Initiative](https://img.shields.io/badge/BetterGov-Civic%20Tech%20Initiative-003893.svg)](https://bettertrecemartires.org)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Maps-Leaflet%20%2B%20OSM-199900.svg?logo=leaflet&logoColor=white)](https://leafletjs.com/)

**BetterTrece** ([bettertrece.org](https://bettertrecemartires.org)) is an open-source, community-driven civic portal designed to empower residents, businesses, students, motorists, and visitors of the **City of Trece Martires, Cavite**.

Part of the volunteer-led **BetterGov** initiative, BetterTrece aims to make local government services accessible and provide genuine transparency in public funds and infrastructure.

---

## 🌟 Features in BetterTrece

- 📋 **City Services & Citizen Guides**: Step-by-step instructions, documentary requirements, and fees for Mayor's business permits, barangay clearances, local scholarships, civil registry, and social welfare programs.
- 📊 **Financial & Infrastructure Transparency Hub**:
  - **National Budget (GAA 2020–2026)**: Multi-year breakdown of national budget allocations for Trece Martires.
  - **COA Annual Audit Reports (AAR 2024)**: Verified public audit findings and fund accountability summaries.
  - **City Revenues & Tax Collections**: DOF-BLGF local revenue breakdown and budget allocations.
  - **DPWH Infrastructure Explorer**: Live road, flood control, and public works tracking in Trece Martires and Cavite arterial corridors.
- 🏫 **Education & Schools Directory**: Comprehensive directory of all 60+ DepEd public and private schools (Preschool, Elementary, JHS, Senior High, and Integrated) with Senior High School tracks and strands.
- 💼 **PESO & Career Classifications**: Public Employment Service Office (PESO) occupation explorer powered by the PSA Standard Occupational Classification (PSOC 2012).
- ⛽ **DOE Fuel Price Monitor & Gas Station Locator**: Weekly retail pump prices from the Department of Energy (DOE) with major vs. independent brand price comparisons, 25+ gas stations mapped with 1-click Google Maps / Waze navigation, and crowd-sourced community price reporting.
- 🛡️ **Peace, Order & Safety Directory**: Trece Martires PNP Police Station, VAWC help desks, and Barangay Katarungang Pambarangay directory mapped under PSCCS 2018 standards.
- 🚨 **Emergency Hotlines**: Instant 24/7 access to CDRRMO, PNP, BFP, and local utility emergency hotlines.
- 🌐 **Multilingual & Accessible**: Full English and Filipino (Tagalog) localization, mobile-first design, fast load times, and zero trackers or ads.

---

## 🚀 Quick Start for Developers

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn** / **pnpm**
- **Git**

### Local Setup

1. **Fork the Repository**
   - Click the **Fork** button at the top right of this repository to create your copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/bettertrece.git
   cd bettertrece
   ```

3. **Add the Upstream Remote**

   ```bash
   git remote add upstream https://github.com/hiroqt/bettertrece.git
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Start the Development Server**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173`.

6. **Build & Type Check**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
bettertrece/
├── content/                     # Markdown and YAML content for city services
│   ├── government/              # Department guides and executive/legislative profiles
│   └── services/                # Citizen guides (Health, Education, Business, etc.)
├── public/                      # Static assets, SVG logos, and icons
├── src/
│   ├── components/              # Modular UI components
│   │   ├── demographics/        # Schools, PSOC, PSGC, and Peace & Safety widgets
│   │   ├── fuel/                # Fuel Price Widget, Community Reports, Leaflet Map
│   │   ├── layout/              # Navbar, Footer, Mega Menu
│   │   ├── sections/            # Hero section, civic service cards
│   │   ├── transparency/        # GAA, COA Audit, DPWH, and Revenue explorers
│   │   └── ui/                  # Design tokens, Breadcrumbs, Modals, Badges
│   ├── data/                    # Open datasets & civic records
│   │   ├── demographics/        # PSA Classifications, Barangay profiles, PSGC codes
│   │   ├── education/           # DepEd schools directory & Senior High strands
│   │   ├── fuel/                # DOE price benchmarks, gas station coordinates
│   │   ├── transparency/        # GAA CSVs, COA audit data, city revenues
│   │   └── index.ts             # Central data exports hub
│   ├── i18n/                    # Localization strings
│   │   └── locales/
│   │       ├── en.json          # English translations
│   │       └── fil.json         # Filipino (Tagalog) translations
│   ├── pages/                   # Application route views
│   │   ├── About.tsx            # About BetterTrece mission
│   │   ├── Demographics.tsx     # Demographics, Schools, and PSA standards
│   │   ├── DpwhTransparency.tsx # Budget, COA Audit, and DPWH works
│   │   ├── FuelPrices.tsx       # Dedicated Fuel Price Monitor & Map
│   │   ├── Government.tsx       # Elected officials & transparency documents
│   │   ├── Home.tsx             # Main civic landing page
│   │   └── Services.tsx         # City hall services & categories
│   ├── App.tsx                  # Application routes and providers
│   └── main.tsx                 # Entrypoint
└── package.json                 # Dependencies and scripts
```

---

## 🤝 Contributor Guide: How You Can Help

We welcome contributions from developers, researchers, students, and citizens of Trece Martires and Cavite!

### 🌟 1. Non-Technical / Content Contributions

You do not need coding experience to contribute valuable information:

- **Verify City Service Requirements**: Check if the requirements, fees, or operating hours for business permits, health programs, or scholarships have changed in Trece Martires City Hall.
- **Improve Translations**: Help refine Filipino / Tagalog translations in `src/i18n/locales/fil.json` to make government terms easy for everyone to understand.
- **Update Gas Station & Local Data**: Suggest newly opened gas stations, updated DepEd school strands, or contact hotlines.
- **Submit Issues**: Report outdated information, broken links, or suggest new civic feature ideas via [GitHub Issues](https://github.com/hiroqt/bettertrece/issues).

---

### 💻 2. Technical Contributions

#### Step 1: Sync Your Fork

Always make sure your fork is up-to-date with the main repository before starting:

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

#### Step 2: Create a Dedicated Feature Branch

```bash
git checkout -b feature/add-new-service-module
# or
git checkout -b fix/update-fuel-pricing
```

#### Step 3: Make Your Changes & Follow Code Standards

- **TypeScript Strict Mode**: Avoid using `any` types. Verify all interfaces and models in `src/types/` or `src/data/`.
- **Zero Unused Variables**: The build enforces `noUnusedLocals` and `noUnusedParameters`.
- **Color Palette & Design Tokens**:
  - Primary Brand Blue: `#003893`
  - Midnight Navy: `#001f54`
  - Trece Yellow / Accent: `#FCD34D` (`amber-300`)
- **Keyless APIs**: Avoid external services that require paid API keys. Use open, free standards (such as OpenStreetMap for spatial data).

#### Step 4: Validate and Test

Run the linter and production build to ensure there are no build or type errors:

```bash
npm run lint
npm run build
```

#### Step 5: Submit a Pull Request

Push your branch to your GitHub fork and open a Pull Request using our [Pull Request Template](.github/pull_request_template.md).

For complete details on branch naming, conventional commit messages, and PR review standards, check out the **[CONTRIBUTING.md](CONTRIBUTING.md)** guide.

---

### 📋 Pull Request (PR) Format Quick Reference

When submitting a PR, use the following title and structure:

```text
[Type] Short, descriptive summary of changes (e.g., [Feature] Add DOE fuel price monitoring module)
```

```markdown
## 📌 Pull Request Overview

### 📝 Summary of Changes

- Brief bullet points explaining what was added, updated, or fixed.

### 🏛️ Module / Area Affected

- [x] Fuel Price Monitor & Gas Station Map

### 🔍 Data Source & Verification

- **Official Source Agency**: Department of Energy (DOE) - OIMB
- **Reference / Link**: https://www.doe.gov.ph/retail-pump-prices-luzon

### ✅ Pre-Submission Checklist

- [x] `npm run lint` and `npm run build` pass with zero errors.
- [x] Mobile and desktop views tested.
- [x] Updated translations in `en.json` and `fil.json`.
```

---

## 🏛️ Data Sources & Verification Principles

BetterTrece adheres strictly to verified public data sources:

- **Philippine Statistics Authority (PSA)**: PSGC Standard Geocodes (042122000), 2024 POPCEN Census, PSOC 2012, PSCCS 2018.
- **Department of Energy (DOE)**: Oil Industry Management Bureau (OIMB) Liquid Fuel Price Monitoring.
- **Commission on Audit (COA)**: Trece Martires City Annual Audit Reports (AAR).
- **Department of Budget and Management (DBM)**: National General Appropriations Acts (GAA 2020–2026).
- **Department of Public Works and Highways (DPWH)**: Cavite 1st District Engineering Office project listings.
- **Department of Education (DepEd)**: Basic Education Information System school records.

---

## 📄 License

This project is open-source and licensed under the **Creative Commons Zero v1.0 Universal (CC0 1.0) Public Domain Dedication**. You are free to use, modify, and build upon this work for public and civic good.

---

**Built with ❤️ by the community for the people of Trece Martires City, Cavite.**
