import React from 'react';
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
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router';
import { BetterTreceLogo } from './Navbar';

const Footer: React.FC = () => {
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
    <footer className="bg-[#0b1329] text-white border-t border-slate-800">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/5 p-3 rounded-2xl inline-block border border-white/10">
              <BetterTreceLogo />
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              BetterTrece.org is an open-source civic initiative providing
              residents, businesses, and visitors of Trece Martires City, Cavite
              with transparent and accessible information.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Governor's Drive, San Agustin, Trece Martires City, Cavite
                  4109
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  City Hall Trunkline: (046) 419-0268 / (046) 419-1065
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

          {/* Navigation Columns */}
          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3.5">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white text-xs transition-colors inline-flex items-center gap-1"
                      >
                        {link.label}
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-slate-400 hover:text-white text-xs transition-colors"
                      >
                        {link.label}
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
            <p>
              © {new Date().getFullYear()} BetterTrece.org • Built with
              BetterGov Open Source Platform
            </p>
            <div className="flex flex-wrap gap-4 text-xs">
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
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
