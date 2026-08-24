export interface PsaClassification {
  code: string;
  name: string;
  acronym: string;
  category:
    | 'Geography'
    | 'Labor & Occupation'
    | 'Industry & Economy'
    | 'Products & Commodities'
    | 'Education'
    | 'Justice & Safety'
    | 'Tourism';
  description: string;
  purpose: string;
  baseUrl: string;
  apiDocsUrl: string;
  swaggerUrl: string;
  version: string;
  sampleEndpoint: string;
  sampleParams: Record<string, string>;
  icon: string;
  localApplication: string;
}

export interface BarangayPsgcData {
  psgcCode: string;
  name: string;
  historicalName: string;
  type: string;
  desc: string;
  captain?: string;
  population2015: number;
  population2020: number;
  growthRate: string;
  urbanRural: 'Urban' | 'Rural' | 'Suburban';
}

export const PSA_API_METADATA = {
  tokenRequestUrl: 'https://psa.gov.ph/classifications-api/request-access-form',
  swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
  architecture: 'Django REST Framework (DRF)',
  defaultVersion: 'Q2_2024 / Q3_2024',
  protocol: 'HTTPS (SSL/TLS Encrypted)',
  authMethod: 'URL Query Parameter (?token=[token])',
  maxPageSize: 1000,
  exampleProvinceCode: 21, // Cavite PSGC Province Code is 21 (formerly 28 in legacy lists)
  responseCodes: [
    {
      code: 200,
      status: 'OK',
      description: 'Request was successful and data payload is returned.',
    },
    {
      code: 400,
      status: 'Bad Request',
      description:
        'Invalid parameters, missing required token, or malformed query.',
    },
    {
      code: 404,
      status: 'Not Found',
      description:
        'Requested classification resource or version does not exist.',
    },
    {
      code: 500,
      status: 'Internal Server Error',
      description: 'Unexpected server-side issue occurred during processing.',
    },
  ],
};

