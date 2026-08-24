import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router';
import {
  serviceCategories,
  getCategorySubcategories,
  getAllServiceCategoriesWithPages,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import {
  Search,
  X,
  ArrowRight,
  ChevronRight,
  Building2,
  Heart,
  GraduationCap,
  Users,
  Wheat,
  Wrench,
  Trash2,
  TreePine,
  Shield,
  Home as HomeIcon,
  Phone,
  Clock,
  FileText,
  Layers,
  Sparkles,
  CheckCircle2,
  Info,
  Grid,
  List as ListIcon,
  Briefcase,
  Store,
  FileCheck,
  TrendingUp,
  Baby,
  AlertTriangle,
} from 'lucide-react';

// Icon Map for reliable Lucide icon rendering
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  GraduationCap,
  Building2,
  Users,
  Wheat,
  Wrench,
  Trash2,
  TreePine,
  Shield,
  Home: HomeIcon,
  Briefcase,
  Store,
  FileCheck,
  TrendingUp,
  Baby,
  AlertTriangle,
  FileText,
};

const getCategoryIcon = (
  iconName?: string
): React.ComponentType<{ className?: string }> => {
  if (!iconName) return FileText;
  return ICON_MAP[iconName] || FileText;
};

function CategoryIcon({
  iconName,
  className,
  fallback: Fallback = Layers,
}: {
  iconName?: string;
  className?: string;
  fallback?: React.ComponentType<{ className?: string }>;
}) {
  const IconComponent = (iconName && ICON_MAP[iconName]) || Fallback;
  return <IconComponent className={className} />;
}

// Curated popular service shortcuts for citizens
const POPULAR_SERVICES = [
  {
    title: "Mayor's Business Permit (BPLO)",
    category: 'Business and Livelihood',
    categorySlug: 'business',
    docSlug: 'apply-for-barangay-clearance-and-mayors-business-permits',
    desc: 'Application process, fees, and requirements for new and renewing businesses.',
    icon: Briefcase,
    badge: 'High Demand',
  },
  {
    title: 'Free Health Checkups & Medicines',
    category: 'Health Services',
    categorySlug: 'health-services',
    docSlug: 'get-free-check-ups-basic-medicines-and-vaccines',
    desc: 'Free primary consultations, maintenance medicines, and vaccinations via CHO.',
    icon: Heart,
    badge: 'Free Public Care',
  },
  {
    title: 'Local City Scholarships',
    category: 'Education',
    categorySlug: 'education',
    docSlug: 'apply-for-local-scholarships',
    desc: 'Financial educational assistance for deserving high school and college students.',
    icon: GraduationCap,
    badge: 'Education Aid',
  },
  {
    title: 'Garbage Collection Schedules',
    category: 'Garbage and Waste Disposal',
    categorySlug: 'garbage-waste-disposal',
    docSlug: 'check-garbage-collection-schedules-and-request-pickup',
    desc: 'Barangay solid waste collection timetables and special waste pickup guidelines.',
    icon: Trash2,
    badge: 'Waste Management',
  },
];

