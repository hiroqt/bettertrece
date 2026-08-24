import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Menu,
  ChevronDown,
  Phone,
  Sun,
  Clock,
  Coins,
  Shield,
  Flame,
  HeartPulse,
  PhoneCall,
  ExternalLink,
  ArrowRight,
  Briefcase,
  FileCheck,
  Store,
  TrendingUp,
  Wheat,
  Baby,
  GraduationCap,
  BookOpen,
  Trash2,
  AlertTriangle,
  Users,
  Home as HomeIcon,
  Wrench,
  TreePine,
  ShieldCheck,
  Award,
  Building,
  Building2,
  Landmark,
  MapPin,
  ScrollText,
  Newspaper,
  MessagesSquare,
  HardHat,
  Route,
  ShieldAlert,
  FileSpreadsheet,
  FileText,
  Scale,
  MessageSquare,
  BarChart2,
  Vote,
  CheckCircle2,
  Map,
  Binary,
  Database,
  Sparkles,
} from 'lucide-react';
import { mainNavigation, type MegaMenuFeatured } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

// Icon resolver helper for Mega Menu items
const getMegaIcon = (name?: string) => {
  switch (name) {
    case 'Briefcase':
      return Briefcase;
    case 'FileCheck':
      return FileCheck;
    case 'Store':
      return Store;
    case 'TrendingUp':
      return TrendingUp;
    case 'Wheat':
      return Wheat;
    case 'HeartPulse':
      return HeartPulse;
    case 'Baby':
      return Baby;
    case 'GraduationCap':
      return GraduationCap;
    case 'BookOpen':
      return BookOpen;
    case 'Trash2':
      return Trash2;
    case 'AlertTriangle':
      return AlertTriangle;
    case 'Users':
      return Users;
    case 'Home':
      return HomeIcon;
    case 'Wrench':
      return Wrench;
    case 'Shield':
      return Shield;
    case 'TreePine':
      return TreePine;
    case 'ShieldCheck':
      return ShieldCheck;
    case 'Award':
      return Award;
    case 'Building':
      return Building;
    case 'Building2':
      return Building2;
    case 'Landmark':
      return Landmark;
    case 'MapPin':
      return MapPin;
    case 'ScrollText':
      return ScrollText;
    case 'Newspaper':
      return Newspaper;
    case 'MessagesSquare':
      return MessagesSquare;
    case 'Phone':
      return Phone;
    case 'HardHat':
      return HardHat;
    case 'Route':
      return Route;
    case 'ShieldAlert':
      return ShieldAlert;
    case 'FileSpreadsheet':
      return FileSpreadsheet;
    case 'Coins':
      return Coins;
    case 'FileText':
      return FileText;
    case 'Scale':
      return Scale;
    case 'MessageSquare':
      return MessageSquare;
    case 'BarChart2':
      return BarChart2;
    case 'Vote':
      return Vote;
    case 'CheckCircle2':
      return CheckCircle2;
    case 'Map':
      return Map;
    case 'Binary':
      return Binary;
    case 'Database':
      return Database;
    case 'ExternalLink':
      return ExternalLink;
    default:
      return Sparkles;
  }
};

