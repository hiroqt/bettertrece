import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  MapPin,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { footerNavigation } from '../../data/navigation/navigation';
import { Link } from 'react-router';
import { BetterTreceLogo } from './Navbar';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const getSectionTitle = (title: string) => {
    switch (title.toLowerCase()) {
      case 'quick links':
        return t('footer.quickLinks', 'Quick Links');
      case 'resources':
        return t('footer.resources', 'Resources');
      default:
        return title;
    }
  };

  const getSocialIcon = (label: string) => {
    switch (label) {
      case 'Facebook':
        return <Facebook className="h-4 w-4" />;
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Instagram':
        return <Instagram className="h-4 w-4" />;
      case 'YouTube':
        return <Youtube className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <footer className="relative bg-[#0b1329] text-white border-t border-slate-800 overflow-hidden">
      {/* Monument Artistic Graphic Watermark */}
      <div
        className="absolute right-0 bottom-0 top-0 w-full sm:w-2/3 lg:w-1/2 bg-contain bg-no-repeat bg-right-bottom opacity-15 pointer-events-none mix-blend-luminosity filter contrast-125"
        style={{
          backgroundImage: `url('/images/trece-martires-monument.png')`,
          maskImage:
            'linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to left, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      />

      {/* Decorative ambient gradient glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/5 p-3 rounded-2xl inline-block border border-white/10">
              <BetterTreceLogo isLight={true} />
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {t(
                'footer.description',
                'BetterTrece.org is an open-source civic initiative providing residents, businesses, and visitors of Trece Martires City, Cavite with transparent, accessible, and verified information.'
              )}
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {t('footer.address', 'Trece Martires City, Cavite 4109')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  {t(
                    'footer.trunkline',
                    'City Hall Trunkline: (046) 419-0268 / (046) 419-1065'
                  )}
                </span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              {footerNavigation.socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#003893] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  {getSocialIcon(link.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns: Quick Links (4 cols) & Resources (3 cols) */}
          {footerNavigation.mainSections.map((section, idx) => (
            <div
              key={section.title}
              className={idx === 0 ? 'lg:col-span-4' : 'lg:col-span-3'}
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3.5">
                {getSectionTitle(section.title)}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white text-xs transition-colors inline-flex items-center gap-1.5 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white text-xs transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="text-center md:text-left space-y-1">
              <p>
                © {new Date().getFullYear()} BetterTrece.org • Built by{' '}
                <span className="text-white font-semibold">Arnel Baylon</span>
              </p>
              <p className="text-[11px] text-slate-400">
                {t(
                  'footer.dataSource',
                  'All public information sourced from official government portals.'
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs items-center justify-center md:justify-end">
              <a
                href="https://bettergov.ph"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                BetterGov.ph
              </a>
              <span>•</span>
              <a
                href="https://github.com/bettergovph/bettergov"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub Repository
              </a>
              <span>•</span>
              <Link
                to="/sitemap"
                className="hover:text-white transition-colors"
              >
                {t('footer.sitemap', 'Sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
