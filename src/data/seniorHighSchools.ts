export type ShsStrandCode = 'ABM' | 'STEM' | 'HUMSS' | 'GAS' | 'TVL';

export interface ShsStrandInfo {
  code: ShsStrandCode;
  name: string;
  category: 'Academic Track' | 'TVL Track';
  description: string;
  careerPaths: string[];
  badgeColor: {
    bg: string;
    text: string;
    border: string;
    dot: string;
  };
}

export interface SeniorHighSchool {
  id: string;
  schoolId: string; // 6-digit DepEd BEIS School ID
  name: string;
  region: string;
  province: string;
  municipality: string;
  strands: ShsStrandCode[];
  sector: 'Private' | 'Public';
  addressHint?: string;
}

export const SHS_STRANDS: Record<ShsStrandCode, ShsStrandInfo> = {
  STEM: {
    code: 'STEM',
    name: 'Science, Technology, Engineering, and Mathematics',
    category: 'Academic Track',
    description:
      'Focuses on advanced mathematics, natural sciences, engineering concepts, research methodologies, and technological applications.',
    careerPaths: [
      'Engineering (Civil, Electrical, Mechanical, Software)',
      'Medicine, Nursing & Allied Health Sciences',
      'Computer Science & Information Technology',
      'Architecture & Urban Planning',
      'Applied Mathematics, Physics & Chemistry',
    ],
    badgeColor: {
      bg: 'bg-emerald-50 text-emerald-800',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
  },
  ABM: {
    code: 'ABM',
    name: 'Accountancy, Business, and Management',
    category: 'Academic Track',
    description:
      'Develops foundational competencies in corporate accounting, economics, marketing, enterprise management, finance, and entrepreneurship.',
    careerPaths: [
      'Accountancy (CPA) & Auditing',
      'Business Administration & Corporate Management',
      'Banking, Financial Services & Wealth Management',
      'Marketing Management & Advertising',
      'Entrepreneurship & E-Commerce',
    ],
    badgeColor: {
      bg: 'bg-amber-50 text-amber-900',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
  },
  HUMSS: {
    code: 'HUMSS',
    name: 'Humanities and Social Sciences',
    category: 'Academic Track',
    description:
      'Explores human society, communication, critical thinking, governance, philosophy, creative writing, world literature, and legal systems.',
    careerPaths: [
      'Law, Legal Management & Political Science',
      'Journalism, Mass Communication & Broadcasting',
      'Psychology & Behavioral Sciences',
      'Education & Secondary School Teaching',
      'Public Administration & Foreign Service',
    ],
    badgeColor: {
      bg: 'bg-purple-50 text-purple-800',
      text: 'text-purple-700',
      border: 'border-purple-200',
      dot: 'bg-purple-500',
    },
  },
  GAS: {
    code: 'GAS',
    name: 'General Academic Strand',
    category: 'Academic Track',
    description:
      'Offers a versatile curriculum covering varied academic disciplines, ideal for students exploring multiple college degree pathways.',
    careerPaths: [
      'Multidisciplinary College Degrees',
      'Education & Teacher Training',
      'Public Governance & Criminology',
      'Hospitality & Tourism Management',
      'Interdisciplinary Social Sciences',
    ],
    badgeColor: {
      bg: 'bg-blue-50 text-blue-800',
      text: 'text-blue-700',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
    },
  },
  TVL: {
    code: 'TVL',
    name: 'Technical-Vocational-Livelihood',
    category: 'TVL Track',
    description:
      'Hands-on technical training and specialized skills development leading to TESDA National Certification (NC I/II) and immediate workplace readiness.',
    careerPaths: [
      'Information & Communications Technology (ICT)',
      'Home Economics (Cookery, Bread & Pastry, Caregiving)',
      'Industrial Arts (Electrical, Automotive, Welding)',
      'Agri-Fishery Arts & Food Processing',
      'Direct Employment & TESDA NC II Certifications',
    ],
    badgeColor: {
      bg: 'bg-rose-50 text-rose-800',
      text: 'text-rose-700',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
    },
  },
};

export const TRECE_SENIOR_HIGH_SCHOOLS: SeniorHighSchool[] = [
  // ==========================================
  // PUBLIC SENIOR HIGH SCHOOLS (DepEd Cavite)
  // ==========================================
  {
    id: 'trece-martires-city-senior-high-school',
    schoolId: '342292',
    name: 'Trece Martires City Senior High School',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['STEM', 'ABM', 'HUMSS', 'GAS', 'TVL'],
    sector: 'Public',
    addressHint: 'Brgy. Gregorio (Aliang)',
  },
  {
    id: 'trece-martires-city-national-high-school-main',
    schoolId: '301222',
    name: 'Trece Martires City National High School (Main)',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['ABM', 'HUMSS', 'GAS', 'TVL'],
    sector: 'Public',
    addressHint: 'Purok 10, Brgy. San Agustin',
  },
  {
    id: 'francisco-osorio-integrated-high-school',
    schoolId: '307808',
    name: 'Francisco Osorio Integrated High School',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['GAS', 'TVL'],
    sector: 'Public',
    addressHint: 'Brgy. Osorio',
  },
  {
    id: 'tmcnhs-conchu-annex',
    schoolId: '307818',
    name: 'Trece Martires City National High School - Conchu Annex',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['GAS', 'TVL'],
    sector: 'Public',
    addressHint: 'Brgy. Conchu',
  },

  // ==========================================
  // PRIVATE SENIOR HIGH SCHOOLS (DepEd Recognized)
  // ==========================================
  {
    id: 'colegio-de-sta-rosa',
    schoolId: '402350',
    name: 'Colegio de Sta Rosa',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['ABM', 'STEM', 'HUMSS', 'GAS'],
    sector: 'Private',
  },
  {
    id: 'dei-gracia-academy',
    schoolId: '402352',
    name: 'Dei Gracia Academy, Inc.',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['GAS', 'STEM', 'ABM'],
    sector: 'Private',
  },
  {
    id: 'elim-christian-academy',
    schoolId: '402355',
    name: 'Elim Christian Academy, Inc.',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['GAS', 'STEM', 'ABM'],
    sector: 'Private',
  },
  {
    id: 'krislizz-international-academy',
    schoolId: '402361',
    name: 'Krislizz International Academy',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['GAS'],
    sector: 'Private',
  },
  {
    id: 'notre-dame-of-trece-martires',
    schoolId: '402363',
    name: 'Notre Dame of Trece Martires',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['STEM', 'GAS', 'TVL'],
    sector: 'Private',
  },
  {
    id: 'st-jude-parish-school',
    schoolId: '402365',
    name: 'St. Jude Parish School',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['ABM', 'STEM', 'HUMSS', 'GAS'],
    sector: 'Private',
  },
  {
    id: 'sto-nino-de-praga-academy',
    schoolId: '402366',
    name: 'Sto. Niño de Praga Academy of La Paz Homes II, Inc.',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['GAS', 'TVL'],
    sector: 'Private',
  },
  {
    id: 'amore-academy-of-tmc',
    schoolId: '424135',
    name: 'Amore Academy of TMC Cavite, Inc.',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['STEM', 'GAS', 'HUMSS', 'ABM', 'TVL'],
    sector: 'Private',
  },
  {
    id: 'lyceum-of-cavite-east',
    schoolId: '424136',
    name: 'Lyceum of Cavite-East',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['ABM', 'HUMSS', 'TVL'],
    sector: 'Private',
  },
  {
    id: 'saint-thomas-becket-academy',
    schoolId: '424230',
    name: 'Saint Thomas Becket Academy Inc.',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['ABM', 'GAS'],
    sector: 'Private',
  },
  {
    id: 'new-generation-international-school',
    schoolId: '424231',
    name: 'New Generation International School',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['STEM', 'ABM', 'HUMSS', 'GAS', 'TVL'],
    sector: 'Private',
  },
  {
    id: 'gateway-international-school',
    schoolId: '424241',
    name: 'Gateway International School of Science and Technology',
    region: 'Region IV-A (CALABARZON)',
    province: 'Cavite',
    municipality: 'Trece Martires City (Capital)',
    strands: ['GAS', 'HUMSS', 'STEM', 'ABM'],
    sector: 'Private',
  },
];

export const SHS_STATISTICS = {
  totalSchools: TRECE_SENIOR_HIGH_SCHOOLS.length,
  publicSchools: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.sector === 'Public')
    .length,
  privateSchools: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.sector === 'Private')
    .length,
  totalStrands: Object.keys(SHS_STRANDS).length,
  strandDistribution: {
    GAS: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.strands.includes('GAS'))
      .length,
    ABM: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.strands.includes('ABM'))
      .length,
    STEM: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.strands.includes('STEM'))
      .length,
    HUMSS: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.strands.includes('HUMSS'))
      .length,
    TVL: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.strands.includes('TVL'))
      .length,
  } as Record<ShsStrandCode, number>,
  allStrandsCount: TRECE_SENIOR_HIGH_SCHOOLS.filter(s => s.strands.length === 5)
    .length,
};