export const BetterTreceLogo: React.FC<{
  className?: string;
  isLight?: boolean;
}> = ({ className = 'h-12', isLight = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem / Sun & 13 Rays Symbol for the 13 Martyrs / Trece Martires */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 shadow-md p-1.5 shrink-0 group-hover:scale-105 transition-transform">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-white fill-current drop-shadow-sm"
        >
          {/* Sun Center */}
          <circle cx="50" cy="50" r="18" fill="#ffffff" />
          {/* Stylized Sun Rays (13 rays for the 13 Martyrs of Cavite) */}
          {[...Array(13)].map((_, i) => {
            const angle = (i * 360) / 13;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2="50"
                y2="20"
                stroke="#ffffff"
                strokeWidth="5"
                strokeLinecap="round"
                transform={`rotate(${angle} 50 50)`}
              />
            );
          })}
          {/* Center Monument / Star Emblem */}
          <polygon
            points="50,38 54,46 62,47 56,53 58,62 50,57 42,62 44,53 38,47 46,46"
            fill="#003893"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-extrabold text-xl tracking-tight font-sans transition-colors ${
              isLight ? 'text-white' : 'text-gray-900'
            }`}
          >
            Better
            <span className={isLight ? 'text-yellow-300' : 'text-[#003893]'}>
              Trece
            </span>
          </span>
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded transition-colors ${
              isLight
                ? 'text-blue-100 bg-white/20'
                : 'text-gray-500 bg-gray-100'
            }`}
          >
            .org
          </span>
        </div>
        <span
          className={`text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            isLight ? 'text-blue-200/90' : 'text-gray-500'
          }`}
        >
          Trece Martires City, Cavite
        </span>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Real-time clock in Philippine Standard Time
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setCurrentTime(`${formatted} PHT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track window scroll for dynamic transparent-to-white navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setIsOpen(false);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, [location.pathname, location.hash]);

  // Click outside / escape key listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Robust hover handlers with debounce grace period
  const handleButtonMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMegaMenu(label);
  };

  const handleButtonMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 250);
  };

  const handleMegaPanelMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMegaPanelMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMobileMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMobileMenu(null);
    setActiveMegaMenu(null);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const toggleMobileSubmenu = (label: string) => {
    setActiveMobileMenu(activeMobileMenu === label ? null : label);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('i18nextLng', newLanguage);
    }
  };

  const currentLang = (i18n.language || 'en').toLowerCase();
  const isFil = currentLang.startsWith('fil') || currentLang.startsWith('tl');

  const getNavLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return t('navbar.home', 'Home');
      case 'services':
        return t('navbar.services', 'Services');
      case 'government':
        return t('navbar.government', 'Government');
      case 'transparency':
        return t('navbar.transparency', 'Transparency');
      case 'statistics':
        return t('navbar.statistics', 'Statistics');
      case 'contact':
        return t('navbar.contact', 'Contact');
      default:
        return label;
    }
  };

  const getMegaMenuFeatured = (
    navLabel: string,
    defaultFeatured: MegaMenuFeatured
  ): MegaMenuFeatured => {
    switch (navLabel.toLowerCase()) {
      case 'services':
        return {
          ...defaultFeatured,
          tag: t(
            'navbar.featuredDirectoryTag',
            defaultFeatured.tag || 'CITIZEN DIRECTORY'
          ),
          title: t('navbar.featuredDirectoryTitle', defaultFeatured.title),
          description: t(
            'navbar.featuredDirectoryDesc',
            defaultFeatured.description
          ),
          ctaText: t('navbar.featuredDirectoryCta', defaultFeatured.ctaText),
          statLabel: t(
            'navbar.featuredDirectoryStatLabel',
            defaultFeatured.statLabel || ''
          ),
          stat: t('navbar.featuredDirectoryStat', defaultFeatured.stat || ''),
        };
      case 'government':
        return {
          ...defaultFeatured,
          tag: t(
            'navbar.featuredLeadershipTag',
            defaultFeatured.tag || 'OFFICIAL LEADERSHIP'
          ),
          title: t('navbar.featuredLeadershipTitle', defaultFeatured.title),
          description: t(
            'navbar.featuredLeadershipDesc',
            defaultFeatured.description
          ),
          ctaText: t('navbar.featuredLeadershipCta', defaultFeatured.ctaText),
          statLabel: t(
            'navbar.featuredLeadershipStatLabel',
            defaultFeatured.statLabel || ''
          ),
          stat: t('navbar.featuredLeadershipStat', defaultFeatured.stat || ''),
        };
      case 'transparency':
        return {
          ...defaultFeatured,
          tag: t(
            'navbar.featuredTransparencyTag',
            defaultFeatured.tag || 'OPEN DATA'
          ),
          title: t('navbar.featuredTransparencyTitle', defaultFeatured.title),
          description: t(
            'navbar.featuredTransparencyDesc',
            defaultFeatured.description
          ),
          ctaText: t('navbar.featuredTransparencyCta', defaultFeatured.ctaText),
          statLabel: t(
            'navbar.featuredTransparencyStatLabel',
            defaultFeatured.statLabel || ''
          ),
          stat: t(
            'navbar.featuredTransparencyStat',
            defaultFeatured.stat || ''
          ),
        };
      case 'statistics':
        return {
          ...defaultFeatured,
          tag: t(
            'navbar.featuredStatisticsTag',
            defaultFeatured.tag || 'OFFICIAL STATISTICS'
          ),
          title: t('navbar.featuredStatisticsTitle', defaultFeatured.title),
          description: t(
            'navbar.featuredStatisticsDesc',
            defaultFeatured.description
          ),
          ctaText: t('navbar.featuredStatisticsCta', defaultFeatured.ctaText),
          statLabel: t(
            'navbar.featuredStatisticsStatLabel',
            defaultFeatured.statLabel || ''
          ),
          stat: t('navbar.featuredStatisticsStat', defaultFeatured.stat || ''),
        };
      default:
        return defaultFeatured;
    }
  };

  // Check if current page has a dark hero header at the top
  const isDarkHeroPage =
    location.pathname === '/' ||
    location.pathname === '/government' ||
    location.pathname === '/demographics' ||
    location.pathname === '/municipal-profile' ||
    location.pathname.startsWith('/transparency');

  // Should navbar use light text theme (when transparent over dark hero)
  const isLightNavTheme = !isScrolled && isDarkHeroPage;

  // Active mega menu data if present
  const activeMegaMenuData = mainNavigation.find(
    i => i.label === activeMegaMenu
  )?.megaMenu;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      {/* 1. TOP EMERGENCY HOTLINES BAR (Red) */}
      <div className="bg-[#e00000] text-white text-xs sm:text-sm font-medium py-2 px-4 overflow-x-auto scrollbar-none border-b border-red-700/80 shadow-xs">
        <div className="container mx-auto flex items-center justify-between min-w-max gap-6 max-w-7xl">
          <div className="flex items-center gap-2 font-black tracking-wider text-white uppercase shrink-0 text-xs sm:text-sm">
            <PhoneCall className="w-4 h-4 animate-pulse text-yellow-300 shrink-0" />
            <span>{t('navbar.emergencyHotlines', 'EMERGENCY HOTLINES:')}</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a
              href="tel:09619921998"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors group"
              title={t('navbar.callCdrrmo', 'Call CDRRMO Trece Martires')}
            >
              <Shield className="w-3.5 h-3.5 text-red-200 group-hover:text-yellow-200 shrink-0" />
              <span className="font-semibold text-red-100 group-hover:text-yellow-200">
                {t('navbar.cdrrmo', 'CDRRMO:')}
              </span>
              <span className="font-mono font-bold tracking-wide text-white group-hover:text-yellow-200">
                0961-992-1998
              </span>
            </a>

            <span className="text-red-300/80 select-none">|</span>

            <a
              href="tel:0464151217"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors group"
              title={t('navbar.callBfp', 'Call City Fire Station')}
            >
              <Flame className="w-3.5 h-3.5 text-red-200 group-hover:text-yellow-200 shrink-0" />
              <span className="font-semibold text-red-100 group-hover:text-yellow-200">
                {t('navbar.bfp', 'Fire Station:')}
              </span>
              <span className="font-mono font-bold tracking-wide text-white group-hover:text-yellow-200">
                046-415-1217
              </span>
            </a>

            <span className="text-red-300/80 select-none">|</span>

            <a
              href="tel:09491849145"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors group"
              title={t('navbar.callPnp', 'Call City Police Station')}
            >
              <Phone className="w-3.5 h-3.5 text-red-200 group-hover:text-yellow-200 shrink-0" />
              <span className="font-semibold text-red-100 group-hover:text-yellow-200">
                {t('navbar.pnp', 'Police Station:')}
              </span>
              <span className="font-mono font-bold tracking-wide text-white group-hover:text-yellow-200">
                0949-184-9145
              </span>
            </a>

            <span className="text-red-300/80 select-none">|</span>

            <a
              href="tel:0468401705"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors group"
              title={t('navbar.callCityHealth', 'Call City Health Office')}
            >
              <HeartPulse className="w-3.5 h-3.5 text-red-200 group-hover:text-yellow-200 shrink-0" />
              <span className="font-semibold text-red-100 group-hover:text-yellow-200">
                {t('navbar.cityHealth', 'City Health:')}
              </span>
              <span className="font-mono font-bold tracking-wide text-white group-hover:text-yellow-200">
                046-840-1705
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY DARK INFO BAR (Forex, Weather, Time) */}
      <div className="bg-[#0b1329] text-gray-300 text-[11px] sm:text-xs py-1 px-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between max-w-7xl">
          <div className="hidden md:flex items-center gap-4 text-gray-400">
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              Civic Portal Active
            </span>
            <span>•</span>
            <a
              href="https://bettergov.ph"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              BetterGov Philippines <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="flex items-center justify-end w-full md:w-auto gap-4 sm:gap-6 text-slate-300 ml-auto">
            {/* Currency */}
            <div className="flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                S$1 SGD ={' '}
                <strong className="text-white font-mono">₱44.50</strong>
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="hidden sm:inline">
                $1 USD ={' '}
                <strong className="text-white font-mono">₱58.45</strong>
              </span>
            </div>

            <span className="text-gray-700">|</span>

            {/* Weather */}
            <div className="flex items-center gap-1.5 text-slate-200">
              <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                Trece Martires <strong className="text-white">28°C</strong>
              </span>
            </div>

            <span className="text-gray-700">|</span>

            {/* Live Clock */}
            <div className="flex items-center gap-1.5 text-slate-200 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{currentTime || 'PHT Live'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR (Transparent at top -> Solid White when scrolled) */}
      <nav
        ref={navRef}
        className={`relative transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md text-gray-900'
            : isDarkHeroPage
              ? 'bg-[#001438]/90 lg:bg-transparent border-b border-white/10 text-white'
              : 'bg-white/90 lg:bg-transparent border-b border-gray-100 text-gray-900'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-3">
            {/* Brand Logo */}
            <Link to="/" className="group flex items-center">
              <BetterTreceLogo isLight={isLightNavTheme} />
            </Link>

            {/* Desktop Navigation Links with Mega Menus */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {mainNavigation.map(item => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href) ||
                      (item.href === '/transparency/dpwh' &&
                        location.pathname.startsWith('/transparency')) ||
                      (item.href === '/demographics' &&
                        location.pathname.startsWith('/demographics'));

                const hasMega = Boolean(item.megaMenu);
                const isHovered = activeMegaMenu === item.label;

                return (
                  <div
                    key={item.label}
                    onMouseEnter={() =>
                      hasMega && handleButtonMouseEnter(item.label)
                    }
                    onMouseLeave={() => hasMega && handleButtonMouseLeave()}
                  >
                    {hasMega ? (
                      <Link
                        to={item.href}
                        onClick={() => setActiveMegaMenu(null)}
                        className={`flex items-center px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                          isLightNavTheme
                            ? isActive || isHovered
                              ? 'bg-white/20 text-white font-bold shadow-xs'
                              : 'text-white/90 hover:text-white hover:bg-white/10'
                            : isActive || isHovered
                              ? 'bg-blue-50 text-[#003893] font-bold'
                              : 'text-gray-700 hover:text-[#003893] hover:bg-gray-50'
                        }`}
                      >
                        <span>{getNavLabel(item.label)}</span>
                        <ChevronDown
                          className={`ml-1 h-3.5 w-3.5 transition-transform duration-200 ${
                            isHovered ? 'rotate-180' : ''
                          } ${
                            isLightNavTheme
                              ? 'text-white/70'
                              : 'text-gray-500 group-hover:text-[#003893]'
                          }`}
                        />
                      </Link>
                    ) : (
                      <Link
                        to={item.href}
                        className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all block ${
                          isLightNavTheme
                            ? isActive
                              ? 'bg-white/20 text-white font-bold shadow-xs'
                              : 'text-white/90 hover:text-white hover:bg-white/10'
                            : isActive
                              ? 'bg-blue-50 text-[#003893] font-bold'
                              : 'text-gray-700 hover:text-[#003893] hover:bg-gray-50'
                        }`}
                      >
                        {getNavLabel(item.label)}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Actions: Language Switcher [ EN ] [ FIL ] */}
            <div className="hidden lg:flex items-center space-x-4">
              <div
                className={`inline-flex rounded-lg p-0.5 border text-xs font-semibold transition-colors ${
                  isLightNavTheme
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-600'
                }`}
              >
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    !isFil
                      ? 'bg-white text-[#003893] shadow-xs font-bold'
                      : isLightNavTheme
                        ? 'text-white/80 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-pressed={!isFil}
                  title="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('fil')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    isFil
                      ? 'bg-white text-[#003893] shadow-xs font-bold'
                      : isLightNavTheme
                        ? 'text-white/80 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-pressed={isFil}
                  title="Lumipat sa Filipino"
                >
                  FIL
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Language Switcher */}
              <div
                className={`inline-flex rounded-md p-0.5 border text-[11px] font-semibold ${
                  isLightNavTheme
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-600'
                }`}
              >
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-0.5 rounded ${
                    !isFil
                      ? 'bg-white text-[#003893] shadow-xs font-bold'
                      : isLightNavTheme
                        ? 'text-white/80'
                        : 'text-gray-600'
                  }`}
                  aria-pressed={!isFil}
                  title="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('fil')}
                  className={`px-2 py-0.5 rounded ${
                    isFil
                      ? 'bg-white text-[#003893] shadow-xs font-bold'
                      : isLightNavTheme
                        ? 'text-white/80'
                        : 'text-gray-600'
                  }`}
                  aria-pressed={isFil}
                  title="Lumipat sa Filipino"
                >
                  FIL
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className={`p-2 rounded-lg transition-colors focus:outline-none ${
                  isLightNavTheme
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-[#003893] hover:bg-gray-100'
                }`}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------
            ACTIVE MEGA MENU PANEL AT NAV LEVEL
            (Anchored directly below the navigation bar across full container)
            ---------------------------------------------------- */}
        {activeMegaMenuData &&
          (() => {
            const featuredData = activeMegaMenu
              ? getMegaMenuFeatured(activeMegaMenu, activeMegaMenuData.featured)
              : activeMegaMenuData.featured;

            return (
              <div
                className="absolute left-0 right-0 top-full pt-1.5 z-50 flex justify-center animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseEnter={handleMegaPanelMouseEnter}
                onMouseLeave={handleMegaPanelMouseLeave}
              >
                <div className="container mx-auto px-4 max-w-7xl">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/90 text-gray-900 p-6 lg:p-7 grid grid-cols-12 gap-6 ring-1 ring-black/5 overflow-hidden">
                    {/* 3 Categorized Columns (9 cols) */}
                    <div className="col-span-8 lg:col-span-9 grid grid-cols-3 gap-6">
                      {activeMegaMenuData.columns.map(col => (
                        <div key={col.heading} className="space-y-3">
                          <div className="text-xs font-black uppercase tracking-wider text-[#003893] pb-1.5 border-b border-blue-100 flex items-center justify-between">
                            <span>{col.heading}</span>
                            <span className="text-[10px] text-gray-400 font-semibold font-mono">
                              {col.items.length} links
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {col.items.map(mItem => {
                              const ItemIcon = getMegaIcon(mItem.iconName);
                              const isExternal = mItem.href.startsWith('http');

                              const Content = (
                                <div className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/80 transition-all duration-150 group/item">
                                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#003893] group-hover/item:bg-[#003893] group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                    <ItemIcon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                      <div className="text-xs font-bold text-gray-900 group-hover/item:text-[#003893] transition-colors truncate">
                                        {mItem.title}
                                      </div>
                                      {mItem.badge && (
                                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 shrink-0">
                                          {mItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    {mItem.description && (
                                      <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 group-hover/item:text-gray-700">
                                        {mItem.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );

                              return isExternal ? (
                                <a
                                  key={mItem.title}
                                  href={mItem.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={closeMenu}
                                  className="block"
                                >
                                  {Content}
                                </a>
                              ) : (
                                <Link
                                  key={mItem.title}
                                  to={mItem.href}
                                  onClick={closeMenu}
                                  className="block"
                                >
                                  {Content}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Side Featured Card (3 cols) */}
                    <div className="col-span-4 lg:col-span-3">
                      <div className="bg-gradient-to-br from-[#003893] via-[#00225e] to-slate-900 text-white p-5 rounded-2xl h-full flex flex-col justify-between shadow-md border border-blue-800/40 relative overflow-hidden group/card">
                        <div className="space-y-2 relative z-10">
                          {featuredData.tag && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-sans shadow-xs inline-block">
                              {featuredData.tag}
                            </span>
                          )}
                          <h4 className="text-base font-extrabold text-white tracking-tight leading-snug pt-1">
                            {featuredData.title}
                          </h4>
                          <p className="text-xs text-blue-100/90 leading-relaxed">
                            {featuredData.description}
                          </p>
                        </div>

                        <div className="relative z-10 pt-4 mt-3 border-t border-white/15 space-y-3">
                          {featuredData.stat && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[11px] text-blue-200">
                                {featuredData.statLabel}
                              </span>
                              <span className="font-mono font-bold text-amber-300">
                                {featuredData.stat}
                              </span>
                            </div>
                          )}

                          <Link
                            to={featuredData.href}
                            onClick={closeMenu}
                            className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-[#003893] hover:bg-blue-50 font-bold px-3.5 py-2 rounded-xl text-xs transition-colors shadow-sm"
                          >
                            <span>{featuredData.ctaText}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/card:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* Mobile Menu Accordion Drawer */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-8 space-y-2 shadow-2xl max-h-[80vh] overflow-y-auto">
            {mainNavigation.map(item => (
              <div key={item.label} className="border-b border-gray-100 pb-2">
                {item.megaMenu ? (
                  <div>
                    <button
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="w-full flex justify-between items-center py-2.5 text-sm font-bold text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        <span>{getNavLabel(item.label)}</span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-blue-50 text-[#003893]">
                          Menu
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          activeMobileMenu === item.label
                            ? 'transform rotate-180 text-[#003893]'
                            : ''
                        }`}
                      />
                    </button>

                    {activeMobileMenu === item.label && (
                      <div className="pl-2 py-2 space-y-4 bg-gray-50 rounded-xl my-1.5 p-3">
                        {item.megaMenu.columns.map(col => (
                          <div key={col.heading} className="space-y-1.5">
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#003893]">
                              {col.heading}
                            </div>
                            <div className="space-y-1">
                              {col.items.map(mItem => {
                                const ItemIcon = getMegaIcon(mItem.iconName);
                                return (
                                  <Link
                                    key={mItem.title}
                                    to={mItem.href}
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 py-1.5 px-2 text-xs font-semibold text-gray-700 hover:text-[#003893] hover:bg-white rounded-lg transition-colors"
                                  >
                                    <ItemIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                    <span>{mItem.title}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                        <div className="pt-2 border-t border-gray-200">
                          {(() => {
                            const mobileFeatured = getMegaMenuFeatured(
                              item.label,
                              item.megaMenu.featured
                            );
                            return (
                              <Link
                                to={mobileFeatured.href}
                                onClick={closeMenu}
                                className="block text-center text-xs font-bold text-[#003893] bg-white p-2 rounded-lg border border-gray-200 shadow-xs"
                              >
                                {mobileFeatured.ctaText} &rarr;
                              </Link>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={closeMenu}
                    className="block py-2.5 text-sm font-bold text-gray-900 hover:text-[#003893]"
                  >
                    {getNavLabel(item.label)}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
