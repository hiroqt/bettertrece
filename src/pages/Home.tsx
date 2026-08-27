import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import ContactSection from '../components/home/ContactSection';
import CityRevenueWidget from '../components/transparency/CityRevenueWidget';
import FuelPriceWidget from '../components/fuel/FuelPriceWidget';
import SEO from '../components/SEO';
import { Link } from 'react-router';
import {
  Users,
  ExternalLink,
  Landmark,
  ArrowRight,
  FileSpreadsheet,
  Vote,
  TrendingUp,
  MapPin,
  School,
  Building2,
} from 'lucide-react';
import {
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
} from '../data/demographics/psaClassifications';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="BetterTrece.org | City of Trece Martires, Cavite"
        description="Community-run portal to find services, government information, barangay directory, and emergency hotlines for the City of Trece Martires, Cavite."
        keywords="Trece Martires City, Cavite, local government, city services, public services, BetterTrece"
      />
      <main className="flex-grow">
        {/* 1. HERO & SEARCH HUB */}
        <Hero />

        {/* 2. CITY REVENUE & FISCAL TRANSPARENCY SECTION (DBM / DOF-BLGF) - FULL WIDTH */}
        <section
          id="city-revenue"
          aria-labelledby="city-revenue-headline"
          className="w-full py-12 lg:py-16 bg-white border-b border-gray-200"
        >
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-7xl mx-auto">
            <CityRevenueWidget isFullWidthSection={true} />
          </div>
        </section>

        {/* 3. CITY SERVICES SECTION */}
        <ServicesSection />

        {/* 4. FUEL PRICE MONITOR MODULE & GAS STATION LOCATOR (DOE REGION IV-A) */}
        <section
          id="fuel-prices-section"
          aria-labelledby="fuel-prices-headline"
          className="w-full py-12 lg:py-16 bg-white border-b border-gray-200"
        >
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 max-w-7xl mx-auto">
            <FuelPriceWidget isFullWidthSection={true} showMap={true} />
          </div>
        </section>

        {/* 5. WEATHER & GEOGRAPHICAL MAP SECTION */}
        <WeatherMapSection />

        {/* 5. SUMMARY DEMOGRAPHICS SECTION */}
        <section
          id="demographics-summary"
          className="py-12 lg:py-16 bg-slate-50/70 border-b border-gray-100"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {t(
                  'demographicsSummary.title',
                  'City Profile & Summary Demographics'
                )}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {t(
                  'demographicsSummary.description',
                  'Key population census, registered voters, land area, and geocode indicators for the City of Trece Martires.'
                )}
              </p>
            </div>

            {/* Core KPI Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Registered Voters (COMELEC 2025) */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <Vote className="w-4 h-4 text-zinc-900" />
                    {t(
                      'demographicsSummary.registeredVoters',
                      'REGISTERED VOTERS'
                    )}
                  </span>
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-mono">
                    2025
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-900">
                  <AnimatedCounter
                    value={TRECE_VOTER_STATISTICS_2025.registeredVoters}
                  />
                </div>
                <div className="text-xs text-zinc-600 mt-2 flex items-center justify-between">
                  <span>
                    <AnimatedCounter
                      value={TRECE_VOTER_STATISTICS_2025.votingCenters}
                    />{' '}
                    {t('demographicsSummary.votingCenters', 'Voting Centers')}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    <AnimatedCounter
                      value={TRECE_VOTER_STATISTICS_2025.clusteredPrecincts}
                    />{' '}
                    {t('demographicsSummary.clusteredPrecincts', 'Clustered')}
                  </span>
                </div>
              </div>

              {/* Total Population (PSA 2024 POPCEN) */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold mb-2">
                  <span>
                    {t(
                      'demographicsSummary.totalPopulation',
                      'TOTAL POPULATION (2024 POPCEN)'
                    )}
                  </span>
                  <Users className="w-4 h-4 text-zinc-900" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">
                  <AnimatedCounter
                    value={
                      TRECE_MUNICIPAL_PROFILE.totalPopulation2024 || 227892
                    }
                  />
                </div>
                <div className="text-xs text-zinc-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-zinc-900" />
                  <span className="text-zinc-900 font-bold">+8.3%</span>{' '}
                  {t('demographicsSummary.vs2020', 'vs 2020')} (
                  <AnimatedCounter
                    value={TRECE_MUNICIPAL_PROFILE.totalPopulation2020}
                  />
                  )
                </div>
              </div>

              {/* City Land Area & Income Status */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold mb-2">
                  <span>
                    {t(
                      'demographicsSummary.landAreaStatus',
                      'LAND AREA & STATUS'
                    )}
                  </span>
                  <Landmark className="w-4 h-4 text-zinc-900" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">
                  <AnimatedCounter
                    value={TRECE_MUNICIPAL_PROFILE.totalLandAreaKm2}
                    decimals={2}
                  />{' '}
                  <span className="text-base font-normal text-zinc-500">
                    km²
                  </span>
                </div>
                <div className="text-xs text-zinc-600 mt-2">
                  {TRECE_MUNICIPAL_PROFILE.incomeClass}{' '}
                  {t('demographicsSummary.componentCity', 'Component City')}
                </div>
              </div>

              {/* City PSGC Code */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold mb-2">
                  <span>
                    {t('demographicsSummary.psgcCityCode', 'PSGC CITY CODE')}
                  </span>
                  <MapPin className="w-4 h-4 text-zinc-900" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">
                  {TRECE_MUNICIPAL_PROFILE.psgcCityCode}
                </div>
                <div className="text-xs text-zinc-600 mt-2">
                  {t(
                    'demographicsSummary.regionNotice',
                    '13 Barangays • Region IV-A (Cavite)'
                  )}
                </div>
              </div>
            </div>

            {/* Fast Facts Breakdown Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4.5 rounded-2xl border border-zinc-200 shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-zinc-900" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-semibold">
                    Highest Population Barangay
                  </div>
                  <div className="text-sm font-bold text-zinc-900">
                    Brgy. Hugo Perez
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    <AnimatedCounter value={48920} /> residents (
                    <AnimatedCounter value={23.2} decimals={1} />% of city
                    population)
                  </div>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-zinc-200 shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-zinc-900" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-semibold">
                    Fastest Growth Barangay
                  </div>
                  <div className="text-sm font-bold text-zinc-900">
                    Brgy. Aguado
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    +<AnimatedCounter value={63.9} decimals={1} />% intercensal
                    growth (<AnimatedCounter value={36248} /> residents)
                  </div>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-zinc-200 shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center shrink-0">
                  <School className="w-5 h-5 text-zinc-900" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 font-semibold">
                    Electoral Centers (2025)
                  </div>
                  <div className="text-sm font-bold text-zinc-900">
                    <AnimatedCounter value={20} /> Voting Centers
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    <AnimatedCounter value={783} /> established &bull;{' '}
                    <AnimatedCounter value={136} /> clustered precincts
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/demographics"
                className="inline-flex items-center gap-2 bg-[#003893] hover:bg-[#00225e] text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs group"
              >
                <FileSpreadsheet className="w-4 h-4 text-blue-200" />
                <span>View Full Summary Demographics &amp; Census Data</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-200 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. CONTACT US SECTION */}
        <ContactSection />

        {/* 7. CIVIC TECH COMMUNITY BANNER */}
        <section className="py-12 bg-white border-t border-zinc-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-blue-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white">
                  Join the Better<span className="text-amber-300">Trece</span>{' '}
                  Community
                </h3>
                <p className="text-sm text-blue-100/90 max-w-lg">
                  Better
                  <span className="text-amber-300 font-semibold">Trece</span> is
                  an open community initiative to help provide accessible
                  digital portals and open data for the citizens of Trece
                  Martires City.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://bettergov.ph/join-us"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-[#00225e] hover:bg-blue-50 font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Join Movement</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00225e]" />
                </a>
                <a
                  href="https://github.com/bettergovph/bettergov"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all border border-white/20"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
