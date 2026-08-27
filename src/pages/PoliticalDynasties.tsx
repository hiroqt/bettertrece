import { useSearchParams, useLocation, Link } from 'react-router';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import PoliticalDynastiesExplorer from '../components/transparency/PoliticalDynastiesExplorer';
import { Landmark, ArrowLeft, ShieldCheck } from 'lucide-react';
import { DYNASTY_SUMMARY } from '../data/transparency/politicalDynasties';

export default function PoliticalDynasties() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const getInitialTab = ():
    'trece' | 'cavite' | 'clans' | 'explorer' | 'methodology' => {
    const tabParam = searchParams.get('tab');
    if (
      tabParam === 'trece' ||
      tabParam === 'trece-martires' ||
      tabParam === 'spotlight'
    ) {
      return 'trece';
    }
    if (
      tabParam === 'cavite' ||
      tabParam === 'province' ||
      tabParam === 'trends'
    ) {
      return 'cavite';
    }
    if (
      tabParam === 'clans' ||
      tabParam === 'families' ||
      tabParam === 'dynasties'
    ) {
      return 'clans';
    }
    if (
      tabParam === 'explorer' ||
      tabParam === 'search' ||
      tabParam === 'roster'
    ) {
      return 'explorer';
    }
    if (
      tabParam === 'methodology' ||
      tabParam === 'about' ||
      tabParam === 'notes'
    ) {
      return 'methodology';
    }

    if (location.hash === '#cavite') return 'cavite';
    if (location.hash === '#clans') return 'clans';
    if (location.hash === '#explorer') return 'explorer';
    if (location.hash === '#methodology') return 'methodology';

    return 'trece';
  };

  const initialTab = getInitialTab();
  const treceSummary = DYNASTY_SUMMARY.treceSummary;
  const caviteSummary = DYNASTY_SUMMARY.caviteSummary;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Transparency', href: '/transparency' },
    { label: 'Political Dynasties Tracker' },
  ];

  return (
    <>
      <SEO
        title="Political Dynasties Tracker | Trece Martires & Cavite Governance"
        description="Explore empirical datasets on political dynasties in Trece Martires City and Cavite Province (1987-2022) based on Ateneo Policy Center research."
        url="/transparency/political-dynasties"
        keywords="Trece Martires political dynasties, Cavite dynasties, Lubigan dynasty, De Sagun dynasty, Remulla Cavite, Revilla Cavite, Ateneo Policy Center, fat dynasty share, Philippine political dynasties"
      />

      <main className="flex-grow bg-slate-50/50 pb-20">
        {/* Top Hero Banner - Consistent with BetterTrece Design System */}
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/60 border border-blue-400/30 text-xs font-semibold text-blue-200 tracking-wide uppercase">
                  <Landmark
                    className="w-3.5 h-3.5 text-amber-300"
                    aria-hidden="true"
                  />
                  Civic Governance &amp; Open Data
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires &amp; Cavite{' '}
                  <span className="text-amber-300">Political Dynasties</span>{' '}
                  Tracker
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Open empirical data on local political dynasties across 13
                  election cycles (1987–2022). Featuring Trece Martires clan
                  timelines, Cavite 30-year longitudinal trends, LGU rankings,
                  and full politician rosters from the{' '}
                  <strong className="text-amber-300 font-bold">
                    Ateneo Policy Center (ASOG)
                  </strong>{' '}
                  dataset.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/transparency"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/15 transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Transparency Portal
                  </Link>

                  <Link
                    to="/government"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/15 transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    City Officials Roster (2023–2026)
                  </Link>
                </div>
              </div>

              {/* Hero Stat Cards */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20 text-center">
                  <span className="block text-2xl sm:text-4xl font-black text-amber-300">
                    {treceSummary.overallFatShare}%
                  </span>
                  <span className="text-xs text-blue-100 font-medium block mt-1">
                    Trece Fat Dynasty Share
                  </span>
                  <span className="text-[11px] text-blue-200/80 block mt-0.5">
                    {treceSummary.fatDynastyTerms} of{' '}
                    {treceSummary.totalRecords} seats
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/20 text-center">
                  <span className="block text-2xl sm:text-4xl font-black text-blue-300">
                    {caviteSummary.overallFatShare2022}%
                  </span>
                  <span className="text-xs text-blue-100 font-medium block mt-1">
                    Cavite 2022 Provincial Share
                  </span>
                  <span className="text-[11px] text-blue-200/80 block mt-0.5">
                    +17.9% growth since 1992
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="container mx-auto px-4 max-w-7xl mt-8">
          <PoliticalDynastiesExplorer
            initialTab={initialTab}
            hideHeroBanner={true}
          />
        </div>
      </main>
    </>
  );
}