export const PSA_CLASSIFICATIONS: PsaClassification[] = [
  {
    code: 'PSGC',
    acronym: 'PSGC',
    name: 'Philippine Standard Geographic Code',
    category: 'Geography',
    description:
      'Systematic classification and coding of geographic areas in the Philippines (Regions, Provinces, Cities/Municipalities, and Barangays).',
    purpose:
      'Serves as the national standard for identifying geographic units, geocoding datasets, and cross-referencing census and demographic statistics.',
    baseUrl: 'https://classification.psa.gov.ph/psgc',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/psgc',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/psgc/Q2_2024/barangays',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      prv: '21',
      page_size: '100',
    },
    icon: 'MapPin',
    localApplication:
      'Provides official PSGC codes for Trece Martires City (042122000) and its 13 constituent barangays under Cavite (Province 21) in Region IV-A (Region 04).',
  },
  {
    code: 'PSOC',
    acronym: 'PSOC',
    name: 'Philippine Standard Occupational Classification',
    category: 'Labor & Occupation',
    description:
      'Statistical classification of occupations and jobs practiced in the Philippine labor market, modeled after ISCO-08.',
    purpose:
      'Used for labor force surveys, employment profiling, job matching, wage benchmarking, and workforce development programs.',
    baseUrl: 'https://classification.psa.gov.ph/psoc',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/psoc',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/psoc/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '50',
    },
    icon: 'Briefcase',
    localApplication:
      'Standardizes job titles for Trece Martires Public Employment Service Office (PESO) registrations and local career matching.',
  },
  {
    code: 'PCOICOP',
    acronym: 'PCOICOP',
    name: 'Philippine Classification of Individual Consumption According to Purpose',
    category: 'Industry & Economy',
    description:
      'Classification of individual consumption expenditures incurred by households, non-profit institutions, and government.',
    purpose:
      'Forms the backbone of the Consumer Price Index (CPI), household budget analysis, inflation tracking, and poverty line assessments.',
    baseUrl: 'https://classification.psa.gov.ph/pcoicop',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/pcoicop',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/pcoicop/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '50',
    },
    icon: 'ShoppingCart',
    localApplication:
      'Guides local price monitoring for basic commodities and market goods across Trece Martires Public Market and retail corridors.',
  },
  {
    code: 'PSIC',
    acronym: 'PSIC',
    name: 'Philippine Standard Industrial Classification',
    category: 'Industry & Economy',
    description:
      'Detailed classification of all economic activities and industries in the country, aligned with ISIC Rev. 4.',
    purpose:
      'Essential for business permits and licensing (BPLO), industrial tax assessment, economic censuses, and investment profiling.',
    baseUrl: 'https://classification.psa.gov.ph/psic',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/psic',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/psic/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '100',
    },
    icon: 'Factory',
    localApplication:
      'Standardizes line-of-business categorization for Trece Martires Business Permits & Licensing Office (BPLO) permit renewals.',
  },
  {
    code: 'PCPC',
    acronym: 'PCPC',
    name: 'Philippine Central Product Classification',
    category: 'Products & Commodities',
    description:
      'Standard classification for all products comprising goods and services produced or consumed across sectors.',
    purpose:
      'Provides a consistent framework for national product accounts, input-output tables, domestic trade, and commodity flow statistics.',
    baseUrl: 'https://classification.psa.gov.ph/pcpc',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/pcpc',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/pcpc/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '50',
    },
    icon: 'Package',
    localApplication:
      'Categorizes agricultural products (coffee, crops), processed foods, and artisanal crafts originating from Cavite and Trece Martires.',
  },
  {
    code: 'PSCC',
    acronym: 'PSCC',
    name: 'Philippine Standard Commodity Classification',
    category: 'Products & Commodities',
    description:
      'Statistical classification for commodities entered into domestic and international trade, customized for customs and transport.',
    purpose:
      'Standardizes cargo tracking, trade statistics, tariff identification, and supply chain logistics.',
    baseUrl: 'https://classification.psa.gov.ph/pscc',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/pscc',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/pscc/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '50',
    },
    icon: 'Boxes',
    localApplication:
      'Supports freight, public transport depot tracking, and public market wholesale goods distribution.',
  },
  {
    code: 'PSCED',
    acronym: 'PSCED',
    name: 'Philippine Standard Classification of Education',
    category: 'Education',
    description:
      'Framework for organizing education programs and related qualifications by levels and fields of study, based on ISCED.',
    purpose:
      'Used by DepEd, CHED, and TESDA to classify learning levels, vocational certifications, and higher education degree programs.',
    baseUrl: 'https://classification.psa.gov.ph/psced',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/psced',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/psced/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '50',
    },
    icon: 'GraduationCap',
    localApplication:
      'Aligns Trece Martires City scholarship qualifications, Cavite State University (CvSU) Trece campus programs, and ALS tracks.',
  },
  {
    code: 'PSCCS',
    acronym: 'PSCCS',
    name: 'Philippine Standard Classification of Crime for Statistical Purposes',
    category: 'Justice & Safety',
    description:
      'Comprehensive statistical classification of criminal offenses for standard crime reporting, modeled on ICCS.',
    purpose:
      'Enables synchronized crime reporting across PNP, courts, prosecution, correctional agencies, and local peace and order councils.',
    baseUrl: 'https://classification.psa.gov.ph/psccs',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/psccs',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/psccs/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '50',
    },
    icon: 'ShieldAlert',
    localApplication:
      'Utilized by PNP Trece Martires Police Station and City Peace and Order Council for crime statistics and barangay blotter monitoring.',
  },
  {
    code: 'PTSCS',
    acronym: 'PTSCS',
    name: 'Philippine Tourism Statistical Classification System',
    category: 'Tourism',
    description:
      'Statistical classification system for tourism activities, visitor accommodations, attractions, and cultural heritage assets.',
    purpose:
      'Facilitates tourism satellite accounting, visitor tracking, local tourism development planning, and heritage preservation.',
    baseUrl: 'https://classification.psa.gov.ph/ptscs',
    apiDocsUrl: 'https://psa.gov.ph/classifications-api/ptscs',
    swaggerUrl: 'https://classification.psa.gov.ph/api/documentation',
    version: 'Q2_2024',
    sampleEndpoint: 'https://classification.psa.gov.ph/ptscs/Q2_2024/all',
    sampleParams: {
      token: '[YOUR_TOKEN]',
      page: '1',
      page_size: '50',
    },
    icon: 'Compass',
    localApplication:
      'Classifies historical sites dedicated to the 13 Martyrs of Cavite, local eco-parks, and hospitality services in the City of Trece Martires.',
  },
];

