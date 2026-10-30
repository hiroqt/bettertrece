import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useQueryState } from 'nuqs';
import { Search as SearchIcon } from '../lib/icons';
import { searchClient, SEARCH_INDEX } from '../lib/meilisearch';
import type { SearchHit } from '../lib/meilisearch';
import { ALL_DPWH_PROJECTS } from '../data/transparency/dpwhTransparency';
import {
  PSA_CLASSIFICATIONS,
  TRECE_BARANGAYS_PSGC,
  TRECE_MUNICIPAL_PROFILE,
  TRECE_VOTER_STATISTICS_2025,
} from '../data/demographics/psaClassifications';

const numberFormatter = new Intl.NumberFormat('en-PH');

const localSearchHits: SearchHit[] = [
  ...ALL_DPWH_PROJECTS.map(project => ({
    id: `project-${project.contractId}`,
    title: project.description,
    description: [
      `Contract ${project.contractId}`,
      project.category,
      project.status,
      project.location.barangay,
      project.infraYear,
      project.contractor,
      `Budget ₱${numberFormatter.format(project.budget)}`,
    ].join(' · '),
    type: 'project' as const,
    category: project.category,
    categorySlug: 'projects',
    slug: project.contractId,
    url: '/transparency/dpwh',
  })),
  {
    id: 'data-population-2024',
    title: 'Trece Martires Population (2024)',
    description: `${numberFormatter.format(TRECE_MUNICIPAL_PROFILE.totalPopulation2024)} people · PSA 2024 POPCEN`,
    type: 'data',
    category: 'City Data',
    categorySlug: 'demographics',
    slug: 'population-2024',
    url: '/demographics',
  },
  {
    id: 'data-voters-2025',
    title: 'Registered Voters (2025)',
    description: `${numberFormatter.format(TRECE_VOTER_STATISTICS_2025.registeredVoters)} voters · COMELEC · ${TRECE_VOTER_STATISTICS_2025.asOfDate}`,
    type: 'data',
    category: 'Election Data',
    categorySlug: 'demographics',
    slug: 'registered-voters-2025',
    url: '/demographics',
  },
  {
    id: 'data-barangays',
    title: 'Trece Martires Barangays',
    description: `${TRECE_MUNICIPAL_PROFILE.totalBarangays} barangays · PSGC · Trece Martires City`,
    type: 'data',
    category: 'City Data',
    categorySlug: 'demographics',
    slug: 'barangays',
    url: '/demographics',
  },
  {
    id: 'data-land-area',
    title: 'Trece Martires Land Area',
    description: `${TRECE_MUNICIPAL_PROFILE.totalLandAreaKm2} km² · ${TRECE_MUNICIPAL_PROFILE.cityClassification} · ${TRECE_MUNICIPAL_PROFILE.incomeClass}`,
    type: 'data',
    category: 'City Data',
    categorySlug: 'demographics',
    slug: 'land-area',
    url: '/demographics',
  },
  ...TRECE_BARANGAYS_PSGC.map(barangay => ({
    id: `barangay-${barangay.psgcCode}`,
    title: `${barangay.name} Barangay`,
    description: `${barangay.historicalName} · population ${numberFormatter.format(barangay.population2024)} (2024) · ${barangay.desc}`,
    type: 'data' as const,
    category: 'Barangay Data',
    categorySlug: 'demographics',
    slug: barangay.psgcCode,
    url: '/demographics',
  })),
  ...PSA_CLASSIFICATIONS.map(item => ({
    id: `classification-${item.code}`,
    title: `${item.name} (${item.acronym})`,
    description: `${item.description} ${item.purpose}`,
    type: 'data' as const,
    category: 'PSA Classification',
    categorySlug: 'demographics',
    slug: item.code,
    url: '/demographics',
  })),
];

function searchLocalContent(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/);

  return localSearchHits
    .map(hit => {
      const title = hit.title.toLowerCase();
      const category = hit.category.toLowerCase();
      const description = hit.description.toLowerCase();
      const slug = hit.slug.toLowerCase();
      const searchable = `${title} ${category} ${description} ${slug}`;
      const searchableNumbers = searchable.replace(/[\s,]/g, '');
      const matches = terms.every(
        term =>
          searchable.includes(term) ||
          searchableNumbers.includes(term.replace(/[\s,]/g, ''))
      );
      const score = terms.reduce(
        (total, term) =>
          total +
          (title.includes(term) ? 4 : 0) +
          (category.includes(term) ? 2 : 0) +
          (description.includes(term) || slug.includes(term) ? 1 : 0),
        0
      );

      return { hit, matches, score };
    })
    .filter(result => result.matches)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(result => result.hit);
}

export default function Search() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const [results, setResults] = useState<SearchHit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      const localResults = searchLocalContent(query);
      try {
        const remoteResults = searchClient
          ? (
              await searchClient
                .index(SEARCH_INDEX)
                .search<SearchHit>(query, { limit: 20 })
            ).hits
          : [];
        const uniqueResults = new Map<string, SearchHit>();
        for (const hit of [...localResults, ...remoteResults]) {
          uniqueResults.set(hit.id, hit);
        }
        setResults([...uniqueResults.values()].slice(0, 20));
        setHasSearched(true);
      } catch {
        setResults(localResults);
        setHasSearched(true);
        if (localResults.length === 0) {
          setError('Search is unavailable. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="container mx-auto px-4 pt-44 sm:pt-44 lg:pt-48 pb-16 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 mb-6 tracking-tight">
        Search
      </h1>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value || null)}
          placeholder="Search projects, barangays, population, voters, or public data..."
          className="w-full pl-11 pr-4 py-3 border border-zinc-300 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-hidden focus:ring-2 focus:ring-[#003893] focus:border-[#003893] transition-all bg-white"
          autoFocus
        />
      </div>

      {error && (
        <div className="text-center py-12 text-zinc-600 text-sm">{error}</div>
      )}

      {!error && isLoading && (
        <div className="text-center py-12 text-zinc-500 text-sm">
          Searching...
        </div>
      )}

      {!error && !isLoading && hasSearched && results.length === 0 && (
        <div className="text-center py-12 text-zinc-500">
          No results for{' '}
          <span className="font-semibold text-zinc-900">
            &ldquo;{query}&rdquo;
          </span>
        </div>
      )}

      {!error && !isLoading && results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-zinc-500 mb-4">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;
            {query}&rdquo;
          </p>
          {results.map(hit => (
            <Link key={hit.id} to={hit.url} className="block group">
              <div className="bg-white border border-primary-200 rounded-2xl p-4 sm:p-5 hover:border-primary-500 hover:shadow-2xs transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#003893] border border-blue-200">
                    {hit.category}
                  </span>
                </div>
                <h2 className="text-base font-bold text-zinc-900 group-hover:text-[#003893] transition-colors">
                  {hit.title}
                </h2>
                {hit.description && (
                  <p className="text-sm text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                    {hit.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {!hasSearched && !isLoading && !error && (
        <div className="text-center py-12 text-zinc-400 text-sm">
          Search local projects and public data, or enter a city service or
          office
        </div>
      )}
    </main>
  );
}
