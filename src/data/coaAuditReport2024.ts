/**
 * Commission on Audit (COA) Annual Audit Report (AAR) — Calendar Year 2024
 * City of Trece Martires, Province of Cavite
 *
 * Source: Commission on Audit (COA) Regional Office IV-A,
 * Local Government Audit Sector R4A-02, Team B
 * Released: June 2025 / Transmitted: 2025
 */

export interface CoaAuditMeta {
  city: string;
  province: string;
  period: string;
  auditYear: number;
  reportTitle: string;
  auditOpinion:
    | 'Qualified Opinion'
    | 'Unqualified Opinion'
    | 'Adverse Opinion'
    | 'Disclaimer of Opinion';
  auditOpinionSummary: string;
  auditTeam: {
    sector: string;
    team: string;
    preparedBy: string;
    approvedBy: string;
    auditDate: string;
  };
  totalAarPages: number;
  documents: {
    aar: {
      name: string;
      filename: string;
      url: string;
      size: string;
      pages: number;
      description: string;
    };
    aapsi: {
      name: string;
      filename: string;
      url: string;
      size: string;
      pages: number;
      description: string;
    };
    apmt: {
      name: string;
      filename: string;
      url: string;
      size: string;
      pages: number;
      description: string;
    };
    car: {
      name: string;
      filename: string;
      url: string;
      size: string;
      pages: number;
      description: string;
    };
  };
}

export interface ComparativeFinancialMetric {
  label: string;
  cy2024: number;
  cy2023: number;
  difference: number;
  percentageChange: number;
  formatted2024: string;
  formatted2023: string;
}

export interface FinancialHighlights {
  assets: ComparativeFinancialMetric;
  liabilities: ComparativeFinancialMetric;
  equity: ComparativeFinancialMetric;
  revenue: ComparativeFinancialMetric;
  operatingExpenses: ComparativeFinancialMetric;
  netSurplus: ComparativeFinancialMetric;
  revenueBreakdown: {
    taxRevenue: number;
    shareNationalTaxes: number; // NTA / IRA
    serviceAndBusinessIncome: number;
    grantsAndDonations: number;
    otherIncome: number;
  };
  expenseBreakdown: {
    personnelServices: number;
    mooe: number;
    financialExpenses: number;
    nonCashExpenses: number;
  };
  budgetExecution: {
    appropriation: number;
    utilization: number;
    utilizationRate: number; // percentage
  };
  personnelComplement: {
    permanent: number;
    elective: number;
    coterminous: number;
    consultant: number;
    casual: number;
    jobOrder: number;
    total: number;
  };
}

export type AuditCategory =
  | 'financial'
  | 'infrastructure'
  | 'property'
  | 'workforce'
  | 'disaster_special';

export type ValidationStatus =
  'implemented' | 'in_progress' | 'for_monitoring' | 'not_implemented';

export interface AuditObservation {
  id: number;
  obsNumber: number;
  title: string;
  category: AuditCategory;
  categoryLabel: string;
  amountInvolved?: number;
  amountFormatted?: string;
  basis: string[];
  findings: string;
  recommendations: string[];
  agencyActionPlan: string;
  responsibleOffice: string;
  targetTimeline: string;
  agencyStatus: 'Implemented' | 'Not Implemented' | 'Ongoing' | 'Under Review';
  coaValidationStatus: ValidationStatus;
  coaValidationLabel: string;
  coaValidationRemarks: string;
}

export interface SasdcSummary {
  unsettledSuspensions: number;
  unsettledDisallowances: number;
  unsettledDisallowancesAppealed: number;
  unsettledCharges: number;
  remarks: string;
}

export interface PriorYearRecommendations {
  totalRecommendations: number;
  implemented: number;
  notImplemented: number;
  implementationRate: number;
}

