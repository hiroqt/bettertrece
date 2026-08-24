import React from 'react';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import ContactSection from '../components/home/ContactSection';
import CityRevenueWidget from '../components/transparency/CityRevenueWidget';
import SEO from '../components/SEO';
import { Link } from 'react-router';
import {
  Users,
  ExternalLink,
  Landmark,
  ArrowRight,
  FileSpreadsheet,
  HardHat,
  Vote,
  TrendingUp,
  MapPin,
  School,
  Building2,
} from 'lucide-react';
import {
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
} from '../data/psaClassifications';

const Home: React.FC = () => {
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

        {/* 4. WEATHER & GEOGRAPHICAL MAP SECTION */}
        <WeatherMapSection />

        {/* 5. SUMMARY DEMOGRAPHICS SECTION */}
        <section
          id="demographics-summary"
          className="py-12 lg:py-16 bg-slate-50/70 border-b border-gray-100"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded">
                Summary Demographics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                City Profile &amp; Summary Demographics
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Key population census, registered voters, land area, and geocode
                indicators for the City of Trece Martires.
              </p>
            </div>

            {/* Core KPI Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Registered Voters (COMELEC 2025) */}
              <div className="bg-gradient-to-br from-slate-900 via-[#00225e] to-indigo-950 text-white p-5 rounded-2xl shadow-sm border border-blue-900/40 relative overflow-hidden">
                <div className="flex items-center justify-between text-blue-200 text-xs font-semibold mb-2">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Vote className="w-3.5 h-3.5" />
                    REGISTERED VOTERS
                  </span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                    2025
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                  {TRECE_VOTER_STATISTICS_2025.registeredVoters.toLocaleString()}
                </div>
                <div className="text-xs text-blue-200 mt-2 flex items-center justify-between">
                  <span>
                    {TRECE_VOTER_STATISTICS_2025.votingCenters} Voting Centers
                  </span>
                  <span className="font-mono text-[11px] text-blue-300">
                    {TRECE_VOTER_STATISTICS_2025.clusteredPrecincts} Clustered
                  </span>
                </div>
              </div>

              {/* Total Population (PSA 2024 POPCEN) */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
                  <span>TOTAL POPULATION (2024 POPCEN)</span>
                  <Users className="w-4 h-4 text-[#003893]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
                  {TRECE_MUNICIPAL_PROFILE.totalPopulation2024?.toLocaleString() ||
                    '227,892'}
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">+8.3%</span> vs
                  2020 (
                  {TRECE_MUNICIPAL_PROFILE.totalPopulation2020.toLocaleString()}
                  )
                </div>
              </div>

              {/* City Land Area & Income Status */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
                  <span>LAND AREA &amp; STATUS</span>
                  <Landmark className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
                  {TRECE_MUNICIPAL_PROFILE.totalLandAreaKm2}{' '}
                  <span className="text-base font-medium text-gray-500">
                    km²
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {TRECE_MUNICIPAL_PROFILE.incomeClass} Component City
                </div>
              </div>

              {/* City PSGC Code */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
                  <span>PSGC CITY CODE</span>
                  <MapPin className="w-4 h-4 text-[#003893]" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
                  {TRECE_MUNICIPAL_PROFILE.psgcCityCode}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  13 Barangays &bull; Region IV-A (Cavite)
                </div>
              </div>
            </div>

            {/* Fast Facts Breakdown Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Highest Population Barangay
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    Brgy. Hugo Perez
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    48,920 residents (23.2% of city population)
                  </div>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Fastest Growth Barangay
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    Brgy. Aguado
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    +63.9% intercensal growth (36,248 residents)
                  </div>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center shrink-0">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Electoral Centers (2025)
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    20 Voting Centers
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    783 established &bull; 136 clustered precincts
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/demographics"
                className="inline-flex items-center gap-2 bg-[#003893] hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs group"
              >
                <FileSpreadsheet className="w-4 h-4 text-blue-200" />
                <span>View Full Summary Demographics &amp; Census Data</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/transparency/dpwh"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs"
              >
                <HardHat className="w-4 h-4 text-slate-900" />
                <span>DPWH Infrastructure Transparency</span>
              </Link>
              <Link
                to="/demographics#psa-classifications"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-gray-200 transition-all"
              >
                <span>9 PSA Classification Systems</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. CONTACT US SECTION */}
        <ContactSection />

        {/* 7. CIVIC TECH COMMUNITY BANNER */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-[#00225e] text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Open Source • Volunteer Driven • Civic Tech
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Join the BetterTrece Community
                </h3>
                <p className="text-sm text-slate-300 max-w-lg">
                  BetterTrece is an open community initiative to help provide
                  accessible digital portals and open data for the citizens of
                  Trece Martires City.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://bettergov.ph/join-us"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-slate-900 hover:bg-amber-300 hover:text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-1.5"
                >
                  <span>Join Movement</span>
                  <ExternalLink className="w-3.5 h-3.5" />
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
