/**
 * DPWH Infrastructure Transparency Data — City of Trece Martires, Cavite
 * Under the jurisdiction of DPWH Cavite 1st District Engineering Office (Trece Martires City)
 */

export interface DpwhLocation {
  province: string;
  region: string;
  cityMunicipality: string;
  barangay: string;
}

export interface DpwhProject {
  contractId: string;
  description: string;
  category: string;
  componentCategories: string;
  status: 'Completed' | 'On-Going' | 'Terminated' | 'Procurement' | string;
  budget: number;
  amountPaid: number;
  progress: number;
  location: DpwhLocation;
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

export interface DpwhSummaryStats {
  totalProjects: number;
  totalBudget: number;
  totalPaid: number;
  avgProgress: number;
  completedCount: number;
  ongoingCount: number;
  terminatedCount: number;
}

/**
 * Curated DPWH Infrastructure Projects for Trece Martires City (Cavite 1st DEO)
 */
export const TRECE_DPWH_PROJECTS: DpwhProject[] = [
  {
    contractId: '24DF0142',
    description:
      'CONSTRUCTION OF MULTI-PURPOSE BUILDING (CITY CONVENTION & EVACUATION CENTER), BARANGAY SAN AGUSTIN, TRECE MARTIRES CITY, CAVITE',
    category: 'Buildings and Facilities',
    componentCategories: 'Buildings and Facilities',
    status: 'On-Going',
    budget: 49500000.0,
    amountPaid: 24750000.0,
    progress: 68.5,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'San Agustin (Poblacion)',
    },
    contractor: 'TRICOM CONSTRUCTION AND SUPPLIES CORP. (41890)',
    startDate: '2024-03-15',
    completionDate: '2025-06-30',
    infraYear: '2024',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2024 CSSP',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2811,
    longitude: 120.8672,
    reportCount: 2,
    hasSatelliteImage: true,
  },
  {
    contractId: '24DF0089',
    description:
      'ASSET PRESERVATION PROGRAM - REHABILITATION / RECONSTRUCTION OF ROADS WITH SLIPS, SLOPE COLLAPSE ALONG TRECE MARTIRES - INDANG ROAD (S01948LZ), TRECE MARTIRES CITY, CAVITE',
    category: 'Roads',
    componentCategories: 'Roads',
    status: 'Completed',
    budget: 38220000.0,
    amountPaid: 38220000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'De Ocampo',
    },
    contractor: 'ST. TIMOTHY CONSTRUCTION CORPORATION (35891)',
    startDate: '2024-02-10',
    completionDate: '2024-10-28',
    infraYear: '2024',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2024 OO-1',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2694,
    longitude: 120.8715,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '23DF0215',
    description:
      "NETWORK DEVELOPMENT PROGRAM - ROAD WIDENING - SECONDARY ROADS, GOVERNOR'S DRIVE (S01947LZ) - K0044+200 - K0046+500, BARANGAY HUGO PEREZ TO CABUCO, TRECE MARTIRES CITY",
    category: 'Roads',
    componentCategories: 'Roads',
    status: 'Completed',
    budget: 77200000.0,
    amountPaid: 77200000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Hugo Perez',
    },
    contractor: 'E.R. VENZON CONSTRUCTION (18293)',
    startDate: '2023-04-18',
    completionDate: '2023-12-15',
    infraYear: '2023',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2023 OO-1',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2952,
    longitude: 120.8841,
    reportCount: 1,
    hasSatelliteImage: true,
  },
  {
    contractId: '24DF0038',
    description:
      'FLOOD MANAGEMENT PROGRAM - CONSTRUCTION OF DRAINAGE STRUCTURES AND SLOPE PROTECTION ALONG RIO GRANDE RIVER BASIN, BARANGAY AGUADO, TRECE MARTIRES CITY, CAVITE',
    category: 'Flood Control and Drainage',
    componentCategories: 'Flood Control and Drainage',
    status: 'On-Going',
    budget: 57900000.0,
    amountPaid: 32000000.0,
    progress: 74.2,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Aguado',
    },
    contractor: 'R.V. RIETA TRADING & GENERAL CONSTRUCTION (27491)',
    startDate: '2024-04-02',
    completionDate: '2025-05-18',
    infraYear: '2024',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2024 OO-2',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2541,
    longitude: 120.8523,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '23DF0112',
    description:
      'BASIC INFRASTRUCTURE PROGRAM (BIP) - CONCRETING OF FARM-TO-MARKET ACCESS ROAD, BARANGAY CONCHU TO LALLANA, TRECE MARTIRES CITY, CAVITE',
    category: 'Roads',
    componentCategories: 'Roads',
    status: 'Completed',
    budget: 19800000.0,
    amountPaid: 19800000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Conchu',
    },
    contractor: 'J.M. MALABANAN CONSTRUCTION & SUPPLY (39201)',
    startDate: '2023-03-01',
    completionDate: '2023-09-14',
    infraYear: '2023',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2023 CSSP',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2889,
    longitude: 120.8992,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '22DF0078',
    description:
      'CONSTRUCTION OF MULTI-PURPOSE HEALTH CLINIC AND DIAGNOSTIC CENTER, BARANGAY INOCENCIO, TRECE MARTIRES CITY, CAVITE',
    category: 'Buildings and Facilities',
    componentCategories: 'Buildings and Facilities',
    status: 'Completed',
    budget: 14850000.0,
    amountPaid: 14850000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Inocencio',
    },
    contractor: 'ALPHA & OMEGA GEN. CONTRACTOR & DEVELOPMENT CORP. (38958)',
    startDate: '2022-05-11',
    completionDate: '2022-12-20',
    infraYear: '2022',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2022 LP',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2758,
    longitude: 120.8785,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '24DF0201',
    description:
      'ASSET PRESERVATION - PREVENTIVE MAINTENANCE ALONG TEJERO - GENERAL TRIAS - TRECE MARTIRES ROAD (S01946LZ) K0038+000 - K0040+100, BARANGAY LAPIDARIO',
    category: 'Roads',
    componentCategories: 'Roads',
    status: 'On-Going',
    budget: 48250000.0,
    amountPaid: 12000000.0,
    progress: 42.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Lapidario',
    },
    contractor: 'READYCON TRADING & CONSTRUCTION CORP. (15452)',
    startDate: '2024-08-01',
    completionDate: '2025-04-30',
    infraYear: '2024',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2024 OO-1',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2834,
    longitude: 120.8612,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '22DF0184',
    description:
      'CONSTRUCTION OF SOLAR-POWERED POTABLE WATER SYSTEM AND FILTRATION FACILITY, BARANGAY PEREZ & GREGORIO, TRECE MARTIRES CITY',
    category: 'Water Provision and Storage',
    componentCategories: 'Water Provision and Storage',
    status: 'Completed',
    budget: 9900000.0,
    amountPaid: 9900000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Perez',
    },
    contractor: 'HYDROTECH BUILDERS & ENTERPRISES (46201)',
    startDate: '2022-07-15',
    completionDate: '2023-01-28',
    infraYear: '2022',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2022 LP',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2625,
    longitude: 120.8911,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '23DF0177',
    description:
      'REHABILITATION OF DRAINAGE AND FLOOD MITIGATION STRUCTURES ALONG ILANG-ILANG RIVER, BARANGAY OSORIO, TRECE MARTIRES CITY, CAVITE',
    category: 'Flood Control and Drainage',
    componentCategories: 'Flood Control and Drainage',
    status: 'Completed',
    budget: 28500000.0,
    amountPaid: 28500000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Osorio',
    },
    contractor: 'R.V. RIETA TRADING & GENERAL CONSTRUCTION (27491)',
    startDate: '2023-05-10',
    completionDate: '2023-11-20',
    infraYear: '2023',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2023 OO-2',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2721,
    longitude: 120.8544,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '24DF0065',
    description:
      'ASSET PRESERVATION - ROAD IMPROVEMENT AND REHABILITATION ALONG PROVINCIAL CAPITOL ACCESS ROAD, BARANGAY LUCIANO, TRECE MARTIRES CITY',
    category: 'Roads',
    componentCategories: 'Roads',
    status: 'Completed',
    budget: 18450000.0,
    amountPaid: 18450000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Luciano',
    },
    contractor: 'ST. TIMOTHY CONSTRUCTION CORPORATION (35891)',
    startDate: '2024-01-20',
    completionDate: '2024-06-18',
    infraYear: '2024',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2024 OO-1',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2789,
    longitude: 120.8745,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '23DF0098',
    description:
      'CONSTRUCTION OF MULTI-PURPOSE COMMUNITY FACILITY AND DISASTER COMMAND CENTER, BARANGAY CABUCO, TRECE MARTIRES CITY',
    category: 'Buildings and Facilities',
    componentCategories: 'Buildings and Facilities',
    status: 'Completed',
    budget: 12500000.0,
    amountPaid: 12500000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Cabuco',
    },
    contractor: 'J.M. MALABANAN CONSTRUCTION & SUPPLY (39201)',
    startDate: '2023-02-15',
    completionDate: '2023-08-10',
    infraYear: '2023',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2023 CSSP',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2655,
    longitude: 120.8832,
    reportCount: 0,
    hasSatelliteImage: true,
  },
  {
    contractId: '22DF0155',
    description:
      'CONCRETING OF ACCESS ROAD AND INSTALLATION OF SOLAR STREET LIGHTING, BARANGAY GREGORIO TO LALLANA, TRECE MARTIRES CITY',
    category: 'Roads',
    componentCategories: 'Roads',
    status: 'Completed',
    budget: 9750000.0,
    amountPaid: 9750000.0,
    progress: 100.0,
    location: {
      province: 'Cavite 1st DEO',
      region: 'Region IV-A',
      cityMunicipality: 'Trece Martires City',
      barangay: 'Gregorio',
    },
    contractor: 'TRICOM CONSTRUCTION AND SUPPLIES CORP. (41890)',
    startDate: '2022-06-05',
    completionDate: '2022-11-15',
    infraYear: '2022',
    programName: 'Regular Infra',
    sourceOfFunds: 'Regular Infra - GAA 2022 LP',
    isLive: false,
    livestreamUrl: null,
    livestreamVideoId: null,
    livestreamDetectedAt: null,
    latitude: 14.2582,
    longitude: 120.8694,
    reportCount: 0,
    hasSatelliteImage: true,
  },
];