export const COA_AUDIT_REPORT_2024_META: CoaAuditMeta = {
  city: 'City of Trece Martires',
  province: 'Cavite',
  period: 'January 1 to December 31, 2024',
  auditYear: 2024,
  reportTitle:
    'Annual Audit Report (AAR) on the City of Trece Martires, Cavite for CY 2024',
  auditOpinion: 'Qualified Opinion',
  auditOpinionSummary:
    'The Auditor rendered a Qualified Opinion due to 6 primary areas: Bank Reconciliation delays, PPE accounting vs physical count variance of ₱15.64M, inventory differences of ₱66.79M, unrecorded year-end payables and Construction in Progress of ₱45.84M, biological asset cattle valuation, and long-dormant payables.',
  auditTeam: {
    sector: 'Local Government Audit Sector R4A-02',
    team: 'LGAS B (Cavite Team)',
    preparedBy: 'Clarie Elaine C. Mendoza',
    approvedBy: 'Mark Schundel L. Reymundo',
    auditDate: 'June 13, 2025',
  },
  totalAarPages: 189,
  documents: {
    aar: {
      name: 'CY 2024 Annual Audit Report (AAR)',
      filename: 'TreceMartiresCity2024_Audit_Report.pdf',
      url: '/documents/transparency/audit-2024/TreceMartiresCity2024_Audit_Report.pdf',
      size: '8.5 MB',
      pages: 189,
      description:
        'Complete official report containing the Auditor’s Opinion, Financial Statements, Detailed Audit Observations & Recommendations, and Status of Prior Year Audit Recommendations.',
    },
    aapsi: {
      name: 'Agency Action Plan and Status of Implementation (AAPSI)',
      filename: 'TreceMartiresCity2024_AAPSI.pdf',
      url: '/documents/transparency/audit-2024/TreceMartiresCity2024_AAPSI.pdf',
      size: '2.68 MB',
      pages: 17,
      description:
        'Official signed action plan by City Mayor Gemma B. Lubigan and department heads outlining specific mitigation steps, timelines, and commitments for each audit observation.',
    },
    apmt: {
      name: 'Action Plan Monitoring Tool (APMT)',
      filename: 'TreceMartiresCity2024_APMT.pdf',
      url: '/documents/transparency/audit-2024/TreceMartiresCity2024_APMT.pdf',
      size: '206 KB',
      pages: 11,
      description:
        'COA monitoring scorecard detailing the City’s actions taken and the Audit Team’s independent validation results as of October 2025.',
    },
    car: {
      name: 'Special Education Fund (SEF) Compliance Audit Report',
      filename: 'TreceMartiresCity2024_CAR_SEF.pdf',
      url: '/documents/transparency/audit-2024/TreceMartiresCity2024_CAR_SEF.pdf',
      size: '3.2 MB',
      pages: 12,
      description:
        'COA Management Letter on the Compliance Audit on the Transparency and Accountability in the Allocation and Utilization of the Special Education Fund (₱86.00M budget) for CY 2024.',
    },
  },
};

export const COA_FINANCIAL_HIGHLIGHTS_2024: FinancialHighlights = {
  assets: {
    label: 'Total Assets',
    cy2024: 4546055040.48,
    cy2023: 3780261105.55,
    difference: 765793934.93,
    percentageChange: 20.26,
    formatted2024: '₱4,546,055,040.48',
    formatted2023: '₱3,780,261,105.55',
  },
  liabilities: {
    label: 'Total Liabilities',
    cy2024: 1298227209.99,
    cy2023: 685124476.49,
    difference: 613102733.5,
    percentageChange: 89.49,
    formatted2024: '₱1,298,227,209.99',
    formatted2023: '₱685,124,476.49',
  },
  equity: {
    label: 'Government Equity',
    cy2024: 3247827830.49,
    cy2023: 3095136629.06,
    difference: 152691201.43,
    percentageChange: 4.93,
    formatted2024: '₱3,247,827,830.49',
    formatted2023: '₱3,095,136,629.06',
  },
  revenue: {
    label: 'Total Operating Revenue',
    cy2024: 1524462982.57,
    cy2023: 1383099422.68,
    difference: 141363559.89,
    percentageChange: 10.22,
    formatted2024: '₱1,524,462,982.57',
    formatted2023: '₱1,383,099,422.68',
  },
  operatingExpenses: {
    label: 'Current Operating Expenses',
    cy2024: 1270599405.62,
    cy2023: 1101512365.39,
    difference: 169087040.23,
    percentageChange: 15.35,
    formatted2024: '₱1,270,599,405.62',
    formatted2023: '₱1,101,512,365.39',
  },
  netSurplus: {
    label: 'Net Surplus for the Period',
    cy2024: 243861452.02,
    cy2023: 258578861.51,
    difference: -14717409.49,
    percentageChange: -5.69,
    formatted2024: '₱243,861,452.02',
    formatted2023: '₱258,578,861.51',
  },
  revenueBreakdown: {
    taxRevenue: 476963121.27,
    shareNationalTaxes: 859707145.0,
    serviceAndBusinessIncome: 172289425.83,
    grantsAndDonations: 15503290.47,
    otherIncome: 823065.73,
  },
  expenseBreakdown: {
    personnelServices: 358573864.44,
    mooe: 751737595.24,
    financialExpenses: 26593217.09,
    nonCashExpenses: 133694728.85,
  },
  budgetExecution: {
    appropriation: 1794565827.0,
    utilization: 1583465362.09,
    utilizationRate: 88.24,
  },
  personnelComplement: {
    permanent: 475,
    elective: 14,
    coterminous: 22,
    consultant: 4,
    casual: 168,
    jobOrder: 1692,
    total: 2375,
  },
};

export const COA_SASDC_SUMMARY_2024: SasdcSummary = {
  unsettledSuspensions: 0,
  unsettledDisallowances: 84733007.17,
  unsettledDisallowancesAppealed: 74748007.17,
  unsettledCharges: 9154505.66,
  remarks:
    'As of Dec 31, 2024, the City has unsettled disallowances of ₱84.73M (of which ₱74.75M is under active Petition for Review / Motion for Reconsideration with the COA Central Office), ₱9.15M unsettled charges against a former Liquidating Officer, and ₱0 unsettled suspensions.',
};

