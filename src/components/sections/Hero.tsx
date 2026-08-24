import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import {
  ArrowRight,
  Phone,
  Search,
  Briefcase,
  Heart,
  GraduationCap,
  Trash2,
  TreePine,
  Home as HomeIcon,
} from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const popularServices = [
    {
      title: 'Business and Livelihood',
      icon: Briefcase,
      slug: 'business',
      color:
        'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white',
    },
    {
      title: 'Health Services',
      icon: Heart,
      slug: 'health-services',
      color:
        'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white',
    },
    {
      title: 'Education',
      icon: GraduationCap,
      slug: 'education',
      color:
        'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white',
    },
    {
      title: 'Garbage and Waste Disposal',
      icon: Trash2,
      slug: 'garbage-waste-disposal',
      color:
        'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white',
    },
    {
      title: 'Environment',
      icon: TreePine,
      slug: 'environment',
      color:
        'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white',
    },
    {
      title: 'Housing & Land Use',
      icon: HomeIcon,
      slug: 'housing-land-use',
      color:
        'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

  // Filtered quick services for auto-suggest
  const searchResults = searchQuery.trim()
    ? popularServices.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="relative bg-[#003893] text-white overflow-hidden py-12 lg:py-20">
      {/* Background Dot Matrix Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative subtle ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: HERO HEADLINE & CTAs (5 cols on lg) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-blue-200 bg-white/10 backdrop-blur-xs px-3.5 py-1 rounded-full border border-white/15">
                {t('hero.welcome', 'WELCOME TO')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Better<span className="text-yellow-300">Trece</span>.org
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
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

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#002a70]/60 hover:bg-[#002a70] text-white border border-white/30 font-medium px-6 py-3 rounded-lg backdrop-blur-xs transition-all duration-200 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 text-blue-200" />
                <span>{t('hero.contactUs', 'Contact Us')}</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: SEARCH SERVICES & POPULAR SERVICES CARD (6 cols on lg) */}
          <div className="lg:col-span-6 lg:pl-4">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-gray-100 text-gray-900 transition-all">
              {/* Search Heading */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {t('hero.searchServices', 'Search Services')}
              </h2>

              {/* Search Input Box with Form */}
              <form onSubmit={handleSearchSubmit} className="relative mb-5">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 absolute left-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    placeholder={t(
                      'hero.searchPlaceholder',
                      'Search for a service...'
                    )}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition-all"
                  />
                </div>

                {/* Instant search autocomplete dropdown */}
                {isFocused &&
                  searchQuery.trim() &&
                  searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-2">
                      <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase">
                        Matching Services
                      </div>
                      {searchResults.map(result => (
                        <Link
                          key={result.slug}
                          to={`/services/${result.slug}`}
                          className="flex items-center gap-3 px-3.5 py-2 hover:bg-blue-50 text-sm text-gray-800 transition-colors"
                        >
                          <result.icon className="w-4 h-4 text-blue-600" />
                          <span>{result.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
              </form>

              {/* POPULAR SERVICES Section */}
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                  {t('hero.popularServices', 'POPULAR SERVICES')}
                </div>

                {/* 2 Rows x 3 Columns Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {popularServices.map(service => {
                    const IconComponent = service.icon;
                    return (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md bg-white hover:bg-slate-50/50 transition-all duration-200 text-center"
                      >
                        {/* Service Icon Badge */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-2.5 transition-all duration-200 ${service.color}`}
                        >
                          <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>

                        {/* Service Name */}
                        <span className="text-xs font-semibold text-gray-800 group-hover:text-[#003893] transition-colors leading-tight line-clamp-2">
                          {service.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
