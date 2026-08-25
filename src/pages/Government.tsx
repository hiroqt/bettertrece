import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router';
import {
  ShieldCheck,
  Landmark,
  MapPin,
  Building2,
  FileSpreadsheet,
  Phone,
  Search,
  CheckCircle2,
  Award,
  Users,
  Calendar,
  ChevronRight,
  Copy,
  Check,
  Flame,
  Shield,
  HeartPulse,
  HardHat,
  Coins,
  FileCheck2,
} from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import {
  CITY_COUNCILORS,
  BARANGAY_CAPTAINS,
  OFFICIALS_METADATA,
} from '../data/electedOfficials';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import * as LucideIcons from 'lucide-react';

type SectionId =
  | 'executive'
  | 'legislative'
  | 'barangays'
  | 'departments'
  | 'transparency'
  | 'hotlines';

interface NavSection {
  id: SectionId;
  label: string;
  eyebrow: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'executive',
    label: 'Executive Branch',
    eyebrow: 'LEADERSHIP',
    icon: ShieldCheck,
  },
  {
    id: 'legislative',
    label: 'Legislative Branch',
    eyebrow: 'LAWMAKERS',
    icon: Landmark,
  },
  {
    id: 'barangays',
    label: 'Barangay Officials',
    eyebrow: 'GRASSROOTS LEADERSHIP',
    icon: MapPin,
  },
  {
    id: 'departments',
    label: 'Departments & Key Offices',
    eyebrow: 'DEPARTMENTS',
    icon: Building2,
  },
  {
    id: 'transparency',
    label: 'Civic Transparency',
    eyebrow: 'OPEN GOVERNANCE',
    icon: FileSpreadsheet,
  },
  {
    id: 'hotlines',
    label: 'Public Assistance & Hotlines',
    eyebrow: 'EMERGENCY & 24/7 SUPPORT',
    icon: Phone,
  },
];

