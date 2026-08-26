export type PsocVersion = '2012' | string;

export type PsocGroupLevel = 'all' | 'major' | 'sub-major' | 'minor' | 'unit';

export interface PsocRecord {
  id: number;
  majorcode?: number | string;
  submajorcode?: number | string;
  minorcode?: number | string;
  unitcode?: number | string;
  title: string;
  description: string;
  version: string;
  tasks?: string[];
  skill_level?: number | string;
  isco_code?: string;
  hierarchy_level?: 'Major' | 'Sub-Major' | 'Minor' | 'Unit';
  example_jobs?: string[];
}

export interface PsocQueryParams {
  majorcode?: string;
  submajorcode?: string;
  minorcode?: string;
  unitcode?: string;
  page?: number;
  page_size?: number;
  token?: string;
}

export interface PsocApiResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: PsocRecord[] | { psoc_data?: PsocRecord[] };
  data?: PsocRecord[];
}

export interface PsocEndpointMeta {
  group: PsocGroupLevel;
  path: string;
  title: string;
  description: string;
  sampleUrl: string;
  applicableParams: string[];
}

export interface PsocQueryState {
  version: PsocVersion;
  group: PsocGroupLevel;
  majorcode: string;
  submajorcode: string;
  minorcode: string;
  unitcode: string;
  page: number;
  pageSize: number;
  token: string;
}

export interface PsocCacheRecord {
  timestamp: number;
  data: PsocRecord[];
  totalCount?: number;
}

export interface FetchPsocResult {
  records: PsocRecord[];
  totalCount: number;
  statusCode: number;
  statusText: string;
  source: 'live_api' | 'cached' | 'fallback_baseline';
  executedUrl: string;
  maskedUrl: string;
  latencyMs: number;
  rawResponse?: unknown;
}

export interface PsocMajorGroupSummary {
  code: number | string;
  title: string;
  description: string;
  subMajorCount: number;
  minorCount: number;
  unitCount: number;
  iscoSkillLevel: string;
  caviteRelevance: string;
  representativeTitles: string[];
}
