import type {
  DPWHProjectsResponse,
  DPWHProjectFilters,
  DPWHProject,
  DPWHTreceAnalytics,
  CategoryBudgetBreakdown,
  StatusDistribution,
  ContractorAnalytics,
  DPWHCacheRecord,
} from '../types/dpwh';
import { TRECE_DPWH_PROJECTS } from '../data/transparency/dpwhTransparency';

const CACHE_KEY = 'bettertrece_dpwh_cache_v2';
const DEFAULT_CACHE_TTL = 1000 * 60 * 60 * 2; // 2 hours

/**
 * Determine the best API base URL (Vite dev proxy in development, direct URL in production)
 */
function getApiBaseUrl(): string {
  if (typeof window !== 'undefined' && import.meta.env?.DEV) {
    return '/dpwh-api';
  }
  return 'https://api.transparency.dpwh.gov.ph';
}

/**
 * Helper to extract Trece Martires barangay names from text description
 */
export function extractBarangayFromText(text: string): string | undefined {
  const barangays = [
    'San Agustin',
    'Hugo Perez',
    'Aguado',
    'Cabuco',
    'Conchu',
    'De Ocampo',
    'Gregorio',
    'Inocencio',
    'Lallana',
    'Lapidario',
    'Luciano',
    'Osorio',
    'Perez',
  ];

  const lower = text.toLowerCase();
  for (const brgy of barangays) {
    if (lower.includes(brgy.toLowerCase())) {
      return brgy;
    }
  }
  return undefined;
}

/**
 * Normalize and sanitize a raw DPWH project record
 */
export function normalizeDPWHProject(p: Partial<DPWHProject>): DPWHProject {
  const description = (p.description || 'Infrastructure Project').trim();
  const detectedBarangay =
    p.location?.barangay || extractBarangayFromText(description);

  return {
    contractId:
      p.contractId ||
      `TEMP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    description,
    category: p.category || 'General Infrastructure',
    componentCategories: p.componentCategories || p.category || 'Roads',
    status: p.status || 'On-Going',
    budget: Number(p.budget) || 0,
    amountPaid: Number(p.amountPaid) || 0,
    progress: Number(p.progress) || 0,
    location: {
      province: p.location?.province || 'Cavite 1st DEO',
      region: p.location?.region || 'Region IV-A',
      cityMunicipality: p.location?.cityMunicipality || 'Trece Martires City',
      barangay: detectedBarangay,
    },
    contractor: p.contractor || 'Government Funded / Under Procurement',
    startDate: p.startDate || null,
    completionDate: p.completionDate || null,
    infraYear: p.infraYear
      ? String(p.infraYear)
      : new Date().getFullYear().toString(),
    programName: p.programName || 'Regular Infrastructure Program',
    sourceOfFunds: p.sourceOfFunds || 'GAA National Budget',
    isLive: Boolean(p.isLive),
    livestreamUrl: p.livestreamUrl || null,
    livestreamVideoId: p.livestreamVideoId || null,
    livestreamDetectedAt: p.livestreamDetectedAt || null,
    latitude: typeof p.latitude === 'number' ? p.latitude : null,
    longitude: typeof p.longitude === 'number' ? p.longitude : null,
    reportCount: Number(p.reportCount) || 0,
    hasSatelliteImage: Boolean(p.hasSatelliteImage),
  };
}

/**
 * Fetch a single paginated batch from DPWH API
 */
export async function getDPWHProjects(
  filters: DPWHProjectFilters = {}
): Promise<DPWHProjectsResponse> {
  const {
    page = 1,
    limit = 50,
    province,
    city,
    year,
    status,
    category,
    search,
  } = filters;

  const baseUrl = getApiBaseUrl();
  const url = new URL(`${baseUrl}/projects`, window.location.origin);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  if (search) url.searchParams.set('search', search);
  if (province) url.searchParams.set('province', province);
  if (city) url.searchParams.set('city', city);
  if (year) url.searchParams.set('year', year);
  if (status) url.searchParams.set('status', status);
  if (category) url.searchParams.set('category', category);

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `DPWH API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Fetch ALL Trece Martires Projects concurrently with dynamic pagination & caching
 */
export async function getAllTreceProjects(
  options: {
    search?: string;
    limit?: number;
    concurrency?: number;
    forceRefresh?: boolean;
    cacheTtlMs?: number;
  } = {}
): Promise<{
  projects: DPWHProject[];
  source: 'live-api' | 'cache' | 'fallback';
  lastSynced: Date;
  totalPages: number;
  totalCount: number;
  error?: string;
}> {
  const {
    search = 'trece martires city',
    limit = 50,
    concurrency = 4,
    forceRefresh = false,
    cacheTtlMs = DEFAULT_CACHE_TTL,
  } = options;

  // 1. Check client-side storage cache if not forcing refresh
  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const record: DPWHCacheRecord = JSON.parse(cached);
        const age = Date.now() - record.timestamp;
        if (age < cacheTtlMs && record.projects && record.projects.length > 0) {
          return {
            projects: record.projects,
            source: 'cache',
            lastSynced: new Date(record.timestamp),
            totalPages: record.pagination.totalPages || 1,
            totalCount: record.pagination.totalCount || record.projects.length,
          };
        }
      }
    } catch {
      // Cache parse error, continue to live fetch
    }
  }

  try {
    // 2. Fetch page 1 to read totalPages & totalCount
    const firstPage = await getDPWHProjects({ page: 1, limit, search });
    const pagination = firstPage.data.pagination;
    const totalPages = pagination.totalPages || 1;
    const allFetched: DPWHProject[] = [...firstPage.data.data];

    // 3. Concurrently fetch remaining pages in parallel batches
    if (totalPages > 1) {
      const remainingPageNumbers = Array.from(
        { length: totalPages - 1 },
        (_, i) => i + 2
      );

      // Execute in concurrency-controlled chunks
      for (let i = 0; i < remainingPageNumbers.length; i += concurrency) {
        const chunk = remainingPageNumbers.slice(i, i + concurrency);
        const chunkResponses = await Promise.all(
          chunk.map(pageNum =>
            getDPWHProjects({ page: pageNum, limit, search }).catch(() => null)
          )
        );

        for (const res of chunkResponses) {
          if (res?.data?.data) {
            allFetched.push(...res.data.data);
          }
        }
      }
    }

    // 4. Normalize and deduplicate by contractId
    const seenIds = new Set<string>();
    const normalizedProjects: DPWHProject[] = [];

    for (const raw of allFetched) {
      const project = normalizeDPWHProject(raw);
      if (!seenIds.has(project.contractId)) {
        seenIds.add(project.contractId);
        normalizedProjects.push(project);
      }
    }

    // 5. Store in local cache
    const now = Date.now();
    if (typeof window !== 'undefined') {
      try {
        const cacheRecord: DPWHCacheRecord = {
          timestamp: now,
          query: search,
          projects: normalizedProjects,
          summary: firstPage.data.summary,
          pagination: {
            ...pagination,
            totalCount: normalizedProjects.length,
          },
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheRecord));
      } catch {
        // Storage quota exceeded or disabled
      }
    }

    return {
      projects: normalizedProjects,
      source: 'live-api',
      lastSynced: new Date(now),
      totalPages,
      totalCount: normalizedProjects.length,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : 'Unknown network failure';
    console.warn(
      `[DPWH Service] Live API fetch encountered error (${errorMsg}). Using local resilient 50-project dataset.`,
      err
    );

    const localProjects = TRECE_DPWH_PROJECTS.map(p => normalizeDPWHProject(p));

    return {
      projects: localProjects,
      source: 'fallback',
      lastSynced: new Date(),
      totalPages: 1,
      totalCount: localProjects.length,
      error: errorMsg,
    };
  }
}

