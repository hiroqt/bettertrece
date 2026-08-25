import rawSchools from './trece_schools_deped_2020_2021.json';
import { type ShsStrandCode } from './seniorHighSchools';

export type SchoolLevel =
  | 'Preschool'
  | 'Elementary'
  | 'Junior High School'
  | 'Senior High School'
  | 'Integrated School';

export type SchoolSector = 'Public' | 'Private';

export type SchoolSubclassification =
  'DepED Managed' | 'Local Government' | 'Non-Sectarian' | 'Sectarian';

export interface TreceSchool {
  id: string; // 6-digit BEIS ID
  name: string;
  level: SchoolLevel;
  sector: SchoolSector;
  program: string; // Human-friendly program description
  offeringCode: string; // Raw DepEd offering code (e.g. Purely ES, All Offering (K to 12))
  subclassification: SchoolSubclassification | string;
  barangay: string;
  address: string;
  legislativeDistrict: string;
  shsStrands?: ShsStrandCode[];
}

export const TRECE_ALL_SCHOOLS: TreceSchool[] = rawSchools as TreceSchool[];

export const SCHOOL_LEVEL_CONFIG: Record<
  SchoolLevel,
  {
    label: string;
    description: string;
    badgeColor: { bg: string; text: string; border: string };
  }
> = {
  Preschool: {
    label: 'Preschool / Early Childhood',
    description: 'Early childhood, nursery, and preparatory education centers.',
    badgeColor: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
    },
  },
  Elementary: {
    label: 'Elementary School',
    description: 'Primary basic education serving Kindergarten to Grade 6.',
    badgeColor: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
    },
  },
  'Junior High School': {
    label: 'Junior High School',
    description: 'Lower secondary education covering Grades 7 to 10.',
    badgeColor: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
    },
  },
  'Senior High School': {
    label: 'Senior High School',
    description:
      'Specialized upper secondary education for Grades 11 and 12 (Academic & TVL tracks).',
    badgeColor: {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
    },
  },
  'Integrated School': {
    label: 'Integrated School',
    description:
      'Campuses offering continuous education from Kindergarten through JHS (K-10) or SHS (K-12).',
    badgeColor: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
  },
};

export const SCHOOLS_STATISTICS = {
  totalSchools: TRECE_ALL_SCHOOLS.length,
  publicSchools: TRECE_ALL_SCHOOLS.filter(s => s.sector === 'Public').length,
  privateSchools: TRECE_ALL_SCHOOLS.filter(s => s.sector === 'Private').length,
  preschools: TRECE_ALL_SCHOOLS.filter(s => s.level === 'Preschool').length,
  elementarySchools: TRECE_ALL_SCHOOLS.filter(s => s.level === 'Elementary')
    .length,
  juniorHighSchools: TRECE_ALL_SCHOOLS.filter(
    s => s.level === 'Junior High School'
  ).length,
  seniorHighSchools: TRECE_ALL_SCHOOLS.filter(
    s => s.level === 'Senior High School' || !!s.shsStrands?.length
  ).length,
  integratedSchools: TRECE_ALL_SCHOOLS.filter(
    s => s.level === 'Integrated School'
  ).length,
  purelyShs: TRECE_ALL_SCHOOLS.filter(s => s.level === 'Senior High School')
    .length,
  allOfferingK12: TRECE_ALL_SCHOOLS.filter(
    s => s.offeringCode === 'All Offering (K to 12)'
  ).length,
  kTo10Schools: TRECE_ALL_SCHOOLS.filter(
    s => s.offeringCode === 'ES and JHS (K to 10)'
  ).length,
};

export const TRECE_BARANGAYS_WITH_SCHOOLS = Array.from(
  new Set(TRECE_ALL_SCHOOLS.map(s => s.barangay))
).sort();
