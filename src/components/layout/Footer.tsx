import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ExternalLink, Github } from '../../lib/icons';
import { footerNavigation } from '../../data/navigation/navigation';
import { Link } from 'react-router';
import { BetterTreceLogo } from './Navbar';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative overflow-hidden bg-[#0b1329] text-white">
      <div className="container relative mx-auto px-4 pb-8 pt-32 sm:pt-48 lg:pt-56">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 lg:col-span-4">
            <div className="inline-block">
              <BetterTreceLogo isLight={true} />
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              {t(
                'footer.description',
                'BetterTrece.org is an open-source civic initiative providing residents, businesses, and visitors of Trece Martires City, Cavite with transparent, accessible, and verified information.'
              )}
            </p>

            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {t('footer.address', 'Trece Martires City, Cavite 4109')}
                </span>
              </div>
              <nav
                aria-label="Social media"
                className="flex items-center gap-4 pl-5 pt-2"
              >
                <a
                  href="https://www.facebook.com/profile.php?id=61593815970412"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Better San Fernando on Facebook"
                  className="text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.019 4.388 11.025 10.125 11.925v-8.437H7.078v-3.488h3.047V9.414c0-3.022 1.792-4.695 4.533-4.695 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.931-1.956 1.887v2.262h3.328l-.532 3.488h-2.796v8.437C19.612 23.098 24 18.092 24 12.073Z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/hiroqt/bettertrece.git"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="BetterTrece on GitHub"
                  className="text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/arnel-baylon-b05233189/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Arnel Baylon on LinkedIn"
                  className="text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>

          {footerNavigation.mainSections.map((section, index) => (
            <div key={section.title} className="lg:col-span-2">
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {t(
                  index === 0 ? 'footer.explore' : 'footer.publicInformation',
                  section.title
                )}
              </h3>
              <ul className="space-y-3">
                {section.links
                  .filter(link => link.label !== 'Emergency Hotlines')
                  .map(link => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-slate-300 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <div className="w-full max-w-xs">
              <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {t('footer.betterGovProject', 'A BetterGov.ph project')}
              </h3>
              <img
                src="/images/bettergov-logo-white.png"
                alt="BetterGov.PH"
                className="mb-6 h-auto w-60 max-w-full object-contain object-left"
              />
              <p className="mb-6 text-sm leading-relaxed text-slate-300">
                {t(
                  'footer.betterGovDescription',
                  'Part of the BetterGov.ph community of independent civic-information projects.'
                )}
              </p>
              <a
                href="https://bettergov.ph"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-blue-200"
              >
                {t('footer.visitBetterGov', 'Visit BetterGov.ph')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="text-center md:text-left space-y-1">
              <p>
                © {new Date().getFullYear()} BetterTreceMartires • Built by{' '}
                <span className="text-white font-semibold">Arnel Baylon</span>
              </p>
              <p className="text-[11px] text-slate-400">
                {t(
                  'footer.dataSource',
                  'All public information sourced from official government portals.'
                )}
              </p>
            </div>
            <nav aria-label="Legal and accessibility" className="flex gap-5">
              <Link to="/sitemap" className="hover:text-white">
                Sitemap
              </Link>
              <Link to="/accessibility" className="hover:text-white">
                Accessibility
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
