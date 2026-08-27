import caviteData from './cavite_political_dynasties.json';
import treceData from './trece_political_dynasties.json';
import summaryData from './dynasty_summary.json';

export interface PoliticianRecord {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  clan: string;
  position:
    | 'Governor'
    | 'Vice Governor'
    | 'Member, House of Representatives'
    | 'Provincial Board Member'
    | 'Mayor'
    | 'Vice Mayor'
    | 'Councilor'
    | string;
  municipality: string;
  province: string;
  year: number;
  party: string;
  isFatDynasty: boolean;
  dynastyType: 'Fat Dynasty' | 'Non-Fat / Sequential';
}

export interface ClanSummary {
  clan: string;
  totalTerms: number;
  fatTerms: number;
  fatRatio: number;
  uniqueMembers: number;
  membersList: string[];
  yearsActive: number[];
  positions: string[];
  municipalities?: string[];
}

export interface TreceTimelineItem {
  year: number;
  totalSeats: number;
  fatDynastySeats: number;
  fatDynastyShare: number;
  mayor: string | null;
  viceMayor: string | null;
  councilorsCount: number;
  topClans: { clan: string; count: number }[];
}

export interface MuniComparisonItem {
  municipality: string;
  totalSeats: number;
  fatSeats: number;
  fatShare: number;
  topClans: { clan: string; count: number }[];
}

export interface LongitudinalTrendItem {
  year: number;
  provincialFatShare: number;
}

export interface DynastySummary {
  metadata: {
    datasetTitle: string;
    institution: string;
    curatedFor: string;
    yearsCovered: string;
    totalCaviteRecords: number;
    totalTreceRecords: number;
    lastUpdated: string;
    definition: string;
  };
  treceSummary: {
    totalRecords: number;
    fatDynastyTerms: number;
    nonFatTerms: number;
    overallFatShare: number;
    keyClans: ClanSummary[];
    timeline: TreceTimelineItem[];
  };
  caviteSummary: {
    totalRecords: number;
    fatDynastyTerms: number;
    overallFatShare2022: number;
    longitudinalTrends: LongitudinalTrendItem[];
    muniComparison: MuniComparisonItem[];
    topClans: ClanSummary[];
  };
}

export const CAVITE_DYNASTY_RECORDS = caviteData as PoliticianRecord[];
export const TRECE_DYNASTY_RECORDS = treceData as PoliticianRecord[];
export const DYNASTY_SUMMARY = summaryData as DynastySummary;

export const UNIQUE_MUNICIPALITIES = Array.from(
  new Set(CAVITE_DYNASTY_RECORDS.map(r => r.municipality))
).sort((a, b) => {
  if (a === 'Trece Martires City') return -1;
  if (b === 'Trece Martires City') return 1;
  if (a.startsWith('Provincial')) return 1;
  if (b.startsWith('Provincial')) return -1;
  return a.localeCompare(b);
});

export const UNIQUE_YEARS = Array.from(
  new Set(CAVITE_DYNASTY_RECORDS.map(r => r.year))
)
  .filter(y => y > 0)
  .sort((a, b) => b - a);

export const UNIQUE_POSITIONS = [
  'Mayor',
  'Vice Mayor',
  'Councilor',
  'Governor',
  'Vice Governor',
  'Member, House of Representatives',
  'Provincial Board Member',
];

export const UNIQUE_CLANS = Array.from(
  new Set(CAVITE_DYNASTY_RECORDS.map(r => r.clan))
).sort();