export default function Government() {
  const { category } = useParams();
  const location = useLocation();

  // State for single-page interactive view
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    const hashId = window.location.hash.replace('#', '') as SectionId;
    return NAV_SECTIONS.some(s => s.id === hashId) ? hashId : 'executive';
  });
  const [barangaySearch, setBarangaySearch] = useState('');
  const [councilSearch, setCouncilSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Subcategory loader for specific routes like /government/:category
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return governmentCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    if (category && categoryData) {
      let isMounted = true;
      getCategorySubcategories(category)
        .then(res => {
          if (isMounted) {
            setCategoryIndex(res);
            setLoading(false);
          }
        })
        .catch(err => {
          console.error(err);
          if (isMounted) setLoading(false);
        });
      return () => {
        isMounted = false;
      };
    }
  }, [category, categoryData]);

  // Track active section on scroll
  useEffect(() => {
    if (category) return;

    // Check if initial hash is present
    if (location.hash) {
      const hashId = location.hash.replace('#', '') as SectionId;
      if (NAV_SECTIONS.some(s => s.id === hashId)) {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0.1,
      }
    );

    NAV_SECTIONS.forEach(sec => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [category, location.hash]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filtered Barangays
  const filteredBarangays = useMemo(() => {
    if (!barangaySearch.trim()) return BARANGAY_CAPTAINS;
    const query = barangaySearch.toLowerCase();
    return BARANGAY_CAPTAINS.filter(
      b =>
        b.barangay.toLowerCase().includes(query) ||
        b.captain.toLowerCase().includes(query) ||
        (b.psgcCode && b.psgcCode.includes(query))
    );
  }, [barangaySearch]);

  // Filtered Councilors
  const filteredCouncilors = useMemo(() => {
    if (!councilSearch.trim()) return CITY_COUNCILORS;
    const query = councilSearch.toLowerCase();
    return CITY_COUNCILORS.filter(
      c =>
        c.name.toLowerCase().includes(query) ||
        c.position.toLowerCase().includes(query)
    );
  }, [councilSearch]);

  // ==========================================
  // VIEW A: SPECIFIC SUBCATEGORY (e.g. /government/guides-and-regulations)
  // ==========================================
  if (category) {
    if (!categoryData) {
      return (
        <Section className="p-3 mb-12 pt-44 sm:pt-44 lg:pt-48">
          <Breadcrumbs className="mb-8" />
          <Banner
            type="error"
            title="Category not found"
            description="The category you are looking for does not exist."
            icon
          />
        </Section>
      );
    }

    return (
      <>
        <SEO
          title={categoryData.category || category}
          description={categoryData.description}
          keywords={`${categoryData.category}, government services, public services, local government`}
        />
        <Section className="p-3 mb-12 pt-44 sm:pt-44 lg:pt-48">
          <Breadcrumbs className="mb-8" />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center">
              {Icon && <Icon className="h-6 w-6" />}
            </div>
            <div>
              <Heading>{categoryData.category || category}</Heading>
              <Text className="text-gray-600">{categoryData.description}</Text>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Text>Loading subcategories...</Text>
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                    className="block group"
                  >
                    <Card
                      hoverable
                      className="transition-all hover:border-[#003893] hover:shadow-md"
                    >
                      <CardContent className="p-5 flex flex-col justify-between h-full">
                        <div>
                          <h4 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                            {subcategory.name}
                          </h4>
                          {subcategory.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                              {subcategory.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-[#003893]">
                          <span>View Official Document</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/government"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#003893] hover:text-blue-800"
                >
                  <span>&larr; Back to Full Government Portal</span>
                </Link>
              </div>
            </div>
          )}
        </Section>
      </>
    );
  }

  // ==========================================
  // VIEW B: ENHANCED ONE-PAGE GOVERNMENT HUB
  // ==========================================
  return (
    <>
      <SEO
        title="Government & Elected Officials | City of Trece Martires"
        description="Explore the Executive Branch, Sangguniang Panlungsod lawmakers, 13 constituent barangays, municipal departments, and civic transparency records of the City of Trece Martires, Cavite (Term: 2023–2026)."
        keywords="Trece Martires City Mayor, Vice Mayor, Sangguniang Panlungsod, Councilors, Barangay Captains, Cavite, local government, civic transparency"
      />

      <main className="flex-grow bg-slate-50/50 pb-20">
        {/* Top Header Hero */}
        <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-10 sm:pb-14 border-b border-blue-900/40 shadow-inner">
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Government', href: '/government' },
              ]}
              className="mb-6 text-blue-200"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-blue-100 border border-white/15 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-300" />
                    <span>Term: {OFFICIALS_METADATA.term}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Last Verified: {OFFICIALS_METADATA.lastVerified}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires City Government
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  The official portal for municipal executive leadership,
                  Sangguniang Panlungsod lawmakers, 13 constituent barangays,
                  administrative departments, and civic transparency records.
                </p>
              </div>

              {/* Fast Stats Pill Box */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    Official Status
                  </div>
                  <div className="text-base font-extrabold text-white">
                    2nd Class Component City
                  </div>
                  <div className="text-xs text-blue-200/80 font-mono">
                    Seat: San Agustin (Poblacion)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Jump-To-Section Bar */}
        <div className="lg:hidden bg-white border-b border-gray-200 py-2.5 px-4 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase shrink-0">
              Jump to:
            </span>
            {NAV_SECTIONS.map(sec => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeSection === sec.id
                    ? 'bg-[#003893] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column One-Page Layout */}
        <div className="container mx-auto px-4 max-w-7xl pt-8 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ==========================================
                LEFT COLUMN: STICKY SIDEBAR NAVIGATION
                ========================================== */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-36 space-y-4">
              <nav
                aria-label="Government Sections"
                className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 overflow-hidden"
              >
                <div className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider px-3 pb-2.5 border-b border-gray-100">
                  Jump to Section
                </div>

                <ul className="space-y-1 mt-2.5" role="list">
                  {NAV_SECTIONS.map(section => {
                    const SectionIcon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          aria-current={isActive ? 'true' : undefined}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all group ${
                            isActive
                              ? 'bg-blue-50 text-[#003893] font-bold shadow-xs border border-blue-200/60'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <SectionIcon
                              className={`w-4 h-4 shrink-0 transition-colors ${
                                isActive
                                  ? 'text-[#003893]'
                                  : 'text-gray-400 group-hover:text-gray-600'
                              }`}
                            />
                            <span className="truncate">{section.label}</span>
                          </div>
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#003893] shrink-0" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Sidebar Quick Card: Leadership Term & Verification */}
              <div className="bg-gradient-to-br from-slate-900 to-[#00225e] text-white p-4.5 rounded-2xl border border-blue-900/40 shadow-xs space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Official Roster</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Based on verified records from Trece Martires City Hall,
                  Sangguniang Panlungsod, and the Liga ng mga Barangay.
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200 font-mono">
                  <span>Term: 2023–2026</span>
                  <span className="text-emerald-300 font-sans font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            </aside>

            {/* ==========================================
                RIGHT COLUMN: CONTINUOUS ONE-PAGE SECTIONS
                ========================================== */}
            <div className="lg:col-span-9 space-y-12 sm:space-y-14 min-w-0">
              {/* -------------------------------------------
                  1. EXECUTIVE BRANCH SECTION
                  ------------------------------------------- */}
              <section
                id="executive"
                aria-labelledby="heading-executive"
                className="scroll-mt-36 sm:scroll-mt-40 space-y-5"
              >
                <div>
                  <h2
                    id="heading-executive"
                    className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
                  >
                    Executive Branch
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    The executive officials leading Trece Martires City&apos;s
                    governance and public administration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* City Mayor Card (Theme Blue: #003893) */}
                  <div className="bg-gradient-to-br from-[#003893] to-[#00225e] text-white p-6 rounded-2xl shadow-md border border-blue-700/50 relative overflow-hidden flex flex-col justify-between group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Award className="w-24 h-24 text-amber-300" />
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-sans shadow-xs">
                          CITY MAYOR
                        </span>
                        <span className="text-[11px] font-mono text-blue-200">
                          Term: {OFFICIALS_METADATA.term}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          Hon. Gemma Buendia-Lubigan
                        </h3>
                        <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-1">
                          Chief Executive Officer &bull; City of Trece Martires
                        </p>
                      </div>

                      <p className="text-xs text-blue-200 leading-relaxed pt-1">
                        Directs municipal policy, city executive departments,
                        community health and assistance programs, economic
                        growth, and infrastructure modernization.
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs text-blue-200 font-medium">
                      <span className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active in Office</span>
                      </span>
                      <Link
                        to="/government/departments/executive"
                        className="text-amber-300 hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Office Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* City Vice Mayor Card (Theme Navy: #00225e to #001845) */}
                  <div className="bg-gradient-to-br from-[#00225e] to-[#001438] text-white p-6 rounded-2xl shadow-md border border-blue-900/60 relative overflow-hidden flex flex-col justify-between group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Landmark className="w-24 h-24 text-blue-300" />
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/30 text-blue-100 border border-white/20 font-sans">
                          CITY VICE MAYOR &bull; PRESIDING OFFICER, SP
                        </span>
                        <span className="text-[11px] font-mono text-blue-200">
                          Term: {OFFICIALS_METADATA.term}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          Hon. Romeo Bobby Montehermoso Jr.
                        </h3>
                        <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-1">
                          Presiding Officer &bull; Sangguniang Panlungsod
                        </p>
                      </div>

                      <p className="text-xs text-blue-200 leading-relaxed pt-1">
                        Leads and presides over legislative sessions of the
                        Sangguniang Panlungsod, enacting local ordinances, city
                        resolutions, and municipal budgetary appropriations.
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 mt-4 border-t border-white/15 flex items-center justify-between text-xs text-blue-200 font-medium">
                      <span className="flex items-center gap-1.5 text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Presiding Officer</span>
                      </span>
                      <Link
                        to="/government/departments/legislative"
                        className="text-amber-300 hover:text-white font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Legislative Body</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* -------------------------------------------
                  2. LEGISLATIVE BRANCH SECTION
                  ------------------------------------------- */}
              <section
                id="legislative"
                aria-labelledby="heading-legislative"
                className="scroll-mt-36 sm:scroll-mt-40 space-y-5 pt-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <h2
                      id="heading-legislative"
                      className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
                    >
                      Legislative Branch
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Sangguniang Panlungsod members and sectoral
                      representatives, presided by the Vice Mayor.
                    </p>
                  </div>

                  {/* Search Councilors */}
                  <div className="relative min-w-[220px]">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={councilSearch}
                      onChange={e => setCouncilSearch(e.target.value)}
                      placeholder="Search councilor..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893]"
                    />
                  </div>
                </div>

                {/* Sangguniang Panlungsod Presiding Officer Banner */}
                <div className="bg-slate-900 text-white px-4.5 py-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-semibold text-slate-200">
                      Presiding Officer:
                    </span>
                    <strong className="text-white">
                      Hon. Romeo Bobby Montehermoso Jr. (Vice Mayor)
                    </strong>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    10 Councilors &bull; 2 Ex-Officio
                  </span>
                </div>

                {/* 10 Councilors Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {filteredCouncilors.map((c, idx) => {
                    const isExOfficio = c.roleType === 'Ex-Officio';
                    return (
                      <div
                        key={c.name}
                        className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                          isExOfficio
                            ? 'bg-amber-50/70 border-amber-300/80 shadow-xs hover:border-amber-500'
                            : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span
                              className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider text-[10px] ${
                                isExOfficio
                                  ? 'bg-amber-400 text-slate-950'
                                  : 'bg-blue-50 text-[#003893]'
                              }`}
                            >
                              {c.position}
                            </span>
                            <span className="font-mono text-gray-400 font-semibold">
                              #{idx + 1}
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-gray-900 pt-1 leading-snug">
                            {c.name}
                          </h3>

                          {c.notes && (
                            <p className="text-xs text-gray-600 font-medium">
                              {c.notes}
                            </p>
                          )}
                        </div>

                        <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                          <span>City Council</span>
                          <span className="text-emerald-700 font-semibold">
                            2023–2026
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* -------------------------------------------
                  3. BARANGAY OFFICIALS SECTION
                  ------------------------------------------- */}
              <section
                id="barangays"
                aria-labelledby="heading-barangays"
                className="scroll-mt-36 sm:scroll-mt-40 space-y-5 pt-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <h2
                      id="heading-barangays"
                      className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
                    >
                      13 Constituent Barangays &amp; Captains
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Directory of the 13 historical barangays and their elected
                      Punong Barangays (Barangay Captains).
                    </p>
                  </div>

                  {/* Search Barangays */}
                  <div className="relative min-w-[220px]">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={barangaySearch}
                      onChange={e => setBarangaySearch(e.target.value)}
                      placeholder="Search barangay or captain..."
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893]"
                    />
                  </div>
                </div>

                {/* 13 Barangays Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {filteredBarangays.map(brgy => (
                    <div
                      key={`${brgy.number}-${brgy.barangay}`}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#003893] font-bold text-[10px] uppercase tracking-wider">
                            Barangay #{brgy.number}
                          </span>
                          {brgy.psgcCode && (
                            <div className="flex items-center gap-1 font-mono text-[11px] text-gray-400">
                              <span>PSGC: {brgy.psgcCode}</span>
                              <button
                                onClick={() => copyToClipboard(brgy.psgcCode!)}
                                className="p-0.5 text-gray-400 hover:text-[#003893] rounded"
                                title="Copy PSGC"
                              >
                                {copiedCode === brgy.psgcCode ? (
                                  <Check className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide">
                            Barangay
                          </div>
                          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                            Brgy. {brgy.barangay}
                          </h3>
                        </div>

                        <div>
                          <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide">
                            Punong Barangay (Captain)
                          </div>
                          <div className="text-sm font-extrabold text-gray-900">
                            {brgy.captain}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2.5 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                        <span>Term: {brgy.term}</span>
                        <span className="text-emerald-700 font-semibold">
                          Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* -------------------------------------------
                  4. DEPARTMENTS & KEY OFFICES SECTION
                  ------------------------------------------- */}
              <section
                id="departments"
                aria-labelledby="heading-departments"
                className="scroll-mt-36 sm:scroll-mt-40 space-y-5 pt-4"
              >
                <div>
                  <h2
                    id="heading-departments"
                    className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
                  >
                    Departments &amp; Key Offices
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Explore municipal offices, departments, public records, and
                    administrative divisions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {governmentCategories.categories.map(cat => {
                    const CatIcon = LucideIcons[
                      cat.icon as keyof typeof LucideIcons
                    ] as React.ComponentType<{ className?: string }>;
                    return (
                      <Link
                        key={cat.slug}
                        to={`/government/${cat.slug}`}
                        className="group flex flex-col justify-between p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003893] group-hover:bg-[#003893] group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                            {CatIcon && <CatIcon className="w-5 h-5" />}
                          </div>

                          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors mb-1.5 leading-snug">
                            {cat.category}
                          </h3>

                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                            {cat.description}
                          </p>
                        </div>

                        <div className="flex items-center text-xs font-bold text-[#003893] group-hover:translate-x-1 transition-transform">
                          <span>View Directory &amp; Pages</span>
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* -------------------------------------------
                  5. CIVIC TRANSPARENCY & REPORTS SECTION
                  ------------------------------------------- */}
              <section
                id="transparency"
                aria-labelledby="heading-transparency"
                className="scroll-mt-36 sm:scroll-mt-40 space-y-5 pt-4"
              >
                <div>
                  <h2
                    id="heading-transparency"
                    className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
                  >
                    Civic Transparency &amp; Reports
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Open access to Trece Martires City revenue &amp; budget,
                    DPWH infrastructure projects, municipal census demographics,
                    and Full Disclosure Policy records.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* City Revenue & Budget Card */}
                  <Link
                    to="/transparency"
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <Coins className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                        City Revenue &amp; Budget
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        DBM / DOF-BLGF Statement of Receipts and Expenditures,
                        local tax collections, and fiscal breakdowns.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-emerald-700 flex items-center justify-between">
                      <span>View Revenue Data</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* GAA National Budget Card */}
                  <Link
                    to="/transparency?tab=gaa"
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-700 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00225e] flex items-center justify-center">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                        National Budget (GAA 2020–2026)
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        ₱6.06B in National Government appropriations for public
                        high schools, DPWH flood dikes, road corridors, and
                        academic buildings.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-[#00225e] flex items-center justify-between">
                      <span>View National Budget</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* COA Annual Audit Card */}
                  <Link
                    to="/transparency?tab=audit"
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-700 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00225e] flex items-center justify-center">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                        COA Annual Audit Report (2024)
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Commission on Audit findings, ₱4.55B city assets, 15
                        audit observations, agency action plans, and official
                        PDFs.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-[#00225e] flex items-center justify-between">
                      <span>View Audit Report</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* DPWH Card */}
                  <Link
                    to="/transparency/dpwh"
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                        <HardHat className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                        DPWH Infrastructure Transparency
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Public tracker for national and local road works,
                        bridges, drainage systems, and school facilities.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-[#003893] flex items-center justify-between">
                      <span>Explore Projects</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Demographics Card */}
                  <Link
                    to="/demographics"
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                        Summary Demographics &amp; PSA PSGC
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        PSA 2024 POPCEN (227,892), COMELEC registered voters,
                        and 13 barangays population growth census.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-[#003893] flex items-center justify-between">
                      <span>View Demographics</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>

                  {/* Full Disclosure Card */}
                  <Link
                    to="/government/transparency-documents/full-disclosure-policy"
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                        Full Disclosure Policy (FDP)
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Official financial budgets, annual procurement plans,
                        and local revenue expenditures.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-[#003893] flex items-center justify-between">
                      <span>View Reports</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </section>

              {/* -------------------------------------------
                  6. PUBLIC ASSISTANCE & HOTLINES SECTION
                  ------------------------------------------- */}
              <section
                id="hotlines"
                aria-labelledby="heading-hotlines"
                className="scroll-mt-36 sm:scroll-mt-40 space-y-5 pt-4"
              >
                <div>
                  <h2
                    id="heading-hotlines"
                    className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
                  >
                    Public Assistance &amp; Hotlines
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Direct contact numbers for immediate assistance, disaster
                    response, and medical emergencies.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CDRRMO */}
                  <div className="p-4.5 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-xs transition-all flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">
                        CDRRMO Trece Martires
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Disaster Risk Reduction &amp; Rescue
                      </p>
                      <div className="space-y-1 text-xs font-mono">
                        <a
                          href="tel:09619921998"
                          className="flex items-center gap-1.5 text-[#003893] hover:underline"
                        >
                          <Phone className="w-3 h-3" /> 0961-992-1998 (Smart)
                        </a>
                        <a
                          href="tel:0464190125"
                          className="flex items-center gap-1.5 text-gray-700 hover:underline"
                        >
                          <Phone className="w-3 h-3" /> (046) 419-0125
                          (Landline)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* BFP */}
                  <div className="p-4.5 rounded-2xl bg-white border border-gray-200 hover:border-amber-300 hover:shadow-xs transition-all flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">
                        BFP Fire Station
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Fire Prevention &amp; Response
                      </p>
                      <div className="space-y-1 text-xs font-mono">
                        <a
                          href="tel:0464151217"
                          className="flex items-center gap-1.5 text-[#003893] hover:underline"
                        >
                          <Phone className="w-3 h-3" /> (046) 415-1217 /
                          419-0268
                        </a>
                        <a
                          href="tel:09223850551"
                          className="flex items-center gap-1.5 text-gray-700 hover:underline"
                        >
                          <Phone className="w-3 h-3" /> 0922-385-0551 (Mobile)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* PNP */}
                  <div className="p-4.5 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xs transition-all flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">
                        PNP Police Station
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Law Enforcement &amp; Peace
                      </p>
                      <div className="space-y-1 text-xs font-mono">
                        <a
                          href="tel:09491849145"
                          className="flex items-center gap-1.5 text-[#003893] hover:underline"
                        >
                          <Phone className="w-3 h-3" /> 0949-184-9145 (Smart)
                        </a>
                        <a
                          href="tel:0464190286"
                          className="flex items-center gap-1.5 text-gray-700 hover:underline"
                        >
                          <Phone className="w-3 h-3" /> (046) 419-0286
                          (Landline)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* CHO */}
                  <div className="p-4.5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-xs transition-all flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900">
                        City Health Office (CHO)
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        Public Medical &amp; Clinical Care
                      </p>
                      <div className="space-y-1 text-xs font-mono">
                        <a
                          href="tel:0468401705"
                          className="flex items-center gap-1.5 text-[#003893] hover:underline"
                        >
                          <Phone className="w-3 h-3" /> (046) 840-1705 /
                          419-1065
                        </a>
                        <div className="text-gray-500 text-[11px] font-sans">
                          Trece Martires City Hall Compound
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
