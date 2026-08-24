import { useState, useMemo } from 'react';
import {
  TRECE_BARANGAYS_PSGC,
  TRECE_CITY_DEMOGRAPHICS,
  BarangayPsgcData,
} from '../../data/psaClassifications';
import {
  Search,
  Copy,
  Check,
  Building2,
  TrendingUp,
  Users,
  MapPin,
  ArrowUpDown,
} from 'lucide-react';

export default function BarangayPsgcTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'population2020' | 'growth'>(
    'population2020'
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredBarangays = useMemo(() => {
    return TRECE_BARANGAYS_PSGC.filter((brgy: BarangayPsgcData) => {
      const matchesSearch =
        brgy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brgy.psgcCode.includes(searchQuery) ||
        brgy.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brgy.historicalName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterType === 'All' || brgy.urbanRural === filterType;

      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'population2020') {
        comparison = a.population2020 - b.population2020;
      } else if (sortBy === 'growth') {
        const growthA =
          (a.population2020 - a.population2015) / a.population2015;
        const growthB =
          (b.population2020 - b.population2015) / b.population2015;
        comparison = growthA - growthB;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchQuery, filterType, sortBy, sortOrder]);

  const toggleSort = (field: 'name' | 'population2020' | 'growth') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Demographic KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white p-5 rounded-2xl shadow-sm border border-blue-800/40">
          <div className="flex items-center justify-between text-blue-200 text-xs font-semibold mb-2">
            <span>TOTAL POPULATION (2020)</span>
            <Users className="w-4 h-4 text-blue-300" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono">
            {TRECE_CITY_DEMOGRAPHICS.totalPopulation2020.toLocaleString()}
          </div>
          <div className="text-xs text-blue-200 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300 font-bold">+35.2%</span> vs 2015
            census (
            {TRECE_CITY_DEMOGRAPHICS.totalPopulation2015.toLocaleString()})
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>CITY PSGC CODE</span>
            <MapPin className="w-4 h-4 text-[#003893]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gray-900 font-mono">
              {TRECE_CITY_DEMOGRAPHICS.psgcCityCode}
            </span>
            <button
              onClick={() =>
                copyToClipboard(TRECE_CITY_DEMOGRAPHICS.psgcCityCode)
              }
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700 transition-colors"
              title="Copy City PSGC Code"
            >
              {copiedCode === TRECE_CITY_DEMOGRAPHICS.psgcCityCode ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Region IV-A (04) • Cavite (21)
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>HIGHEST POPULATION</span>
            <Building2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-bold text-gray-900 truncate">
            Brgy. Hugo Perez
          </div>
          <div className="text-xs text-gray-600 mt-2 flex items-center justify-between">
            <span>48,920 residents</span>
            <span className="font-mono text-[11px] text-gray-400 font-medium">
              23.2% of city
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold mb-2">
            <span>FASTEST GROWING</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-gray-900 truncate">
            Brgy. Aguado
          </div>
          <div className="text-xs text-gray-600 mt-2 flex items-center justify-between">
            <span className="text-emerald-700 font-bold">+63.9% growth</span>
            <span className="font-mono text-[11px] text-gray-400 font-medium">
              36,248 residents
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search barangay, PSGC code, or type..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-medium text-gray-500 whitespace-nowrap hidden sm:inline">
            Classification:
          </span>
          {['All', 'Urban', 'Suburban', 'Rural'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                filterType === type
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* PSGC Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">PSGC Code</th>
                <th
                  className="py-3.5 px-4 cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Barangay & History</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Type / Zone</th>
                <th className="py-3.5 px-4 text-right">2015 Census</th>
                <th
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('population2020')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>2020 Census</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
                <th
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-gray-900"
                  onClick={() => toggleSort('growth')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Growth (%)</span>
                    <ArrowUpDown className="w-3 h-3 text-gray-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredBarangays.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No barangay found matching &quot;{searchQuery}&quot;.
                  </td>
                </tr>
              ) : (
                filteredBarangays.map((brgy: BarangayPsgcData) => (
                  <tr
                    key={brgy.psgcCode}
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-xs text-[#003893] whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{brgy.psgcCode}</span>
                        <button
                          onClick={() => copyToClipboard(brgy.psgcCode)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-100 rounded text-gray-500 hover:text-blue-700 transition-all"
                          title="Copy PSGC"
                        >
                          {copiedCode === brgy.psgcCode ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{brgy.name}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {brgy.historicalName}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          brgy.urbanRural === 'Urban'
                            ? 'bg-blue-100 text-blue-800'
                            : brgy.urbanRural === 'Suburban'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {brgy.urbanRural}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-gray-600 text-xs">
                      {brgy.population2015.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-gray-900 text-xs">
                      {brgy.population2020.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {brgy.growthRate}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50/80 px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <span>
            Showing <strong>{filteredBarangays.length}</strong> of{' '}
            <strong>{TRECE_BARANGAYS_PSGC.length}</strong> barangays
          </span>
          <span>
            Official data sourced from{' '}
            <strong>
              Philippine Statistics Authority (PSA) 2015 &amp; 2020 Census
            </strong>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
