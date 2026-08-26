import type {
  PsccsRecord,
  PsccsSectionMeta,
  TreceEmergencyHotline,
} from '../types/psccs';

export const PSA_PSCCS_BASE_URL = 'https://classification.psa.gov.ph/psccs';
const CACHE_KEY_PREFIX = 'bettertrece_psccs_cache_';
const DEFAULT_CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours

export const PSA_PSCCS_VERSIONS = [
  {
    id: '2018',
    name: '2018 (Official National Standard)',
    description:
      'First Edition of the Philippine Standard Classification of Crime for Statistical Purposes, patterned after UNODC ICCS v1.0.',
    isLatest: true,
  },
];

export const TRECE_EMERGENCY_HOTLINES: TreceEmergencyHotline[] = [
  {
    name: 'PNP Trece Martires Component City Police Station',
    agency: 'Philippine National Police (PNP)',
    landline: '(046) 419-0199',
    mobile: '0998-598-5638 / 0917-814-7228',
    location: 'City Government Center, Brgy. San Agustin, Trece Martires City',
    services:
      'Police blotter, 24/7 patrol response, criminal investigation, emergency dispatch',
  },
  {
    name: 'Trece Martires City Disaster Risk Reduction & Management Office (CDRRMO)',
    agency: 'City Government of Trece Martires',
    landline: '(046) 419-1234',
    mobile: '0917-848-7323',
    location: 'Rescue Operations Hub, Brgy. Luciano, Trece Martires City',
    services:
      'Ambulance dispatch, vehicular accident rescue, typhoon & disaster response',
  },
  {
    name: 'Bureau of Fire Protection (BFP) Trece Martires City',
    agency: 'BFP Region IV-A',
    landline: '(046) 419-0299',
    mobile: '0915-602-2374',
    location: 'Governor’s Drive, Brgy. San Agustin, Trece Martires City',
    services: 'Fire suppression, emergency rescue, fire safety inspections',
  },
  {
    name: 'PNP Women and Children Protection Center (WCPC) / VAWC Helpdesk',
    agency: 'PNP Trece Martires & City Social Welfare (CSWD)',
    landline: '(046) 419-2468',
    mobile: '0917-889-8292',
    location: 'PNP Station / 13 Barangay Halls in Trece Martires',
    services:
      'Confidential reporting of domestic abuse, child protection, BPO/TPO assistance',
  },
  {
    name: 'PNP Anti-Cybercrime Group (ACG) Cavite Provincial Field Unit',
    agency: 'PNP ACG Region IV-A',
    landline: '(046) 431-0199',
    mobile: '0998-598-8120',
    location: 'Camp General Mariano Castañeda / Provincial Police Office',
    services:
      'Online scamming, digital fraud, cyber libel, unauthorized digital withdrawals',
  },
];

