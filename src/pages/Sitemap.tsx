import { Link } from 'react-router';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Compass,
  Info,
  Landmark,
} from '../lib/icons';
import { mainNavigation } from '../data/navigation/navigation';

const sections = [
  {
    title: 'Explore',
    description: 'Start here and find your way around the site.',
    icon: Compass,
    links: [
      ['Home', '/'],
      ['About BetterTrece', '/about'],
      ['Search', '/search'],
    ],
  },
  {
    title: 'City services and information',
    description: 'Browse city resources, services, and local information.',
    icon: Building2,
    links: [
      ['Services', '/services'],
      ['Government', '/government'],
      ['Demographics and city profile', '/demographics'],
      ['Fuel prices', '/fuel-prices'],
      ['Community shade map', '/shade-map'],
    ],
  },
  {
    title: 'Transparency and data',
    description: 'Explore public works, budgets, and civic data.',
    icon: BarChart3,
    links: [
      ['Transparency overview', '/transparency'],
      ['DPWH projects', '/transparency/dpwh'],
      ['Political dynasties explorer', '/transparency/political-dynasties'],
    ],
  },
  {
    title: 'More about this site',
    description: 'Learn about accessibility and the site structure.',
    icon: Info,
    links: [
      ['Accessibility', '/accessibility'],
      ['Sitemap', '/sitemap'],
    ],
  },
];

const directorySections = mainNavigation
  .filter(item => item.megaMenu)
  .map(item => ({
    title: item.label,
    description: `Browse ${item.label.toLowerCase()} pages and guides.`,
    icon:
      item.label === 'Government'
        ? Landmark
        : item.label === 'Transparency'
          ? BarChart3
          : Building2,
    links: [
      { title: item.label, href: item.href },
      ...item.megaMenu!.columns.flatMap(column =>
        column.items.map(({ title, href }) => ({
          title: `${column.heading} · ${title}`,
          href,
        }))
      ),
      {
        title: item.megaMenu!.featured.title,
        href: item.megaMenu!.featured.href,
      },
    ].filter(
      (link, index, links) =>
        links.findIndex(item => item.href === link.href) === index
    ),
  }));

export default function Sitemap() {
  return (
    <>
      <SEO
        title="Sitemap"
        description="Browse the main pages and sections of BetterTrece."
      />
      <main className="flex-grow bg-slate-50/50 pb-16">
        <header className="border-b border-blue-900/40 bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] pt-36 pb-12 text-white sm:pt-40 sm:pb-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Sitemap' }]}
              className="mb-6 text-blue-200"
              isDark
            />
            <div className="flex items-start gap-4">
              <span className="hidden rounded-2xl border border-white/20 bg-white/10 p-3 text-amber-300 sm:inline-flex">
                <Landmark aria-hidden="true" className="h-7 w-7" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
                  Find your way
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  Sitemap
                </h1>
                <p className="mt-3 max-w-2xl leading-relaxed text-blue-100">
                  Browse the main sections of BetterTrece. Service guides and
                  government documents are organized within their directories.
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:py-14">
          {[
            ...sections.slice(0, 2),
            ...directorySections,
            ...sections.slice(2),
          ].map(({ title, description, icon: Icon, links }, index) => (
            <section
              key={title}
              aria-labelledby={`sitemap-section-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="flex items-start gap-4">
                <span className="rounded-xl border border-blue-100 bg-blue-50 p-2.5 text-[#003893]">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2
                    id={`sitemap-section-${index}`}
                    className="text-lg font-extrabold text-slate-900"
                  >
                    {title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                  <ul className="mt-5 divide-y divide-slate-100">
                    {links.map(link => {
                      const label = Array.isArray(link) ? link[0] : link.title;
                      const href = Array.isArray(link) ? link[1] : link.href;
                      return (
                        <li key={href}>
                          <Link
                            className="group flex min-h-11 items-center justify-between gap-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                            to={href}
                          >
                            {label}
                            <ArrowRight
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-700"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