export const COA_PRIOR_YEAR_TRACKING_2024: PriorYearRecommendations = {
  totalRecommendations: 37,
  implemented: 18,
  notImplemented: 19,
  implementationRate: 48.65,
};

export const COA_AUDIT_OBSERVATIONS_2024: AuditObservation[] = [
  {
    id: 1,
    obsNumber: 1,
    title:
      'Monthly Bank Reconciliation Statements (BRS) and Journal Adjustments',
    category: 'financial',
    categoryLabel: 'Financial & Cash Management',
    amountInvolved: 182040457.45,
    amountFormatted: '₱182,040,457.45',
    basis: ['Section 74 of P.D. No. 1445', 'COA Circular No. 96-011'],
    findings:
      'Bank Reconciliation Statements (BRS) were not prepared and submitted to the COA Auditor on a monthly basis within 10 days after each month-end. Furthermore, Journal Entry Vouchers (JEVs) to record reconciling items were drawn in subsequent months rather than contemporaneously, casting doubt on the reliability of the Cash in Bank accounts balance totaling ₱182,040,457.45 across 9 Land Bank depository accounts.',
    recommendations: [
      'City Accountant to prepare and submit BRS with all supporting documents within 10 days after the end of each month.',
      'Draw JEVs to take up all valid reconciling items requiring corrections in their corresponding months.',
    ],
    agencyActionPlan:
      'Office of the City Accountant (CAO) prepared and submitted BRS through July 2025 with complete documents to the Audit Team.',
    responsibleOffice: 'City Accounting Office (CAO)',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Implemented',
    coaValidationStatus: 'not_implemented',
    coaValidationLabel: 'In Progress / Updating Records',
    coaValidationRemarks:
      'The CAO submitted BRS through July 2025; full compliance for all 12 months subject to continued audit monitoring.',
  },
  {
    id: 2,
    obsNumber: 2,
    title:
      'Property, Plant and Equipment (PPE) Ledger Cards, Titling, and Discrepancies',
    category: 'property',
    categoryLabel: 'Property & Asset Management',
    amountInvolved: 15644743.89,
    amountFormatted: '₱15,644,743.89 variance',
    basis: [
      'Manual on New Government Accounting System (MNGAS)',
      'COA Circular No. 2022-004 (Cleansing of PPE)',
    ],
    findings:
      'Reliability of PPE accounts (₱2.29B net book value) remained doubtful due to: (a) ₱15,644,743.89 discrepancy between accounting records and physical count reports (RPCPPE); (b) 11 parcels of land totaling ₱661.17M lacked transfer titles or proof of ownership; (c) five road lots totaling ₱1,745,600.00 were misclassified as Land instead of Road Networks; (d) 47 items lacked recorded acquisition costs; and (e) non-maintenance of PPELCs and Real Property Ledger Cards (RPLC).',
    recommendations: [
      'CGSO and CAO to reconcile RPCPPE with Statement of Financial Position balances.',
      'Collaborate with City Assessor to obtain proofs of ownership and facilitate transfer of land titles for 11 lots.',
      'Reclassify road lots (₱1.75M) to Road Networks and items below ₱50k (₱93.8k) to Semi-expendable properties.',
      'Determine acquisition costs for 47 unidentified PPE items and maintain complete PPELCs and RPLCs.',
    ],
    agencyActionPlan:
      'CAO and CGSO are actively reconciling PPE records, obtaining land title documentation with the City Assessor, and updating ledger cards.',
    responsibleOffice: 'CGSO, CAO, City Assessor’s Office',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'Ongoing Record Updates',
    coaValidationRemarks:
      'Accounting and General Services records are currently being reconciled and land titling validation is ongoing.',
  },
  {
    id: 3,
    obsNumber: 3,
    title:
      'Physical Inventory Counts (RPCI) vs. Accounting Records Discrepancy',
    category: 'property',
    categoryLabel: 'Property & Asset Management',
    amountInvolved: 66791754.52,
    amountFormatted: '₱66,791,754.52 variance',
    basis: ['Sections 111 and 122 of P.D. No. 1445', 'MNGAS for LGUs'],
    findings:
      'A discrepancy of ₱66,791,754.52 was observed between the Report on Physical Count of Inventories (RPCI) and the CAO general ledger, and complete inventory stock cards were not maintained by CGSO, preventing full verification of year-end inventory balances.',
    recommendations: [
      'Reconcile physical inventory counts with CAO general ledger balances.',
      'CGSO to maintain complete and updated stock cards for all consumable supplies and materials.',
    ],
    agencyActionPlan:
      'CGSO and CAO initiated joint inventory reconciliation and established updated stock card logs.',
    responsibleOffice: 'City General Services Office (CGSO) & CAO',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'Ongoing Reconciliation',
    coaValidationRemarks:
      'Reconciliation between CGSO warehouse stock cards and CAO accounting records is ongoing.',
  },
  {
    id: 4,
    obsNumber: 4,
    title:
      'Unrecorded Accounts Payable and Construction in Progress (CIP) at Year-End',
    category: 'financial',
    categoryLabel: 'Financial & Cash Management',
    amountInvolved: 45841038.6,
    amountFormatted: '₱45,841,038.60',
    basis: [
      'IPSAS 1 (Financial Statements)',
      'IPSAS 19 (Provisions & Payables)',
    ],
    findings:
      'Completed and ongoing infrastructure projects totaling ₱45,841,038.60 were not recognized as liabilities at year-end, understating Accounts Payable by ₱20,181,455.93 and Construction in Progress / PPE by ₱25,659,582.67.',
    recommendations: [
      'City Accountant to coordinate closely with City Engineer to prepare year-end adjusting entries recognizing completed works and progress billings.',
      'Strictly enforce cutoff procedures for contractor progress billings.',
    ],
    agencyActionPlan:
      'CAO coordinated with City Engineer to draw adjusting entries for all verified progress billings and accrued payables.',
    responsibleOffice: 'CAO & City Engineering Office (CEO)',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Implemented',
    coaValidationStatus: 'implemented',
    coaValidationLabel: 'Implemented / Verified',
    coaValidationRemarks:
      'Adjusting journal entries prepared to recognize valid year-end infrastructure liabilities; for confirmation in succeeding audit.',
  },
  {
    id: 5,
    obsNumber: 5,
    title:
      'Biological Assets Fair Value Measurement and Cattle Mortality Records',
    category: 'property',
    categoryLabel: 'Property & Asset Management',
    amountInvolved: 745846.2,
    amountFormatted: '₱745,846.20',
    basis: ['IPSAS 27 (Agriculture)', 'Section 111 of P.D. No. 1445'],
    findings:
      'Biological assets were erroneously recorded at historical cost rather than fair market value less cost to sell; 12 deceased breeding cattle totaling ₱252,346.20 were still carried in the books; and the physical condition of remaining livestock was unverified.',
    recommendations: [
      'City Agriculturist, CGSO, and CAO to conduct physical count of biological assets and measure at fair market value less costs to sell.',
      'Process dropping of 12 deceased cattle from the books with required inspection and death certificates.',
    ],
    agencyActionPlan:
      'City Agriculturist conducted physical inspection of cattle, submitted death certificates for deceased livestock, and CAO prepared write-off adjustments.',
    responsibleOffice: 'City Agriculturist, CGSO, CAO',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'Ongoing Valuation',
    coaValidationRemarks:
      'Death certificates submitted; final fair market revaluation and write-off entries under review.',
  },
  {
    id: 6,
    obsNumber: 6,
    title: 'Long-Outstanding Dormant Accounts Payable (>2 Years)',
    category: 'financial',
    categoryLabel: 'Financial & Cash Management',
    amountInvolved: 2869714.44,
    amountFormatted: '₱2,869,714.44',
    basis: ['Section 98 of P.D. No. 1445', 'COA Circular No. 76-45'],
    findings:
      'Accounts payable under the General Fund (₱2.75M) and Trust Fund (₱115.2k) outstanding for more than two years without valid supporting claims were not reverted to the unappropriated surplus of the General Fund.',
    recommendations: [
      'Review aging schedule of payables and revert documented/dormant payables exceeding 2 years to the unappropriated surplus of the General Fund.',
    ],
    agencyActionPlan:
      'CAO reviewed aged payables and initiated reversion of dormant obligations to the General Fund surplus.',
    responsibleOffice: 'City Accounting Office (CAO)',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Implemented',
    coaValidationStatus: 'implemented',
    coaValidationLabel: 'Implemented / Reverted',
    coaValidationRemarks:
      'Dormant payables evaluated and reversion journal entries prepared.',
  },
  {
    id: 7,
    obsNumber: 7,
    title: 'Dormant Inter-Agency Trust Funds (Due to NGAs)',
    category: 'financial',
    categoryLabel: 'Financial & Cash Management',
    amountInvolved: 2600000.0,
    amountFormatted: '₱2,600,000.00',
    basis: ['COA Circular No. 94-013'],
    findings:
      'Fund transfers received from National Government Agencies (NGAs) totaling ₱2,600,000.00 remained idle/dormant for over two years without active project implementation.',
    recommendations: [
      'Verify guidelines of source agencies, complete remaining project activities, return unexpended balances to the National Treasury / source agencies, or seek approval to revert to unappropriated surplus.',
    ],
    agencyActionPlan:
      'CAO is tracing source agencies and project histories to return balances or secure formal reversion clearances.',
    responsibleOffice: 'CAO & Implementing Departments',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'Ongoing Agency Tracing',
    coaValidationRemarks:
      'Active verification with donor National Government Agencies underway.',
  },
  {
    id: 8,
    obsNumber: 8,
    title:
      'Non-Disaster Operational Expenses Charged to Calamity Fund (LDRRMF)',
    category: 'disaster_special',
    categoryLabel: 'Disaster & Special Funds',
    amountInvolved: 2412415.6,
    amountFormatted: '₱2,412,415.60',
    basis: ['NDRRMC-DBM-DILG Joint Memo Circular No. 2013-1'],
    findings:
      'Disbursements amounting to ₱2,412,415.60 for general supplies, training, and meals (including OPLAN Semana Santa) were charged against the Local Disaster Risk Reduction & Management Fund (LDRRMF) despite lacking direct alignment with the 4 disaster thematic areas.',
    recommendations: [
      'Submit formal justification/resolution justifying charges or refund disallowed amounts.',
      'Refrain from charging non-DRRM operational expenses to the calamity fund.',
    ],
    agencyActionPlan:
      'City submitted DILG memorandum on Holy Week & summer vacation emergency preparedness justifying OPLAN Semana Santa deployments as disaster preparedness operations.',
    responsibleOffice: 'City Mayor, CDRRMO, City Budget Office',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Under Review',
    coaValidationStatus: 'for_monitoring',
    coaValidationLabel: 'For Verification Next Audit',
    coaValidationRemarks:
      'DILG justifications submitted; compliance to be validated in the next audit cycle.',
  },
  {
    id: 9,
    obsNumber: 9,
    title:
      'Negative Slippage on 7 Infrastructure Projects & Awarding 45 Projects to Same Contractor',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure & Civil Works',
    amountInvolved: 29323315.18,
    amountFormatted: '₱29.32M (7 projects) / ₱82.06M (45 awards)',
    basis: [
      'GPPB Circular No. 03-2019',
      'Section 34.4 of R.A. No. 9184 (Government Procurement Reform Act)',
    ],
    findings:
      'The City did not issue formal Notices of Negative Slippage (at 5% Early Warning and 10% ICU thresholds) for 7 infrastructure projects totaling ₱29,323,315.18 experiencing negative slippage of 7.00% to 34.82%. Additionally, the City continued to award 45 additional infrastructure contracts totaling ₱82,060,937.84 to the same contractor despite existing project delays.',
    recommendations: [
      'City Engineer to closely monitor projects and issue formal Notices of Negative Slippage requiring bi-weekly/weekly catch-up plans.',
      'BAC Chairman to verify bidder performance in ongoing contracts prior to contract awards.',
      'CAO to continue withholding 10% retention money until works are satisfactorily completed.',
    ],
    agencyActionPlan:
      'CEO will enforce formal negative slippage notices and catch-up schedules; BAC will establish contractor performance flagging; CAO continues 10% retention withholding.',
    responsibleOffice: 'City Engineering Office (CEO), BAC, CAO',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'for_monitoring',
    coaValidationLabel: 'For Monitoring / Withholding Retention',
    coaValidationRemarks:
      'Retention money being withheld; formal catch-up monitoring and BAC vetting mechanism being instituted.',
  },
  {
    id: 10,
    obsNumber: 10,
    title: 'Contract Time Extensions Granted Without Valid IRR Grounds',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure & Civil Works',
    amountInvolved: 14873064.0,
    amountFormatted: '₱14,873,064.00 (2 projects)',
    basis: ['Annex E, Item 11 of 2016 Revised IRR of R.A. No. 9184'],
    findings:
      'Two infrastructure projects awarded to Saldania Construction totaling ₱14,873,064.00 were granted contract time extensions of 52 days and 90 days without meeting the authorized conditions enumerated in Annex E of RA 9184 IRR, depriving the public of timely use.',
    recommendations: [
      'City Engineer to ensure all time extension requests are supported by detailed weather reports, critical path analysis, and valid justifications conforming strictly to Annex E.',
    ],
    agencyActionPlan:
      'City Engineer to enforce strict technical documentation and critical path analysis for all extension requests.',
    responsibleOffice: 'City Engineering Office (CEO)',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Not Implemented',
    coaValidationStatus: 'not_implemented',
    coaValidationLabel: 'Not Implemented / Under Follow-Up',
    coaValidationRemarks:
      'No formal action plan indicated in APMT; compliance subject to audit follow-up.',
  },
  {
    id: 11,
    obsNumber: 11,
    title: 'Disposal of 160 Unserviceable Government Properties',
    category: 'property',
    categoryLabel: 'Property & Asset Management',
    amountInvolved: 108899029.54,
    amountFormatted: '₱108,899,029.54 (160 items)',
    basis: [
      'Section 379 of R.A. No. 7160 (Local Government Code)',
      'COA-DBM Joint Circular No. 2024-1',
    ],
    findings:
      '160 unserviceable properties totaling ₱108,899,029.54 (motor vehicles, heavy equipment, office machinery) remained undisposed at year-end, exposing properties to continuous deterioration and loss of economic salvage value.',
    recommendations: [
      'CGSO and CAO to prepare Inventory & Inspection Report of Unserviceable Properties (IIRUP) with photos, survey reports, and stencils.',
      'Submit to Disposal Committee for appraisal and immediate public auction/disposal.',
      'Safeguard unserviceable assets in a single secure holding facility.',
    ],
    agencyActionPlan:
      'Initial list submitted to Disposal Committee; Provincial COA Office inspected designated holding area; final appraisal and disposal documentation being concluded.',
    responsibleOffice: 'CGSO, CAO, Disposal Committee',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'Disposal Process Ongoing',
    coaValidationRemarks:
      'Initial inventory prepared; public auction appraisal and property security ongoing.',
  },
  {
    id: 12,
    obsNumber: 12,
    title: 'Unregistered and Expired Motor Vehicle Registrations with LTO',
    category: 'property',
    categoryLabel: 'Property & Asset Management',
    amountInvolved: 23,
    amountFormatted: '23 Motor Vehicles',
    basis: [
      'Section 5 of Batas Pambansa Bilang 74',
      'Section 2 of P.D. No. 1445',
    ],
    findings:
      'Four government vehicles acquired in CY 2022–2023 were not registered with the Land Transportation Office (LTO) and 19 vehicles had expired registrations, exposing the City to fines and liabilities.',
    recommendations: [
      'CGSO to cause the immediate registration of the 4 unregistered vehicles and renewal of 19 vehicles with the LTO.',
    ],
    agencyActionPlan:
      'Vehicles were assigned to barangays for local operations and are undergoing formal Deed of Donation processing to transfer registration directly to recipient barangays.',
    responsibleOffice: 'CGSO, City Legal Office, Recipient Barangays',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'Deed of Donation in Legal Review',
    coaValidationRemarks:
      'Deeds of Donation undergoing City Legal Office review; registration transfer proofs to be verified.',
  },
  {
    id: 13,
    obsNumber: 13,
    title: 'Job Order (JO) Workforce Contracts & Performance Metrics',
    category: 'workforce',
    categoryLabel: 'Human Resources & Workforce',
    amountInvolved: 63898409.26,
    amountFormatted: '₱63,898,409.26 (1,692 workers)',
    basis: ['COA-DBM Joint Circular No. 2, s. 2020'],
    findings:
      'The specific duties and functions of 1,692 Job Order personnel (71.24% of the total 2,375 city workforce) were not provided in contracts, and monthly accomplishment reports were generalized in groups, preventing full evaluation of hiring necessity and payment regularity (₱63.90M paid in CY 2024).',
    recommendations: [
      'CHRMO to ensure JO contracts specify clear job descriptions, duties, and measurable deliverables.',
      'Require individual accomplishment reports.',
      'Hire JO workers only upon formal certification of manpower needs by department heads.',
    ],
    agencyActionPlan:
      'CHRMO is strengthening reporting and evaluation of JO accomplishments against specific contract duties for renewals and manpower planning.',
    responsibleOffice: 'CHRMO & Department/Division Heads',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'Ongoing Workforce Review',
    coaValidationRemarks:
      'Revised job descriptions and individual accomplishment evaluation system being instituted.',
  },
  {
    id: 14,
    obsNumber: 14,
    title: 'Monthly Calamity Fund (LDRRMF) Utilization Reporting to COA',
    category: 'disaster_special',
    categoryLabel: 'Disaster & Special Funds',
    basis: ['Item 5.1.5 of COA Circular No. 2012-002'],
    findings:
      'Monthly Reports on Sources and Utilization of the Disaster Risk Reduction and Management Fund (LDRRMF) were not submitted to the COA auditor within statutory deadlines.',
    recommendations: [
      'City LDRRM Officer to submit prescribed monthly reports on LDRRMF sources and utilization promptly to the COA Auditor.',
    ],
    agencyActionPlan:
      'CDRRMO submitted January to October 2024 reports upon audit request and instituted regular monthly submission procedures.',
    responsibleOffice:
      'City Disaster Risk Reduction & Management Office (CDRRMO)',
    targetTimeline: 'March 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'for_monitoring',
    coaValidationLabel: 'For Continued Monitoring',
    coaValidationRemarks:
      'Backlogged reports submitted; regular monthly submission compliance monitored.',
  },
  {
    id: 15,
    obsNumber: 15,
    title:
      'Gender and Development (GAD) Budget Utilization & Agenda Formulation',
    category: 'disaster_special',
    categoryLabel: 'Disaster & Special Funds',
    amountInvolved: 104367000.0,
    amountFormatted: '₱104.37M Budget (₱102.62M Utilized)',
    basis: [
      'PCW-DILG-DBM-NEDA JMC No. 2013-01',
      'PCW-DILG-DBM-NEDA JMC No. 2016-01',
    ],
    findings:
      'Gender mainstreaming on GAD Programs, Projects, and Activities (₱104.37M appropriation, ₱102.62M utilized / 98.32%) was not fully observed as several appropriations were either over-utilized, under-utilized, or unutilized, and the multi-year GAD Agenda was not updated.',
    recommendations: [
      'GAD Focal Person to conduct re-assessment of gender mainstreaming, utilize M&E team findings, and formulate the City GAD Agenda.',
    ],
    agencyActionPlan:
      'GAD Focal Point System scheduled the multi-sectoral City GAD Agenda formulation workshop for November 4–7, 2025.',
    responsibleOffice: 'GAD Focal Point System & City Planning Office',
    targetTimeline: 'November 2025 – December 2025',
    agencyStatus: 'Ongoing',
    coaValidationStatus: 'in_progress',
    coaValidationLabel: 'GAD Agenda Workshop Scheduled',
    coaValidationRemarks:
      'City GAD Agenda formulation scheduled for November 4–7, 2025; results subject to next audit.',
  },
];

