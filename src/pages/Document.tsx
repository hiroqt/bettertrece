import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';
import {
  serviceCategories,
  governmentCategories,
  getCategorySubcategories,
  isNestedCategory,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import {
  ShieldCheck,
  Building2,
  Clock,
  Phone,
  Printer,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  FileText,
  Heart,
  GraduationCap,
  Users,
  Wheat,
  Wrench,
  Trash2,
  TreePine,
  Shield,
  Home as HomeIcon,
  Briefcase,
  Store,
  FileCheck,
  TrendingUp,
  Baby,
  AlertTriangle,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface DocumentProps {
  theme?: string;
  categoryType?: 'service' | 'government';
}

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

function CategoryIcon({
  iconName,
  className,
}: {
  iconName?: string;
  className?: string;
}) {
  const Icon = (iconName && ICON_MAP[iconName]) || FileText;
  return <Icon className={className} />;
}

export default function Document({
  theme: initialTheme = 'default',
  categoryType: defaultCategoryType,
}: DocumentProps) {
  const { documentSlug, category, lang } = useParams();
  const [markdownContent, setMarkdownContent] =
    useState<MarkdownContent | null>(null);
  const [nestedIndex, setNestedIndex] = useState<CategoryIndex | null>(null);
  const [siblingPages, setSiblingPages] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const markdownComponents = useMemo(
    () => createMarkdownComponents(getTypographyTheme(initialTheme)),
    [initialTheme]
  );

  // Determine categoryType from route or prop
  const activeCategoryType =
    defaultCategoryType ||
    (window.location.pathname.startsWith('/government')
      ? 'government'
      : 'service');

  const isGovernment = activeCategoryType === 'government';
  const sectionLabel = isGovernment ? 'Government' : 'Services';
  const sectionHref = isGovernment ? '/government' : '/services';

  const categoryData = useMemo(() => {
    if (!category) return undefined;
    const categories = isGovernment
      ? governmentCategories.categories
      : serviceCategories.categories;
    return categories.find(c => c.slug === category);
  }, [category, isGovernment]);

  useEffect(() => {
    if (!documentSlug) {
      setError('No document specified');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentCategory = category || 'general';

        // Load sibling pages in this category for the sidebar
        if (category) {
          getCategorySubcategories(category)
            .then(idx => {
              setSiblingPages(idx.pages || []);
            })
            .catch(() => {});
        }

        // If the slug maps to its own index, render it as a nested listing
        if (isNestedCategory(documentSlug)) {
          const index = await getCategorySubcategories(documentSlug);
          setNestedIndex(index);
          return;
        }

        const content = await loadMarkdownContent(
          documentSlug,
          currentCategory,
          activeCategoryType
        );
        setMarkdownContent(content);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load document'
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [documentSlug, category, activeCategoryType, lang]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Breadcrumbs construction
  const breadcrumbItems = useMemo(() => {
    const items = [
      { label: 'Home', href: '/' },
      { label: sectionLabel, href: sectionHref },
    ];
    if (category && categoryData) {
      items.push({
        label: categoryData.category,
        href: `${sectionHref}/${category}`,
      });
    }
    items.push({
      label: markdownContent?.title || documentSlug || 'Document',
      href: window.location.pathname,
    });
    return items;
  }, [
    sectionLabel,
    sectionHref,
    category,
    categoryData,
    markdownContent,
    documentSlug,
  ]);

  // Loading state
  if (loading) {
    return (
      <main className="flex-grow bg-slate-50/50 pb-20">
        <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-36 sm:pt-40 pb-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="animate-pulse space-y-4 max-w-2xl">
              <div className="h-4 bg-white/20 rounded w-48" />
              <div className="h-8 bg-white/30 rounded w-3/4" />
              <div className="h-4 bg-white/20 rounded w-1/2" />
            </div>
          </div>
        </section>
        <div className="container mx-auto px-4 max-w-7xl -mt-6">
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-sm flex flex-col items-center justify-center space-y-3 text-center">
            <div className="w-10 h-10 border-3 border-blue-200 border-t-[#003893] rounded-full animate-spin" />
            <p className="text-sm font-semibold text-gray-600">
              Loading official citizen guide...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || (!nestedIndex && !markdownContent)) {
    return (
      <main className="flex-grow bg-slate-50/50 pb-20">
        <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-36 sm:pt-40 pb-14 border-b border-blue-900/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: sectionLabel, href: sectionHref },
                { label: 'Document Not Found', href: '#' },
              ]}
              className="mb-6 text-blue-200"
            />
            <h1 className="text-3xl sm:text-4xl font-bold">
              Document Not Found
            </h1>
            <p className="text-blue-100 mt-2">
              {error || 'The requested citizen guide could not be located.'}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to={category ? `${sectionHref}/${category}` : sectionHref}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to {categoryData?.category || sectionLabel}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Nested Index Listing View (e.g. subcategory directory)
  if (nestedIndex) {
    const nestedPages: Subcategory[] = nestedIndex.pages || [];
    return (
      <>
        <SEO
          title={`${nestedIndex.title || documentSlug} | ${sectionLabel}`}
          description={
            nestedIndex.description ||
            `Official local government directory for ${documentSlug}`
          }
          keywords={`${documentSlug}, Trece Martires, government services, citizen charters`}
        />

        <main className="flex-grow bg-slate-50/50 pb-20">
          <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-36 sm:pt-40 lg:pt-44 pb-10 sm:pb-14 border-b border-blue-900/40 shadow-inner">
            <div className="container mx-auto px-4 max-w-7xl">
              <Breadcrumbs
                items={breadcrumbItems}
                className="mb-6 text-blue-200"
              />
              <div className="space-y-3 max-w-3xl">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {sectionLabel} Index Directory
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {nestedIndex.title || documentSlug}
                </h1>
                {nestedIndex.description && (
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                    {nestedIndex.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 max-w-7xl mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {nestedPages.map((page, i) => (
                <Link
                  key={page.slug ?? i}
                  to={`${sectionHref}/${category}/${documentSlug}/${page.slug}`}
                  className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded-lg">
                      Citizen Guide
                    </span>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                      {page.name}
                    </h3>
                    {page.description && (
                      <p className="text-xs text-gray-600 line-clamp-3">
                        {page.description}
                      </p>
                    )}
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#003893]">
                    <span>Read Details</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!markdownContent) return null;

  // Filter sibling pages to exclude current page
  const otherSiblingGuides = siblingPages.filter(p => p.slug !== documentSlug);

  return (
    <>
      <SEO
        title={`${markdownContent.title || documentSlug} | Trece Martires`}
        description={
          markdownContent.description ||
          `Official step-by-step citizen charter and requirements for ${markdownContent.title || documentSlug} in Trece Martires City, Cavite.`
        }
        keywords={`${markdownContent.title || documentSlug}, ${categoryData?.category || ''}, Trece Martires city services, public procedures, citizen guide, Cavite`}
      />

      <main className="flex-grow bg-slate-50/50 pb-20">
        {/* Top Hero Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white pt-36 sm:pt-40 lg:pt-44 pb-10 sm:pb-14 border-b border-blue-900/40 shadow-inner print:hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <Breadcrumbs
              items={breadcrumbItems}
              className="mb-6 text-blue-200"
            />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  {categoryData && (
                    <Link
                      to={`${sectionHref}/${category}`}
                      className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 hover:bg-amber-400/30 transition-colors"
                    >
                      <CategoryIcon
                        iconName={categoryData.icon}
                        className="w-3.5 h-3.5"
                      />
                      <span>{categoryData.category}</span>
                    </Link>
                  )}
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-white/10 text-blue-100 border border-white/15">
                    Official Citizen Charter
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Guidelines</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  {markdownContent.title || documentSlug}
                </h1>

                {markdownContent.description && (
                  <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                    {markdownContent.description}
                  </p>
                )}
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/20 shadow-xs focus:ring-2 focus:ring-amber-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-300" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/20 shadow-xs focus:ring-2 focus:ring-amber-300"
                >
                  <Printer className="w-4 h-4 text-blue-200" />
                  <span>Print Guide</span>
                </button>

                {category && (
                  <Link
                    to={`${sectionHref}/${category}`}
                    className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>
                      Back to {categoryData?.category || sectionLabel}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Layout (2 Columns on Desktop) */}
        <div className="container mx-auto px-4 max-w-7xl mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Reading Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Document Content Card */}
              <article className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {markdownContent.content}
                </ReactMarkdown>

                {/* Bottom Callout in Article */}
                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>
                      Public service information verified by BetterTrece civic
                      open data initiative.
                    </span>
                  </div>
                  {category && (
                    <Link
                      to={`${sectionHref}/${category}`}
                      className="font-bold text-[#003893] hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      <span>
                        Explore all {categoryData?.category || ''} guides
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </article>
            </div>

            {/* Right Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="space-y-6 lg:sticky lg:top-24">
                {/* At a Glance Box */}
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-[#003893] font-bold text-xs uppercase tracking-wider">
                    <Info className="w-4 h-4 text-amber-500" />
                    <span>Quick Summary</span>
                  </div>

                  <div className="space-y-3 text-xs divide-y divide-gray-100">
                    {categoryData && (
                      <div className="pt-2 flex items-start justify-between gap-2">
                        <span className="text-gray-500">Category:</span>
                        <Link
                          to={`${sectionHref}/${category}`}
                          className="font-bold text-[#003893] hover:underline text-right"
                        >
                          {categoryData.category}
                        </Link>
                      </div>
                    )}
                    <div className="pt-2.5 flex items-start justify-between gap-2">
                      <span className="text-gray-500">Service Type:</span>
                      <span className="font-semibold text-gray-900 text-right">
                        Local City Government Service
                      </span>
                    </div>
                    <div className="pt-2.5 flex items-start justify-between gap-2">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>Office Hours:</span>
                      </span>
                      <span className="font-semibold text-gray-900 text-right">
                        Mon–Fri, 8:00 AM – 5:00 PM
                      </span>
                    </div>
                    <div className="pt-2.5 flex items-start justify-between gap-2">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-semibold text-gray-900 text-right">
                        City Hall / Barangay Offices
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sibling Guides in Same Category */}
                {otherSiblingGuides.length > 0 && (
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        More {categoryData?.category || 'Related'} Guides
                      </h3>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {otherSiblingGuides.length}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {otherSiblingGuides.map((guide, gIdx) => (
                        <li key={gIdx}>
                          <Link
                            to={`${sectionHref}/${category}/${guide.slug}`}
                            className="group/item flex items-start gap-2 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors border border-transparent hover:border-blue-100"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-[#003893] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-800 group-hover/item:text-[#003893] transition-colors line-clamp-2 leading-snug">
                                {guide.name}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {category && (
                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          to={`${sectionHref}/${category}`}
                          className="text-xs font-bold text-[#003893] hover:underline flex items-center justify-between"
                        >
                          <span>
                            View Full {categoryData?.category} Directory
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Emergency & Citizen Hotlines Callout */}
                <div className="bg-gradient-to-br from-slate-900 to-[#00225e] text-white rounded-2xl p-5 shadow-sm space-y-3 border border-blue-900/30">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <Phone className="w-4 h-4" />
                    <span>24/7 Citizen Hotlines</span>
                  </div>
                  <p className="text-xs text-blue-100/90 leading-relaxed">
                    Have urgent questions or emergencies? Contact CDRRMO or the
                    City Hall Helpdesk anytime.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      to="/government#hotlines"
                      className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs transition-colors shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>View All Hotlines</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
