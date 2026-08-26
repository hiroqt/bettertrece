import { useState, useMemo } from 'react';
import {
  PSA_PSOC_MAJOR_SUMMARIES,
  getAuthoritativeBaselineRecords,
} from '../../services/psoc';
import type { PsocMajorGroupSummary, PsocRecord } from '../../types/psoc';
import {
  Search,
  Briefcase,
  Sparkles,
  GraduationCap,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle2,
  ListChecks,
} from 'lucide-react';

const QUALIFICATION_MAP: Record<string, string> = {
  '4': "Bachelor's / Professional Degree",
  '3': 'Technical Diploma / Associate Degree',
  '2': 'High School / TESDA NC II Certification',
  '1': 'Basic Education / On-the-Job Training',
  '3 & 4': 'Degree & Executive Experience',
  Specialized: 'Specialized Civil or Military Training',
};

const SECTOR_LABELS: Record<string, string> = {
  '1': '1. Management & Executives',
  '2': '2. Professionals (Health, IT, Teaching)',
  '3': '3. Technicians & Specialists',
  '4': '4. Office & Clerical Support',
  '5': '5. Service & Retail Sales',
  '6': '6. Agriculture, Farming & Fishery',
  '7': '7. Craft, Trades & Construction',
  '8': '8. Machine Operators & Drivers',
  '9': '9. General Support & Elementary',
  '0': '0. Armed Forces & Public Safety',
};

export default function PsocOccupationsDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajorCode, setSelectedMajorCode] = useState<string>('all');
  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(null);

  // Baseline records across all levels
  const allBaselineRecords = useMemo<PsocRecord[]>(() => {
    return getAuthoritativeBaselineRecords('all');
  }, []);

  // Filtered occupational groups
  const filteredOccupations = useMemo(() => {
    return allBaselineRecords.filter(record => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        record.title.toLowerCase().includes(q) ||
        record.description.toLowerCase().includes(q) ||
        record.example_jobs?.some(j => j.toLowerCase().includes(q)) ||
        record.tasks?.some(t => t.toLowerCase().includes(q));

      const matchesMajor =
        selectedMajorCode === 'all' ||
        String(record.majorcode) === selectedMajorCode;

      return matchesSearch && matchesMajor;
    });
  }, [allBaselineRecords, searchQuery, selectedMajorCode]);

  return (
    <div className="space-y-6">
      {/* Header & Local PESO / Labor Context */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-[#002855] text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-blue-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Public Employment Service Office (PESO) Standard</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-100">
                Philippine Standard Occupations (PSOC)
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Trece Martires Occupational &amp; Career Guide
            </h3>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              Find standard job definitions, required educational
              qualifications, representative occupations, and local employment
              demand across Trece Martires City and Cavite industrial corridors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="https://psa.gov.ph/classification/psoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-950 hover:bg-amber-300 transition-all shadow-md"
            >
              <span>PSA Official PSOC Registry</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3 Citizen Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-blue-200 font-semibold mb-0.5">
              10 Major Sectors
            </div>
            <div className="font-bold text-white text-sm">
              Comprehensive Career Spectrum
            </div>
            <div className="text-blue-200/70 mt-1">
              From Healthcare &amp; Tech to Skilled Trades
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-blue-200 font-semibold mb-0.5">
              Qualification Standards
            </div>
            <div className="font-bold text-white text-sm">
              Educational &amp; TESDA Levels
            </div>
            <div className="text-blue-200/70 mt-1">
              Clear pathways for students and jobseekers
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
            <div className="text-blue-200 font-semibold mb-0.5">
              Cavite Industrial Hub
            </div>
            <div className="font-bold text-white text-sm">
              Local Employment Alignment
            </div>
            <div className="text-blue-200/70 mt-1">
              Connected with Trece Martires PESO programs
            </div>
          </div>
        </div>
      </div>

      {/* Major Career Sectors Filter Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#003893]" />
            <span>Browse by Major Career Sector:</span>
          </span>
          <span className="text-gray-400 font-normal">
            {selectedMajorCode === 'all'
              ? 'All 10 Sectors'
              : SECTOR_LABELS[selectedMajorCode] ||
                `Sector ${selectedMajorCode}`}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedMajorCode('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              selectedMajorCode === 'all'
                ? 'bg-[#003893] text-white border-[#003893] shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Career Sectors
          </button>
          {PSA_PSOC_MAJOR_SUMMARIES.map((m: PsocMajorGroupSummary) => (
            <button
              key={m.code}
              onClick={() => setSelectedMajorCode(String(m.code))}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedMajorCode === String(m.code)
                  ? 'bg-[#003893] text-white border-[#003893] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{SECTOR_LABELS[String(m.code)] || m.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search occupations by job title, skill, or keyword (e.g. Software, Nurse, Welder, Teacher, Driver, Cashier, Police)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-gray-900"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 px-2 py-1 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid of Occupational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredOccupations.map(item => {
          const isExpanded = expandedGroupId === item.id;
          const level =
            item.hierarchy_level === 'Major'
              ? 'Major Sector'
              : item.hierarchy_level === 'Sub-Major'
                ? 'Career Field'
                : 'Occupation';

          const qualificationText = item.skill_level
            ? QUALIFICATION_MAP[String(item.skill_level)] ||
              `Qualification Level ${item.skill_level}`
            : null;

          // Find major group meta if available
          const majorSummary = PSA_PSOC_MAJOR_SUMMARIES.find(
            s => String(s.code) === String(item.majorcode)
          );

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                    {level}
                  </span>

                  {qualificationText && (
                    <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-emerald-600" />
                      <span>{qualificationText}</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-base font-black text-gray-900 mb-2 leading-snug">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Representative Titles */}
                {item.example_jobs && item.example_jobs.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>Sample Job Titles:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.example_jobs.map(job => (
                        <span
                          key={job}
                          className="px-2 py-0.5 bg-white border border-gray-200 text-gray-800 rounded-md text-[11px] font-medium shadow-2xs"
                        >
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cavite & Local Trece Relevance */}
                {majorSummary?.caviteRelevance &&
                  item.hierarchy_level === 'Major' && (
                    <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 mb-3 text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#003893] mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Trece Martires &amp; Cavite Employment Hub:</span>
                      </div>
                      <p className="text-[11px] text-blue-950 leading-relaxed">
                        {majorSummary.caviteRelevance}
                      </p>
                    </div>
                  )}

                {/* Tasks List if expanded or available */}
                {item.tasks && item.tasks.length > 0 && (
                  <div className="space-y-1 mt-2">
                    <button
                      onClick={() =>
                        setExpandedGroupId(isExpanded ? null : item.id)
                      }
                      className="text-[11px] font-bold text-[#003893] hover:underline flex items-center gap-1 mb-1 cursor-pointer"
                    >
                      <ListChecks className="w-3.5 h-3.5 text-[#003893]" />
                      <span>
                        {isExpanded
                          ? 'Hide Key Responsibilities'
                          : 'View Key Responsibilities & Tasks'}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <ul className="text-[11px] text-gray-600 list-disc list-inside space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        {item.tasks.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1 font-medium text-emerald-700">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Official PSA Standard</span>
                </span>
                <span className="text-[11px] text-gray-400">
                  PSOC 2012 Standard
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
