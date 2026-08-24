export interface CityFiscalYearData {
  year: number;
  label: string;
  totalReceipts: number; // in Million Pesos
  headlineTotal: string; // e.g. "₱2.1083 billion"
  subtitle: string;
  mathNote: string;
  cards: {
    cityTaxes: {
      amount: string; // e.g. "₱630.6M"
      rawAmount: number;
      percentage: string; // e.g. "29.9% of the total"
    };
    nonTaxSources: {
      amount: string; // e.g. "₱223.6M"
      rawAmount: number;
      percentage: string; // e.g. "10.6% of the total"
    };
    nationalTaxShare: {
      amount: string; // e.g. "₱1,169.5M"
      rawAmount: number;
      percentage: string; // e.g. "55.5% of the total"
    };
    yoyChange: {
      value: string; // e.g. "+12.5%"
      label: string; // e.g. "Compared with FY 2025"
      isPositive: boolean;
    };
  };
  details: {
    beginningCash: number;
    taxes: {
      basicRpt: number;
      sef: number;
      businessTax: number;
      otherTaxes: number;
      total: number;
    };
    nonTax: {
      regulatoryFees: number;
      userCharges: number;
      economicEnterprises: number;
      otherReceipts: number;
      total: number;
    };
    external: {
      nta: number;
      grantsAids: number;
      otherShares: number;
      total: number;
    };
    nonIncome: {
      loanProceeds: number;
      assetSales: number;
      total: number;
    };
    expenditures: {
      generalServices: number;
      economicServices: number;
      socialServices: number;
      debtServiceInterest: number;
      operatingTotal: number;
      capitalOutlay: number;
      loanAmortizationPrincipal: number;
      totalExpenditures: number;
    };
    fundAvailable: number;
    priorYearPayables: number;
    continuingAppropriations: number;
    endingCash: number;
  };
}

