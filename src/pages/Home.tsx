import React from 'react';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { Link } from 'react-router';
import {
  Shield,
  Phone,
  Users,
  Building,
  Award,
  ExternalLink,
  Flame,
  HeartPulse,
  Landmark,
  Compass,
  ArrowRight,
  FileSpreadsheet,
  HardHat,
} from 'lucide-react';

// 13 Historical Barangays of Trece Martires City (Named after the Thirteen Martyrs of Cavite)

const BARANGAYS = [
  {
    name: 'San Agustin (Poblacion)',
    type: 'City Proper / Capitol',
    desc: 'Seat of City Hall & Provincial Capitol',
  },
  {
    name: 'Luciano',
    type: 'Urban',
    desc: 'Home to GEAMH & Provincial Offices',
  },
  {
    name: 'De Ocampo',
    type: 'Commercial',
    desc: 'Commercial hub along Trece-Indang Rd',
  },
  {
    name: 'Inocencio',
    type: 'Residential',
    desc: 'Active community & schools zone',
  },
  {
    name: 'Conchu',
    type: 'Agricultural/Residential',
    desc: 'Green community & local enterprises',
  },
  {
    name: 'Hugo Perez',
    type: 'Urban',
    desc: 'Major residential & enterprise corridor',
  },
  {
    name: 'Cabuco',
    type: 'Growing Urban',
    desc: 'Thriving housing & local markets',
  },
  {
    name: 'Perez',
    type: 'Community',
    desc: 'Civic centers & rural health units',
  },
  {
    name: 'Aguado',
    type: 'Residential',
    desc: 'Subdivision communities & youth centers',
  },
  {
    name: 'Gregorio',
    type: 'Community',
    desc: 'Peaceful residential barangay',
  },
  {
    name: 'Lallana',
    type: 'Community',
    desc: 'Livelihood & community cooperatives',
  },
  {
    name: 'Osorio',
    type: 'Urban/Commercial',
    desc: 'Commercial avenues & transport links',
  },
  {
    name: 'Lapidario',
    type: 'Community',
    desc: 'Historic district & civic hubs',
  },
];

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

        {/* 2. FAST FACTS STRIP */}
        <section className="bg-white border-b border-gray-100 py-6 sm:py-8 shadow-xs">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="pt-2 md:pt-0">
                <div className="flex items-center justify-center gap-2 text-[#003893] mb-1">
                  <Landmark className="w-5 h-5" />
                  <span className="text-2xl font-black text-gray-900 font-mono">
                    13
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Historical Barangays
                </div>
              </div>

              <div className="pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-2 text-[#003893] mb-1">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-black text-gray-900 font-mono">
                    210,000+
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  City Population
                </div>
              </div>

              <div className="pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-2 text-[#003893] mb-1">
                  <Compass className="w-5 h-5" />
                  <span className="text-2xl font-black text-gray-900 font-mono">
                    39.17 km²
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Total Land Area
                </div>
              </div>

              <div className="pt-4 md:pt-0">
                <div className="flex items-center justify-center gap-2 text-[#003893] mb-1">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-black text-gray-900 font-mono">
                    1954
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Seat of Cavite Province
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CITY SERVICES SECTION */}
        <ServicesSection />

        {/* 4. 13 BARANGAYS OF TRECE MARTIRES SECTION */}
        <section
          id="barangays"
          className="py-12 lg:py-16 bg-slate-50/70 border-b border-gray-100"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded">
                Local Communities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                13 Barangays of Trece Martires City
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                Named in honor of the{' '}
                <strong>Thirteen Martyrs of Cavite</strong> who were executed on
                September 12, 1896.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {BARANGAYS.map((brgy, idx) => (
                <div
                  key={brgy.name}
                  className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#003893] font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-gray-900 truncate">
                      {brgy.name}
                    </h3>
                  </div>
                  <div className="text-[11px] font-semibold text-[#003893] bg-blue-50/70 px-2 py-0.5 rounded inline-block mb-1.5">
                    {brgy.type}
                  </div>
                  <p className="text-xs text-gray-600 leading-normal">
                    {brgy.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/demographics"
                className="inline-flex items-center gap-2 bg-[#003893] hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs group"
              >
                <FileSpreadsheet className="w-4 h-4 text-blue-200" />
                <span>View Full Census Data &amp; PSGC Directory</span>
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

        {/* 5. GOVERNMENT & DEPARTMENTS SECTION */}
        <GovernmentActivitySection />

        {/* 6. EMERGENCY CONTACTS DIRECTORY */}
        <section
          id="contact"
          className="py-12 lg:py-16 bg-[#00225e] text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  24/7 Public Assistance
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-3">
                  Trece Martires Emergency & Support Hotline Directory
                </h2>
                <p className="text-blue-200 text-sm mt-2">
                  Immediate assistance numbers for disaster management, fire,
                  police, and health emergencies.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* CDRRMO */}
                <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600/80 text-white flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">
                        CDRRMO Trece Martires
                      </h3>
                      <p className="text-xs text-blue-200">
                        Disaster Risk Reduction & Rescue
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm font-mono">
                    <a
                      href="tel:09619921998"
                      className="flex items-center gap-2 hover:text-amber-300"
                    >
                      <Phone className="w-3.5 h-3.5" /> 0961-992-1998 (Smart)
                    </a>
                    <a
                      href="tel:0464190125"
                      className="flex items-center gap-2 hover:text-amber-300"
                    >
                      <Phone className="w-3.5 h-3.5" /> (046) 419-0125
                      (Landline)
                    </a>
                  </div>
                </div>

                {/* BFP Fire */}
                <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/80 text-white flex items-center justify-center shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">
                        BFP Trece Martires Fire Station
                      </h3>
                      <p className="text-xs text-blue-200">
                        Fire Prevention & Response
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm font-mono">
                    <a
                      href="tel:0464151217"
                      className="flex items-center gap-2 hover:text-amber-300"
                    >
                      <Phone className="w-3.5 h-3.5" /> (046) 415-1217 /
                      419-0268
                    </a>
                    <a
                      href="tel:09223850551"
                      className="flex items-center gap-2 hover:text-amber-300"
                    >
                      <Phone className="w-3.5 h-3.5" /> 0922-385-0551 (Mobile)
                    </a>
                  </div>
                </div>

                {/* PNP Police */}
                <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/80 text-white flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">
                        PNP Trece Martires Police Station
                      </h3>
                      <p className="text-xs text-blue-200">
                        Law Enforcement & Public Peace
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm font-mono">
                    <a
                      href="tel:09491849145"
                      className="flex items-center gap-2 hover:text-amber-300"
                    >
                      <Phone className="w-3.5 h-3.5" /> 0949-184-9145 (Smart)
                    </a>
                    <a
                      href="tel:0464190286"
                      className="flex items-center gap-2 hover:text-amber-300"
                    >
                      <Phone className="w-3.5 h-3.5" /> (046) 419-0286
                      (Landline)
                    </a>
                  </div>
                </div>

                {/* City Health Office */}
                <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/15 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/80 text-white flex items-center justify-center shrink-0">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">
                        City Health Office (CHO)
                      </h3>
                      <p className="text-xs text-blue-200">
                        Public Clinic & Medical Services
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm font-mono">
                    <a
                      href="tel:0468401705"
                      className="flex items-center gap-2 hover:text-amber-300"
                    >
                      <Phone className="w-3.5 h-3.5" /> (046) 840-1705 /
                      419-1065
                    </a>
                    <div className="text-xs text-blue-200 font-sans">
                      San Agustin, Trece Martires City Hall Compound
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
