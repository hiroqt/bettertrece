export type PsccsVersion = '2018' | string;

export type PsccsLevel =
  'all' | 'sections' | 'divisions' | 'groups' | 'classes' | 'sub-classes';

export interface PsccsRecord {
  id: number;
  sectioncode: string;
  section_title: string;
  sectiondesc?: string;
  divisioncode?: string;
  division_title?: string;
  groupcode?: string;
  group_title?: string;
  class_code?: string;
  class_title?: string;
  subclasscode?: string;
  subclass_title?: string;
  version: string;
  // Trece Martires curated citizen context
  reportingOffice:
    | 'PNP Trece Martires Police Station'
    | 'Barangay Lupon Tagapamayapa (KP)'
    | 'Barangay VAWC Desk'
    | 'Trece Traffic Management & CDRRMO'
    | 'CENRO Trece Martires'
    | 'PNP Anti-Cybercrime Group (Cavite)';
  applicableLaws: string[];
  treceLocalContext: string;
  citizenActionGuide: string;
  jurisdictionType:
    | 'Barangay Mediation (Lupon)'
    | 'Direct Police Report & Investigation'
    | 'Special Protection & Social Welfare'
    | 'City Traffic & Environmental Enforcement';
  commonExamples: string[];
}

export interface PsccsQueryParams {
  section?: string;
  division?: string;
  group?: string;
  class_code?: string;
  subclasscode?: string;
  page?: number;
  page_size?: number;
  token?: string;
}

export interface PsccsSectionMeta {
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  divisionCount: number;
  treceApplication: string;
  primaryResponder: string;
  badgeColor: string;
  keyOffenses: string[];
}

export interface TreceEmergencyHotline {
  name: string;
  agency: string;
  landline?: string;
  mobile?: string;
  location: string;
  services: string;
}
