import { useState } from 'react';
import { useLocation } from 'react-router';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import BarangayPsgcTable from '../components/demographics/BarangayPsgcTable';
import PsaClassificationExplorer from '../components/demographics/PsaClassificationExplorer';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import {
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
} from '../data/psaClassifications';
import {
  Users,
  MapPin,
  FileSpreadsheet,
  ExternalLink,
  BookOpen,
  Database,
  Vote,
} from 'lucide-react';

const getTabFromHash = (hash: string): 'overview' | 'classifications' => {
  if (hash === '#psa-classifications' || hash === '#classifications')
    return 'classifications';
  return 'overview';
};

export default function Demographics() {
  const location = useLocation();
  const [userSelectedTab, setUserSelectedTab] = useState<
    'overview' | 'classifications' | null
  >(null);

  const activeTab = userSelectedTab ?? getTabFromHash(location.hash);
  const setActiveTab = (tab: 'overview' | 'classifications') => {
    setUserSelectedTab(tab);
    window.history.replaceState(
      null,
      '',
      tab === 'classifications' ? '#psa-classifications' : '#overview'
    );
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Statistics', href: '/government/reports-and-statistics' },
    {
      label: 'Summary Demographics & PSA Standards',
      href: '/demographics',
    },
  ];

  return (
    <>
      <SEO
        title="Summary Demographics & PSA Classification Systems | BetterTrece"
        description="Official summary demographics for Trece Martires City, Cavite (PSGC 042122000), COMELEC 2025 registered voters (121,194 voters), 13 Barangays census data, and PSA PSGC API standards."
        keywords="Trece Martires summary demographics, registered voters 2025, COMELEC Trece, PSGC API, PSA classification, Cavite census, 13 barangays, Philippine Standard Geographic Code"
      />

      <main className="flex-grow bg-slate-50/50 pb-16">
        {/* Top Header Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-10 sm:pb-14 border-b border-blue-900/40 shadow-inner">
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-6 text-blue-200"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-blue-100">
                    PSGC: {TRECE_MUNICIPAL_PROFILE.psgcCityCode}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                    <Vote className="w-3 h-3" />
                    <span>
                      <AnimatedCounter
                        value={TRECE_VOTER_STATISTICS_2025.registeredVoters}
                      />{' '}
                      Registered Voters (2025)
                    </span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires Summary Demographics &amp; PSA Standards
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Explore official summary demographics, COMELEC 2025 electoral
                  registry, 13 barangays population census, integrated
                  Philippine Statistics Authority (PSA) PSGC API data, and 9
                  standard classification systems.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://classification.psa.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-amber-300 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md"
                >
                  <span>PSA Classification Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation (Clean 2 Tabs) */}
        <div className="bg-white border-b border-gray-200 shadow-xs">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Summary Demographics</span>
              </button>

              <button
                onClick={() => setActiveTab('classifications')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'classifications'
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>9 PSA Classification Systems</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 max-w-7xl mt-8">
          {activeTab === 'overview' && (
            <Section className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Summary Demographics &amp; PSGC Directory
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-3xl">
                  Official summary demographics from the Philippine Statistics
                  Authority (PSA), COMELEC May 2025 voter registration
                  statistics, and 13 constituent barangays geocode registry.
                </p>
              </div>

              {/* 1. Electoral & Demographic Summary Cards + Unified Official PSA REST API Table */}
              <BarangayPsgcTable />

              {/* 2. Dataset Metadata & Provenance Callout */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold text-base">
                  <Database className="w-5 h-5 text-[#003893]" />
                  <h3>About the Displayed Datasets &amp; Sources</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-gray-500 font-semibold mb-1">
                      Electoral Registry Data
                    </div>
                    <div className="font-bold text-gray-900">COMELEC EBAD</div>
                    <div className="text-gray-500 mt-0.5">
                      May 12, 2025 Elections (
                      <AnimatedCounter
                        value={TRECE_VOTER_STATISTICS_2025.registeredVoters}
                      />{' '}
                      voters,{' '}
                      <AnimatedCounter
                        value={TRECE_VOTER_STATISTICS_2025.votingCenters}
                      />{' '}
                      centers)
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-gray-500 font-semibold mb-1">
                      Population Census
                    </div>
                    <div className="font-bold text-gray-900">
                      PSA 2024 POPCEN &amp; 2020 CPH
                    </div>
                    <div className="text-gray-500 mt-0.5">
                      <AnimatedCounter
                        value={TRECE_MUNICIPAL_PROFILE.totalPopulation2024}
                      />{' '}
                      residents ({TRECE_MUNICIPAL_PROFILE.populationGrowthRate})
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-gray-500 font-semibold mb-1">
                      Geographic Standard
                    </div>
                    <div className="font-bold text-gray-900">
                      PSGC 9-Digit Hierarchy
                    </div>
                    <div className="text-gray-500 mt-0.5">
                      Region 04 &rarr; Cavite 21 &rarr; Trece 22
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-gray-500 font-semibold mb-1">
                      Land Area &amp; Status
                    </div>
                    <div className="font-bold text-gray-900">
                      <AnimatedCounter
                        value={TRECE_MUNICIPAL_PROFILE.totalLandAreaKm2}
                        decimals={2}
                      />{' '}
                      km²
                    </div>
                    <div className="text-gray-500 mt-0.5">
                      2nd Class Component City (RA 981)
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Information Cards Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Geographic Hierarchy
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Region IV-A (CALABARZON, Reg: 04) &rarr; Cavite Province
                    (Prv: 21) &rarr; City of Trece Martires (Mun: 22) &rarr; 13
                    Local Barangays.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Historical Heritage
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Created via Republic Act No. 981 in 1954, all 13 barangays
                    honor the Thirteen Martyrs of Cavite executed in 1896.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Statistical Classifications
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Explore all 9 national classification systems used across
                    economy, education, crime, tourism, and industry.
                  </p>
                </div>
              </div>
            </Section>
          )}

          {activeTab === 'classifications' && (
            <Section className="space-y-6">
              <PsaClassificationExplorer />
            </Section>
          )}
        </div>
      </main>
    </>
  );
}