const Services: React.FC = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & view states
  const initialSearchQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  // Subcategories state for single category view
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);

  // All service categories pre-loaded with pages for instant search
  const allCategoriesWithPages = useMemo(() => {
    return getAllServiceCategoriesWithPages();
  }, []);

  // Total count of guides across all categories
  const totalGuidesCount = useMemo(() => {
    return allCategoriesWithPages.reduce(
      (sum, cat) => sum + (cat.pages?.length || 0),
      0
    );
  }, [allCategoriesWithPages]);

  // Current category data if in /services/:category
  const categoryData = useMemo(() => {
    if (!category) return undefined;
    return serviceCategories.categories.find(c => c.slug === category);
  }, [category]);

  // Load subcategories when category changes
  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(res => {
          setCategoryIndex(res);
          if (res.layout) {
            setLayoutMode(res.layout);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  // Filtered subcategories for category-specific view
  const filteredSubcategories = useMemo(() => {
    const list: Subcategory[] = categoryIndex.pages || [];
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }, [categoryIndex.pages, searchQuery]);

  // Global search results across ALL categories
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: {
      categoryName: string;
      categorySlug: string;
      icon: string;
      subcategory: Subcategory;
    }[] = [];

    allCategoriesWithPages.forEach(cat => {
      cat.pages.forEach(sub => {
        if (
          sub.name.toLowerCase().includes(q) ||
          (sub.description && sub.description.toLowerCase().includes(q)) ||
          cat.category.toLowerCase().includes(q)
        ) {
          results.push({
            categoryName: cat.category,
            categorySlug: cat.slug,
            icon: cat.icon,
            subcategory: sub,
          });
        }
      });
    });

    return results;
  }, [allCategoriesWithPages, searchQuery]);

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setSearchParams(
      prev => {
        const next = new URLSearchParams(prev);
        if (val) {
          next.set('q', val);
        } else {
          next.delete('q');
        }
        return next;
      },
      { replace: true }
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams(
      prev => {
        const next = new URLSearchParams(prev);
        next.delete('q');
        return next;
      },
      { replace: true }
    );
  };

  // =========================================================================
  // VIEW 1: CATEGORY SPECIFIC VIEW (/services/:category)
  // =========================================================================
  if (category) {
    if (!categoryData) {
      return (
        <main className="flex-grow bg-slate-50/50 pb-20">
          <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Services', href: '/services' },
                  { label: 'Not Found', href: '#' },
                ]}
                className="mb-6 text-blue-200"
              />
              <h1 className="text-3xl font-bold">Category Not Found</h1>
              <p className="text-blue-100 mt-2">
                The service category &quot;{category}&quot; does not exist.
              </p>
              <div className="mt-6">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back to All Services</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      );
    }

    const breadcrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: categoryData.category, href: `/services/${category}` },
    ];

    return (
      <>
        <SEO
          title={`${categoryData.category} | City of Trece Martires Services`}
          description={categoryData.description}
          keywords={`${categoryData.category}, Trece Martires city services, public services, citizen charter, Cavite`}
        />

        <main className="flex-grow bg-slate-50/50 pb-20">
          {/* Top Hero Banner */}
          <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-10 sm:pb-14 border-b border-blue-900/40 shadow-inner">
            <div className="container mx-auto px-4 max-w-7xl">
              <Breadcrumbs items={breadcrumbs} className="mb-6 text-blue-200" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-blue-100 border border-white/15">
                      {categoryIndex.pages.length} Detailed Guides
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Official Citizen Charter</span>
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {categoryData.category}
                  </h1>

                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                    {categoryData.description}
                  </p>
                </div>

                {/* Fast Service Metadata Card */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shrink-0 max-w-md">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                    <CategoryIcon
                      iconName={categoryData.icon}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="space-y-0.5 text-xs text-blue-100">
                    <div className="font-bold text-white text-sm">
                      Citizen Charter Directory
                    </div>
                    <div className="flex items-center gap-1 text-blue-200">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span>Mon–Fri, 8:00 AM – 5:00 PM</span>
                    </div>
                    <div className="text-[11px] text-blue-200/80">
                      City Government of Trece Martires
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Category Switcher Bar */}
          <div className="bg-white border-b border-gray-200 shadow-xs">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex items-center gap-2 py-2.5 overflow-x-auto no-scrollbar scroll-smooth">
                <Link
                  to="/services"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all text-gray-700 hover:text-gray-900 hover:bg-gray-100 flex items-center gap-1.5 shrink-0"
                >
                  <Layers className="w-3.5 h-3.5 text-gray-500" />
                  <span>All Categories</span>
                </Link>

                {serviceCategories.categories.map(cat => {
                  const IconComp = getCategoryIcon(cat.icon);
                  const isActive = cat.slug === category;
                  return (
                    <Link
                      key={cat.slug}
                      to={`/services/${cat.slug}`}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 min-h-[38px] ${
                        isActive
                          ? 'bg-[#003893] text-white shadow-xs'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <IconComp
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-amber-300' : 'text-gray-500'
                        }`}
                      />
                      <span>{cat.category}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category Content Area */}
          <div className="container mx-auto px-4 max-w-7xl mt-8">
            {/* Filter & Search Strip */}
            <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Within Category */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={`Search in ${categoryData.category}...`}
                  className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#003893] focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* View layout toggle & Result Counter */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 text-xs text-gray-600">
                <span className="font-semibold">
                  Showing {filteredSubcategories.length} of{' '}
                  {categoryIndex.pages.length} guides
                </span>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-gray-200">
                  <button
                    onClick={() => setLayoutMode('grid')}
                    title="Grid Layout"
                    aria-label="Grid layout"
                    className={`p-1.5 rounded-lg transition-all ${
                      layoutMode === 'grid'
                        ? 'bg-white text-[#003893] shadow-xs'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayoutMode('list')}
                    title="List Layout"
                    aria-label="List layout"
                    className={`p-1.5 rounded-lg transition-all ${
                      layoutMode === 'list'
                        ? 'bg-white text-[#003893] shadow-xs'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-gray-200 text-center space-y-3">
                <div className="w-10 h-10 border-3 border-blue-200 border-t-[#003893] rounded-full animate-spin" />
                <p className="text-sm font-semibold text-gray-600">
                  Loading service procedures...
                </p>
              </div>
            ) : filteredSubcategories.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-gray-200 text-center max-w-lg mx-auto shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    No services found
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    No service guides in &quot;{categoryData.category}&quot;
                    matched &quot;{searchQuery}&quot;. Try a different search
                    term.
                  </p>
                </div>
                <button
                  onClick={clearSearch}
                  className="bg-[#003893] text-white hover:bg-blue-800 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              <>
                {layoutMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredSubcategories.map((sub, idx) => (
                      <Link
                        key={sub.slug || idx}
                        to={`/services/${category}/${sub.slug}`}
                        className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded-lg">
                              Step-by-Step Guide
                            </span>
                            <span className="text-[11px] font-mono text-gray-400">
                              #{idx + 1}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#003893] transition-colors leading-snug">
                            {sub.name}
                          </h3>

                          {sub.description && (
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                              {sub.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#003893]">
                          <span>Read Full Guide &amp; Requirements</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#003893]" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {filteredSubcategories.map((sub, idx) => (
                      <Link
                        key={sub.slug || idx}
                        to={`/services/${category}/${sub.slug}`}
                        className="group bg-white rounded-2xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2 py-0.5 rounded">
                              Citizen Charter
                            </span>
                            <span className="text-xs font-semibold text-gray-500">
                              Guide #{idx + 1}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                            {sub.name}
                          </h3>
                          {sub.description && (
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {sub.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#003893] group-hover:underline">
                            <span>Open Guide</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Helpful Citizen Tips & Office Info Banner */}
            <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-[#003893] font-bold text-xs uppercase tracking-wider">
                    <Info className="w-4 h-4 text-amber-500" />
                    <span>Citizen Assistance Note</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-gray-900">
                    Preparing for your visit to Trece Martires City Hall?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Always bring at least one (1) valid government-issued ID,
                    your Barangay Clearance, and necessary supporting documents
                    to ensure fast and smooth transaction processing.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Link
                    to="/government#departments"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-[#003893]" />
                    <span>City Departments Directory</span>
                  </Link>
                  <Link
                    to="/government#hotlines"
                    className="inline-flex items-center gap-2 bg-[#003893] hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Public Hotlines</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // =========================================================================
  // VIEW 2: MAIN SERVICES DIRECTORY (/services)
  // =========================================================================
  return (
    <>
      <SEO
        title="Public Services Directory | City of Trece Martires"
        description="Comprehensive citizen directory of services provided by the City Government of Trece Martires, Cavite. Access guides for business permits, health care, education scholarships, social welfare, and public works."
        keywords="Trece Martires services, government services, Mayor permit BPLO, city health clinic, Trece scholarships, waste collection schedule, social welfare Cavite"
      />

      <main className="flex-grow bg-slate-50/50 pb-20">
        {/* Top Header Hero */}
        <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-12 sm:pb-16 border-b border-blue-900/40 shadow-inner">
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
              ]}
              className="mb-6 text-blue-200"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-blue-100 border border-white/15">
                    10 Categories &bull; {totalGuidesCount}+ Detailed Guides
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>100% Free &amp; Open Access</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Trece Martires City Services Directory
                </h1>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                  Access step-by-step citizen charters, business permits, free
                  health consultations, scholarships, solid waste schedules, and
                  public welfare assistance from the City Government of Trece
                  Martires.
                </p>
              </div>

              {/* Fast Stats Pill Box */}
              <div className="grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0 max-w-xs">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-blue-200">
                    Categories
                  </div>
                  <div className="text-2xl font-black text-white font-mono">
                    10
                  </div>
                  <div className="text-[11px] text-blue-200/80">
                    Public Sectors
                  </div>
                </div>
                <div className="space-y-1 border-l border-white/20 pl-3">
                  <div className="text-xs font-semibold text-blue-200">
                    Procedures
                  </div>
                  <div className="text-2xl font-black text-amber-300 font-mono">
                    {totalGuidesCount}+
                  </div>
                  <div className="text-[11px] text-blue-200/80">
                    Documented Guides
                  </div>
                </div>
              </div>
            </div>

            {/* Global Real-time Search Box */}
            <div className="mt-8 max-w-3xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search all services, permits, health programs, or scholarships..."
                  className="w-full pl-12 pr-10 py-3.5 text-sm sm:text-base bg-white rounded-2xl shadow-lg border-2 border-transparent focus:border-amber-400 focus:outline-hidden text-gray-900 placeholder:text-gray-400 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category Quick Jump Bar */}
        <div className="bg-white border-b border-gray-200 shadow-xs">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center gap-2 py-2.5 overflow-x-auto no-scrollbar scroll-smooth">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                Jump To:
              </span>
              {serviceCategories.categories.map(cat => {
                const IconComp = getCategoryIcon(cat.icon);
                return (
                  <Link
                    key={cat.slug}
                    to={`/services/${cat.slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap bg-slate-100 hover:bg-blue-50 text-gray-700 hover:text-[#003893] transition-all shrink-0 border border-gray-200/80 hover:border-blue-200 min-h-[36px]"
                  >
                    <IconComp className="w-3.5 h-3.5 text-[#003893]" />
                    <span>{cat.category}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 max-w-7xl mt-8">
          {/* SEARCH RESULTS VIEW (if search input is active) */}
          {searchQuery.trim() ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-200 shadow-xs">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Search Results for &quot;{searchQuery}&quot;
                  </h2>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Found {globalSearchResults.length} matching service guide
                    {globalSearchResults.length === 1 ? '' : 's'} across all
                    categories.
                  </p>
                </div>
                <button
                  onClick={clearSearch}
                  className="text-xs font-bold text-[#003893] hover:underline"
                >
                  Clear Search
                </button>
              </div>

              {globalSearchResults.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 border border-gray-200 text-center max-w-lg mx-auto shadow-xs space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      No matching services found
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      We could not find any service guide matching &quot;
                      {searchQuery}&quot;. Please try a different query or
                      browse categories below.
                    </p>
                  </div>
                  <button
                    onClick={clearSearch}
                    className="bg-[#003893] text-white hover:bg-blue-800 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                  >
                    View All Categories
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {globalSearchResults.map((res, i) => {
                    const CatIcon = getCategoryIcon(res.icon);
                    return (
                      <Link
                        key={`${res.categorySlug}-${res.subcategory.slug}-${i}`}
                        to={`/services/${res.categorySlug}/${res.subcategory.slug}`}
                        className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#003893] bg-blue-50 px-2.5 py-1 rounded-lg">
                              <CatIcon className="w-3 h-3" />
                              <span>{res.categoryName}</span>
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#003893] group-hover:translate-x-0.5 transition-all" />
                          </div>

                          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors leading-snug">
                            {res.subcategory.name}
                          </h3>

                          {res.subcategory.description && (
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                              {res.subcategory.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-3 mt-3 border-t border-gray-100 text-xs font-semibold text-[#003893] flex items-center gap-1">
                          <span>Open Guide &amp; Requirements</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* POPULAR CITIZEN SERVICES STRIP */}
              <section className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                      Most Requested Public Services
                    </h2>
                  </div>
                  <span className="text-xs text-gray-500 hidden sm:inline font-medium">
                    Frequently accessed citizen procedures
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {POPULAR_SERVICES.map((item, idx) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={idx}
                        to={`/services/${item.categorySlug}/${item.docSlug}`}
                        className="group bg-gradient-to-br from-white to-blue-50/30 p-5 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003893] group-hover:bg-[#003893] group-hover:text-white flex items-center justify-center transition-colors">
                              <ItemIcon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                              {item.badge}
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#003893] transition-colors leading-snug">
                            {item.title}
                          </h3>

                          <p className="text-xs text-gray-600 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#003893]">
                          <span>{item.category}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* ALL 10 SERVICE CATEGORIES GRID */}
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                      All 10 Local Government Service Categories
                    </h2>
                  </div>
                  <p className="text-xs text-gray-500 max-w-md">
                    Select a category below to explore all available citizen
                    guides, schedules, and processing requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCategoriesWithPages.map(cat => {
                    const CatIcon = getCategoryIcon(cat.icon);
                    const pagesCount = cat.pages?.length || 0;
                    return (
                      <div
                        key={cat.slug}
                        className="group bg-white rounded-3xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003893] group-hover:bg-[#003893] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                              <CatIcon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-[#003893] bg-blue-50/80 px-2.5 py-1 rounded-xl">
                              {pagesCount} Guide{pagesCount === 1 ? '' : 's'}
                            </span>
                          </div>

                          <div>
                            <Link
                              to={`/services/${cat.slug}`}
                              className="text-lg font-bold text-gray-900 group-hover:text-[#003893] transition-colors inline-block"
                            >
                              {cat.category}
                            </Link>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed line-clamp-3">
                              {cat.description}
                            </p>
                          </div>

                          {/* Quick sub-service preview links */}
                          {cat.pages && cat.pages.length > 0 && (
                            <div className="space-y-1.5 pt-2 border-t border-gray-100">
                              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                Key Guides:
                              </div>
                              <ul className="space-y-1">
                                {cat.pages.slice(0, 3).map((page, pIdx) => (
                                  <li key={pIdx}>
                                    <Link
                                      to={`/services/${cat.slug}/${page.slug}`}
                                      className="text-xs font-medium text-gray-700 hover:text-[#003893] flex items-center gap-1.5 group/item transition-colors"
                                    >
                                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover/item:text-[#003893] shrink-0" />
                                      <span className="line-clamp-1">
                                        {page.name}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-100">
                          <Link
                            to={`/services/${cat.slug}`}
                            className="inline-flex items-center justify-between w-full text-xs font-bold text-[#003893] group-hover:text-blue-800 transition-colors"
                          >
                            <span>Browse All {cat.category}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}

          {/* CITIZEN ASSISTANCE & HOTLINE STRIP */}
          <section className="mt-14 bg-gradient-to-br from-slate-900 to-[#00225e] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-blue-900/40 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-2xl font-bold text-white">
                  Need Help or Urgent Public Service Assistance?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The City Government of Trece Martires provides round-the-clock
                  emergency hotlines, public health offices, and a dedicated
                  City Hall Helpdesk for immediate citizen inquiries.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/government#hotlines"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  <span>24/7 Emergency Hotlines</span>
                </Link>
                <Link
                  to="/government#departments"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all border border-white/20"
                >
                  City Departments
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Services;