export const CITY_BUDGET_REVENUE_DATA: Record<number, CityFiscalYearData> = {
  2026: {
    year: 2026,
    label: 'FY 2026 (Latest)',
    totalReceipts: 2108.33,
    headlineTotal: '₱2.1083 billion',
    subtitle:
      "Here is how the City Treasurer's reported revenue breaks down. These figures cover money received during the fiscal year. They are not the city's annual budget.",
    mathNote:
      'About the math: The amounts add up to ₱2,108.33 million (including external grants/aids of ₱10.02M and loan proceeds of ₱74.70M). We calculated the percentages and year-on-year change from the rounded figures in the official report, so totals may differ slightly because of rounding.',
    cards: {
      cityTaxes: {
        amount: '₱630.6M',
        rawAmount: 630.55,
        percentage: '29.9% of the total',
      },
      nonTaxSources: {
        amount: '₱223.6M',
        rawAmount: 223.6,
        percentage: '10.6% of the total',
      },
      nationalTaxShare: {
        amount: '₱1,169.5M',
        rawAmount: 1169.45,
        percentage: '55.5% of the total',
      },
      yoyChange: {
        value: '+12.5%',
        label: 'Compared with FY 2025',
        isPositive: true,
      },
    },
    details: {
      beginningCash: 1476.94,
      taxes: {
        basicRpt: 136.6,
        sef: 118.89,
        businessTax: 291.62,
        otherTaxes: 83.43,
        total: 630.55,
      },
      nonTax: {
        regulatoryFees: 70.98,
        userCharges: 151.33,
        economicEnterprises: 0.0,
        otherReceipts: 1.3,
        total: 223.6,
      },
      external: {
        nta: 1169.45,
        grantsAids: 10.02,
        otherShares: 0.0,
        total: 1179.48,
      },
      nonIncome: {
        loanProceeds: 74.7,
        assetSales: 0.0,
        total: 74.7,
      },
      expenditures: {
        generalServices: 967.92,
        economicServices: 387.34,
        socialServices: 350.46,
        debtServiceInterest: 16.7,
        operatingTotal: 1722.42,
        capitalOutlay: 91.85,
        loanAmortizationPrincipal: 29.22,
        totalExpenditures: 1843.48,
      },
      fundAvailable: 1741.8,
      priorYearPayables: 32.58,
      continuingAppropriations: 397.48,
      endingCash: 1311.74,
    },
  },
  2025: {
    year: 2025,
    label: 'FY 2025',
    totalReceipts: 1874.2,
    headlineTotal: '₱1.8742 billion',
    subtitle:
      "Here is how the City Treasurer's reported revenue breaks down. These figures cover money received during the fiscal year. They are not the city's annual budget.",
    mathNote:
      'About the math: The amounts add up to ₱1,874.20 million (including external grants/aids of ₱10.02M and loan proceeds of ₱70.47M). We calculated the percentages and year-on-year change from the rounded figures in the official report, so totals may differ slightly because of rounding.',
    cards: {
      cityTaxes: {
        amount: '₱576.5M',
        rawAmount: 576.48,
        percentage: '30.8% of the total',
      },
      nonTaxSources: {
        amount: '₱197.4M',
        rawAmount: 197.35,
        percentage: '10.5% of the total',
      },
      nationalTaxShare: {
        amount: '₱1,019.9M',
        rawAmount: 1019.88,
        percentage: '54.4% of the total',
      },
      yoyChange: {
        value: '-2.8%',
        label: 'Compared with FY 2024 (*normalized)',
        isPositive: false,
      },
    },
    details: {
      beginningCash: 1644.73,
      taxes: {
        basicRpt: 125.92,
        sef: 109.6,
        businessTax: 265.11,
        otherTaxes: 75.85,
        total: 576.48,
      },
      nonTax: {
        regulatoryFees: 64.52,
        userCharges: 131.59,
        economicEnterprises: 0.0,
        otherReceipts: 1.24,
        total: 197.35,
      },
      external: {
        nta: 1019.88,
        grantsAids: 10.02,
        otherShares: 0.0,
        total: 1029.9,
      },
      nonIncome: {
        loanProceeds: 70.47,
        assetSales: 0.0,
        total: 70.47,
      },
      expenditures: {
        generalServices: 858.49,
        economicServices: 343.55,
        socialServices: 310.84,
        debtServiceInterest: 14.81,
        operatingTotal: 1527.69,
        capitalOutlay: 86.65,
        loanAmortizationPrincipal: 29.22,
        totalExpenditures: 1643.56,
      },
      fundAvailable: 1875.37,
      priorYearPayables: 37.08,
      continuingAppropriations: 361.35,
      endingCash: 1476.94,
    },
  },
  2024: {
    year: 2024,
    label: 'FY 2024',
    totalReceipts: 1927.77,
    headlineTotal: '₱1.9278 billion',
    subtitle:
      "Here is how the City Treasurer's reported revenue breaks down. These figures cover money received during the fiscal year. They are not the city's annual budget.",
    mathNote:
      'About the math: The amounts add up to ₱1,927.77 million (including external grants/aids of ₱15.50M and loan proceeds of ₱400.00M). We calculated the percentages from the rounded figures in the official report, so totals may differ slightly because of rounding.',
    cards: {
      cityTaxes: {
        amount: '₱478.3M',
        rawAmount: 478.3,
        percentage: '24.8% of the total',
      },
      nonTaxSources: {
        amount: '₱174.3M',
        rawAmount: 174.26,
        percentage: '9.0% of the total',
      },
      nationalTaxShare: {
        amount: '₱859.7M',
        rawAmount: 859.71,
        percentage: '44.6% of the total',
      },
      yoyChange: {
        value: 'Baseline',
        label: 'FY 2024 SRE Benchmark',
        isPositive: true,
      },
    },
    details: {
      beginningCash: 1448.84,
      taxes: {
        basicRpt: 90.0,
        sef: 78.33,
        businessTax: 241.01,
        otherTaxes: 68.95,
        total: 478.3,
      },
      nonTax: {
        regulatoryFees: 58.66,
        userCharges: 114.43,
        economicEnterprises: 0.0,
        otherReceipts: 1.18,
        total: 174.26,
      },
      external: {
        nta: 859.71,
        grantsAids: 15.5,
        otherShares: 0.0,
        total: 875.21,
      },
      nonIncome: {
        loanProceeds: 400.0,
        assetSales: 0.0,
        total: 400.0,
      },
      expenditures: {
        generalServices: 482.64,
        economicServices: 196.87,
        socialServices: 372.77,
        debtServiceInterest: 26.56,
        operatingTotal: 1078.84,
        capitalOutlay: 153.96,
        loanAmortizationPrincipal: 29.22,
        totalExpenditures: 1262.03,
      },
      fundAvailable: 2114.59,
      priorYearPayables: 152.96,
      continuingAppropriations: 316.89,
      endingCash: 1644.73,
    },
  },
};

export const SOURCE_ATTRIBUTION = {
  primary: 'Department of Budget and Management (DBM)',
  secondary:
    'Department of Finance – Bureau of Local Government Finance (DOF-BLGF) LIFT System',
  reportTitle: 'Statement of Receipts and Expenditures (SRE), Tables F.13–F.15',
  legalBasis:
    'Local Government Code of 1991 (RA 7160) & DILG Full Disclosure Policy',
};
