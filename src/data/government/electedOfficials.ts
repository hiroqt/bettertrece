export interface ElectedOfficial {
  level: 'City' | 'Barangay';
  position: string;
  name: string;
  roleType: 'Executive' | 'Legislative' | 'Ex-Officio' | 'Barangay';
  term: string;
  lastVerified: string;
  barangay?: string;
  notes?: string;
}

export interface BarangayCaptainInfo {
  number: number;
  barangay: string;
  captain: string;
  term: string;
  lastVerified: string;
  psgcCode?: string;
}

export const OFFICIALS_METADATA = {
  city: 'City of Trece Martires',
  province: 'Cavite',
  region: 'Region IV-A (CALABARZON)',
  term: '2023–2026',
  lastVerified: '2026-08-24',
  source: 'Trece Martires City Government Official Directory',
};

export const CITY_EXECUTIVE_OFFICIALS: ElectedOfficial[] = [
  {
    level: 'City',
    position: 'City Mayor',
    name: 'Hon. Gemma Buendia-Lubigan',
    roleType: 'Executive',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    notes: 'Chief Executive Officer of the City of Trece Martires',
  },
  {
    level: 'City',
    position: 'City Vice Mayor',
    name: 'Hon. Romeo Bobby Montehermoso Jr.',
    roleType: 'Executive',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    notes: 'Presiding Officer of the Sangguniang Panlungsod',
  },
];

export const CITY_COUNCILORS: ElectedOfficial[] = [
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Joyce Mojica Baking',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Tracy Anacan',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Kim Paolo Lubigan',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Anne Jomille Humarang',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Jay-Em Cunanan',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Antonio Lontoc',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Elmo Trinidad',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Budoy Vidallon',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Poyi Buendia',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'City Councilor',
    name: 'Sting Montehermoso',
    roleType: 'Legislative',
    term: '2023–2026',
    lastVerified: '2026-08-24',
  },
  {
    level: 'City',
    position: 'ABC President',
    name: 'Hon. Mark Albert Montehermoso',
    roleType: 'Ex-Officio',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    notes: 'President, Liga ng mga Barangay (Ex-Officio Member)',
  },
  {
    level: 'City',
    position: 'SK Federation President',
    name: 'Hon. John Allyson Sepacio',
    roleType: 'Ex-Officio',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    notes: 'President, Sangguniang Kabataan Federation (Ex-Officio Member)',
  },
];

export const BARANGAY_CAPTAINS: BarangayCaptainInfo[] = [
  {
    number: 1,
    barangay: 'Aguado',
    captain: 'Jaimer M. Sierra',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122001',
  },
  {
    number: 2,
    barangay: 'Cabezas',
    captain: 'Jaddy C. Alarca',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122001',
  },
  {
    number: 3,
    barangay: 'Cabuco',
    captain: 'Mark Albert Montehermoso',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122002',
  },
  {
    number: 4,
    barangay: 'Conchu',
    captain: 'Irene R. Aure',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122003',
  },
  {
    number: 5,
    barangay: 'De Ocampo',
    captain: 'Nelson Lubigan Montehermoso',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122004',
  },
  {
    number: 6,
    barangay: 'Gregorio',
    captain: 'Eliseo C. Dela Luya',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122005',
  },
  {
    number: 7,
    barangay: 'Hugo Perez',
    captain: 'Raymundo A. Villa',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122006',
  },
  {
    number: 8,
    barangay: 'Inocencio',
    captain: 'Rosendo P. Dilidli',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122007',
  },
  {
    number: 9,
    barangay: 'Lallana',
    captain: 'Cecilia M. Decillo',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122008',
  },
  {
    number: 10,
    barangay: 'Lapidario',
    captain: 'Remelyn D. Sierra',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122009',
  },
  {
    number: 11,
    barangay: 'Luciano',
    captain: 'Luisito R. Diloy',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122010',
  },
  {
    number: 12,
    barangay: 'Osorio',
    captain: 'Robert E. Penus',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122011',
  },
  {
    number: 13,
    barangay: 'San Agustin',
    captain: 'Cornelio L. De Sagun',
    term: '2023–2026',
    lastVerified: '2026-08-24',
    psgcCode: '042122013',
  },
];

export const CITY_GOVERNMENT_HIERARCHY = {
  city: 'Trece Martires City',
  term: '2023–2026',
  lastVerified: '2026-08-24',
  mayor: 'Hon. Gemma Buendia-Lubigan',
  viceMayor: 'Hon. Romeo Bobby Montehermoso Jr.',
  sangguniangPanlungsod: {
    presidingOfficer: 'Hon. Romeo Bobby Montehermoso Jr. (Vice Mayor)',
    councilors: [
      'Joyce Mojica Baking',
      'Tracy Anacan',
      'Kim Paolo Lubigan',
      'Anne Jomille Humarang',
      'Jay-Em Cunanan',
      'Antonio Lontoc',
      'Elmo Trinidad',
      'Budoy Vidallon',
      'Poyi Buendia',
      'Sting Montehermoso',
    ],
    abcPresident: 'Mark Albert Montehermoso',
    skFederationPresident: 'John Allyson Sepacio',
  },
  barangays: BARANGAY_CAPTAINS,
};
