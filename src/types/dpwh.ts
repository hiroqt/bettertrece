/**
 * Official DPWH Transparency API Types & Analytics
 * Endpoint: https://api.transparency.dpwh.gov.ph/projects
 */

export interface DPWHLocation {
  province: string;
  region: string;
  cityMunicipality?: string;
  barangay?: string;
}

export interface DPWHProject {
  contractId: string;
  description: string;
  category: string;
  componentCategories: string;
  status: string;
  budget: number;
  amountPaid: number;
  progress: number;
  location: DPWHLocation;
  contractor: string;
  startDate: string | null;
  completionDate: string | null;
  infraYear: string;
  programName: string;
  sourceOfFunds: string;
  isLive: boolean;
  livestreamUrl: string | null;
  livestreamVideoId: string | null;
  livestreamDetectedAt: string | null;
  latitude: number | null;
  longitude: number | null;
  reportCount: number;
  hasSatelliteImage: boolean;
}

export interface DPWHSummary {
  totalProjects: number;
  completed: number;
  ongoing: number;
  notStarted: number;
  forProcurement: number;
  terminated: number;
  totalBudget: number;
}

export interface DPWHPagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface DPWHProjectsResponse {
  status: number;
  code: string;
  data: {
    data: DPWHProject[];
    summary: DPWHSummary;
    pagination: DPWHPagination;
  };
}

export interface DPWHProjectFilters {
  page?: number;
  limit?: number;
  province?: string;
  city?: string;
  year?: string;
  status?: string;
  category?: string;
  search?: string;
  barangay?: string;
}

export interface CategoryBudgetBreakdown {
  category: string;
  count: number;
  totalBudget: number;
  percentage: number;
}

export interface StatusDistribution {
  status: string;
  count: number;
  percentage: number;
  totalBudget: number;
}

export interface ContractorAnalytics {
  name: string;
  projectCount: number;
  totalBudget: number;
  averageProgress: number;
}

export interface DPWHTreceAnalytics {
  totalProjects: number;
  totalBudget: number;
  totalPaid: number;
  averageProgress: number;
  completedCount: number;
  ongoingCount: number;
  terminatedCount: number;
  procurementCount: number;
  categories: CategoryBudgetBreakdown[];
  statusDistribution: StatusDistribution[];
  topContractors: ContractorAnalytics[];
  geoTaggedCount: number;
}

export interface DPWHCacheRecord {
  timestamp: number;
  query: string;
  projects: DPWHProject[];
  summary: DPWHSummary;
  pagination: DPWHPagination;
}
