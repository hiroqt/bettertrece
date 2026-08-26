import { useState, useMemo } from 'react';
import {
  PSA_PSCCS_SECTIONS,
  TRECE_EMERGENCY_HOTLINES,
  getAuthoritativePsccsBaseline,
} from '../../services/psccs';
import type { PsccsSectionMeta, PsccsRecord } from '../../types/psccs';
import {
  Search,
  Shield,
  Phone,
  Scale,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter,
  Building2,
  AlertTriangle,
  FileText,
  UserCheck,
  HeartHandshake,
} from 'lucide-react';

export default function TrecePeaceSafetyDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionCode, setSelectedSectionCode] = useState<string>('all');
  const [expandedRecordId, setExpandedRecordId] = useState<number | null>(null);

  const baselineRecords = useMemo<PsccsRecord[]>(() => {
    return getAuthoritativePsccsBaseline();
  }, []);

  const filteredRecords = useMemo(() => {
    return baselineRecords.filter(record => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        record.section_title.toLowerCase().includes(q) ||
        record.treceLocalContext.toLowerCase().includes(q) ||
        record.citizenActionGuide.toLowerCase().includes(q) ||
        record.commonExamples.some(e => e.toLowerCase().includes(q)) ||
        record.applicableLaws.some(l => l.toLowerCase().includes(q));

      const matchesSection =
        selectedSectionCode === 'all' ||
        record.sectioncode === selectedSectionCode;

      return matchesSearch && matchesSection;
    });
  }, [baselineRecords, searchQuery, selectedSectionCode]);

  return (
    <div className="space-y-8">
      {/* Header & Local Trece Peace & Order Context */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Peace, Order &amp; Public Safety Guide</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-blue-100">
                Philippine Crime Classification (PSCCS)
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Trece Martires Peace, Order &amp; Safety Directory
            </h3>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              Official classification of criminal offenses, reporting offices,
              applicable laws, and citizen action steps across the 13 Barangays
              and PNP Police Station of the City of Trece Martires.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://psa.gov.ph/classification/psccs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-950 hover:bg-amber-300 transition-all shadow-md"
            >
              <span>PSA Official PSCCS Registry</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 24/7 Emergency Numbers Callout Strip */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>24/7 Emergency &amp; Peace Hotlines in Trece Martires:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {TRECE_EMERGENCY_HOTLINES.slice(0, 3).map(h => (
              <div
                key={h.name}
                className="bg-white/5 p-3 rounded-2xl border border-white/10 space-y-1"
              >
                <div className="font-bold text-white text-xs truncate">
                  {h.name}
                </div>
                <div className="text-amber-300 font-mono font-bold text-sm">
                  {h.landline || h.mobile}
                </div>
                <div className="text-blue-200/70 text-[11px] truncate">
                  {h.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Citizen Flow Guide: Barangay Lupon vs. Police Blotter */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-gray-900 font-extrabold text-base">
          <Scale className="w-5 h-5 text-[#003893]" />
          <h3>Where Should You File a Complaint in Trece Martires?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Box 1: Barangay Lupon (KP) */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-[#003893] font-bold text-sm">
              <HeartHandshake className="w-4 h-4" />
              <h4>Barangay Lupon Tagapamayapa</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>For Neighborhood &amp; Civil Disputes:</strong> Disputes
              between residents of the same city/barangay with damages below
              ₱50,000 (e.g. boundary disputes, slight injuries, noise, minor
              theft). Under RA 7160, Lupon mediation is mandatory before court.
            </p>
            <div className="text-[11px] text-gray-500 font-semibold pt-1 border-t border-slate-200">
              Location: 13 Barangay Halls in Trece Martires
            </div>
          </div>

          {/* Box 2: PNP Trece Police Station */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-700 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <h4>PNP Police Station / Blotter</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>For Felonies &amp; Serious Crimes:</strong> Robbery,
              extortion, illegal drug violations (RA 9165), illegal firearms,
              cybercrime scams, traffic accidents with damage/injury, and crimes
              with penalties exceeding 1 year imprisonment.
            </p>
            <div className="text-[11px] text-gray-500 font-semibold pt-1 border-t border-slate-200">
              Location: Government Center, Brgy. San Agustin
            </div>
          </div>

          {/* Box 3: VAWC Desks */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-1.5 text-purple-700 font-bold text-sm">
              <UserCheck className="w-4 h-4" />
              <h4>Barangay VAWC Desk</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              <strong>For Domestic Abuse &amp; Child Protection:</strong>{' '}
              Victims of spousal or child abuse (RA 9262 / RA 7610) can
              immediately request a 15-day Barangay Protection Order (BPO) from
              the Punong Barangay or file directly with PNP WCPC.
            </p>
            <div className="text-[11px] text-gray-500 font-semibold pt-1 border-t border-slate-200">
              Confidential assistance at all 13 Barangay Halls
            </div>
          </div>
        </div>
      </div>

      {/* 11 Sections Quick Category Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#003893]" />
            <span>Filter by Official Crime &amp; Safety Category:</span>
          </span>
          <span className="text-gray-400 font-normal">
            {selectedSectionCode === 'all'
              ? 'All 11 Categories'
              : `Section ${selectedSectionCode}`}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedSectionCode('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              selectedSectionCode === 'all'
                ? 'bg-[#003893] text-white border-[#003893] shadow-xs'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            All Categories
          </button>
          {PSA_PSCCS_SECTIONS.map((s: PsccsSectionMeta) => (
            <button
              key={s.code}
              onClick={() => setSelectedSectionCode(s.code)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedSectionCode === s.code
                  ? 'bg-[#003893] text-white border-[#003893] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{s.code}. </span>
              <span>{s.shortTitle}</span>
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
            placeholder="Search offenses or legal remedies (e.g. VAWC, Noise, Theft, Drugs, Cybercrime, Traffic Accident, Extortion)..."
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

      {/* Grid of Offense & Public Safety Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRecords.map(item => {
          const isExpanded = expandedRecordId === item.id;
          const sectionMeta = PSA_PSCCS_SECTIONS.find(
            s => s.code === item.sectioncode
          );

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#003893] text-white">
                      Section {item.sectioncode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-800">
                      {sectionMeta?.shortTitle || 'Crime Classification'}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                    {item.jurisdictionType}
                  </span>
                </div>

                {/* Section Title */}
                <h4 className="text-base font-black text-gray-900 mb-2 leading-snug">
                  {item.division_title || item.section_title}
                </h4>

                {/* Common Examples Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.commonExamples.map(ex => (
                    <span
                      key={ex}
                      className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-[11px] font-medium"
                    >
                      {ex}
                    </span>
                  ))}
                </div>

                {/* Trece Local Context */}
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100/80 mb-3 text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#003893] mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Trece Martires Application &amp; Protocol:</span>
                  </div>
                  <p className="text-[11px] text-blue-950 leading-relaxed">
                    {item.treceLocalContext}
                  </p>
                </div>

                {/* What Citizens Should Do (Action Guide) */}
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 mb-3 text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    <span>What to Do / How to Report:</span>
                  </div>
                  <p className="text-[11px] text-amber-950 leading-relaxed font-medium">
                    {item.citizenActionGuide}
                  </p>
                </div>

                {/* Expandable Legal References */}
                <div className="space-y-1 mt-2">
                  <button
                    onClick={() =>
                      setExpandedRecordId(isExpanded ? null : item.id)
                    }
                    className="text-[11px] font-bold text-[#003893] hover:underline flex items-center gap-1 mb-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {isExpanded
                        ? 'Hide Legal Basis'
                        : 'View Applicable Philippine Laws'}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                      <div className="font-bold text-gray-700 text-[11px]">
                        Applicable Statutes &amp; Penal Laws:
                      </div>
                      <ul className="text-[11px] text-gray-600 list-disc list-inside space-y-0.5">
                        {item.applicableLaws.map((law, i) => (
                          <li key={i}>{law}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1 font-medium text-[#003893]">
                  <Building2 className="w-3 h-3" />
                  <span>{item.reportingOffice}</span>
                </span>
                <span className="text-gray-400">PSCCS 2018 Standard</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