export const PSA_PSCCS_SECTIONS: PsccsSectionMeta[] = [
  {
    code: '01',
    title: 'Acts leading to death or intending to cause death',
    shortTitle: 'Offenses Against Life',
    description:
      'Homicide, murder, parricide, infanticide, manslaughter, and attempts or conspiracies leading to loss of human life.',
    divisionCount: 4,
    treceApplication:
      'Investigated immediately by the PNP Trece Martires Criminal Investigation Section & Cavite Provincial Forensic Unit.',
    primaryResponder: 'PNP Trece Martires Station',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    keyOffenses: [
      'Murder',
      'Homicide',
      'Parricide',
      'Infanticide',
      'Reckless Imprudence with Homicide',
    ],
  },
  {
    code: '02',
    title: 'Acts leading to harm or intending to cause harm to the person',
    shortTitle: 'Physical Harm & Domestic Abuse (VAWC)',
    description:
      'Physical assault, serious and slight physical injuries, harassment, threat, domestic violence (RA 9262), and child abuse (RA 7610).',
    divisionCount: 7,
    treceApplication:
      'Reportable at all 13 Barangay VAWC Desks for Barangay Protection Orders (BPO) and immediate PNP police intervention.',
    primaryResponder: 'Barangay VAWC Desk / PNP Station',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    keyOffenses: [
      'Domestic Abuse (RA 9262)',
      'Physical Injuries',
      'Child Abuse (RA 7610)',
      'Grave Threats',
      'Physical Assault',
    ],
  },
  {
    code: '03',
    title: 'Injurious acts of a sexual nature',
    shortTitle: 'Sexual Offenses & Harassment',
    description:
      'Rape, sexual assault, statutory sexual offenses, sexual harassment (RA 7877 / RA 11313 Safe Spaces Act), and acts of lasciviousness.',
    divisionCount: 5,
    treceApplication:
      'Handled strictly under confidential protocols by the PNP Women & Children Protection Center and CSWDO Trece Martires.',
    primaryResponder: 'PNP Women & Children Protection Desk',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    keyOffenses: [
      'Rape',
      'Safe Spaces Act (RA 11313)',
      'Acts of Lasciviousness',
      'Sexual Harassment',
      'Online Sexual Exploitation',
    ],
  },
  {
    code: '04',
    title:
      'Acts against property involving violence or threat against a person',
    shortTitle: 'Robbery & Extortion',
    description:
      'Robbery with violence, armed robbery, carjacking, motornapping, extortion, blackmail, and hijacking of vehicles.',
    divisionCount: 4,
    treceApplication:
      'Monitored by PNP Mobile Patrol along Governor’s Drive, Trece-Indang Road, and commercial centers (WalterMart, SM Trece).',
    primaryResponder: 'PNP Trece Martires Patrol Division',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    keyOffenses: [
      'Robbery with Force/Intimidation',
      'Motornapping',
      'Highway Extortion',
      'Carjacking',
      'Snatching with Violence',
    ],
  },
  {
    code: '05',
    title: 'Acts against property only',
    shortTitle: 'Theft, Swindling & Property Damage',
    description:
      'Theft, burglary, swindling (estafa), intellectual property theft, property damage, and unlawful entry.',
    divisionCount: 6,
    treceApplication:
      'Minor disputes under ₱50,000 undergo mandatory mediation at the Barangay Lupon Tagapamayapa before court filing.',
    primaryResponder: 'Barangay Lupon Tagapamayapa (KP) / PNP',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    keyOffenses: [
      'Theft / Shoplifting',
      'Estafa / Swindling',
      'Malicious Mischief',
      'Unlawful Trespass',
      'Property Damage',
    ],
  },
  {
    code: '06',
    title: 'Acts involving controlled psychoactive substances or other drugs',
    shortTitle: 'Illegal Drugs Offenses (RA 9165)',
    description:
      'Possession, manufacturing, distribution, sale, trafficking, and use of illegal substances under the Comprehensive Dangerous Drugs Act.',
    divisionCount: 5,
    treceApplication:
      'Addressed by the Trece Martires City Anti-Drug Abuse Council (CADAC), Barangay BADACs, and community rehab programs.',
    primaryResponder: 'City Anti-Drug Council (CADAC) / PNP DEU',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    keyOffenses: [
      'Illegal Drug Possession',
      'Drug Trafficking / Sale',
      'Drug Cultivation',
      'Community-Based Drug Rehabilitation',
    ],
  },
  {
    code: '07',
    title: 'Acts involving fraud, deception or corruption',
    shortTitle: 'Online Scams, Fraud & Cybercrime',
    description:
      'Online financial fraud, GCash/bank account scams, identity theft, fake commercial transactions, bribery, and corruption.',
    divisionCount: 6,
    treceApplication:
      'Assisted by the PNP Anti-Cybercrime Group (ACG) Cavite Field Unit and Trece Martires BPLO for business consumer fraud.',
    primaryResponder: 'PNP Anti-Cybercrime Group (ACG)',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    keyOffenses: [
      'GCash / Bank Account Phishing',
      'Online Selling Scams',
      'Identity Theft',
      'Forged Documents / Falsification',
      'Bribery',
    ],
  },
  {
    code: '08',
    title: 'Acts against public order, authority and state security',
    shortTitle: 'Public Order & Neighborhood Peace',
    description:
      'Alarm and scandal, public disturbance, curfew violations, resistance to authority, illegal gambling, and neighborhood altercations.',
    divisionCount: 8,
    treceApplication:
      'Enforced locally by 13 Barangay Tanods, Sangguniang Kabataan curfews, and PNP Community Relations officers.',
    primaryResponder: '13 Barangay Tanods / PNP',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    keyOffenses: [
      'Alarm and Scandal',
      'Illegal Gambling (Jueteng/Tupada)',
      'Resisting Persons in Authority',
      'Public Drunkenness',
      'Curfew Violations',
    ],
  },
  {
    code: '09',
    title: 'Acts against public safety and state security',
    shortTitle: 'Traffic Accidents & Illegal Firearms',
    description:
      'Reckless imprudence resulting in damage or injury, hit-and-run, illegal possession of firearms (RA 10591), and explosive offenses.',
    divisionCount: 5,
    treceApplication:
      'Handled by Trece Traffic Management Office (TTMO), CDRRMO for vehicular rescue, and PNP for firearms verification.',
    primaryResponder: 'Trece Traffic Management / CDRRMO / PNP',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    keyOffenses: [
      'Vehicular Collisions / Reckless Driving',
      'Illegal Possession of Firearms (RA 10591)',
      'Hit and Run',
      'DUI / Drunk Driving',
    ],
  },
  {
    code: '10',
    title: 'Acts against the natural environment',
    shortTitle: 'Environmental & Waste Violations',
    description:
      'Illegal waste dumping, open burning, water pollution, illegal tree cutting, and violations of Republic Act 9003 (Ecological Solid Waste Management).',
    divisionCount: 4,
    treceApplication:
      'Enforced by the City Environment & Natural Resources Office (CENRO) Trece Martires and Barangay Solid Waste Committees.',
    primaryResponder: 'CENRO Trece Martires / Barangay Green Police',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    keyOffenses: [
      'Illegal Garbage Dumping',
      'Open Burning (Siga)',
      'River / Creek Pollution',
      'Illegal Tree Cutting in Public Land',
    ],
  },
  {
    code: '11',
    title: 'Other criminal acts not elsewhere classified',
    shortTitle: 'Local Municipal Ordinances',
    description:
      'Violations of Trece Martires City ordinances, unclassified administrative offenses, business permit non-compliance, and minor municipal infractions.',
    divisionCount: 3,
    treceApplication:
      'Enforced by the Trece Martires City Public Order and Safety Office and Barangay Enforcers.',
    primaryResponder: 'City Public Safety & BPLO',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    keyOffenses: [
      'Excessive Karaoke / Noise after 10 PM',
      'Obstruction of Sidewalks',
      'Operating without Mayor’s Permit',
      'Stray Animal Violations',
    ],
  },
];

