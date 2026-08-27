# 🤝 Contributing to BetterTrece

Thank you for your interest in contributing to **BetterTreceMartires** ([bettertrecemartires.org](https://bettertrecemartires.org))! This project is part of the **BetterGov** initiative—an open-source civic tech movement dedicated to making local government services accessible and public data transparent for the people of **Trece Martires City, Cavite**.

---

## 📑 Table of Contents

1. [Code of Conduct & Civic Principles](#-civic-principles--code-of-conduct)
2. [How to Contribute](#-how-to-contribute)
3. [Branch Naming Conventions](#-branch-naming-conventions)
4. [Commit Message Standards (Conventional Commits)](#-commit-message-standards)
5. [Pull Request Guidelines & Format](#-pull-request-guidelines--format)
6. [Pre-PR Checklist](#-pre-pr-checklist)
7. [Getting Help & Community](#-getting-help--community)

---

## 🏛️ Civic Principles & Code of Conduct

- **Accuracy & Integrity First**: All data added or modified (budgets, taxes, school profiles, fuel prices, ordinances) must be sourced from official government publications (PSA, DOE, DBM, COA, DPWH, DepEd, or the LGU).
- **Public Domain & Open Access**: This project is licensed under **CC0 1.0 (Public Domain)**. Everything we build is free, keyless, and without commercial paywalls or tracking scripts.
- **Respect & Collaboration**: We welcome contributors of all backgrounds, skill levels, and disciplines.

---

## 🚀 How to Contribute

1. **Fork the repository** on GitHub: [github.com/hiroqt/bettertrece](https://github.com/hiroqt/bettertrece)
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/bettertrece.git
   cd bettertrece
   ```
3. **Set up upstream remote**:
   ```bash
   git remote add upstream https://github.com/hiroqt/bettertrece.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create your feature branch**:
   ```bash
   git checkout -b feat/fuel-price-map-filter
   ```

---

## 🌿 Branch Naming Conventions

Use clear, descriptive branch names prefixed by the change type:

| Prefix      | Description                                        | Example                             |
| ----------- | -------------------------------------------------- | ----------------------------------- |
| `feat/`     | A new civic module, widget, or capability          | `feat/barangay-hotlines-directory`  |
| `fix/`      | A bug fix or layout correction                     | `fix/mobile-navbar-overlap`         |
| `data/`     | Updating datasets (DOE prices, DepEd schools, GAA) | `data/update-august-doe-prices`     |
| `i18n/`     | Translation or localized content updates           | `i18n/refine-tagalog-permit-guides` |
| `docs/`     | Documentation, README, or guide updates            | `docs/add-pr-guidelines`            |
| `refactor/` | Code refactoring without changing functionality    | `refactor/optimize-leaflet-markers` |

---

## 💬 Commit Message Standards

We follow the **Conventional Commits** specification to keep our git history clear, searchable, and professional.

### 1. Commit Structure

```text
<type>(<scope>): <short imperative description>

[optional body: explain WHAT changed and WHY, not HOW]

[optional footer: reference GitHub issues or data sources]
```

### 2. Supported Types

- `feat`: A new user-facing civic feature, page, or widget
- `fix`: A bug fix or layout/responsive correction
- `data`: Adding or updating civic datasets (DOE fuel, DepEd schools, GAA budgets, COA audits)
- `docs`: Documentation, README, contributor guides, or code comments
- `i18n`: Adding, fixing, or refining English/Tagalog translations
- `style`: Code styling, formatting, or UI visual polish (no logic changes)
- `refactor`: Code restructuring without adding features or fixing bugs
- `chore`: Maintenance, dependencies, build scripts, or config updates

---

### 3. Commit Message Samples

#### Example A: One-Liner Commits (For simple, focused changes)

```bash
# Adding a new feature
git commit -m "feat(fuel): add interactive openstreetmap gas station locator"

# Fixing a bug
git commit -m "fix(navbar): add top padding offset to prevent page header overlap"

# Updating civic data
git commit -m "data(fuel): update DOE weekly retail pump price benchmarks for Trece"

# Updating translations
git commit -m "i18n(transparency): add Tagalog localization for COA audit widget"

# Updating documentation
git commit -m "docs(contributing): add pull request guidelines and commit samples"
```

#### Example B: Multi-Line Detailed Commit (Recommended for Pull Requests)

```bash
git commit -m "feat(fuel): add DOE fuel price monitor and gas station map

- Sourced official retail price benchmarks from DOE-OIMB for Trece Martires
- Integrated keyless Leaflet map with 25+ gas stations and route navigation
- Added community pump price reporting modal with local persistence
- Added status freshness badges and official DOE disclaimer banner"
```

---

## 📋 Pull Request Guidelines & Format

When submitting a Pull Request, please ensure your PR title and description follow this format:

### 1. PR Title Format

```text
[Type] Short, descriptive summary of changes
```

_Examples:_

- `[Feature] Add DOE fuel price monitoring module and Leaflet map`
- `[Fix] Resolve navbar z-index and spacing on mobile viewports`
- `[Data Update] Refresh August 2026 Trece Martires fuel price benchmarks`
- `[i18n] Add Filipino language support for COA Audit Explorer`

### 2. PR Body Template

When you open a PR on GitHub, the template from `.github/pull_request_template.md` will populate automatically:

```markdown
## 📌 Pull Request Overview

### 📝 Summary of Changes

<!-- A clear description of what this PR does and why it was needed. -->

### 🏛️ Module / Area Affected

- [ ] City Services & Citizen Guides
- [ ] Financial & Infrastructure Transparency
- [ ] DepEd Schools & Senior High Strands
- [ ] Fuel Price Monitor & Gas Station Map
- [ ] Peace, Order & Demographics
- [ ] Localization / Translations (i18n)
- [ ] UI / UX / Accessibility
- [ ] Documentation

---

## 🔍 Data Source & Verification

- **Official Source Agency**: (e.g., DOE-OIMB, PSA, DepEd Cavite, COA, LGU)
- **Source Link / Reference**: https://...

---

## 🏷️ Type of Change

- [ ] 🚀 New Feature
- [ ] 🐛 Bug Fix
- [ ] 📊 Data Update
- [ ] 🌐 Translation / i18n
- [ ] 💄 UI / Styling
- [ ] 📝 Documentation

---

## 📸 Visual Preview

<!-- Attach desktop and mobile screenshots if applicable -->

---

## ✅ Pre-Submission Checklist

- [ ] Code builds without errors (`npm run build`).
- [ ] Linting checks pass (`npm run lint`).
- [ ] Responsive on both mobile and desktop screens.
- [ ] Both `en.json` and `fil.json` updated for any new user-facing copy.
- [ ] No private tokens or paid API keys introduced.
```

---

## ✅ Pre-PR Checklist

Before opening your Pull Request, run the following commands locally:

```bash
# 1. Check for linting errors
npm run lint

# 2. Verify TypeScript types and production build
npm run build

# 3. Ensure formatting is clean
npm run format
```

All three must pass with **zero errors**.

---

## 💡 Review Process

1. **Automated Verification**: GitHub Actions will check build and lint status.
2. **Review Feedback**: Maintainers will review your PR for code quality, civic data accuracy, and mobile responsiveness.
3. **Merge**: Once approved, your contribution will be merged and deployed live to [bettertrecemartires.org](https://bettertrecemartires.org)!

Thank you for helping build a better, more transparent Trece Martires! 🏛️🇵🇭
