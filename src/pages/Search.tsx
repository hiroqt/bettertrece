import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useQueryState } from 'nuqs';
import { Search as SearchIcon } from 'lucide-react';
import { searchClient, SEARCH_INDEX } from '../lib/meilisearch';
import type { SearchHit } from '../lib/meilisearch';

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
      try {
        const index = searchClient!.index(SEARCH_INDEX);
        const res = await index.search<SearchHit>(query, { limit: 20 });
        setResults(res.hits);
        setHasSearched(true);
      } catch {
        setError('Search is unavailable. Please try again later.');
        setResults([]);
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
          placeholder="Search services, departments, guides..."
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
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 hover:border-[#003893] hover:shadow-2xs transition-all">
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
          Start typing to search across services and government information
        </div>
      )}
    </main>
  );
}
