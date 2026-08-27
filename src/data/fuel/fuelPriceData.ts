export interface FuelProductPrice {
  id: string;
  name: string;
  shortName: string;
  octane?: number;
  type: 'gasoline' | 'diesel' | 'kerosene';
  description: string;
  overallMin: number;
  overallMax: number;
  commonPrice: number | null;
  lowestPrice: number;
  petronMin?: number | null;
  petronMax?: number | null;
  independentMin?: number | null;
  independentMax?: number | null;
  unit: string;
  isAvailable: boolean;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

export interface DoeFuelMonitoringMeta {
  republic: string;
  department: string;
  departmentFil: string;
  bureau: string;
  reportTitle: string;
  region: string;
  province: string;
  city: string;
  periodStart: string; // YYYY-MM-DD
  periodEnd: string; // YYYY-MM-DD
  periodLabel: string;
  publishedDate: string;
  disclaimer: string;
  sourceUrl?: string;
}

export const TRECE_DOE_FUEL_META: DoeFuelMonitoringMeta = {
  republic: 'Republic of the Philippines',
  department: 'DEPARTMENT OF ENERGY',
  departmentFil: 'Kagawaran ng Enerhiya',
  bureau: 'Oil Industry Management Bureau (OIMB)',
  reportTitle: 'PRICE MONITORING OF LIQUID FUELS',
  region: 'REGION IV-A (CALABARZON)',
  province: 'Cavite',
  city: 'Trece Martires City',
  periodStart: '2026-07-28',
  periodEnd: '2026-08-03',
  periodLabel: 'July 28 – August 3, 2026',
  publishedDate: 'August 4, 2026',
  disclaimer:
    'This is official reference data sourced from the Department of Energy (DOE) - Oil Industry Management Bureau retail pump price monitoring for Trece Martires City, Cavite. Actual pump prices may vary across individual gas stations in Trece Martires City due to promotional discounts, location, or recent market adjustments.',
  sourceUrl: 'https://www.doe.gov.ph/retail-pump-prices-luzon',
};

export const TRECE_FUEL_PRODUCTS: FuelProductPrice[] = [
  {
    id: 'ron91',
    name: 'Unleaded Gasoline (RON 91)',
    shortName: 'Unleaded 91',
    octane: 91,
    type: 'gasoline',
    description:
      'Standard regular gasoline for sedans, tricycles, and motorcycles.',
    overallMin: 71.4,
    overallMax: 78.6,
    commonPrice: null,
    lowestPrice: 71.4,
    petronMin: 78.5,
    petronMax: 78.6,
    independentMin: 71.4,
    independentMax: 76.5,
    unit: '₱/Liter',
    isAvailable: true,
    color: '#0284c7', // Sky blue
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    badgeText: 'text-sky-800',
  },
  {
    id: 'ron95',
    name: 'Premium Gasoline (RON 95)',
    shortName: 'Premium 95',
    octane: 95,
    type: 'gasoline',
    description: 'High-octane premium gasoline with cleaning additives.',
    overallMin: 71.45,
    overallMax: 79.6,
    commonPrice: null,
    lowestPrice: 71.45,
    petronMin: 79.5,
    petronMax: 79.6,
    independentMin: 71.45,
    independentMax: 77.2,
    unit: '₱/Liter',
    isAvailable: true,
    color: '#e11d48', // Red / Rose
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-200',
    badgeText: 'text-rose-800',
  },
  {
    id: 'diesel',
    name: 'Automotive Diesel (ADO)',
    shortName: 'Diesel',
    type: 'diesel',
    description:
      'Automotive diesel fuel for SUVs, vans, jeepneys, trucks, and buses.',
    overallMin: 85.2,
    overallMax: 90.8,
    commonPrice: null,
    lowestPrice: 85.2,
    petronMin: 90.8,
    petronMax: 90.8,
    independentMin: 85.2,
    independentMax: 90.3,
    unit: '₱/Liter',
    isAvailable: true,
    color: '#d97706', // Amber / Gold
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
  },
  {
    id: 'kerosene',
    name: 'Household Kerosene (Gaas)',
    shortName: 'Kerosene',
    type: 'kerosene',
    description:
      'Refined kerosene for domestic lighting, heating, and appliances.',
    overallMin: 125.0,
    overallMax: 125.0,
    commonPrice: 125.0,
    lowestPrice: 125.0,
    petronMin: null,
    petronMax: null,
    independentMin: 125.0,
    independentMax: 125.0,
    unit: '₱/Liter',
    isAvailable: true,
    color: '#8b5cf6', // Violet
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-800',
  },
  {
    id: 'ron97',
    name: 'Super Premium (RON 97)',
    shortName: 'RON 97',
    octane: 97,
    type: 'gasoline',
    description: 'High performance racing / super premium fuel.',
    overallMin: 0,
    overallMax: 0,
    commonPrice: null,
    lowestPrice: 0,
    petronMin: null,
    petronMax: null,
    independentMin: null,
    independentMax: null,
    unit: '₱/Liter',
    isAvailable: false,
    color: '#64748b',
    badgeBg: 'bg-slate-50',
    badgeBorder: 'border-slate-200',
    badgeText: 'text-slate-600',
  },
  {
    id: 'ron100',
    name: 'Octane 100 Gasoline',
    shortName: 'RON 100',
    octane: 100,
    type: 'gasoline',
    description: 'Ultra-high octane competition grade gasoline.',
    overallMin: 0,
    overallMax: 0,
    commonPrice: null,
    lowestPrice: 0,
    petronMin: null,
    petronMax: null,
    independentMin: null,
    independentMax: null,
    unit: '₱/Liter',
    isAvailable: false,
    color: '#64748b',
    badgeBg: 'bg-slate-50',
    badgeBorder: 'border-slate-200',
    badgeText: 'text-slate-600',
  },
  {
    id: 'diesel-plus',
    name: 'Premium Diesel Plus',
    shortName: 'Diesel Plus',
    type: 'diesel',
    description: 'Premium treated diesel with enhanced cetane booster.',
    overallMin: 0,
    overallMax: 0,
    commonPrice: null,
    lowestPrice: 0,
    petronMin: null,
    petronMax: null,
    independentMin: null,
    independentMax: null,
    unit: '₱/Liter',
    isAvailable: false,
    color: '#64748b',
    badgeBg: 'bg-slate-50',
    badgeBorder: 'border-slate-200',
    badgeText: 'text-slate-600',
  },
];

export interface BrandPriceSummary {
  brand: string;
  category: 'Major Oil Company' | 'Independent Retail Outlet';
  ron91Range: string;
  ron95Range: string;
  dieselRange: string;
  keroseneRange: string;
  hasOutletsInTrece: boolean;
  status: string;
}

export const TRECE_BRAND_SUMMARIES: BrandPriceSummary[] = [
  {
    brand: 'Petron',
    category: 'Major Oil Company',
    ron91Range: '₱78.50 – ₱78.60',
    ron95Range: '₱79.50 – ₱79.60',
    dieselRange: '₱90.80',
    keroseneRange: 'No LFRO reported',
    hasOutletsInTrece: true,
    status: 'Active Monitoring',
  },
  {
    brand:
      'Independent Retail Outlets (Petro Gazz, Cleanfuel, Uno, Rephil, Jetti, Seaoil, Maxifuel, Hebron, Centrum)',
    category: 'Independent Retail Outlet',
    ron91Range: '₱71.40 – ₱76.50',
    ron95Range: '₱71.45 – ₱77.20',
    dieselRange: '₱85.20 – ₱90.30',
    keroseneRange: '₱125.00',
    hasOutletsInTrece: true,
    status: 'Active Monitoring (Lowest Observed)',
  },
  {
    brand: 'Shell',
    category: 'Major Oil Company',
    ron91Range: 'No LFRO in period',
    ron95Range: 'No LFRO in period',
    dieselRange: 'No LFRO in period',
    keroseneRange: 'No LFRO in period',
    hasOutletsInTrece: true,
    status: 'No LFRO submitted for this monitoring period',
  },
  {
    brand: 'Caltex',
    category: 'Major Oil Company',
    ron91Range: 'No LFRO in period',
    ron95Range: 'No LFRO in period',
    dieselRange: 'No LFRO in period',
    keroseneRange: 'No LFRO in period',
    hasOutletsInTrece: true,
    status: 'No LFRO submitted for this monitoring period',
  },
  {
    brand: 'Unioil',
    category: 'Major Oil Company',
    ron91Range: 'No LFRO in period',
    ron95Range: 'No LFRO in period',
    dieselRange: 'No LFRO in period',
    keroseneRange: 'No LFRO in period',
    hasOutletsInTrece: true,
    status: 'No LFRO submitted for this monitoring period',
  },
  {
    brand: 'Seaoil',
    category: 'Major Oil Company',
    ron91Range: 'No LFRO in period',
    ron95Range: 'No LFRO in period',
    dieselRange: 'No LFRO in period',
    keroseneRange: 'No LFRO in period',
    hasOutletsInTrece: true,
    status: 'No LFRO submitted for this monitoring period',
  },
];

export interface FreshnessStatus {
  status: 'active' | 'outdated' | 'archived';
  label: string;
  badgeClass: string;
  dotClass: string;
  description: string;
  daysDiff: number;
}

export function getFuelDataFreshness(
  periodEndStr: string = TRECE_DOE_FUEL_META.periodEnd
): FreshnessStatus {
  const endDate = new Date(periodEndStr);
  const now = new Date();

  // Calculate difference in days
  const diffTime = now.getTime() - endDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return {
      status: 'active',
      label: 'DOE Official (Active Monitoring Period)',
      badgeClass: 'bg-emerald-500/15 text-emerald-700 border-emerald-300/80',
      dotClass: 'bg-emerald-500 animate-pulse',
      description:
        'Official verified retail fuel prices from the current DOE monitoring cycle.',
      daysDiff: diffDays,
    };
  } else if (diffDays <= 30) {
    return {
      status: 'outdated',
      label: 'Past DOE Monitoring Cycle',
      badgeClass: 'bg-amber-500/15 text-amber-800 border-amber-300/80',
      dotClass: 'bg-amber-500',
      description:
        'Reference schedule is from a previous monitoring cycle. Check community updates for today’s pump rates.',
      daysDiff: diffDays,
    };
  } else {
    return {
      status: 'archived',
      label: 'Archived Reference Schedule',
      badgeClass: 'bg-slate-500/15 text-slate-700 border-slate-300/80',
      dotClass: 'bg-slate-400',
      description:
        'Historical archive data from the DOE Oil Industry Management Bureau.',
      daysDiff: diffDays,
    };
  }
}