/**
 * Fallback & Hybrid helper for individual filtered queries
 */
export async function getTreceProjectsWithFallback(
  filters: DPWHProjectFilters = {},
  timeoutMs = 6000
): Promise<{
  data: DPWHProject[];
  source: 'live-api' | 'local-cache';
  summary?: DPWHProjectsResponse['data']['summary'];
  pagination?: DPWHProjectsResponse['data']['pagination'];
  error?: string;
}> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const result = await getDPWHProjects({
      ...filters,
      search: filters.search || 'trece martires city',
      province: filters.province || 'Cavite 1st DEO',
    });

    clearTimeout(timer);

    return {
      data: result.data.data.map(normalizeDPWHProject),
      source: 'live-api',
      summary: result.data.summary,
      pagination: result.data.pagination,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';

    const localProjects: DPWHProject[] =
      TRECE_DPWH_PROJECTS.map(normalizeDPWHProject);

    return {
      data: localProjects,
      source: 'local-cache',
      error: errorMessage,
    };
  }
}

import type { DpwhProject } from '../data/transparency/dpwhTransparency';

/**
 * Generate comprehensive analytical breakdowns for Trece Martires projects
 */
export function getTreceAnalytics(
  projects: (DPWHProject | DpwhProject)[]
): DPWHTreceAnalytics {
  let totalBudget = 0;
  let totalPaid = 0;
  let progressSum = 0;
  let completedCount = 0;
  let ongoingCount = 0;
  let terminatedCount = 0;
  let procurementCount = 0;
  let geoTaggedCount = 0;

  const categoryMap = new Map<string, { count: number; totalBudget: number }>();
  const statusMap = new Map<string, { count: number; totalBudget: number }>();
  const contractorMap = new Map<
    string,
    { count: number; totalBudget: number; progressSum: number }
  >();

  projects.forEach(p => {
    const budget = p.budget || 0;
    const paid = p.amountPaid || 0;
    totalBudget += budget;
    totalPaid += paid;
    progressSum += p.progress || 0;

    if (p.latitude && p.longitude) {
      geoTaggedCount++;
    }

    // Status counts
    const s = p.status.toLowerCase();
    let normStatus = 'On-Going';
    if (s.includes('complete')) {
      completedCount++;
      normStatus = 'Completed';
    } else if (s.includes('ongoing') || s.includes('on-going')) {
      ongoingCount++;
      normStatus = 'On-Going';
    } else if (s.includes('terminate')) {
      terminatedCount++;
      normStatus = 'Terminated';
    } else if (s.includes('procure')) {
      procurementCount++;
      normStatus = 'For Procurement';
    } else {
      ongoingCount++;
    }

    // Category aggregation
    const cat = p.category || 'Roads';
    const catData = categoryMap.get(cat) || { count: 0, totalBudget: 0 };
    catData.count += 1;
    catData.totalBudget += budget;
    categoryMap.set(cat, catData);

    // Status aggregation
    const statusData = statusMap.get(normStatus) || {
      count: 0,
      totalBudget: 0,
    };
    statusData.count += 1;
    statusData.totalBudget += budget;
    statusMap.set(normStatus, statusData);

    // Contractor aggregation
    const rawContractor = (p.contractor || 'Unspecified').trim();
    // Clean contractor name (strip registration numbers in parentheses for clean groupings)
    const cleanContractor = rawContractor.replace(/\s*\(\d+\)$/, '');
    const contractorData = contractorMap.get(cleanContractor) || {
      count: 0,
      totalBudget: 0,
      progressSum: 0,
    };
    contractorData.count += 1;
    contractorData.totalBudget += budget;
    contractorData.progressSum += p.progress || 0;
    contractorMap.set(cleanContractor, contractorData);
  });

  const totalCount = projects.length || 1;

  // Build sorted category breakdown
  const categories: CategoryBudgetBreakdown[] = Array.from(
    categoryMap.entries()
  )
    .map(([category, data]) => ({
      category,
      count: data.count,
      totalBudget: data.totalBudget,
      percentage:
        totalBudget > 0
          ? Math.round((data.totalBudget / totalBudget) * 100)
          : 0,
    }))
    .sort((a, b) => b.totalBudget - a.totalBudget);

  // Build status distribution
  const statusDistribution: StatusDistribution[] = Array.from(
    statusMap.entries()
  )
    .map(([status, data]) => ({
      status,
      count: data.count,
      totalBudget: data.totalBudget,
      percentage: Math.round((data.count / totalCount) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Build top contractors leaderboard
  const topContractors: ContractorAnalytics[] = Array.from(
    contractorMap.entries()
  )
    .map(([name, data]) => ({
      name,
      projectCount: data.count,
      totalBudget: data.totalBudget,
      averageProgress:
        Math.round((data.progressSum / (data.count || 1)) * 10) / 10,
    }))
    .sort((a, b) => b.totalBudget - a.totalBudget)
    .slice(0, 10);

  return {
    totalProjects: projects.length,
    totalBudget,
    totalPaid,
    averageProgress: Math.round((progressSum / totalCount) * 10) / 10,
    completedCount,
    ongoingCount,
    terminatedCount,
    procurementCount,
    categories,
    statusDistribution,
    topContractors,
    geoTaggedCount,
  };
}

/**
 * Export projects to CSV file
 */
export function exportProjectsToCsv(
  projects: DPWHProject[],
  filename = 'trece-martires-dpwh-projects.csv'
) {
  const headers = [
    'Contract ID',
    'Description',
    'Category',
    'Status',
    'Budget (PHP)',
    'Amount Paid (PHP)',
    'Progress (%)',
    'Barangay',
    'Contractor',
    'Year',
    'Start Date',
    'Completion Date',
    'Source of Funds',
    'Latitude',
    'Longitude',
  ];

  const rows = projects.map(p => [
    `"${p.contractId}"`,
    `"${p.description.replace(/"/g, '""')}"`,
    `"${p.category}"`,
    `"${p.status}"`,
    p.budget,
    p.amountPaid,
    p.progress,
    `"${p.location.barangay || 'Trece Martires City'}"`,
    `"${(p.contractor || '').replace(/"/g, '""')}"`,
    p.infraYear,
    p.startDate || '',
    p.completionDate || '',
    `"${p.sourceOfFunds || ''}"`,
    p.latitude || '',
    p.longitude || '',
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join(
    '\n'
  );
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export projects to JSON file
 */
export function exportProjectsToJson(
  projects: DPWHProject[],
  filename = 'trece-martires-dpwh-projects.json'
) {
  const jsonContent = JSON.stringify(projects, null, 2);
  const blob = new Blob([jsonContent], {
    type: 'application/json;charset=utf-8;',
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
