import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowRight, ShieldCheck, Users, MapPin, Landmark } from 'lucide-react';
import { TRECE_MUNICIPAL_PROFILE } from '../../data/psaClassifications';

export default function Hero() {
  const { t } = useTranslation('common');

  const cityDetails = [
    {
      title: 'Historical Origin',
      value: 'Capital of Cavite',
      subtext: `Named after the 13 Martyrs of Cavite (1896) · Chartered ${TRECE_MUNICIPAL_PROFILE.republicAct}`,
      icon: Landmark,
      badge: `Chartered ${TRECE_MUNICIPAL_PROFILE.charterYear}`,
      badgeColor: 'text-amber-300 bg-amber-400/15 border-amber-400/30',
    },
    {
      title: 'Barangays',
      value: `${TRECE_MUNICIPAL_PROFILE.totalBarangays} Historical Barangays`,
      subtext: 'All 13 barangays named in honor of the Thirteen Martyrs',
      icon: MapPin,
      badge: `${TRECE_MUNICIPAL_PROFILE.totalBarangays} Barangays`,
      badgeColor: 'text-blue-300 bg-blue-400/15 border-blue-400/30',
    },
    {
      title: 'Population',
      value:
        TRECE_MUNICIPAL_PROFILE.totalPopulation2024?.toLocaleString() ||
        '227,892',
      subtext: `Official PSA 2024 POPCEN (${TRECE_MUNICIPAL_PROFILE.populationGrowthRate})`,
      icon: Users,
      badge: '2024 POPCEN',
      badgeColor: 'text-emerald-300 bg-emerald-400/15 border-emerald-400/30',
    },
    {
      title: 'City Classification',
      value: `${TRECE_MUNICIPAL_PROFILE.incomeClass} ${TRECE_MUNICIPAL_PROFILE.cityClassification}`,
      subtext: `Land Area: ${TRECE_MUNICIPAL_PROFILE.totalLandAreaKm2} km² · Province of ${TRECE_MUNICIPAL_PROFILE.province}`,
      icon: ShieldCheck,
      badge: `${TRECE_MUNICIPAL_PROFILE.incomeClass} LGU`,
      badgeColor: 'text-yellow-300 bg-yellow-400/15 border-yellow-400/30',
    },
  ];

  return (
    <div className="relative bg-[#001438] text-white overflow-hidden pt-36 sm:pt-40 lg:pt-44 pb-14 lg:pb-20">
      {/* Background Monument Image (Centered & High Visibility) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-65 sm:opacity-75 pointer-events-none"
        style={{
          backgroundImage: `url('/images/trece-martires-monument.png')`,
        }}
      />

      {/* Refined Blue Accent Gradient Overlays for High Contrast and Visual Impact */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001438]/95 via-[#00225e]/80 to-[#002868]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001438] via-transparent to-[#001438]/60 pointer-events-none" />

      {/* Decorative ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO HEADLINE & CTAs (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6">
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
                className="inline-flex items-center justify-center gap-2 bg-white text-[#003893] hover:bg-blue-50 font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base group"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-[#003893]" />
                <span>{t('hero.browseServices', 'Browse Services')}</span>
              </Link>

              <Link
                to="/demographics"
                className="inline-flex items-center justify-center gap-2 bg-[#002a70]/70 hover:bg-[#002a70] text-white border border-white/30 font-semibold px-5 py-3 rounded-lg backdrop-blur-xs transition-all duration-200 text-sm sm:text-base hover:border-amber-400/50 hover:text-amber-300"
              >
                <span>Full Demographics &rarr;</span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: CITY DETAILS SIDE WIDGET (6 cols on lg) */}
          <div className="lg:col-span-6 lg:pl-2">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 sm:p-6 shadow-2xl">
              {/* Widget Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    City Profile & Key Facts
                  </span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/15 border border-amber-400/25 px-2.5 py-0.5 rounded-md">
                  Capital of Cavite
                </span>
              </div>

              {/* 2x2 Details Grid inside Widget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {cityDetails.map((detail, index) => {
                  const IconComp = detail.icon;
                  return (
                    <div
                      key={index}
                      className="bg-black/25 backdrop-blur-xs border border-white/10 rounded-xl p-3.5 hover:bg-black/35 hover:border-white/25 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 text-amber-300">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${detail.badgeColor}`}
                          >
                            {detail.badge}
                          </span>
                        </div>

                        <div className="text-[11px] font-bold uppercase tracking-wider text-blue-200/80 mb-0.5">
                          {detail.title}
                        </div>

                        <div className="text-sm sm:text-base font-extrabold text-white tracking-tight mb-1.5 leading-snug">
                          {detail.value}
                        </div>
                      </div>

                      <p className="text-[11px] text-blue-100/75 leading-tight">
                        {detail.subtext}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
