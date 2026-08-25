/**
 * Philippine General Appropriations Act (GAA) Transparency Data for Trece Martires City, Cavite
 * Source: BetterGov Hugging Face Datasets (bettergovph/gaa) - DBM GAA 2020-2026
 * Total Curated Records: 1,761
 * Total National Appropriations: ₱6,065,333,000.00
 */

import gaaSummaryJson from './trece_martires_gaa_summary.json';

export interface GaaRecord {
  id: number;
  year: number;
  department: string;
  department_name: string;
  agency: string;
  agency_name: string;
  prexc_fpap_id: string;
  item_description: string;
  operunit: string | null;
  operating_unit: string | null;
  region_id: string | null;
  fund_code: string | null;
  fund_subcategory: string | null;
  expense_code: string | null;
  expense_class: string | null;
  sub_object_code: string | null;
  expense_object: string | null;
  amount_in_thousands: number;
  amount_php: number;
  prexc_level: string | null;
  sorder: string | null;
  operating_division_id: string | null;
  operating_division: string | null;
  sector: string;
}

export interface GaaSummary {
  dataset_name: string;
  source: string;
  scope: string;
  total_records: number;
  years_covered: number[];
  grand_total_php: number;
  grand_total_formatted: string;
  totals_by_year: Record<
    string,
    { record_count: number; total_php: number; total_formatted: string }
  >;
  totals_by_department: Record<
    string,
    { record_count: number; total_php: number; total_formatted: string }
  >;
  totals_by_sector: Record<
    string,
    { record_count: number; total_php: number; total_formatted: string }
  >;
  totals_by_expense_class: Record<
    string,
    { record_count: number; total_php: number; total_formatted: string }
  >;
  schools_breakdown: Record<
    string,
    { record_count: number; total_php: number; total_formatted: string }
  >;
}

export const gaaSummary: GaaSummary = gaaSummaryJson as unknown as GaaSummary;

/**
 * Top infrastructure projects in Trece Martires City funded through the National Budget (GAA)
 */
export const topGaaProjects = [
  {
    year: 2025,
    title:
      'Construction of Revetment along Cañas River, Brgy. Luciano, Trece Martires City, Cavite',
    sector: 'Flood Control & River Mitigation',
    department: 'DPWH',
    amount_php: 100000000,
    amount_formatted: '₱100,000,000.00',
    description:
      'Major riverbank protection and flood mitigation structure along the Cañas River basin.',
  },
  {
    year: 2024,
    title:
      'Construction of Revetment along Cañas River, Brgy. De Ocampo Section, Phase 4, Trece Martires City',
    sector: 'Flood Control & River Mitigation',
    department: 'DPWH',
    amount_php: 100000000,
    amount_formatted: '₱100,000,000.00',
    description:
      'Phase 4 structural revetment and erosion control along Cañas River in Barangay De Ocampo.',
  },
  {
    year: 2024,
    title:
      'Construction of Road Dike along Timalan River, Brgy. Cabuco, Phase I, Trece Martires City',
    sector: 'Flood Control & River Mitigation',
    department: 'DPWH',
    amount_php: 100000000,
    amount_formatted: '₱100,000,000.00',
    description:
      'Flood defense road dike along Timalan River corridor in Barangay Cabuco.',
  },
  {
    year: 2024,
    title:
      'Construction of Road Dike along Pasong Balite River, Cavite Government Center, Phase 2, Brgy. San Agustin',
    sector: 'Flood Control & River Mitigation',
    department: 'DPWH',
    amount_php: 100000000,
    amount_formatted: '₱100,000,000.00',
    description:
      'River protection dike securing the Cavite Provincial Government Center complex in San Agustin.',
  },
  {
    year: 2022,
    title: 'San Agustin - Luciano By-Pass Road, Cavite',
    sector: 'Roads & Bridges',
    department: 'DPWH',
    amount_php: 54780000,
    amount_formatted: '₱54,780,000.00',
    description:
      'Bypass road connecting Barangay San Agustin and Barangay Luciano to relieve city center traffic.',
  },
  {
    year: 2020,
    title:
      'Construction of 4-Storey 20-Classroom School Building at Trece Martires City Elementary School',
    sector: 'School Buildings & Education Infra',
    department: 'DPWH / DepEd',
    amount_php: 52250000,
    amount_formatted: '₱52,250,000.00',
    description:
      '20-classroom multi-storey public school building for basic education students.',
  },
  {
    year: 2022,
    title: 'Cabuco - Indang Diversion Road, Phase II, Cavite',
    sector: 'Roads & Bridges',
    department: 'DPWH',
    amount_php: 50000000,
    amount_formatted: '₱50,000,000.00',
    description:
      'Phase 2 arterial road link between Brgy. Cabuco, Trece Martires and Indang.',
  },
  {
    year: 2020,
    title:
      'Construction of 5-Storey Academic Building (CvSU Trece Martires City Campus)',
    sector: 'Higher Education (SUCs)',
    department: 'Cavite State University',
    amount_php: 0, // Parent appropriation item
    amount_formatted: 'Line-Item Appropriation',
    description:
      'Flagship academic facility expansion for Cavite State University Trece Martires City Campus.',
  },
];
