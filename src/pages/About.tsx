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
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const About: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Open Governance & Transparency',
      desc: 'Integrating verified public datasets from DOF-BLGF, DBM, PSA, and DPWH so citizens can track local budgets and public works with complete clarity.',
    },
    {
      icon: Users,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      title: 'Citizen-First Civic Usability',
      desc: 'Transforming complex administrative procedures into clear, step-by-step guides in English and Filipino, accessible on any smartphone or computer.',
    },
    {
      icon: Zap,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Modern & Lightning-Fast Tech',
      desc: 'Built with cutting-edge web technologies—React, TypeScript, and Vite. Zero ads, zero bloat, zero tracking scripts, and instant page transitions.',
    },
    {
      icon: Layers,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
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

  return (
    <>
      <SEO
        title="About BetterTrece | Why I Built This Project"
        description="Learn why BetterTrece was created: an open-source civic tech initiative for the citizens of Trece Martires City, Cavite by Arnel Baylon."
        keywords="About BetterTrece, Arnel Baylon, Trece Martires civic tech, why i built this, open data Cavite, Cavite transparency"
      />

      <main className="flex-grow bg-slate-50 min-h-screen">
        {/* HERO SECTION */}
        <section className="relative bg-[#001438] text-white pt-36 sm:pt-40 lg:pt-44 pb-16 lg:pb-20 overflow-hidden">
          {/* Background image & gradient overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url('/images/trece-martires-monument.png')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001438] via-[#00225e]/90 to-[#002868]/75 pointer-events-none" />

          {/* Decorative glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Why I Built <span className="text-yellow-300">BetterTrece</span>
              .org
            </h1>

            <p className="mt-4 text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-3xl font-normal">
              A modern, fast, and transparent civic portal designed to empower
              residents, businesses, students, and visitors of the City of Trece
              Martires, Cavite.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center text-xs sm:text-sm text-blue-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <MapPin className="w-4 h-4 text-amber-400" />
                Trece Martires City, Cavite
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Landmark className="w-4 h-4 text-emerald-400" />
                2nd Class Component City
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Code className="w-4 h-4 text-blue-400" />
                Open Source & Non-Profit
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
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003893] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  The Story Behind the Project
                </h2>
                <p className="text-xs text-gray-500">
                  A personal note from the creator, Arnel Baylon
                </p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none text-gray-700 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                As a software engineer and long-time resident of Cavite, I have
                always believed that access to local public services, city
                ordinances, and fiscal data should be effortless. Yet for years,
                finding straightforward answers to everyday civic questions—such
                as{' '}
                <em>
                  “Where do I apply for a business clearance?”, “What is our
                  city’s budget?”, or “What are the active flood control
                  projects in my barangay?”
                </em>
                —meant digging through scattered Facebook posts, unindexed PDF
                bulletins, or non-responsive websites.
              </p>

              <p>
                I built <strong>BetterTrece.org</strong> to change that. I
                wanted to prove what a modern, citizen-centric government portal
                could look like when designed with speed, accessibility, and
                uncompromising visual clarity.
              </p>

              <div className="bg-blue-50/80 border-l-4 border-[#003893] p-4.5 rounded-r-xl my-6">
                <p className="text-gray-900 font-semibold italic text-sm sm:text-base leading-snug">
                  “Public data belongs to the public. When government
                  information is clean, searchable, and transparent, citizens
                  become more engaged, businesses flourish, and communities
                  thrive.”
                </p>
                <div className="mt-2 text-xs font-bold text-[#003893]">
                  — Arnel Baylon, Creator of BetterTrece.org
                </div>
              </div>

              <p>
                BetterTrece organizes hundreds of official municipal records,
                PSA geocodes, COMELEC voter statistics, DBM revenue collections,
                and DPWH infrastructure contracts into an intuitive, high-speed
                web interface. Everything is organized to be accessible in both{' '}
                <strong>English</strong> and <strong>Filipino</strong>,
                responsive on mobile phones, and completely free of advertising
                or commercial trackers.
              </p>
            </div>
          </section>

          {/* SECTION 2: CORE PILLARS */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded">
                Our Foundation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                Four Pillars of BetterTrece
              </h2>
              <p className="text-gray-600 text-sm mt-1">
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
                    className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${pillar.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 3: OFFICIAL DATA SOURCES & INTEGRATIONS */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  Data Sourcing & Integrity
                </h2>
                <p className="text-xs text-gray-500">
                  Direct links to official Philippine public record sources
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Every statistic, demographic metric, project budget, and legal
              charter referenced on BetterTrece.org is grounded in official
              government reports and open-data standards:
            </p>

            <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
              {dataSources.map((source, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      {source.name}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-2xl pl-6">
                      {source.scope}
                    </p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#003893] hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-center transition-colors"
                  >
                    <span>Visit Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#003893] bg-blue-50 px-2.5 py-1 rounded">
                Questions & Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs"
                >
                  <h3 className="font-bold text-gray-900 text-base mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: CTA BANNER */}
          <section className="bg-gradient-to-br from-[#001438] via-[#00225e] to-[#003893] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Explore Trece Martires City Today
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Discover government service guides, inspect 100+ DPWH
                infrastructure projects, or explore official city demographics.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-white text-[#003893] hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm group"
                >
                  <span>Browse Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/demographics"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  <span>City Demographics</span>
                </Link>
                <Link
                  to="/transparency/dpwh"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm"
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
