import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import {
  AlertTriangle,
  GitPullRequest,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

const DataDisclaimerBanner: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Dynamically prepare pre-filled GitHub issue report URL with current page context
  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : location.pathname;
  const issueTitle = encodeURIComponent(
    `[Data Correction] Inaccuracy reported on ${location.pathname}`
  );
  const issueBody = encodeURIComponent(
    `### 📋 Data Inaccuracy Report\n\n` +
      `- **Page URL:** ${currentUrl}\n` +
      `- **Path:** \`${location.pathname}\`\n` +
      `- **Report Date:** ${new Date().toISOString().split('T')[0]}\n\n` +
      `### 🔍 What data is inaccurate or outdated?\n` +
      `<!-- Describe what you found on this page that needs correction -->\n\n\n` +
      `### 📚 Official Source or Correction Reference\n` +
      `<!-- Provide official links (e.g. PSA, DBM, DPWH, Trece Martires LGU), document names, or correct values -->\n`
  );

  const githubIssueUrl = `https://github.com/bettergovph/bettergov/issues/new?title=${issueTitle}&body=${issueBody}`;
  const githubRepoUrl = 'https://github.com/bettergovph/bettergov';

  return (
    <aside
      aria-label="Civic Data Disclaimer"
      className="relative bg-[#090e1d] text-slate-300 border-t border-slate-800/90 overflow-hidden z-10"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-24 bg-blue-600/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-7">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 lg:gap-8">
          {/* Text Information & Disclaimer */}
          <div className="space-y-2 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                {t('disclaimer.badge', 'Civic Open Data Notice')}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                {t(
                  'disclaimer.title',
                  'Report Inaccurate Data & Help Us Improve'
                )}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                'disclaimer.text',
                'BetterTrece is an independent open-source civic initiative. All information is compiled from official government sources (PSA, DBM, DPWH, Trece Martires City LGU) and public records. If you spot any incorrect figures, outdated procedures, or broken records, please let us know so we can update them immediately.'
              )}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
            {/* Report Inaccurate Data Button */}
            <a
              href={githubIssueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all group flex-1 sm:flex-initial"
              title="Report inaccurate or outdated data for this page"
            >
              <AlertTriangle className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>
                {t('disclaimer.reportButton', 'Report Inaccurate Data')}
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </a>

            {/* Help Us Improve Data Button */}
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white hover:text-amber-200 border border-white/15 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex-1 sm:flex-initial"
              title="Contribute datasets, corrections, or code on GitHub"
            >
              <GitPullRequest className="w-4 h-4 text-cyan-400" />
              <span>
                {t('disclaimer.improveButton', 'Help Us Improve Data')}
              </span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DataDisclaimerBanner;