export interface SefFinancialItem {
  label: string;
  originalBudget: number;
  finalBudget: number;
  actualAmount: number;
  difference: number;
  utilizationRate: number;
  formattedFinalBudget: string;
  formattedActual: string;
  formattedBalance: string;
}

export interface SefSchoolLot {
  name: string;
  location: string;
  area: string;
  amount: number;
  formattedAmount: string;
  purpose: string;
}

export interface SefComplianceAudit {
  title: string;
  reportDate: string;
  transmittalDate: string;
  totalBudget: number;
  baseBudget: number;
  supplementalBudget: number;
  resolutions: {
    annualBudget: string;
    supplementalBudget: string;
  };
  supervisingOffice: string;
  legalBasis: string[];
  boardComposition: {
    chairperson: string;
    coChairpersons: string[];
    members: string[];
    secretariat: string[];
  };
  financialBreakdown: {
    revenue: {
      propertyTax: number;
      otherReceipts: number;
      totalReceipts: number;
      finalBudget: number;
      collectionRate: number;
      formattedTotal: string;
    };
    expenditures: {
      mooe: SefFinancialItem;
      capitalOutlay: SefFinancialItem;
      total: SefFinancialItem;
    };
    schoolLots: SefSchoolLot[];
    totalSchoolLotsValue: number;
    formattedSchoolLotsValue: string;
  };
  conclusion: string;
  finding: string;
  recommendations: string[];
  managementResponse: string;
  correctiveActions: string[];
  proofOfPostingLocation: string;
  documentUrl: string;
  documentSize: string;
}

