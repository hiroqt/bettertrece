import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import {
  ArrowRight,
  ShieldCheck,
  Users,
  MapPin,
  Landmark,
  Vote,
  Compass,
  Info,
} from 'lucide-react';
import {
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
} from '../../data/psaClassifications';
import AnimatedCounter from '../ui/AnimatedCounter';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-[#001438] text-white overflow-hidden pt-36 sm:pt-40 lg:pt-44 pb-14 lg:pb-20">
      {/* Background Monument Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 sm:opacity-70 pointer-events-none"
        style={{
          backgroundImage: `url('/images/trece-martires-monument.png')`,
        }}
      />

      {/* High-contrast gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001438]/95 via-[#00225e]/85 to-[#002868]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001438] via-transparent to-[#001438]/65 pointer-events-none" />

      {/* Decorative ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO HEADLINE & CTAs (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quick Hero Badge */}
            <div className="inline-flex items-center gap-2 bg-[#002566] border border-[#1e4a9e] px-3.5 py-1.5 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                {t('hero.capitalOfCavite', 'Capital of Cavite')}
              </span>
              <span className="text-blue-300/40 text-xs">|</span>
              <span className="text-xs font-semibold text-blue-100">
                {t('hero.cityClassificationValue', '2nd Class Component City')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Better<span className="text-yellow-300">Trece</span>.org
            </h1>

            <p className="text-base sm:text-lg text-blue-100/95 leading-relaxed max-w-xl font-normal">
              {t(
                'hero.subtitle',
                'A community-run portal to find information and services of the City of Trece Martires, Cavite.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#003893] hover:bg-blue-50 font-bold px-6 py-3 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base group"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-[#003893]" />
                <span>{t('hero.browseServices', 'Browse Services')}</span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-[#002a70] hover:bg-[#003893] text-white border border-[#2b59a8] font-semibold px-5 py-3 rounded-lg shadow-lg transition-all duration-200 text-sm sm:text-base hover:border-amber-400/50 hover:text-amber-300 group"
              >
                <Info className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>{t('hero.aboutProject', 'About this project')}</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: CLEAN & SIMPLE SOLID WIDGET (6 cols on lg) */}
          <div className="lg:col-span-6 lg:pl-2">
            <div className="bg-[#0b1b3d] border border-[#1d3d75] rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/70">
              {/* Clean Widget Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1d3d75]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#163570] text-amber-300 flex items-center justify-center border border-[#2653a3]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white leading-tight">
                      {t(
                        'hero.cityProfileAndFacts',
                        'City Profile & Key Facts'
                      )}
                    </h2>
                    <p className="text-xs text-blue-200">
                      {t(
                        'hero.cityClassificationValue',
                        '2nd Class Component City'
                      )}{' '}
                      · RA 981
                    </p>
                  </div>
                </div>

                <span className="bg-amber-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                  {t('hero.capitalOfCavite', 'Capital of Cavite')}
                </span>
              </div>

              {/* 4 Clean Solid Stat Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Population */}
                <div className="bg-[#10244f] border border-[#204582] rounded-xl p-4 hover:border-emerald-400/60 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      {t('hero.population', 'Population')}
                    </span>
                    <div className="w-7 h-7 rounded-md bg-[#064e3b] text-emerald-300 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white font-mono tracking-tight">
                    <AnimatedCounter
                      value={
                        TRECE_MUNICIPAL_PROFILE.totalPopulation2024 || 227892
                      }
                    />
                  </div>
                  <div className="text-[11px] text-emerald-300 font-medium mt-1">
                    2024 POPCEN (PSA)
                  </div>
                </div>

                {/* 2. Barangays */}
                <div className="bg-[#10244f] border border-[#204582] rounded-xl p-4 hover:border-blue-400/60 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      {t('hero.barangays', 'Barangays')}
                    </span>
                    <div className="w-7 h-7 rounded-md bg-[#1e3a8a] text-blue-300 flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    <AnimatedCounter
                      value={TRECE_MUNICIPAL_PROFILE.totalBarangays}
                    />
                  </div>
                  <div className="text-[11px] text-blue-200 font-medium mt-1">
                    13 Historical Barangays
                  </div>
                </div>

                {/* 3. Registered Voters */}
                <div className="bg-[#10244f] border border-[#204582] rounded-xl p-4 hover:border-amber-400/60 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      {t('hero.registeredVoters', 'Registered Voters')}
                    </span>
                    <div className="w-7 h-7 rounded-md bg-[#78350f] text-amber-300 flex items-center justify-center">
                      <Vote className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white font-mono tracking-tight">
                    <AnimatedCounter
                      value={TRECE_VOTER_STATISTICS_2025.registeredVoters}
                    />
                  </div>
                  <div className="text-[11px] text-amber-300 font-medium mt-1">
                    COMELEC 2025 Elections
                  </div>
                </div>

                {/* 4. Land Area */}
                <div className="bg-[#10244f] border border-[#204582] rounded-xl p-4 hover:border-indigo-400/60 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                      Land Area
                    </span>
                    <div className="w-7 h-7 rounded-md bg-[#312e81] text-indigo-300 flex items-center justify-center">
                      <Landmark className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-white font-mono tracking-tight">
                    {TRECE_MUNICIPAL_PROFILE.totalLandAreaKm2}{' '}
                    <span className="text-sm font-normal text-blue-200">
                      km²
                    </span>
                  </div>
                  <div className="text-[11px] text-indigo-200 font-medium mt-1">
                    Seat of Cavite Province
                  </div>
                </div>
              </div>

              {/* Simple Bottom Link */}
              <div className="mt-4 pt-3.5 border-t border-[#1d3d75] flex items-center justify-between">
                <span className="text-xs text-blue-200 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  PSGC Code: {TRECE_MUNICIPAL_PROFILE.psgcCityCode}
                </span>
                <Link
                  to="/demographics"
                  className="text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1"
                >
                  {t('hero.fullDemographics', 'Full Demographics →')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
