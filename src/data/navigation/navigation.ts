export interface MegaMenuItem {
  title: string;
  description?: string;
  href: string;
  iconName?: string;
  badge?: string;
}

export interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

export interface MegaMenuFeatured {
  tag?: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
  stat?: string;
  statLabel?: string;
}

export interface MegaMenuSection {
  columns: MegaMenuColumn[];
  featured: MegaMenuFeatured;
}

export interface MainNavItem {
  label: string;
  href: string;
  megaMenu?: MegaMenuSection;
}

export const mainNavigation: MainNavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
    megaMenu: {
      columns: [
        {
          heading: 'Business, Trade & Farming',
          items: [
            {
              title: "Mayor's Business Permits",
              description: 'Barangay clearance & BPLO business permits',
              href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
              iconName: 'Briefcase',
            },
            {
              title: 'Business Tax & Renewals',
              description: 'Annual business tax assessments & payments',
              href: '/services/business/renew-permits-and-pay-local-business-taxes',
              iconName: 'FileCheck',
            },
            {
              title: 'Public Market Stalls',
              description: 'Market leasing, permits & stall renewals',
              href: '/services/business/rent-stalls-in-public-markets',
              iconName: 'Store',
            },
            {
              title: 'MSME & Tourism Expos',
              description: 'Join local trade fairs & tourism promotions',
              href: '/services/business/join-trade-fairs-business-expos-or-tourism-promotions',
              iconName: 'TrendingUp',
            },
            {
              title: 'Agriculture & Fisheries',
              description: 'Seeds, fertilizer support & farming aid',
              href: '/services/agriculture-fisheries',
              iconName: 'Wheat',
            },
          ],
        },
        {
          heading: 'Health, Education & Welfare',
          items: [
            {
              title: 'Free Clinics & Basic Medicines',
              description: 'Primary check-ups, vaccines & clinical care',
              href: '/services/health-services/get-free-check-ups-basic-medicines-and-vaccines',
              iconName: 'HeartPulse',
            },
            {
              title: 'Hospital Confinement & Care',
              description: 'GEAMH hospital treatment & medical aid',
              href: '/services/health-services/go-to-the-local-hospital-for-treatment-or-confinement',
              iconName: 'Building2',
            },
            {
              title: 'Maternal & Immunization',
              description: 'Prenatal guidance & child immunizations',
              href: '/services/health-services/access-maternal-care-and-child-immunization',
              iconName: 'Baby',
            },
            {
              title: 'Senior High Schools Directory',
              description:
                '16 Public & Private SHS schools & STEM/ABM/HUMSS/TVL strands',
              href: '/services/education#schools',
              iconName: 'GraduationCap',
              badge: '16 Schools',
            },
            {
              title: 'Local City Scholarships',
              description: 'Educational financial assistance program',
              href: '/services/education/apply-for-local-scholarships',
              iconName: 'Award',
            },
            {
              title: 'Daycare & Preschools',
              description: 'Barangay early childhood education centers',
              href: '/services/education/enroll-children-in-lgu-daycare-or-preschool-programs',
              iconName: 'BookOpen',
            },
            {
              title: 'Social Welfare Assistance',
              description: 'Assistance for seniors, PWDs & indigent aid',
              href: '/services/social-welfare',
              iconName: 'Users',
            },
          ],
        },
        {
          heading: 'Environment, Housing & Safety',
          items: [
            {
              title: 'Garbage Schedules & Pickup',
              description: 'Barangay solid waste collection timetable',
              href: '/services/garbage-waste-disposal/check-garbage-collection-schedules-and-request-pickup',
              iconName: 'Trash2',
            },
            {
              title: 'Special & Hazardous Waste',
              description: 'E-waste & toxic material collection requests',
              href: '/services/garbage-waste-disposal/request-special-waste-collection-hazardous-materials-electronics',
              iconName: 'AlertTriangle',
            },
            {
              title: 'Housing & Land Use',
              description: 'Zoning clearance & building permit guidance',
              href: '/services/housing-land-use',
              iconName: 'Home',
            },
            {
              title: 'Infrastructure & Public Works',
              description: 'Report road damage, drainage & facilities',
              href: '/services/infrastructure-public-works',
              iconName: 'Wrench',
            },
            {
              title: 'Fuel Price Monitor (DOE)',
              description: 'Official pump prices & 25+ gas stations in Trece',
              href: '/fuel-prices',
              iconName: 'Fuel',
              badge: 'DOE Cavite',
            },
            {
              title: 'Disaster Preparedness',
              description: 'Evacuation centers & CDRRMO response',
              href: '/services/disaster-preparedness',
              iconName: 'Shield',
            },
            {
              title: 'Environment Protection',
              description: 'Clean-up drives & tree planting activities',
              href: '/services/environment',
              iconName: 'TreePine',
            },
          ],
        },
      ],
      featured: {
        tag: 'CITIZEN DIRECTORY',
        title: 'All Municipal Services',
        description:
          'Step-by-step guides for permits, health services, scholarships, waste disposal, and social welfare programs.',
        href: '/services',
        ctaText: 'Browse All 10 Service Categories',
        stat: '10 Categories',
        statLabel: 'Full Service Index',
      },
    },
  },
  {
    label: 'Government',
    href: '/government',
    megaMenu: {
      columns: [
        {
          heading: 'Executive Leadership',
          items: [
            {
              title: 'Executive Branch Overview',
              description: 'City Mayor & Vice Mayor administration',
              href: '/government#executive',
              iconName: 'ShieldCheck',
              badge: 'Executive',
            },
            {
              title: 'Office of the City Mayor',
              description: 'Hon. Gemma Buendia-Lubigan',
              href: '/government/departments/executive',
              iconName: 'Award',
              badge: 'Mayor',
            },
            {
              title: 'Office of the Vice Mayor',
              description: 'Hon. Romeo Bobby Montehermoso Jr.',
              href: '/government/departments/executive',
              iconName: 'Landmark',
              badge: 'Vice Mayor',
            },
            {
              title: 'Executive Department Page',
              description: 'Mayoral mandates & strategic goals',
              href: '/government/departments/executive',
              iconName: 'Building',
            },
          ],
        },
        {
          heading: 'Legislative & Grassroots',
          items: [
            {
              title: 'Sangguniang Panlungsod',
              description: '10 City Councilors, ABC & SK Federation',
              href: '/government#legislative',
              iconName: 'Landmark',
              badge: '12 Members',
            },
            {
              title: '13 Constituent Barangays',
              description: 'Directory of 13 Punong Barangays / Captains',
              href: '/government#barangays',
              iconName: 'MapPin',
              badge: '13 Captains',
            },
            {
              title: 'Legislative Department Page',
              description: 'City Council ordinances & resolutions',
              href: '/government/departments/legislative',
              iconName: 'ScrollText',
            },
            {
              title: '13 Barangays Department Page',
              description: 'Constituent barangay governance profiles',
              href: '/government/departments/barangays',
              iconName: 'Building2',
            },
          ],
        },
        {
          heading: 'Departments & Engagement',
          items: [
            {
              title: 'Departments & Key Offices',
              description: 'Explore municipal offices & bureaus',
              href: '/government#departments',
              iconName: 'Building2',
            },
            {
              title: 'News & Announcements',
              description: 'Official city news releases & advisories',
              href: '/government/news',
              iconName: 'Newspaper',
            },
            {
              title: 'Guides & Regulations',
              description: 'Municipal policies & regulatory rules',
              href: '/government/guides-and-regulations',
              iconName: 'BookOpen',
            },
            {
              title: 'Public Consultations',
              description: 'Participate in civic dialogues & hearings',
              href: '/government/public-consultations',
              iconName: 'MessagesSquare',
            },
            {
              title: '24/7 Emergency Hotlines',
              description: 'CDRRMO, BFP, PNP & City Health numbers',
              href: '/government#hotlines',
              iconName: 'Phone',
            },
          ],
        },
      ],
      featured: {
        tag: 'OFFICIAL LEADERSHIP',
        title: 'City Government of Trece Martires',
        description:
          'Unified portal for executive leaders, Sangguniang Panlungsod lawmakers, 13 constituent barangays, and municipal offices.',
        href: '/government',
        ctaText: 'Open One-Page Portal',
        stat: '2023–2026',
        statLabel: 'Verified Term of Office',
      },
    },
  },
  {
    label: 'Transparency',
    href: '/transparency',
    megaMenu: {
      columns: [
        {
          heading: 'Fiscal Disclosures & Budget',
          items: [
            {
              title: 'City Revenue & Budget (DBM)',
              description: 'Receipts, expenditures & budget reports',
              href: '/transparency',
              iconName: 'Coins',
              badge: 'Live Data',
            },
            {
              title: 'Full Disclosure Policy (FDP)',
              description: 'DILG compliance & financial transparency',
              href: '/government/transparency-documents/full-disclosure-policy',
              iconName: 'FileSpreadsheet',
            },
            {
              title: 'City Financial Statements (DBM)',
              description: 'Official SRE and budget documents',
              href: '/government/transparency-documents',
              iconName: 'Building2',
            },
            {
              title: 'Annual Procurement Plans',
              description: 'Public bidding & contract awards',
              href: '/government/transparency-documents',
              iconName: 'FileText',
            },
          ],
        },
        {
          heading: 'Infrastructure Projects',
          items: [
            {
              title: 'DPWH Infrastructure Tracker',
              description: 'Public works monitoring across 13 barangays',
              href: '/transparency/dpwh',
              iconName: 'HardHat',
              badge: 'Live Data',
            },
            {
              title: 'Road & Bridge Modernization',
              description: 'Governor’s Drive & road widening registry',
              href: '/transparency/dpwh',
              iconName: 'Route',
            },
            {
              title: 'Flood Control & Drainage',
              description: 'River dikes, waterways & drainage channels',
              href: '/transparency/dpwh',
              iconName: 'ShieldAlert',
            },
            {
              title: 'Public School Buildings',
              description: 'DepEd classrooms & educational facilities',
              href: '/transparency/dpwh',
              iconName: 'GraduationCap',
            },
          ],
        },
        {
          heading: 'Open Governance & FOI',
          items: [
            {
              title: 'Political Dynasties Tracker',
              description: 'Ateneo Policy Center dataset for Trece & Cavite',
              href: '/transparency/political-dynasties',
              iconName: 'ShieldCheck',
              badge: 'Research',
            },
            {
              title: 'City Ordinances & Resolutions',
              description: 'Local legislation & council enactments',
              href: '/government/guides-and-regulations',
              iconName: 'Scale',
            },
            {
              title: 'Public Consultations',
              description: 'Citizen feedback & municipal hearing logs',
              href: '/government/public-consultations',
              iconName: 'MessageSquare',
            },
            {
              title: 'Freedom of Information (eFOI)',
              description: 'Request official public documents online',
              href: 'https://www.foi.gov.ph',
              iconName: 'ExternalLink',
              badge: 'National',
            },
          ],
        },
      ],
      featured: {
        tag: 'FISCAL TRANSPARENCY',
        title: 'City Revenue & Budget (DBM)',
        description:
          'Explore Trece Martires City receipts, tax collections, expenditures, and 100+ DPWH infrastructure public works.',
        href: '/transparency',
        ctaText: 'View Revenue & Budget',
        stat: '₱1.53B+',
        statLabel: '2024 Total City Revenue',
      },
    },
  },
  {
    label: 'Statistics',
    href: '/demographics',
    megaMenu: {
      columns: [
        {
          heading: 'Census & Demographics',
          items: [
            {
              title: 'Summary Demographics Profile',
              description: 'Population, land area & household density',
              href: '/demographics',
              iconName: 'Users',
            },
            {
              title: 'Senior High Schools (16)',
              description: 'DepEd BEIS directory (4 Public, 12 Private SHS)',
              href: '/demographics#education',
              iconName: 'GraduationCap',
              badge: '16 Schools',
            },
            {
              title: '2024 POPCEN (227,892)',
              description: 'Official Philippine Statistics Authority census',
              href: '/demographics',
              iconName: 'TrendingUp',
              badge: '227,892',
            },
            {
              title: '13 Barangays Census Growth',
              description: 'Population comparison from 2015 to 2020',
              href: '/demographics',
              iconName: 'BarChart2',
            },
          ],
        },
        {
          heading: 'Electoral Registry',
          items: [
            {
              title: 'COMELEC 2025 Registered Voters',
              description: '121,194 official registered city voters',
              href: '/demographics',
              iconName: 'Vote',
              badge: '121,194',
            },
            {
              title: 'Established Precincts (608)',
              description: '14 voting centers across 13 barangays',
              href: '/demographics',
              iconName: 'CheckCircle2',
            },
            {
              title: 'Cavite Provincial Total',
              description: '2,456,536 provincial registered voters',
              href: '/demographics',
              iconName: 'Map',
            },
          ],
        },
        {
          heading: 'PSA Standards & Geocodes',
          items: [
            {
              title: 'PSGC Geocodes (0402122000)',
              description: 'Philippine Standard Geographic Code & API',
              href: '/demographics',
              iconName: 'Binary',
              badge: 'PSGC',
            },
            {
              title: '9 Standard Classifications',
              description: 'PSIC, PSOC, PSCED, PSCC, PSIC standards',
              href: '/demographics#psa-classifications',
              iconName: 'Database',
            },
            {
              title: 'Reports & Open Datasets',
              description: 'Downloadable statistics and data feeds',
              href: '/government/reports-and-statistics',
              iconName: 'FileSpreadsheet',
            },
          ],
        },
      ],
      featured: {
        tag: 'OFFICIAL STATISTICS',
        title: 'Trece Martires Data Explorer',
        description:
          'Verified PSA census, COMELEC voter registrations, 13 barangays demographics, and standard classification systems.',
        href: '/demographics',
        ctaText: 'Explore Demographics & PSGC',
        stat: '0402122000',
        statLabel: '10-Digit PSGC Geocode',
      },
    },
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'Quick Links',
      links: [
        {
          label: 'Political Dynasties Tracker',
          href: '/transparency/political-dynasties',
        },
        {
          label: 'City Revenue & Budget (DBM)',
          href: '/transparency',
        },
        {
          label: 'DPWH Infrastructure Tracker',
          href: '/transparency/dpwh',
        },
        {
          label: 'National Budget (GAA 2020–2026)',
          href: '/transparency?tab=gaa',
        },
        {
          label: 'COA Annual Audit Report (2024)',
          href: '/transparency?tab=audit',
        },
        {
          label: 'Summary Demographics & Census',
          href: '/demographics',
        },
        {
          label: 'Trece Fuel Price Monitor',
          href: '/fuel-prices',
        },
        {
          label: '13 Barangays Directory',
          href: '/government#barangays',
        },
        {
          label: "Mayor's Business Permits (BPLO)",
          href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
        },
        {
          label: 'About This Project (Why I Built This)',
          href: '/about',
        },
      ],
    },
    {
      title: 'Civic Datasets & Open Data',
      links: [
        {
          label: 'Ateneo Policy Center Political Dynasties Data (1987–2022)',
          href: '/transparency/political-dynasties',
        },
        {
          label: 'PSA 2024 Population Census (POPCEN 227,892)',
          href: '/demographics',
        },
        {
          label: 'PSA PSGC Geocodes (0402122000)',
          href: '/demographics#psa-classifications',
        },
        {
          label: 'DBM & DOF-BLGF City Revenue Datasets',
          href: '/transparency',
        },
        {
          label: 'National Budget (GAA) Appropriations Data',
          href: '/transparency?tab=gaa',
        },
        {
          label: 'COA Region IV-A Annual Audit Reports',
          href: '/transparency?tab=audit',
        },
        {
          label: 'DPWH Cavite 1st DEO Public Works Registry',
          href: '/transparency/dpwh',
        },
        {
          label: 'DOE Retail Fuel Price Monitor Data',
          href: '/fuel-prices',
        },
        {
          label: 'DBM Full Disclosure Policy (FDP)',
          href: '/government/transparency-documents/full-disclosure-policy',
        },
        {
          label: 'BetterGov Hugging Face Open Datasets',
          href: 'https://huggingface.co/bettergov',
        },
        {
          label: 'PSA OpenSTAT Official Portal',
          href: 'https://openstat.psa.gov.ph',
        },
      ],
    },
  ],
  socialLinks: [
    { label: 'Facebook', href: 'https://facebook.com/trecemartirescity' },
    { label: 'Twitter', href: 'https://twitter.com/trecemartires' },
    { label: 'Instagram', href: 'https://instagram.com/trecemartirescity' },
    { label: 'YouTube', href: 'https://youtube.com/@trecemartirescity' },
  ],
};
