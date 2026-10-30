import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import {
  ArrowUpRight,
  CheckCircle2,
  Eye,
  ListChecks,
  MessageSquare,
} from '../lib/icons';

const practices = [
  [
    'Keyboard access',
    'We aim to make navigation and common controls usable without a mouse.',
  ],
  [
    'Readable content',
    'We use clear headings, descriptive links, and layouts that adapt to smaller screens.',
  ],
  [
    'Assistive technology',
    'We aim to provide semantic page structure and text alternatives where they are useful.',
  ],
];

const waysToHelp = [
  [
    'Page or feature',
    'Share the URL or name of the page and the control or content involved.',
  ],
  [
    'What happened',
    'Describe what you expected and what happened instead, including any error message.',
  ],
  [
    'Your setup, if you wish',
    'Browser, device, and assistive technology details can help us reproduce the problem.',
  ],
];

export default function Accessibility() {
  return (
    <>
      <SEO
        title="Accessibility"
        description="Accessibility information and feedback for BetterTrece."
      />
      <main className="flex-grow bg-slate-50/50 pb-16">
        <header className="border-b border-blue-900/40 bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] pt-36 pb-12 text-white sm:pt-40 sm:pb-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]}
              className="mb-6 text-blue-200"
              isDark
            />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">
              Access for everyone
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Accessibility
            </h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-blue-100">
              We want public information to be easier to find and use, whatever
              device or way of browsing works for you.
            </p>
          </div>
        </header>
        <div className="container mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:py-14">
          <section
            aria-labelledby="commitment-title"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-xl border border-blue-100 bg-blue-50 p-2.5 text-[#003893]">
                <Eye aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2
                id="commitment-title"
                className="text-xl font-extrabold text-slate-900"
              >
                What we’re working toward
              </h2>
            </div>
            <p className="mt-5 leading-relaxed text-slate-600">
              BetterTrece is an ongoing community project. We aim to make its
              pages usable with keyboard navigation and assistive technology,
              keep content readable on phones and computers, and improve
              barriers as they are reported.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              We use the W3C’s{' '}
              <a
                className="font-semibold text-blue-700 underline underline-offset-4"
                href="https://www.w3.org/TR/WCAG22/"
                target="_blank"
                rel="noreferrer"
              >
                Web Content Accessibility Guidelines (WCAG) 2.2
              </a>{' '}
              as a reference when making improvements. WCAG provides testable
              guidance for accessible web content across desktop and mobile
              devices. This is a development reference, not a claim that the
              entire site meets a particular conformance level.
            </p>
            <ul className="mt-6 space-y-4">
              {practices.map(([title, detail]) => (
                <li key={title} className="flex gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                  />
                  <div>
                    <h3 className="font-bold text-slate-800">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
              Some pages, interactive maps, and third-party documents may have
              accessibility barriers. We have not completed a formal
              accessibility audit, so this page does not claim conformance
              certification.
            </div>
          </section>
          <section
            aria-labelledby="limitations-title"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            <h2
              id="limitations-title"
              className="text-xl font-extrabold text-slate-900"
            >
              Known limitations
            </h2>
            <div className="mt-4 grid gap-5 text-sm leading-relaxed text-slate-600 sm:grid-cols-3">
              <p>
                <strong className="text-slate-800">Interactive maps:</strong>{' '}
                Map controls and geographic information may not be fully
                available through a screen reader or keyboard. Where possible,
                related information is also presented as text or tables.
              </p>
              <p>
                <strong className="text-slate-800">
                  Documents and external sites:
                </strong>{' '}
                Linked PDFs and third-party websites are maintained by their
                respective publishers, so their accessibility can vary.
              </p>
              <p>
                <strong className="text-slate-800">Ongoing changes:</strong> New
                content and features may introduce barriers. We review reports
                and prioritize fixes, but do not promise a specific response
                time.
              </p>
            </div>
          </section>
          <section
            aria-labelledby="report-details-title"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            <h2
              id="report-details-title"
              className="text-xl font-extrabold text-slate-900"
            >
              What to include in a report
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              A little context helps us understand and reproduce an
              accessibility problem. Share only what you are comfortable making
              public.
            </p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {waysToHelp.map(([title, detail]) => (
                <li
                  key={title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-bold text-slate-800">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <aside className="h-fit rounded-2xl bg-[#0b1d42] p-6 text-white shadow-sm sm:p-8">
            <span className="inline-flex rounded-xl border border-white/15 bg-white/10 p-2.5 text-amber-300">
              <ListChecks aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-xl font-extrabold">Found a barrier?</h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-100">
              Tell us what page you were on and what you were trying to do.
              Browser or assistive technology details can help, if you’re
              comfortable sharing them.
            </p>
            <a
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#00225e] transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="https://github.com/hiroqt/bettertrece/issues"
              target="_blank"
              rel="noreferrer"
            >
              <MessageSquare aria-hidden="true" className="h-4 w-4" /> Report an
              issue <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="mt-4 text-xs leading-relaxed text-blue-200">
              Please avoid including sensitive personal information in public
              reports.
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}
