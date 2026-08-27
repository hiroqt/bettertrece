import { useLocation, useSearchParams } from 'react-router';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import DpwhProjectsExplorer from '../components/transparency/DpwhProjectsExplorer';
import CityRevenueWidget from '../components/transparency/CityRevenueWidget';
import CoaAuditWidget from '../components/transparency/CoaAuditWidget';
import GaaBudgetWidget from '../components/transparency/GaaBudgetWidget';
import PoliticalDynastiesExplorer from '../components/transparency/PoliticalDynastiesExplorer';
import {
  Building2,
  ShieldCheck,
  Landmark,
  Layers,
  ArrowRight,
  Coins,
  HardHat,
  FileCheck2,
  Users,
} from 'lucide-react';

export default function DpwhTransparency() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = ():
    | 'budget-revenue'
    | 'gaa'
    | 'explorer'
    | 'trece-focus'
    | 'audit'
    | 'dynasty' => {
    const tabParam = searchParams.get('tab');
    if (
      tabParam === 'dynasty' ||
      tabParam === 'dynasties' ||
      tabParam === 'political-dynasties'
    ) {
      return 'dynasty';
    }
    if (
      tabParam === 'gaa' ||
      tabParam === 'national-budget' ||
      tabParam === 'national' ||
      tabParam === 'appropriations'
    ) {
      return 'gaa';
    }
    if (
      tabParam === 'audit' ||
      tabParam === 'coa' ||
      tabParam === 'aar' ||
      tabParam === 'audit-report'
    ) {
      return 'audit';
    }
    if (
      tabParam === 'explorer' ||
      tabParam === 'dpwh' ||
      tabParam === 'api-tester' ||
      tabParam === 'live-api'
    ) {
      return 'explorer';
    }
    if (tabParam === 'trece-focus' || tabParam === 'corridors') {
      return 'trece-focus';
    }
    if (
      tabParam === 'budget-revenue' ||
      tabParam === 'revenue' ||
      tabParam === 'budget'
    ) {
      return 'budget-revenue';
    }

    if (
      location.hash === '#dynasty' ||
      location.hash === '#dynasties' ||
      location.hash === '#political-dynasties'
    ) {
      return 'dynasty';
    }
    if (location.hash === '#gaa' || location.hash === '#national-budget') {
      return 'gaa';
    }
    if (location.hash === '#audit' || location.hash === '#coa') {
      return 'audit';
    }
    if (
      location.pathname === '/transparency/dpwh' ||
      location.hash === '#dpwh' ||
      location.hash === '#explorer' ||
      location.hash === '#api-tester'
    ) {
      return 'explorer';
    }
    if (location.hash === '#trece-focus') {
      return 'trece-focus';
    }

    // Default to 'budget-revenue' (Revenue & Budget)
    return 'budget-revenue';
  };

  const activeTab = getInitialTab();

  const handleTabChange = (
    tab:
      | 'budget-revenue'
      | 'gaa'
      | 'explorer'
      | 'trece-focus'
      | 'audit'
      | 'dynasty'
  ) => {
    setSearchParams(
      prev => {
        const next = new URLSearchParams(prev);
        if (tab === 'budget-revenue') {
          next.delete('tab');
        } else {
          next.set('tab', tab);
        }
        return next;
      },
      { replace: true }
    );
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Transparency', href: '/government/transparency-documents' },
    {
      label: 'City Financial & Infrastructure Transparency',
      href: '/transparency',
    },
  ];

  return (
    <>
      <SEO
        title="City Revenue, COA Audit, GAA Budget & Financial Transparency | Trece Martires City"
        description="Official civic transparency portal for Trece Martires City, Cavite. Track National GAA appropriations, COA Annual Audit Reports, DBM/DOF-BLGF city revenues, local budgets, and DPWH infrastructure public works."
        keywords="Trece Martires budget, GAA Trece Martires, COA audit Trece Martires, COA AAR 2024, city revenue, DBM Trece Martires, DPWH Trece Martires, Cavite 1st DEO, public works, city taxes, SRE Trece Martires"
      />

      <main className="flex-grow bg-slate-50/50 pb-20">
        {/* Top Header Banner */}
        <section
          aria-label="Page Header"
          className="bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-12 sm:pb-16 border-b border-blue-900/40 shadow-inner"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-6 text-blue-200"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires{' '}
                  <span className="text-amber-300">Transparency</span> Portal
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Open data access to the{' '}
                  <strong className="text-amber-300 font-bold">
                    National Budget (GAA 2020–2026)
                  </strong>
                  , the{' '}
                  <strong className="text-amber-300 font-bold">
                    COA Annual Audit Report (AAR 2024)
                  </strong>
                  , the{' '}
                  <strong className="text-amber-300 font-bold">
                    City Financial Statement of Receipts &amp; Expenditures
                    (DBM)
                  </strong>
                  , and DPWH infrastructure public works across the{' '}
                  <strong className="text-amber-300 font-bold">
                    13 Barangays of Trece Martires City
                  </strong>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 text-xs font-medium text-blue-200 space-y-0.5">
                  <div className="font-bold text-white">Official Sources</div>
                  <div className="text-blue-100/90">
                    DBM GAA &bull; COA Reg. IV-A &bull; BLGF &bull; DPWH
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation - 5 Unified Tabs */}
        <div className="bg-white border-b border-zinc-200 shadow-2xs sticky top-16 z-30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div
              role="tablist"
              aria-label="Transparency Portal Sections"
              className="flex items-center sm:flex-wrap gap-2 py-2 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {/* Tab 1: City Revenue & Budget (Default) */}
              <button
                role="tab"
                id="tab-budget-revenue"
                aria-selected={activeTab === 'budget-revenue'}
                aria-controls="panel-budget-revenue"
                onClick={() => handleTabChange('budget-revenue')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'budget-revenue'
                    ? 'bg-[#003893] text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <Coins className="w-4 h-4" aria-hidden="true" />
                <span>City Revenue &amp; Budget (DBM)</span>
              </button>

              {/* Tab 2: GAA National Budget (2020–2026) */}
              <button
                role="tab"
                id="tab-gaa"
                aria-selected={activeTab === 'gaa'}
                aria-controls="panel-gaa"
                onClick={() => handleTabChange('gaa')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'gaa'
                    ? 'bg-[#003893] text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <Landmark className="w-4 h-4" aria-hidden="true" />
                <span>National Budget (GAA 2020–2026)</span>
              </button>

              {/* Tab 3: COA Annual Audit Report (2024) */}
              <button
                role="tab"
                id="tab-audit"
                aria-selected={activeTab === 'audit'}
                aria-controls="panel-audit"
                onClick={() => handleTabChange('audit')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'audit'
                    ? 'bg-[#003893] text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                <span>COA Annual Audit (2024)</span>
              </button>

              {/* Tab 4: DPWH Infrastructure Tracker */}
              <button
                role="tab"
                id="tab-explorer"
                aria-selected={activeTab === 'explorer'}
                aria-controls="panel-explorer"
                onClick={() => handleTabChange('explorer')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'explorer'
                    ? 'bg-[#003893] text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <HardHat className="w-4 h-4" aria-hidden="true" />
                <span>DPWH Infrastructure Tracker</span>
              </button>

              {/* Tab 5: Political Dynasties & Governance */}
              <button
                role="tab"
                id="tab-dynasty"
                aria-selected={activeTab === 'dynasty'}
                aria-controls="panel-dynasty"
                onClick={() => handleTabChange('dynasty')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'dynasty'
                    ? 'bg-[#003893] text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Political Dynasties</span>
              </button>

              {/* Tab 6: Strategic Corridors & Facilities */}
              <button
                role="tab"
                id="tab-trece-focus"
                aria-selected={activeTab === 'trece-focus'}
                aria-controls="panel-trece-focus"
                onClick={() => handleTabChange('trece-focus')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'trece-focus'
                    ? 'bg-[#003893] text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <Landmark className="w-4 h-4" aria-hidden="true" />
                <span>Strategic Corridors &amp; Facilities</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 max-w-7xl mt-8">
          {activeTab === 'budget-revenue' && (
            <div
              id="panel-budget-revenue"
              role="tabpanel"
              aria-labelledby="tab-budget-revenue"
              className="space-y-8 animate-fadeIn"
            >
              <CityRevenueWidget />
            </div>
          )}

          {activeTab === 'gaa' && (
            <div
              id="panel-gaa"
              role="tabpanel"
              aria-labelledby="tab-gaa"
              className="space-y-8 animate-fadeIn"
            >
              <GaaBudgetWidget />
            </div>
          )}

          {activeTab === 'audit' && (
            <div
              id="panel-audit"
              role="tabpanel"
              aria-labelledby="tab-audit"
              className="space-y-8 animate-fadeIn"
            >
              <CoaAuditWidget />
            </div>
          )}

          {activeTab === 'dynasty' && (
            <div
              id="panel-dynasty"
              role="tabpanel"
              aria-labelledby="tab-dynasty"
              className="space-y-8 animate-fadeIn"
            >
              <PoliticalDynastiesExplorer />
            </div>
          )}

          {activeTab === 'explorer' && (
            <div
              id="panel-explorer"
              role="tabpanel"
              aria-labelledby="tab-explorer"
              className="animate-fadeIn"
            >
              <DpwhProjectsExplorer />
            </div>
          )}

          {activeTab === 'trece-focus' && (
            <div
              id="panel-trece-focus"
              role="tabpanel"
              aria-labelledby="tab-trece-focus"
              className="space-y-8 animate-fadeIn"
            >
              {/* Local Trece Highlight Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="max-w-3xl space-y-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    City Strategic Infrastructure
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    Key Infrastructure Corridors in Trece Martires City
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Trece Martires serves as the administrative capital of
                    Cavite, connecting major arteries like Governor’s Drive
                    (connecting to Dasmariñas and Naic), Tanza–Trece Martires
                    Road, and Trece Martires–Indang Road.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <div className="flex items-center gap-2 text-[#003893] font-bold text-sm">
                      <Layers
                        className="w-4 h-4 text-amber-500"
                        aria-hidden="true"
                      />
                      <span>Governor’s Drive Multi-Lane Widening</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Primary east-west national arterial corridor passing
                      through Hugo Perez, Osorio, Cabuco, and San Agustin.
                      Ongoing and completed multi-lane widening and asset
                      preservation programs.
                    </p>
                    <div className="text-[11px] font-mono text-gray-700 font-bold">
                      GAA Allocation: ₱77.20M (Completed)
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <div className="flex items-center gap-2 text-[#003893] font-bold text-sm">
                      <Building2
                        className="w-4 h-4 text-amber-500"
                        aria-hidden="true"
                      />
                      <span>City Evacuation &amp; Convention Center</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Two-storey disaster-resilient evacuation center and
                      multi-purpose civic complex in Brgy. San Agustin.
                    </p>
                    <div className="text-[11px] font-mono text-gray-700 font-bold">
                      Contract: 24DF0142 (₱49.50M)
                    </div>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <div className="flex items-center gap-2 text-[#003893] font-bold text-sm">
                      <ShieldCheck
                        className="w-4 h-4 text-amber-500"
                        aria-hidden="true"
                      />
                      <span>Rio Grande River Basin Protection</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Flood mitigation and river dike slope protection
                      structures protecting residential communities in Barangay
                      Aguado.
                    </p>
                    <div className="text-[11px] font-mono text-gray-700 font-bold">
                      Contract: 24DF0038 (₱57.90M)
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#003893]">
                      Responsible District Engineering Office
                    </h3>
                    <p className="text-xs text-gray-700">
                      National roads, bridges, public buildings, and flood
                      control in Trece Martires City are under the jurisdiction
                      of the{' '}
                      <strong>
                        DPWH Cavite 1st District Engineering Office
                      </strong>{' '}
                      (located in Trece Martires City).
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange('explorer')}
                    className="inline-flex items-center gap-1.5 bg-[#003893] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-[#003893]"
                  >
                    <span>Browse Trece Projects</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
