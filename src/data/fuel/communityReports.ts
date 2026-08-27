export interface CommunityFuelReport {
  id: string;
  stationId: string;
  stationName: string;
  brand: string;
  fuelType: 'ron91' | 'ron95' | 'diesel' | 'kerosene';
  fuelName: string;
  reportedPrice: number;
  reportedBy: string;
  timestamp: string; // ISO string
  relativeTime: string;
  notes?: string;
  status: 'verified' | 'pending' | 'community_flagged';
  upvotes: number;
}

const STORAGE_KEY = 'bettertrece_fuel_community_reports';

const SEEDED_REPORTS: CommunityFuelReport[] = [
  {
    id: 'rep-01',
    stationId: 'osm-1037869661',
    stationName: 'Uno Fuel San Agustin',
    brand: 'Uno Fuel',
    fuelType: 'diesel',
    fuelName: 'Automotive Diesel',
    reportedPrice: 85.2,
    reportedBy: 'Tricycle Driver (Trece Toda)',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    relativeTime: '45 mins ago',
    notes: 'Cheapest diesel in San Agustin. Fast pump line.',
    status: 'verified',
    upvotes: 8,
  },
  {
    id: 'rep-02',
    stationId: 'osm-1451863105',
    stationName: 'Cleanfuel Trece Martires',
    brand: 'Cleanfuel',
    fuelType: 'ron91',
    fuelName: 'Unleaded 91',
    reportedPrice: 71.9,
    reportedBy: 'Cavite Commuter',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    relativeTime: '2 hours ago',
    notes: 'Earned Cleanfuel VIP points. Restrooms clean.',
    status: 'verified',
    upvotes: 5,
  },
  {
    id: 'rep-03',
    stationId: 'osm-318087854',
    stationName: 'Petro Gazz Trece Martires',
    brand: 'Petro Gazz',
    fuelType: 'ron95',
    fuelName: 'Premium 95',
    reportedPrice: 73.1,
    reportedBy: 'Resident of Luciano',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
    relativeTime: '4 hours ago',
    notes: 'Price posted on their highway LED board.',
    status: 'verified',
    upvotes: 3,
  },
  {
    id: 'rep-04',
    stationId: 'osm-282644978',
    stationName: 'Petron Indang-Trece Road',
    brand: 'Petron',
    fuelType: 'ron95',
    fuelName: 'Petron Blaze / XCS 95',
    reportedPrice: 79.5,
    reportedBy: 'LGU Staff',
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    relativeTime: '6 hours ago',
    notes: 'Consistent with weekly DOE bulletin.',
    status: 'verified',
    upvotes: 4,
  },
];

export function getCommunityReports(): CommunityFuelReport[] {
  if (typeof window === 'undefined') return SEEDED_REPORTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEEDED_REPORTS));
      return SEEDED_REPORTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEEDED_REPORTS;
  } catch {
    return SEEDED_REPORTS;
  }
}

export function saveCommunityReport(
  report: Omit<
    CommunityFuelReport,
    'id' | 'timestamp' | 'relativeTime' | 'status' | 'upvotes'
  >
): CommunityFuelReport {
  const existing = getCommunityReports();
  const newReport: CommunityFuelReport = {
    ...report,
    id: `rep-${Date.now()}`,
    timestamp: new Date().toISOString(),
    relativeTime: 'Just now',
    status: 'verified',
    upvotes: 1,
  };

  const updated = [newReport, ...existing];
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  return newReport;
}

export function getStationReports(
  stationId: string | number
): CommunityFuelReport[] {
  const all = getCommunityReports();
  return all.filter(r => String(r.stationId) === String(stationId));
}
