import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

export const BetterTreceLogo: React.FC<{ className?: string }> = ({
  className = 'h-12',
}) => {
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
          <span className="font-extrabold text-xl tracking-tight text-gray-900 font-sans">
            Better<span className="text-[#003893]">Trece</span>
          </span>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
            .org
          </span>
        </div>
        <span className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase">
          Trece Martires City, Cavite
        </span>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { i18n } = useTranslation('common');
  const location = useLocation();

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  const currentLang = i18n.language || 'en';

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* 1. TOP EMERGENCY HOTLINES BAR (Red) */}
      <div className="bg-[#e00000] text-white text-xs font-medium py-1.5 px-4 overflow-x-auto scrollbar-none border-b border-red-700">
        <div className="container mx-auto flex items-center justify-between min-w-max gap-6">
          <div className="flex items-center gap-2 font-bold tracking-wide text-white uppercase shrink-0">
            <PhoneCall className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
            <span>EMERGENCY HOTLINES</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <a
              href="tel:09619921998"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
              title="Call CDRRMO Trece Martires"
            >
              <Shield className="w-3 h-3 text-red-200" />
              <span className="font-semibold">CDRRMO:</span>
              <span className="font-mono">0961-992-1998</span>
            </a>

            <span className="text-red-300">|</span>

            <a
              href="tel:0464151217"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
              title="Call City Fire Station"
            >
              <Flame className="w-3 h-3 text-red-200" />
              <span className="font-semibold">City Fire Station:</span>
              <span className="font-mono">046-415-1217</span>
            </a>

            <span className="text-red-300">|</span>

            <a
              href="tel:09491849145"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
              title="Call City Police Station"
            >
              <Phone className="w-3 h-3 text-red-200" />
              <span className="font-semibold">City Police Station:</span>
              <span className="font-mono">0949-184-9145</span>
            </a>

            <span className="text-red-300">|</span>

            <a
              href="tel:0468401705"
              className="flex items-center gap-1.5 hover:text-yellow-200 transition-colors"
              title="Call City Health Office"
            >
              <HeartPulse className="w-3 h-3 text-red-200" />
              <span className="font-semibold">City Health Office:</span>
              <span className="font-mono">046-840-1705</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY DARK INFO BAR (Forex, Weather, Time) */}
      <div className="bg-[#0b1329] text-gray-300 text-[11px] sm:text-xs py-1 px-4 border-b border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
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

      {/* 3. MAIN NAVIGATION BAR */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Brand Logo */}
            <Link to="/" className="group flex items-center">
              <BetterTreceLogo />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {mainNavigation.map(item => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href);

                return (
                  <div key={item.label} className="relative group">
                    {item.children ? (
                      <div className="flex items-center">
                        <button
                          type="button"
                          className={`flex items-center px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-[#003893] font-semibold'
                              : 'text-gray-700 hover:text-[#003893] hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className="ml-1 h-3.5 w-3.5 text-gray-500 group-hover:text-[#003893] transition-transform group-hover:rotate-180 duration-200" />
                        </button>
                        <div className="absolute left-0 top-full mt-1 w-64 rounded-xl shadow-xl bg-white ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-1.5 border border-gray-100">
                          {item.children.map(child => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-[#003893] rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors block ${
                          isActive
                            ? 'bg-blue-50 text-[#003893] font-semibold'
                            : 'text-gray-700 hover:text-[#003893] hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Actions: Language Switcher [ EN ] [ FIL ] */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="inline-flex rounded-lg p-0.5 bg-gray-100 border border-gray-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    currentLang.startsWith('en')
                      ? 'bg-white text-[#003893] shadow-sm font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('fil')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    currentLang.startsWith('fil')
                      ? 'bg-white text-[#003893] shadow-sm font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  FIL
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Language Switcher */}
              <div className="inline-flex rounded-md p-0.5 bg-gray-100 border border-gray-200 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-0.5 rounded ${
                    currentLang.startsWith('en')
                      ? 'bg-white text-[#003893] shadow-xs font-bold'
                      : 'text-gray-600'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => changeLanguage('fil')}
                  className={`px-2 py-0.5 rounded ${
                    currentLang.startsWith('fil')
                      ? 'bg-white text-[#003893] shadow-xs font-bold'
                      : 'text-gray-600'
                  }`}
                >
                  FIL
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-700 hover:text-[#003893] hover:bg-gray-100 focus:outline-none"
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

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
            {mainNavigation.map(item => (
              <div key={item.label} className="border-b border-gray-50 pb-2">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="w-full flex justify-between items-center py-2 text-sm font-semibold text-gray-800"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          activeMenu === item.label
                            ? 'transform rotate-180'
                            : ''
                        }`}
                      />
                    </button>
                    {activeMenu === item.label && (
                      <div className="pl-4 py-1 space-y-1.5 bg-gray-50 rounded-lg my-1">
                        {item.children.map(child => (
                          <Link
                            key={child.label}
                            to={child.href}
                            onClick={closeMenu}
                            className="block py-1.5 text-xs text-gray-700 hover:text-[#003893]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    onClick={closeMenu}
                    className="block py-2 text-sm font-semibold text-gray-800 hover:text-[#003893]"
                  >
                    {item.label}
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