export const ALL_DPWH_PROJECTS: DpwhProject[] = TRECE_DPWH_PROJECTS;

export function getDpwhSummaryStats(projects: DpwhProject[]): DpwhSummaryStats {
  let totalBudget = 0;
  let totalPaid = 0;
  let progressSum = 0;
  let completedCount = 0;
  let ongoingCount = 0;
  let terminatedCount = 0;

  projects.forEach(p => {
    const budget = p.budget || 0;
    const paid = p.amountPaid || 0;
    totalBudget += budget;
    totalPaid += paid;
    progressSum += p.progress || 0;

    const statusNorm = p.status.toLowerCase();
    if (statusNorm.includes('complete')) completedCount++;
    else if (statusNorm.includes('on-going') || statusNorm.includes('ongoing'))
      ongoingCount++;
    else if (statusNorm.includes('terminate')) terminatedCount++;
  });

  const count = projects.length || 1;

  return {
    totalProjects: projects.length,
    totalBudget,
    totalPaid,
    avgProgress: Math.round((progressSum / count) * 10) / 10,
    completedCount,
    ongoingCount,
    terminatedCount,
  };
}

export const DPWH_CATEGORIES = [
  'All Categories',
  'Roads',
  'Buildings and Facilities',
  'Flood Control and Drainage',
  'Water Provision and Storage',
];

export const DPWH_STATUSES = [
  'All Statuses',
  'Completed',
  'On-Going',
  'Terminated',
];

export const DPWH_YEARS = ['All Years', '2024', '2023', '2022'];

export const TRECE_BARANGAYS_FILTER = [
  'All 13 Barangays',
  'San Agustin (Poblacion)',
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
