import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowRight, Search } from '../../lib/icons';
import {
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
} from '../../data/demographics/psaClassifications';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[min(100svh,56rem)] flex-col justify-between overflow-hidden bg-[#071a42] pt-44 pb-8 text-white sm:pt-48 lg:pt-48">
      <img
        src="/images/thirteen-martyrs-line.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain object-center opacity-20 sm:opacity-25 lg:opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,26,66,0.38)_0%,rgba(7,26,66,0.72)_58%,#071a42_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071a42]/55 via-transparent to-[#071a42]"
      />
      <div className="container relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-amber-300 sm:text-sm">
            {TRECE_MUNICIPAL_PROFILE.cityName} ·{' '}
            {TRECE_MUNICIPAL_PROFILE.province}
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t('hero.headline', 'Find your way around Trece Martires.')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-xl">
            {t(
              'hero.subtitle',
              'A community-run guide to city services, public projects, government information, and data for all 13 barangays.'
            )}
          </p>

          <form
            action="/search"
            method="get"
            role="search"
            className="mx-auto mt-8 flex max-w-2xl rounded-lg bg-white p-1.5 text-left shadow-xl focus-within:ring-2 focus-within:ring-amber-300 sm:mt-9 sm:p-2"
          >
            <label className="sr-only" htmlFor="hero-search">
              {t('hero.searchLabel', 'Search BetterTrece')}
            </label>
            <Search
              aria-hidden="true"
              className="my-auto ml-3 h-5 w-5 shrink-0 text-slate-400 sm:ml-4"
            />
            <input
              id="hero-search"
              name="q"
              type="search"
              required
              placeholder={t(
                'hero.searchPlaceholder',
                'Search city projects, barangays, population, voters, or public records…'
              )}
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:px-4 sm:text-base"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#0734b5] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#052b98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 sm:text-base"
            >
              {t('hero.search', 'Search')}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </form>

          <nav
            aria-label={t('hero.quickLinksLabel', 'Explore the city')}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-semibold sm:mt-8 sm:text-base"
          >
            <Link
              to="/services"
              className="inline-flex min-h-11 items-center gap-2 text-white transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t('hero.browseServices', 'Explore City Services')}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              to="/transparency/dpwh"
              className="inline-flex min-h-11 items-center gap-2 text-white transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t('hero.projects', 'Explore Public Projects')}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>

      <div className="container relative z-10 mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:mt-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 border-t border-white/25 pt-5 text-center sm:grid-cols-3 sm:pt-6">
          <div className="border-r border-white/20 py-2 px-3 sm:px-8">
            <p className="text-2xl font-black tracking-tight sm:text-4xl">
              <AnimatedCounter
                value={TRECE_MUNICIPAL_PROFILE.totalPopulation2024}
              />
            </p>
            <p className="mt-1 text-xs font-semibold text-blue-100 sm:text-sm">
              {t('hero.population', 'Population')}
            </p>
            <p className="mt-1 text-[10px] text-blue-200 sm:text-xs">
              2024 POPCEN · PSA
            </p>
          </div>
          <div className="border-white/20 py-2 px-3 sm:border-r sm:px-8">
            <p className="text-2xl font-black tracking-tight sm:text-4xl">
              <AnimatedCounter value={TRECE_MUNICIPAL_PROFILE.totalBarangays} />
            </p>
            <p className="mt-1 text-xs font-semibold text-blue-100 sm:text-sm">
              {t('hero.barangays', 'Barangays')}
            </p>
            <p className="mt-1 text-[10px] text-blue-200 sm:text-xs">
              {TRECE_MUNICIPAL_PROFILE.cityName}
            </p>
          </div>
          <div className="col-span-2 mt-3 border-t border-white/20 py-3 sm:col-span-1 sm:mt-0 sm:border-t-0 sm:py-2 sm:px-8">
            <p className="text-2xl font-black tracking-tight sm:text-4xl">
              <AnimatedCounter
                value={TRECE_VOTER_STATISTICS_2025.registeredVoters}
              />
            </p>
            <p className="mt-1 text-xs font-semibold text-blue-100 sm:text-sm">
              {t('hero.registeredVoters', 'Registered Voters')}
            </p>
            <p className="mt-1 text-[10px] text-blue-200 sm:text-xs">
              2025 · COMELEC
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