export const COA_SEF_COMPLIANCE_AUDIT_2024: SefComplianceAudit = {
  title:
    'Management Letter on the Compliance Audit on the Transparency and Accountability in the Allocation and Utilization of the Special Education Fund (SEF)',
  reportDate: 'June 10, 2025',
  transmittalDate: 'June 10, 2025',
  totalBudget: 86000000.0,
  baseBudget: 66000000.0,
  supplementalBudget: 20000000.0,
  resolutions: {
    annualBudget:
      'LSB Resolution No. 08, s. 2023 (October 20, 2023) — ₱66,000,000.00',
    supplementalBudget:
      'LSB Resolution No. 06-2024 (November 8, 2024) — ₱20,000,000.00',
  },
  supervisingOffice:
    'COA Regional Office No. IV-A, Local Government Audit Sector B - Province of Cavite',
  legalBasis: [
    'DepEd-DBM-DILG Joint Circular No. 1, s. 2017 (Revised SEF Guidelines)',
    'DILG Full Disclosure Policy (FDP) Memorandum Circular',
    'R.A. No. 7160 (Local Government Code — SEF Provisions)',
  ],
  boardComposition: {
    chairperson: 'Hon. Gemma Buendia-Lubigan (City Mayor)',
    coChairpersons: [
      'Ms. Ma. Jovy P. Legaspi (Public Schools District Supervisor - District 1)',
      'Ms. Carolina R. Magallanes (Public Schools District Supervisor - District 2)',
    ],
    members: [
      'Hon. Joyce Ann C. Mojica (SP Chairperson, Committee on Education)',
      'Atty. Jeanette B. Tolentino (City Administrator)',
      'Atty. Kim M. Moral (City Legal Officer)',
      'Ms. Bernardita L. Fidel (Acting Head, City Budget Office)',
      'Ms. Ferlinda M. Paz (City Treasurer)',
      'Ms. Nora N. Delos Santos (City Social Welfare and Development Officer)',
      'Hon. John Allyson P. Sepacio (SK Federation President)',
      'Mr. Magdaleno R. Lubigan (Principal, Trece Martires City National High School)',
      'Engr. Aurelio D. De Ocampo (City Engineer)',
      'Ms. Celia Lubigan (TMC Teachers Association President)',
      'Mr. Jaime C. Siyang (General PTA President)',
    ],
    secretariat: [
      'Ms. Shirlyn Leachon (Administrative Assistant II, TMC District Office)',
      'Ms. Basilisa Digma (Principal IV, TMCES - District 1)',
      'Ms. Janine A. Costa (Principal III, Kanggahan ES - District 2)',
      'Ms. Lorna T. Sayaman (Board Secretary III)',
    ],
  },
  financialBreakdown: {
    revenue: {
      propertyTax: 78231823.09,
      otherReceipts: 137066.78,
      totalReceipts: 78368889.87,
      finalBudget: 86000000.0,
      collectionRate: 91.13,
      formattedTotal: '₱78,368,889.87',
    },
    expenditures: {
      mooe: {
        label: 'Maintenance & Other Operating Expenses (MOOE)',
        originalBudget: 43844000.0,
        finalBudget: 62541000.0,
        actualAmount: 59710513.52,
        difference: 2830486.48,
        utilizationRate: 95.47,
        formattedFinalBudget: '₱62,541,000.00',
        formattedActual: '₱59,710,513.52',
        formattedBalance: '₱2,830,486.48',
      },
      capitalOutlay: {
        label: 'Capital Outlay (CO) — School Infrastructure & Equipment',
        originalBudget: 22156000.0,
        finalBudget: 23459000.0,
        actualAmount: 23279421.01,
        difference: 179578.99,
        utilizationRate: 99.23,
        formattedFinalBudget: '₱23,459,000.00',
        formattedActual: '₱23,279,421.01',
        formattedBalance: '₱179,578.99',
      },
      total: {
        label: 'Total Special Education Fund (SEF) Program Execution',
        originalBudget: 66000000.0,
        finalBudget: 86000000.0,
        actualAmount: 82989934.53,
        difference: 3010065.47,
        utilizationRate: 96.5,
        formattedFinalBudget: '₱86,000,000.00',
        formattedActual: '₱82,989,934.53',
        formattedBalance: '₱3,010,065.47',
      },
    },
    schoolLots: [
      {
        name: 'De Ocampo Elementary School Lot',
        location: 'Barangay De Ocampo',
        area: '5,364 sq. meters',
        amount: 2200000.0,
        formattedAmount: '₱2,200,000.00',
        purpose: 'School Site & Campus Ground',
      },
      {
        name: 'Lapidario Elementary School Extension Lot',
        location: 'Barangay Lapidario',
        area: '3,000 sq. meters',
        amount: 4500000.0,
        formattedAmount: '₱4,500,000.00',
        purpose: 'Classroom Expansion & Facilities',
      },
      {
        name: 'Cabuco Elementary School Lot',
        location: 'Barangay Cabuco',
        area: 'Elementary School Site',
        amount: 12974400.0,
        formattedAmount: '₱12,974,400.00',
        purpose: 'School Campus Development',
      },
    ],
    totalSchoolLotsValue: 19674400.0,
    formattedSchoolLotsValue: '₱19,674,400.00',
  },
  conclusion:
    'The promotion and enhancement of transparency and accountability in the allocation and utilization of the Special Education Fund (₱86.00M budget) was not in compliance in all material respects with Item 6.1 of DepEd-DBM-DILG JC No. 1, s. 2017 due to missing oversight agency submissions and lack of web/bulletin postings at the time of audit.',
  finding:
    'The Local School Board (LSB) did not submit the SEF budget and quarterly/annual SEF Utilization Reports to the DepEd Central Office and DBM Regional Office (only submitted to Sangguniang Panlungsod and DILG Regional Office, with missing proof of receipt dates for Q1-Q3). Duly received copies of Q1–Q3 reports were not provided to the Auditor, and reports were not posted on the City website or in at least 3 conspicuous public places at the time of audit.',
  recommendations: [
    'City Mayor to direct LSB personnel to ensure prompt and complete submission of SEF Budget and Utilization Reports (SEF Form No. 1 / Annex B) to DepEd CO, DBM RO, DILG, and COA.',
    'Post quarterly and annual SEF reports on the official website of the City and in at least three (3) conspicuous public places.',
    'Establish an internal monitoring system and compliance verification process to guarantee timely reporting.',
  ],
  managementResponse:
    'Reporting was historically provided directly to the DILG Full Disclosure Policy Portal, but submissions to DepEd and DBM were inadvertently overlooked during the LSB transition and reorganization in 2019 without specific advisory reminders. The City remains firmly committed to full education fund transparency.',
  correctiveActions: [
    'Mayor Gemma B. Lubigan instructed LSB Secretariat and Treasury to submit all required reports promptly to DepEd CO and DBM RO.',
    'Instituted internal deadline monitoring calendar for quarterly SEF disclosures.',
    'Posted official SEF Budget and Utilization Reports on the public Bulletin Board at Trece Martires City Hall (with photo documentation submitted to COA).',
  ],
  proofOfPostingLocation:
    'City Hall Main Bulletin Board, Trece Martires City, Cavite',
  documentUrl:
    '/documents/transparency/audit-2024/TreceMartiresCity2024_CAR_SEF.pdf',
  documentSize: '3.2 MB',
};
