import { useState } from 'react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import DpwhProjectsExplorer from '../components/transparency/DpwhProjectsExplorer';
import {
  Building2,
  HardHat,
  ShieldCheck,
  MapPin,
  Landmark,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function DpwhTransparency() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'trece-focus'>(
    'explorer'
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Transparency', href: '/government/transparency-documents' },
    { label: 'DPWH Infrastructure Projects', href: '/transparency/dpwh' },
  ];

  return (
    <>
      <SEO
        title="DPWH Infrastructure Projects Registry | City of Trece Martires"
        description="Official DPWH infrastructure projects transparency registry for Trece Martires City, Cavite. Track budgets, contractors, physical progress, and public works under Cavite 1st DEO."
        keywords="DPWH Trece Martires, Cavite 1st DEO, Trece Martires infrastructure, Governor's Drive, Trece-Indang Road, public works, city projects"
      />

      <main className="flex-grow bg-slate-50/50 pb-20">
        {/* Top Header Banner */}
        <section
          aria-label="Page Header"
          className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white py-10 sm:py-14 border-b border-blue-900/40 shadow-inner"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-6 text-blue-200"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                    <HardHat
                      className="w-3.5 h-3.5 text-amber-300"
                      aria-hidden="true"
                    />
                    City Public Works Registry
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-blue-100">
                    DPWH Cavite 1st DEO
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires Infrastructure Projects
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Transparency portal for Department of Public Works and
                  Highways (DPWH) contracts, approved budgets, contractors, and
                  physical completion across the{' '}
                  <strong className="text-amber-300">
                    13 Barangays of Trece Martires City
                  </strong>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/20 text-xs font-medium text-blue-100 space-y-0.5">
                  <div className="font-bold text-white">DPWH Jurisdiction</div>
                  <div>Cavite 1st District Engineering Office</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Tab Navigation (Reflowable without Horizontal Scroll) */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
          <div className="container mx-auto px-4 max-w-7xl">
            <div
              role="tablist"
              aria-label="DPWH Transparency Portal Sections"
              className="flex flex-wrap items-center gap-2 py-2"
            >
              <button
                role="tab"
                id="tab-explorer"
                aria-selected={activeTab === 'explorer'}
                aria-controls="panel-explorer"
                onClick={() => setActiveTab('explorer')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'explorer'
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Layers className="w-4 h-4" aria-hidden="true" />
                <span>Projects Registry</span>
              </button>

              <button
                role="tab"
                id="tab-trece-focus"
                aria-selected={activeTab === 'trece-focus'}
                aria-controls="panel-trece-focus"
                onClick={() => setActiveTab('trece-focus')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[40px] ${
                  activeTab === 'trece-focus'
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
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
          {activeTab === 'explorer' && (
            <div
              id="panel-explorer"
              role="tabpanel"
              aria-labelledby="tab-explorer"
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
                    (Cavitex/SLEX connector), the Trece-Indang Road, and the
                    Tejero-General Trias corridor.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 space-y-3">
                    <div className="flex items-center gap-2 text-[#003893] font-bold text-sm">
                      <MapPin
                        className="w-4 h-4 text-amber-500"
                        aria-hidden="true"
                      />
                      <span>Governor's Drive (S01947LZ)</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Primary secondary road corridor crossing Brgy. Hugo Perez,
                      Cabuco, and San Agustin. Ongoing and completed multi-lane
                      widening and asset preservation programs.
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
                    onClick={() => setActiveTab('explorer')}
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
