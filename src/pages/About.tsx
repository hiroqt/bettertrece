import React from 'react';
import { Link } from 'react-router';
import {
  Heart,
  Code,
  ShieldCheck,
  Users,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart3,
  Layers,
  MapPin,
  Landmark,
  HelpCircle,
  Quote,
  Sparkles,
  Smartphone,
  Globe2,
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const About: React.FC = () => {
  const pillars = [
    {
      number: '01',
      icon: ShieldCheck,
      title: 'Open Governance & Transparency',
      desc: 'Integrating verified public datasets from DOF-BLGF, DBM, PSA, and DPWH so citizens can track local budgets and public works with complete clarity.',
    },
    {
      number: '02',
      icon: Users,
      title: 'Citizen-First Civic Usability',
      desc: 'Transforming complex administrative procedures into clear, step-by-step guides in English and Filipino, accessible on any smartphone or computer.',
    },
    {
      number: '03',
      icon: Zap,
      title: 'Modern & Lightning-Fast Tech',
      desc: 'Built with modern web technologies including React, TypeScript, and Vite. Zero ads, zero bloat, zero tracking scripts, and instant page transitions.',
    },
    {
      number: '04',
      icon: Layers,
      title: 'Community & Open Source',
      desc: 'An open-source initiative built for the public good. Anyone can view the codebase, verify data transformations, and contribute improvements.',
    },
  ];

  const dataSources = [
    {
      name: 'Philippine Statistics Authority (PSA)',
      scope:
        '2024 POPCEN Population Census, PSGC 10-Digit Standard Geocodes (042122000), and Barangay Demographics.',
      url: 'https://psa.gov.ph',
    },
    {
      name: 'Bureau of Local Government Finance (DOF-BLGF) & DBM',
      scope:
        'Statement of Receipts and Expenditures (SRE), annual LGU revenue collections, local tax receipts, and budget allocations.',
      url: 'https://blgf.gov.ph',
    },
    {
      name: 'Department of Public Works and Highways (DPWH)',
      scope:
        'Cavite 1st District Engineering Office infrastructure projects, road widenings, flood control structures, and public buildings.',
      url: 'https://transparency.dpwh.gov.ph',
    },
    {
      name: 'Commission on Elections (COMELEC)',
      scope:
        '2025 National & Local Elections official registered voter statistics, clustered precincts, and voting centers.',
      url: 'https://comelec.gov.ph',
    },
    {
      name: 'City Government of Trece Martires Official Records',
      scope:
        'Executive offices, city council legislative digests, municipal ordinances, barangay halls directory, and citizen service charters.',
      url: 'https://trecemartirescity.gov.ph',
    },
  ];

  const faqs = [
    {
      q: 'Is BetterTrece an official government agency portal?',
      a: 'BetterTrece.org is an independent, community-driven civic tech platform created by Arnel Baylon. It is not an official government agency website, but all data and service procedures are directly curated and synchronized from official government publications, open-data portals, and public records.',
    },
    {
      q: 'Why build this if official government websites exist?',
      a: 'Official government websites are frequently fragmented across multiple agencies, published in unsearchable PDF formats, or difficult to navigate on mobile devices. BetterTrece unites these disparate public sources into a single, lightning-fast, accessible web app designed with modern user experience standards.',
    },
    {
      q: 'How can I contribute or report incorrect information?',
      a: 'BetterTrece is an open-source civic project. You can submit suggestions, report data inaccuracies, or contribute improvements directly through our open GitHub repository or by reaching out to the development team.',
    },
  ];

  const featureHighlights = [
    {
      icon: Globe2,
      label: 'Bilingual Support',
      desc: 'English & Filipino',
    },
    {
      icon: Smartphone,
      label: 'Mobile Optimized',
      desc: 'Fast on all devices',
    },
    {
      icon: ShieldCheck,
      label: 'Verified Public Data',
      desc: 'Official government records',
    },
    {
      icon: Sparkles,
      label: 'Zero Ads & Tracking',
      desc: '100% Non-profit & open',
    },
  ];

  return (
    <>
      <SEO
        title="About BetterTrece | Why I Built This Project"
        description="Learn why BetterTrece was created: an open-source civic tech initiative for the citizens of Trece Martires City, Cavite by Arnel Baylon."
        keywords="About BetterTrece, Arnel Baylon, Trece Martires civic tech, why i built this, open data Cavite, Cavite transparency"
      />

      <main className="flex-grow bg-slate-50 min-h-screen">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] text-white pt-44 sm:pt-44 lg:pt-48 pb-16 lg:pb-20 overflow-hidden border-b border-blue-900/40">
          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Why I Built Better<span className="text-amber-300">Trece</span>
              .org
            </h1>

            <p className="mt-4 text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-3xl font-normal">
              A modern, fast, and transparent civic portal designed to empower
              residents, businesses, students, and visitors of the City of Trece
              Martires, Cavite.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center text-xs sm:text-sm text-blue-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-white">
                <MapPin className="w-4 h-4 text-blue-200" />
                Trece Martires City, Cavite
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-white">
                <Landmark className="w-4 h-4 text-blue-200" />
                2nd Class Component City
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-white">
                <Code className="w-4 h-4 text-blue-200" />
                Open Source &amp; Non-Profit
              </span>
            </div>
          </div>
        </section>

        {/* BREADCRUMBS */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-3">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'About This Project' },
              ]}
            />
          </div>
        </div>

        {/* MAIN ARTICLE / THE STORY */}
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-12 lg:py-16 space-y-16">
          {/* SECTION 1: THE SPARK & DEVELOPER'S STORY */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
                  The Story Behind the Project
                </h2>
                <p className="text-xs text-zinc-500">
                  A personal note from the creator, Arnel Baylon
                </p>
              </div>
            </div>

            <div className="text-zinc-700 space-y-5 text-sm sm:text-base leading-relaxed">
              <p>
                As a software Developer and long-time resident of Cavite, I have
                always believed that access to local public services, city
                ordinances, and fiscal data should be effortless. Yet for years,
                finding straightforward answers to everyday civic questions,
                such as{' '}
                <strong className="text-zinc-900 font-bold">
                  “Where do I apply for a business clearance?”
                </strong>
                ,{' '}
                <strong className="text-zinc-900 font-bold">
                  “What is our city’s budget?”
                </strong>
                , or{' '}
                <strong className="text-zinc-900 font-bold">
                  “What are the active flood control projects in my barangay?”
                </strong>
                , meant digging through scattered Facebook posts, unindexed PDF
                bulletins, or non-responsive websites.
              </p>

              <p>
                I built{' '}
                <strong className="text-zinc-900 font-bold">
                  BetterTrece.org
                </strong>{' '}
                to change that. I wanted to prove what a modern, citizen-centric
                government portal could look like when designed with{' '}
                <strong className="text-zinc-900 font-bold">speed</strong>,{' '}
                <strong className="text-zinc-900 font-bold">
                  accessibility
                </strong>
                , and{' '}
                <strong className="text-zinc-900 font-bold">
                  uncompromising visual clarity
                </strong>
                .
              </p>

              {/* MODERN QUOTE CARD */}
              <div className="relative overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-200 p-6 sm:p-8 my-8 shadow-2xs">
                <div className="relative z-10 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>

                  <blockquote className="text-zinc-900 font-bold text-base sm:text-lg lg:text-xl leading-snug sm:leading-normal tracking-tight">
                    “Public data belongs to the public. When government
                    information is clean, searchable, and transparent, citizens
                    become more engaged, businesses flourish, and communities
                    thrive.”
                  </blockquote>

                  <div className="border-t border-zinc-200 pt-4 mt-4 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="font-bold text-zinc-900 text-sm sm:text-base leading-tight">
                        Arnel Baylon
                      </div>
                      <div className="text-xs text-zinc-600 font-medium">
                        Creator & Developer, BetterTrece.org
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 border border-zinc-200">
                      Civic Tech Initiative
                    </div>
                  </div>
                </div>
              </div>

              <p>
                BetterTrece organizes hundreds of official municipal records,
                PSA geocodes, COMELEC voter statistics, DBM revenue collections,
                and DPWH infrastructure contracts into an intuitive, high-speed
                web interface. Everything is organized to be accessible in both{' '}
                <strong className="text-zinc-900 font-bold">English</strong> and{' '}
                <strong className="text-zinc-900 font-bold">Filipino</strong>,
                responsive on mobile phones, and completely free of advertising
                or commercial trackers.
              </p>

              {/* HIGHLIGHT CHIPS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                {featureHighlights.map((feat, idx) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-zinc-200 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center mb-2">
                        <FeatIcon className="w-4 h-4 text-zinc-900" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-900">
                          {feat.label}
                        </div>
                        <div className="text-xs text-zinc-600 font-normal mt-0.5">
                          {feat.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 2: CORE PILLARS */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
                Four Pillars of BetterTrece
              </h2>
              <p className="text-zinc-600 text-sm mt-1">
                The design and engineering principles guiding every feature we
                build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs hover:border-zinc-400 hover:shadow-xs transition-all flex flex-col justify-between relative"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-100 text-zinc-900 border border-zinc-200">
                          <Icon className="w-5 h-5 text-zinc-900" />
                        </div>
                        <span className="text-xs font-bold text-zinc-400 font-mono">
                          {pillar.number}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 3: OFFICIAL DATA SOURCES & INTEGRATIONS */}
          <section className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-10 shadow-2xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-900 border border-zinc-200 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
                  Data Sourcing & Integrity
                </h2>
                <p className="text-xs text-zinc-500">
                  Direct links to official Philippine public record sources
                </p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
              Every statistic, demographic metric, project budget, and legal
              charter referenced on{' '}
              <strong className="text-zinc-900 font-bold">
                BetterTrece.org
              </strong>{' '}
              is grounded in official government reports and open-data
              standards:
            </p>

            <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
              {dataSources.map((source, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 hover:bg-zinc-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-zinc-900 text-sm sm:text-base flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0" />
                      {source.name}
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl pl-6">
                      {source.scope}
                    </p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-center transition-colors"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs"
                >
                  <h3 className="font-bold text-zinc-900 text-base mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: CTA BANNER */}
          <section className="bg-gradient-to-r from-[#001f54] via-[#00225e] to-[#003893] text-white rounded-3xl p-8 sm:p-12 shadow-lg border border-blue-900/30 text-center">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Explore Trece Martires City Today
              </h2>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                Discover government service guides, inspect 100+ DPWH
                infrastructure projects, or explore official city demographics.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-white text-[#00225e] hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-md transition-all text-sm group"
                >
                  <span>Browse Services</span>
                  <ArrowRight className="w-4 h-4 text-[#00225e] group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/demographics"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  <span>City Demographics</span>
                </Link>
                <Link
                  to="/transparency/dpwh"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  <span>DPWH Projects</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default About;
