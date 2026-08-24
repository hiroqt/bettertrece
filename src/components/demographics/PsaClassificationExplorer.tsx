import { useState, useMemo } from 'react';
import {
  PSA_CLASSIFICATIONS,
  PsaClassification,
} from '../../data/psaClassifications';
import {
  Search,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  Briefcase,
  ShoppingCart,
  Factory,
  Package,
  Boxes,
  GraduationCap,
  ShieldAlert,
  Compass,
  FileCode2,
  Building,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  MapPin: <MapPin className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Factory: <Factory className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
};

const CATEGORIES = [
  'All',
  'Geography',
  'Labor & Occupation',
  'Industry & Economy',
  'Products & Commodities',
  'Education',
  'Justice & Safety',
  'Tourism',
];

export default function PsaClassificationExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredClassifications = useMemo(() => {
    return PSA_CLASSIFICATIONS.filter((item: PsaClassification) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.localApplication.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            Philippine Standard Classification Systems
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Standard statistical classification systems maintained by the
            Philippine Statistics Authority (PSA) for national and local
            government units.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://classification.psa.gov.ph/api/documentation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-50 text-[#003893] hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <FileCode2 className="w-4 h-4" />
            <span>PSA Swagger Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PSGC, PSIC, Education, Crime..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#003893] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Classification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClassifications.map((item: PsaClassification) => (
          <div
            key={item.code}
            className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003893] group-hover:bg-[#003893] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  {ICON_MAP[item.icon] || <Building className="w-5 h-5" />}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800">
                    {item.version}
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-xs font-extrabold text-[#003893] tracking-wide">
                  {item.acronym}
                </span>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors leading-snug">
                  {item.name}
                </h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* Local Trece application badge */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                <div className="text-[11px] font-bold text-gray-700 flex items-center gap-1 mb-0.5">
                  <Building className="w-3 h-3 text-amber-600" />
                  <span>Trece Martires Application</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                  {item.localApplication}
                </p>
              </div>

              {/* Base URL Box */}
              <div className="space-y-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Base URL
                </div>
                <div className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                  <code className="text-[11px] font-mono text-gray-800 truncate select-all">
                    {item.baseUrl}
                  </code>
                  <button
                    onClick={() => copyUrl(item.baseUrl)}
                    className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-900 transition-colors shrink-0"
                    title="Copy Base URL"
                  >
                    {copiedUrl === item.baseUrl ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action Links Footer */}
            <div className="bg-gray-50/70 border-t border-gray-100 px-5 py-3 flex items-center justify-between text-xs">
              <a
                href={item.apiDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#003893] hover:text-blue-700 hover:underline"
              >
                <span>API Documentation</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={item.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-gray-500 hover:text-gray-800"
              >
                <span>Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
