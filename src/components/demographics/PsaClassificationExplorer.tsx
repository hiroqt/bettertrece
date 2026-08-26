import { useState, useMemo } from 'react';
import {
  PSA_CLASSIFICATIONS,
  PsaClassification,
} from '../../data/demographics/psaClassifications';
import {
  Search,
  ExternalLink,
  MapPin,
  Briefcase,
  ShoppingCart,
  Factory,
  Package,
  Boxes,
  GraduationCap,
  ShieldAlert,
  Compass,
  Building,
  CheckCircle2,
  HelpCircle,
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
            Philippine National Statistical &amp; Classification Standards
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-3xl">
            The 9 official classification systems established by the Philippine
            Statistics Authority (PSA) to ensure standard naming, data
            interoperability, and accurate records across all local government
            units and national agencies.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://psa.gov.ph/classification"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-[#003893] hover:bg-blue-50 transition-colors border border-blue-200 shadow-2xs"
          >
            <span>Official PSA Classifications</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search standards (e.g. Geography, Jobs, Education, Business)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
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
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800">
                    Version {item.version}
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-xs font-black text-[#003893] tracking-wide">
                  {item.acronym}
                </span>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors leading-snug">
                  {item.name}
                </h3>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* Purpose in National Statistics */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3 text-xs">
                <div className="text-[11px] font-bold text-gray-800 flex items-center gap-1 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                  <span>Purpose &amp; Use</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                  {item.purpose}
                </p>
              </div>

              {/* Local Trece Martires application badge */}
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100/70 mb-2 text-xs">
                <div className="text-[11px] font-bold text-[#00225e] flex items-center gap-1 mb-1">
                  <Building className="w-3.5 h-3.5 text-amber-600" />
                  <span>Trece Martires Application</span>
                </div>
                <p className="text-[11px] text-blue-950 leading-relaxed line-clamp-2">
                  {item.localApplication}
                </p>
              </div>
            </div>

            {/* Action Links Footer */}
            <div className="bg-gray-50/70 border-t border-gray-100 px-5 py-3.5 flex items-center justify-between text-xs">
              <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>PSA Official Standard</span>
              </span>

              <a
                href={item.apiDocsUrl || item.baseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#003893] hover:text-blue-700 hover:underline"
              >
                <span>Official Guidelines</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