export const TRECE_MUNICIPAL_PROFILE = {
  cityName: 'Trece Martires City',
  officialTitle: 'City of Trece Martires (Capital of Cavite)',
  province: 'Cavite',
  region: 'Region IV-A (CALABARZON)',
  psgc10DigitCode: '0402122000',
  psgcCityCode: '0402122000',
  correspondenceCode: '042122000',
  psgcProvinceCode: '042100000',
  psgcRegionCode: '040000000',
  charterYear: 1954,
  republicAct: 'Republic Act No. 981',
  totalLandAreaKm2: 39.17,
  totalPopulation2024: 227892,
  totalPopulation2020: 210503,
  totalPopulation2015: 155713,
  populationGrowthRate: '6.20% per annum',
  totalBarangays: 13,
  cityClassification: 'Component City',
  incomeClass: '2nd Class',
};

export const TRECE_CITY_DEMOGRAPHICS = TRECE_MUNICIPAL_PROFILE;

export const TRECE_VOTER_STATISTICS_2025 = {
  electionName: 'May 12, 2025 National and Local Elections',
  sourceAgency:
    'Commission on Elections (COMELEC) - Election and Barangay Affairs Department (EBAD)',
  asOfDate: 'January 23, 2025',
  cityName: 'City of Trece Martires',
  provinceName: 'Cavite',
  regionName: 'Region IV-A (CALABARZON)',
  registeredVoters: 121194,
  establishedPrecincts: 783,
  clusteredPrecincts: 136,
  votingCenters: 20,
  caviteProvinceTotalVoters: 2447362,
  caviteProvinceVotingCenters: 467,
  caviteProvinceClusteredPrecincts: 2991,
  caviteProvinceEstablishedPrecincts: 15797,
};

