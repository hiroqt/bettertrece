export type PsgcVersion =
  'Q2_2024' | 'April_2024' | 'Q4_2023' | 'Q2_2021' | string;

export type PsgcLevel =
  | 'all'
  | 'regions'
  | 'provinces'
  | 'municipalities'
  | 'barangays'
  | 'income_classification'
  | 'urban_rural'
  | 'city_class';

export interface PsgcPopulationEntry {
  code: string;
  population: string;
  year: number;
}

export interface PsgcRecord {
  psgc_code: string;
  area_name: string;
  correspondence_code?: string;
  geographic_level?: string;
  reg?: number | string;
  prv?: number | string;
  mun?: number | string;
  bgy?: number | string;
  old_name?: string;
  city_class?: string;
  income_classification?: string;
  urban_rural?: string;
  island_region?: string;
  status?: string;
  version?: string;
  population_data?: PsgcPopulationEntry[];
}

export interface PsgcQueryParams {
  bgy?: string;
  mun?: string;
  prv?: string;
  reg?: string;
  page?: number;
  page_size?: number;
  token?: string;
}

export interface PsgcApiResponse {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: PsgcRecord[] | { psgc_data?: PsgcRecord[] };
  data?: PsgcRecord[];
}

export interface PsgcEndpointMeta {
  level: PsgcLevel;
  path: string;
  title: string;
  description: string;
  sampleUrl: string;
  applicableParams: string[];
}

export interface PsgcQueryState {
  version: PsgcVersion;
  level: PsgcLevel;
  reg: string;
  prv: string;
  mun: string;
  bgy: string;
  page: number;
  pageSize: number;
  token: string;
}

export interface PsgcCacheRecord {
  timestamp: number;
  data: PsgcRecord[];
  totalCount?: number;
}
