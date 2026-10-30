import React from 'react';
import { AlertTriangle, ExternalLink, Github } from '../../lib/icons';
import { useLocation } from 'react-router';

const CommunityCTA: React.FC = () => {
  const location = useLocation();
  const currentUrl =
    typeof window === 'undefined' ? location.pathname : window.location.href;
  const issueUrl = new URL(
    'https://github.com/bettergovph/bettergov/issues/new'
  );

  issueUrl.searchParams.set(
    'title',
    `[Data Correction] Inaccuracy reported on ${location.pathname}`
  );
  issueUrl.searchParams.set(
    'body',
    `### Data issue report\n\n- **Page URL:** ${currentUrl}\n- **Path:** ${location.pathname}\n\n### What needs review?\n\n### Official source or correction reference\n`
  );

  return (
    <section className="relative z-10 -mt-8 -mb-14 px-4">
      <div className="relative isolate mx-auto flex max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-xl bg-[#0863e8] p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:px-14 lg:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/3 h-80 w-80 rounded-full border border-white/10"
        />
        <div className="relative max-w-4xl flex-1 space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-100">
            Help keep the data useful
          </p>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Found something that needs another look?
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-blue-50 sm:text-base">
            BetterTrece organizes public information from official sources. If
            you find an outdated record, incorrect detail, missing source, or
            broken link, send it to us for review.
          </p>
        </div>

        <div className="relative flex shrink-0 flex-col gap-3">
          <a
            href={issueUrl.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-blue-800 transition-colors hover:bg-blue-50"
          >
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <span>Report a data issue</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/bettergovph/bettergov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/50 bg-blue-800/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900/50"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>Contribute on GitHub</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunityCTA;