export const TRECE_BARANGAYS_PSGC: BarangayPsgcData[] = [
  {
    psgcCode: '042122001',
    name: 'Aguado',
    historicalName: 'Named after Eugenio Cabezas / Crispulo Aguado',
    type: 'Residential & Community',
    desc: 'Dense residential subdivisions, community clinics, and youth education centers.',
    captain: 'Jaimer M. Sierra',
    population2015: 22120,
    population2020: 36248,
    growthRate: '+63.9%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122002',
    name: 'Cabuco',
    historicalName: 'Named after Feliciano Cabuco',
    type: 'Growing Urban Corridor',
    desc: 'Rapidly growing residential zones, transport terminals, and commercial centers.',
    captain: 'Mark Albert Montehermoso',
    population2015: 12890,
    population2020: 19412,
    growthRate: '+50.6%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122003',
    name: 'Conchu',
    historicalName: 'Named after Agapito Conchu',
    type: 'Agri-Residential Zone',
    desc: 'Green spaces, agricultural enterprises, and expanding housing developments.',
    captain: 'Irene R. Aure',
    population2015: 9745,
    population2020: 14230,
    growthRate: '+46.0%',
    urbanRural: 'Suburban',
  },
  {
    psgcCode: '042122004',
    name: 'De Ocampo',
    historicalName: 'Named after Francisco Ocampo',
    type: 'Commercial & Transport Hub',
    desc: 'High-density commercial avenue along Trece-Indang Road with banks and retailers.',
    captain: 'Nelson Lubigan Montehermoso',
    population2015: 11450,
    population2020: 14890,
    growthRate: '+30.0%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122005',
    name: 'Gregorio',
    historicalName: 'Named after Maximo Gregorio',
    type: 'Residential Community',
    desc: 'Peaceful residential neighborhoods with local primary schools and barangay hall.',
    captain: 'Eliseo C. Dela Luya',
    population2015: 6820,
    population2020: 8940,
    growthRate: '+31.1%',
    urbanRural: 'Suburban',
  },
  {
    psgcCode: '042122006',
    name: 'Hugo Perez',
    historicalName: 'Named after Hugo Perez',
    type: 'Major Urban & Enterprise Corridor',
    desc: 'Major population center with industrial parks, enterprise strips, and schools.',
    captain: 'Raymundo A. Villa',
    population2015: 34150,
    population2020: 48920,
    growthRate: '+43.2%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122007',
    name: 'Inocencio',
    historicalName: 'Named after Maximo Inocencio',
    type: 'Civic & Educational Hub',
    desc: 'Active civic center, school zones, and thriving local market stalls.',
    captain: 'Rosendo P. Dilidli',
    population2015: 16800,
    population2020: 21540,
    growthRate: '+28.2%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122008',
    name: 'Lallana',
    historicalName: 'Named after Antonio San Agustin / Lallana',
    type: 'Community & Livelihood',
    desc: 'Livelihood cooperatives, farming plots, and suburban residences.',
    captain: 'Cecilia M. Decillo',
    population2015: 5410,
    population2020: 7120,
    growthRate: '+31.6%',
    urbanRural: 'Suburban',
  },
  {
    psgcCode: '042122009',
    name: 'Lapidario',
    historicalName: 'Named after Severino Lapidario',
    type: 'Historic & Civic District',
    desc: 'Central historical district, community civic spaces, and public facilities.',
    captain: 'Remelyn D. Sierra',
    population2015: 8910,
    population2020: 10450,
    growthRate: '+17.3%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122010',
    name: 'Luciano',
    historicalName: 'Named after Victoriano Luciano',
    type: 'Institutional & Healthcare Hub',
    desc: 'Home of General Emilio Aguinaldo Memorial Hospital (GEAMH) and provincial annexes.',
    captain: 'Luisito R. Diloy',
    population2015: 12400,
    population2020: 16180,
    growthRate: '+30.5%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122011',
    name: 'Osorio',
    historicalName: 'Named after Francisco Osorio',
    type: 'Commercial & Transport Junction',
    desc: 'Key junction along Governor’s Drive with commercial centers and transport loops.',
    captain: 'Robert E. Penus',
    population2015: 6120,
    population2020: 8250,
    growthRate: '+34.8%',
    urbanRural: 'Urban',
  },
  {
    psgcCode: '042122012',
    name: 'Perez',
    historicalName: 'Named after Perez family / Martyrs (Cabezas)',
    type: 'Rural Health & Community',
    desc: 'Barangay health centers, community chapels, and active farmers cooperatives.',
    captain: 'Jaddy C. Alarca',
    population2015: 3950,
    population2020: 5125,
    growthRate: '+29.7%',
    urbanRural: 'Rural',
  },
  {
    psgcCode: '042122013',
    name: 'San Agustin (Poblacion)',
    historicalName: 'Seat of City Hall & Provincial Capitol',
    type: 'City Proper / Government Capitol',
    desc: 'The official seat of Trece Martires City Hall, Cavite Provincial Capitol, and courts.',
    captain: 'Cornelio L. De Sagun',
    population2015: 4948,
    population2020: 5490,
    growthRate: '+11.0%',
    urbanRural: 'Urban',
  },
];

export const SAMPLE_API_RESPONSES = {
  PSGC_SAMPLE: {
    results: {
      psgc_data: [
        {
          psgc_code: '042122000',
          area_name: 'City of Trece Martires',
          correspondence_code: '042122000',
          geographic_level: 'City',
          reg: 4,
          prv: 21,
          mun: 22,
          bgy: 0,
          old_name: 'Quintana',
          city_class: 'CC',
          income_classification: '1st Class',
          urban_rural: 'Urban',
          island_region: 'Luzon',
          status: 'Active',
          version: 'Q2_2024',
          population_data: [
            {
              code: '042122000',
              population: '155,713',
              year: 2015,
            },
            {
              code: '042122000',
              population: '210,503',
              year: 2020,
            },
          ],
        },
      ],
    },
  },
};
