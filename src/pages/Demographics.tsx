import { useState } from 'react';
import { useLocation } from 'react-router';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import BarangayPsgcTable from '../components/demographics/BarangayPsgcTable';
import PsaClassificationExplorer from '../components/demographics/PsaClassificationExplorer';
import { TRECE_CITY_DEMOGRAPHICS } from '../data/psaClassifications';
import {
  Users,
  MapPin,
  FileSpreadsheet,
  ExternalLink,
  BookOpen,
  Database,
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
  const setActiveTab = (tab: 'overview' | 'classifications') =>
    setUserSelectedTab(tab);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Statistics', href: '/government/reports-and-statistics' },
    { label: 'City Demographics & PSA Classifications', href: '/demographics' },
  ];

  return (
    <>
      <SEO
        title="City Demographics & PSA Classification Systems | BetterTrece"
        description="Comprehensive demographic data for Trece Martires City, Cavite (PSGC 042122000), 13 Barangays census data, and official Philippine Statistics Authority (PSA) Standard Classification Systems."
        keywords="Trece Martires demographics, PSGC, PSA classification, PSOC, PCOICOP, PSIC, PCPC, PSCC, PSCED, PSCCS, PTSCS, Cavite census, open data"
      />

      <main className="flex-grow bg-slate-50/50 pb-16">
        {/* Top Header Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white py-10 sm:py-14 border-b border-blue-900/40 shadow-inner">
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-6 text-blue-200"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Official Statistics &amp; Standards
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-blue-100">
                    PSA Reference: {TRECE_CITY_DEMOGRAPHICS.psgcCityCode}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires Demographics &amp; PSA Classifications
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Explore official demographic metrics, 13 barangays census
                  statistics, and the 9 Philippine Statistics Authority (PSA)
                  Standard Classification Systems for civic research, planning,
                  and open-data API integration.
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

        {/* Tab Navigation */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>City Demographics &amp; 13 Barangays</span>
              </button>

              <button
                onClick={() => setActiveTab('classifications')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
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
                <span className="text-xs font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded">
                  Geographic &amp; Census Overview
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                  Trece Martires City Demographics &amp; PSGC Directory
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-3xl">
                  Official Philippine Standard Geographic Code (PSGC) registry
                  and population census data from the Philippine Statistics
                  Authority (PSA) for Trece Martires City and its 13 constituent
                  barangays.
                </p>
              </div>

              <BarangayPsgcTable />

              {/* Dataset Metadata & Provenance Callout */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold text-base">
                  <Database className="w-5 h-5 text-[#003893]" />
                  <h3>About the Displayed Dataset</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-gray-500 font-semibold mb-1">
                      Primary Source
                    </div>
                    <div className="font-bold text-gray-900">
                      Philippine Statistics Authority (PSA)
                    </div>
                    <div className="text-gray-500 mt-0.5">
                      Republic of the Philippines
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="text-gray-500 font-semibold mb-1">
                      Census Period
                    </div>
                    <div className="font-bold text-gray-900">
                      2020 CPH &amp; 2015 POPCEN
                    </div>
                    <div className="text-gray-500 mt-0.5">
                      Intercensal Growth: +35.2%
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
                      City Land Area
                    </div>
                    <div className="font-bold text-gray-900">39.17 km²</div>
                    <div className="text-gray-500 mt-0.5">
                      CPDO / City Hall Records
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Cards Strip */}
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