/**
 * Authoritative Curated Baseline Records for Trece Martires City (PSCCS 2018)
 */
export function getAuthoritativePsccsBaseline(): PsccsRecord[] {
  return [
    {
      id: 47,
      sectioncode: '01',
      section_title: 'Acts leading to death or intending to cause death',
      divisioncode: '0101',
      division_title: 'Homicide, Murder and Parricide',
      version: '2018',
      reportingOffice: 'PNP Trece Martires Police Station',
      applicableLaws: ['Revised Penal Code (Articles 246, 248, 249)'],
      treceLocalContext:
        'Immediate police dispatch through PNP Trece Martires 24/7 hotline ((046) 419-0199). Supported by Cavite Provincial Forensic Unit.',
      citizenActionGuide:
        'Immediately dial 911 or PNP Trece Martires (0998-598-5638). Preserve the crime scene and do not touch any physical evidence.',
      jurisdictionType: 'Direct Police Report & Investigation',
      commonExamples: [
        'Murder',
        'Homicide',
        'Parricide',
        'Reckless Imprudence resulting in Homicide',
      ],
    },
    {
      id: 273,
      sectioncode: '02',
      section_title:
        'Acts leading to harm or intending to cause harm to the person',
      divisioncode: '0201',
      division_title: 'Assault and Bodily Harm',
      version: '2018',
      reportingOffice: 'Barangay VAWC Desk',
      applicableLaws: [
        'RA 9262 (Anti-Violence Against Women and Their Children Act)',
        'RA 7610 (Special Protection of Children Against Abuse)',
        'Revised Penal Code (Articles 263, 265, 266)',
      ],
      treceLocalContext:
        'Active VAWC desks located in all 13 Barangay Halls of Trece Martires City. Barangay Captains can issue Barangay Protection Orders (BPO) valid for 15 days.',
      citizenActionGuide:
        'Victims of domestic abuse can immediately seek shelter and request a Barangay Protection Order (BPO) at the nearest Barangay Hall or visit PNP WCPC.',
      jurisdictionType: 'Special Protection & Social Welfare',
      commonExamples: [
        'Physical Abuse / Battery',
        'Emotional & Psychological Harm',
        'Child Maltreatment',
        'Slight/Serious Physical Injuries',
      ],
    },
    {
      id: 310,
      sectioncode: '03',
      section_title: 'Injurious acts of a sexual nature',
      divisioncode: '0301',
      division_title: 'Sexual Assault and Harassment',
      version: '2018',
      reportingOffice: 'PNP Trece Martires Police Station',
      applicableLaws: [
        'RA 8353 (Anti-Rape Law)',
        'RA 11313 (Safe Spaces Act / Bawal Bastos Law)',
        'RA 7877 (Anti-Sexual Harassment Act)',
      ],
      treceLocalContext:
        'Protected by confidential protocols at the Trece Martires PNP Women & Children Protection Desk and City Social Welfare Office (CSWDO).',
      citizenActionGuide:
        'Proceed directly to the PNP WCPC or General Emilio Aguinaldo Memorial Hospital (GEAMH) for confidential medico-legal examination and legal assistance.',
      jurisdictionType: 'Direct Police Report & Investigation',
      commonExamples: [
        'Rape',
        'Public Catcalling / Harassment (RA 11313)',
        'Acts of Lasciviousness',
        'Workplace / Campus Harassment',
      ],
    },
    {
      id: 410,
      sectioncode: '04',
      section_title:
        'Acts against property involving violence or threat against a person',
      divisioncode: '0401',
      division_title: 'Robbery and Extortion',
      version: '2018',
      reportingOffice: 'PNP Trece Martires Police Station',
      applicableLaws: ['Revised Penal Code (Articles 293, 294, 299)'],
      treceLocalContext:
        'Frequent mobile checkpoints and police patrol along Governor’s Drive, Trece-Indang Road, and high-density commercial strips.',
      citizenActionGuide:
        'File an official Police Blotter report immediately at the PNP Station located at the City Government Center, Brgy. San Agustin.',
      jurisdictionType: 'Direct Police Report & Investigation',
      commonExamples: [
        'Armed Robbery',
        'Motornapping / Carjacking with Intimidation',
        'Snatching with Violence',
        'Extortion / Blackmail',
      ],
    },
    {
      id: 480,
      sectioncode: '05',
      section_title: 'Acts against property only',
      divisioncode: '0501',
      division_title: 'Theft, Burglary and Swindling',
      version: '2018',
      reportingOffice: 'Barangay Lupon Tagapamayapa (KP)',
      applicableLaws: [
        'Local Government Code of 1991 (RA 7160 - Katarungang Pambarangay)',
        'Revised Penal Code (Articles 308, 315)',
      ],
      treceLocalContext:
        'For neighborhood theft or minor property damages under ₱50,000 where parties reside in the same barangay or city, cases are mediated first by the Barangay Lupon.',
      citizenActionGuide:
        'File a complaint before the Barangay Captain / Lupon Tagapamayapa for amicable settlement before seeking a Certificate to File Action for court.',
      jurisdictionType: 'Barangay Mediation (Lupon)',
      commonExamples: [
        'Petty Theft',
        'Estafa / Financial Swindling',
        'Property Boundary Disputes',
        'Malicious Mischief / Damage to Property',
      ],
    },
    {
      id: 560,
      sectioncode: '06',
      section_title:
        'Acts involving controlled psychoactive substances or other drugs',
      divisioncode: '0601',
      division_title: 'Dangerous Drugs Violations',
      version: '2018',
      reportingOffice: 'PNP Trece Martires Police Station',
      applicableLaws: ['RA 9165 (Comprehensive Dangerous Drugs Act of 2002)'],
      treceLocalContext:
        'Trece Martires City Anti-Drug Abuse Council (CADAC) conducts community-based drug rehabilitation (CBDR) programs across all 13 barangays.',
      citizenActionGuide:
        'For confidential reporting or voluntary rehabilitation enrollment, contact CADAC Trece Martires at the City Health Office / CSWDO.',
      jurisdictionType: 'Direct Police Report & Investigation',
      commonExamples: [
        'Illegal Drug Possession',
        'Drug Peddling / Distribution',
        'Community-Based Drug Rehabilitation',
      ],
    },
    {
      id: 620,
      sectioncode: '07',
      section_title: 'Acts involving fraud, deception or corruption',
      divisioncode: '0701',
      division_title: 'Digital Fraud, Cybercrime and Deception',
      version: '2018',
      reportingOffice: 'PNP Anti-Cybercrime Group (Cavite)',
      applicableLaws: [
        'RA 10175 (Cybercrime Prevention Act of 2012)',
        'RA 8484 (Access Devices Regulation Act)',
      ],
      treceLocalContext:
        'Residents who fall victim to GCash phishing, online selling scams, or unauthorized bank access can file reports with the PNP ACG Cavite Unit.',
      citizenActionGuide:
        'Take screenshots of fraudulent transaction references, bank text alerts, and chat messages. Report immediately to your bank/e-wallet and PNP ACG.',
      jurisdictionType: 'Direct Police Report & Investigation',
      commonExamples: [
        'GCash / Maya Scam',
        'Identity Theft',
        'Online Fake Investment Scheme',
        'Credit Card Fraud',
      ],
    },
    {
      id: 710,
      sectioncode: '08',
      section_title: 'Acts against public order, authority and state security',
      divisioncode: '0801',
      division_title: 'Public Order and Neighborhood Harmony',
      version: '2018',
      reportingOffice: 'Barangay Lupon Tagapamayapa (KP)',
      applicableLaws: [
        'City Ordinances & Revised Penal Code (Articles 153, 155)',
      ],
      treceLocalContext:
        'Neighborhood disturbances, noise disputes, and minor altercations are peacefully resolved through the Lupong Tagapamayapa in the barangay hall.',
      citizenActionGuide:
        'Call the on-duty Barangay Tanod hotline or visit the Barangay Hall for immediate peacekeeping assistance.',
      jurisdictionType: 'Barangay Mediation (Lupon)',
      commonExamples: [
        'Alarm and Scandal',
        'Neighborhood Drunken Brawls',
        'Illegal Cockfighting (Tupada)',
        'Curfew Infractions',
      ],
    },
    {
      id: 810,
      sectioncode: '09',
      section_title: 'Acts against public safety and state security',
      divisioncode: '0901',
      division_title: 'Traffic Accidents and Public Safety',
      version: '2018',
      reportingOffice: 'Trece Traffic Management & CDRRMO',
      applicableLaws: [
        'RA 4136 (Land Transportation and Traffic Code)',
        'RA 10591 (Comprehensive Firearms and Ammunition Regulation Act)',
        'RA 10586 (Anti-Drunk and Drugged Driving Act)',
      ],
      treceLocalContext:
        'Traffic accidents along Governor’s Drive, Trece-Indang Road, and Tanza-Trece Road are documented by the PNP Traffic Section and assisted by CDRRMO Rescue.',
      citizenActionGuide:
        'In case of vehicular collision with injuries, call CDRRMO Rescue ((046) 419-1234). For traffic police reports, proceed to PNP Traffic Desk.',
      jurisdictionType: 'City Traffic & Environmental Enforcement',
      commonExamples: [
        'Vehicular Collisions',
        'Hit-and-Run',
        'Drunk Driving',
        'Unlicensed Firearms',
      ],
    },
    {
      id: 910,
      sectioncode: '10',
      section_title: 'Acts against the natural environment',
      divisioncode: '1001',
      division_title: 'Environmental and Waste Violations',
      version: '2018',
      reportingOffice: 'CENRO Trece Martires',
      applicableLaws: [
        'RA 9003 (Ecological Solid Waste Management Act)',
        'RA 8749 (Clean Air Act - Anti-Open Burning)',
        'City Solid Waste Ordinances',
      ],
      treceLocalContext:
        'Trece Martires strictly enforces no-littering and waste segregation under City Ordinances, monitored by CENRO and Barangay Eco-police.',
      citizenActionGuide:
        'Report illegal dumpsites, open burning (siga), or creek pollution to your Barangay Kagawad on Environment or CENRO Trece Martires.',
      jurisdictionType: 'City Traffic & Environmental Enforcement',
      commonExamples: [
        'Illegal Garbage Dumping',
        'Open Burning (Siga)',
        'River Pollution',
        'Non-segregation of Waste',
      ],
    },
    {
      id: 990,
      sectioncode: '11',
      section_title: 'Other criminal acts not elsewhere classified',
      divisioncode: '1101',
      division_title: 'Local Municipal Ordinances',
      version: '2018',
      reportingOffice: 'Barangay Lupon Tagapamayapa (KP)',
      applicableLaws: [
        'City Ordinance on Public Order, Karaoke Hours, and Animal Control',
      ],
      treceLocalContext:
        'Covers local city rules including strict 10:00 PM karaoke noise limits, stray animal leashing, and sidewalk clearing in commercial zones.',
      citizenActionGuide:
        'File an advisory request with the Barangay Tanod desk to address neighborhood noise or pet control issues.',
      jurisdictionType: 'Barangay Mediation (Lupon)',
      commonExamples: [
        'Excessive Videoke Noise after 10 PM',
        'Stray Dogs / Animal Control Violations',
        'Sidewalk Obstruction',
      ],
    },
  ];
}

/**
 * Fetch crime classification baseline data
 */
export async function fetchPsccsData({
  section,
  forceRefresh = false,
}: {
  section?: string;
  forceRefresh?: boolean;
} = {}): Promise<PsccsRecord[]> {
  const cacheKey = `${CACHE_KEY_PREFIX}2018_${section || 'all'}`;

  if (!forceRefresh && typeof window !== 'undefined') {
    try {
      const cachedStr = localStorage.getItem(cacheKey);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        if (
          Date.now() - cached.timestamp < DEFAULT_CACHE_TTL &&
          Array.isArray(cached.data)
        ) {
          return cached.data;
        }
      }
    } catch {
      // Ignore cache error
    }
  }

  let records = getAuthoritativePsccsBaseline();
  if (section && section !== 'all') {
    records = records.filter(r => r.sectioncode === section);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: records })
      );
    } catch {
      // Ignore storage error
    }
  }

  return records;
}
