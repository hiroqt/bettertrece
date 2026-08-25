import { useState, useMemo } from 'react';
import {
  CITY_EXECUTIVE_OFFICIALS,
  CITY_COUNCILORS,
  BARANGAY_CAPTAINS,
  OFFICIALS_METADATA,
} from '../../data/government/electedOfficials';
import {
  Landmark,
  ShieldCheck,
  Search,
  CheckCircle2,
  Award,
  Calendar,
  GitFork,
} from 'lucide-react';

export default function ElectedOfficialsDirectory() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'executive' | 'council' | 'barangays' | 'hierarchy'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered Councilors
  const filteredCouncilors = useMemo(() => {
    if (!searchQuery.trim()) return CITY_COUNCILORS;
    const query = searchQuery.toLowerCase();
    return CITY_COUNCILORS.filter(
      c =>
        c.name.toLowerCase().includes(query) ||
        c.position.toLowerCase().includes(query) ||
        c.roleType.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filtered Barangays
  const filteredBarangays = useMemo(() => {
    if (!searchQuery.trim()) return BARANGAY_CAPTAINS;
    const query = searchQuery.toLowerCase();
    return BARANGAY_CAPTAINS.filter(
      b =>
        b.barangay.toLowerCase().includes(query) ||
        b.captain.toLowerCase().includes(query) ||
        (b.psgcCode && b.psgcCode.includes(query))
    );
  }, [searchQuery]);

  // Filtered Executive
  const filteredExecutive = useMemo(() => {
    if (!searchQuery.trim()) return CITY_EXECUTIVE_OFFICIALS;
    const query = searchQuery.toLowerCase();
    return CITY_EXECUTIVE_OFFICIALS.filter(
      e =>
        e.name.toLowerCase().includes(query) ||
        e.position.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden my-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Official Leadership Directory</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-blue-100 border border-white/15 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-300" />
                <span>Term: {OFFICIALS_METADATA.term}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified: {OFFICIALS_METADATA.lastVerified}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Trece Martires City Leadership &amp; Governance
            </h2>

            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
              Official roster of executive leaders, Sangguniang Panlungsod
              councilors, sectoral ex-officio heads, and the 13 constituent
              Barangay Captains.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/15">
            <Landmark className="w-8 h-8 text-amber-300 shrink-0" />
            <div className="text-right">
              <div className="text-[11px] font-semibold text-blue-200 uppercase tracking-wider">
                Government Unit
              </div>
              <div className="text-sm font-bold text-white font-mono">
                Component City (Cavite)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Search Bar Strip */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-gray-200 shadow-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            All Officials
          </button>
          <button
            onClick={() => setActiveTab('executive')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'executive'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Executive (Mayor &amp; Vice)
          </button>
          <button
            onClick={() => setActiveTab('council')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'council'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            City Council (10 + ABC/SK)
          </button>
          <button
            onClick={() => setActiveTab('barangays')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'barangays'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            13 Barangay Captains
          </button>
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'hierarchy'
                ? 'bg-[#003893] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Hierarchy Tree</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search official or barangay..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003893]/30 focus:border-[#003893] transition-all"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* 1. EXECUTIVE OFFICIALS SECTION */}
        {(activeTab === 'all' || activeTab === 'executive') &&
          filteredExecutive.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                    City Executive Leadership
                  </h3>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  Term: {OFFICIALS_METADATA.term}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mayor Card */}
                <div className="bg-gradient-to-br from-blue-900 via-[#002a70] to-[#001f54] text-white p-5 sm:p-6 rounded-2xl border border-blue-800/50 shadow-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Award className="w-24 h-24 text-amber-300" />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 inline-block font-sans">
                      City Mayor
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Hon. Gemma Buendia-Lubigan
                    </h4>
                    <p className="text-xs text-blue-200 leading-relaxed">
                      Chief Executive Officer of the City of Trece Martires,
                      leading urban development, public welfare, and citizen
                      digital governance.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-blue-300 border-t border-white/10 font-mono">
                      <span>Term: 2023–2026</span>
                      <span className="text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active in Office
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vice Mayor Card */}
                <div className="bg-gradient-to-br from-slate-900 via-[#00225e] to-slate-950 text-white p-5 sm:p-6 rounded-2xl border border-blue-900/40 shadow-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Landmark className="w-24 h-24 text-blue-300" />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-500 text-white inline-block font-sans">
                      City Vice Mayor
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Hon. Romeo Bobby Montehermoso Jr.
                    </h4>
                    <p className="text-xs text-blue-200 leading-relaxed">
                      Presiding Officer of the Sangguniang Panlungsod,
                      overseeing municipal legislative sessions, ordinances, and
                      community resolutions.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-blue-300 border-t border-white/10 font-mono">
                      <span>Term: 2023–2026</span>
                      <span className="text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Presiding Officer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* 2. SANGGUNIANG PANLUNGSOD (CITY COUNCILORS + ABC / SK) */}
        {(activeTab === 'all' || activeTab === 'council') &&
          filteredCouncilors.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                    Sangguniang Panlungsod (City Council)
                  </h3>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  10 Councilors &bull; 2 Ex-Officio Members
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredCouncilors.map((councilor, index) => {
                  const isExOfficio = councilor.roleType === 'Ex-Officio';
                  return (
                    <div
                      key={councilor.name}
                      className={`p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${
                        isExOfficio
                          ? 'bg-amber-50/60 border-amber-200 hover:border-amber-400'
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              isExOfficio
                                ? 'bg-amber-400 text-slate-950'
                                : 'bg-blue-50 text-[#003893]'
                            }`}
                          >
                            {councilor.position}
                          </span>
                          <span className="text-[11px] font-mono text-gray-400 font-semibold">
                            #{index + 1}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-gray-900 leading-snug">
                          {councilor.name}
                        </h4>

                        {councilor.notes && (
                          <p className="text-xs text-gray-600 font-medium mt-1">
                            {councilor.notes}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                        <span>Level: {councilor.level}</span>
                        <span className="text-emerald-700 font-semibold">
                          Term {councilor.term}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* 3. 13 CONSTITUENT BARANGAYS & CAPTAINS */}
        {(activeTab === 'all' || activeTab === 'barangays') &&
          filteredBarangays.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                    13 Constituent Barangays &amp; Punong Barangays
                  </h3>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  Liga ng mga Barangay
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredBarangays.map(b => (
                  <div
                    key={`${b.number}-${b.barangay}`}
                    className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-bold uppercase tracking-wider text-[10px]">
                          Barangay #{b.number}
                        </span>
                        {b.psgcCode && (
                          <span className="font-mono text-[11px] text-gray-400">
                            PSGC: {b.psgcCode}
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 font-medium">
                          Barangay
                        </div>
                        <h4 className="text-base font-bold text-gray-900 group-hover:text-[#003893] transition-colors">
                          Brgy. {b.barangay}
                        </h4>
                      </div>

                      <div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          Punong Barangay (Captain)
                        </div>
                        <div className="text-sm font-extrabold text-gray-900">
                          {b.captain}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono">
                      <span>Term: {b.term}</span>
                      <span className="text-emerald-700 font-semibold">
                        Verified 2026-08-24
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* 4. HIERARCHY TREE VISUALIZATION */}
        {(activeTab === 'all' || activeTab === 'hierarchy') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  City Leadership Hierarchy Tree
                </h3>
              </div>
              <span className="text-xs font-semibold text-gray-500">
                LGU Organizational Chart
              </span>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-inner font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
              <div className="text-amber-400 font-bold text-base mb-2">
                City of Trece Martires (Cavite)
              </div>
              <div className="text-slate-400 mb-4">
                &boxv; (Term: 2023–2026 &bull; Source: Official City Government
                Pages)
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-blue-400 font-bold">
                    &boxvr;&boxh;&boxh; 1. City Mayor:
                  </span>{' '}
                  <span className="text-white font-bold bg-blue-900/60 px-2 py-0.5 rounded">
                    Hon. Gemma Buendia-Lubigan
                  </span>
                </div>

                <div>
                  <span className="text-blue-400 font-bold">
                    &boxvr;&boxh;&boxh; 2. City Vice Mayor:
                  </span>{' '}
                  <span className="text-white font-bold bg-blue-900/60 px-2 py-0.5 rounded">
                    Hon. Romeo Bobby Montehermoso Jr.
                  </span>
                </div>

                <div className="pl-4 space-y-1">
                  <div className="text-emerald-400 font-bold">
                    &boxvr;&boxh;&boxh; Sangguniang Panlungsod (City Council):
                  </div>
                  <div className="pl-6 space-y-0.5 text-slate-300">
                    <div>&boxvr;&boxh;&boxh; 1. Joyce Mojica Baking</div>
                    <div>&boxvr;&boxh;&boxh; 2. Tracy Anacan</div>
                    <div>&boxvr;&boxh;&boxh; 3. Kim Paolo Lubigan</div>
                    <div>&boxvr;&boxh;&boxh; 4. Anne Jomille Humarang</div>
                    <div>&boxvr;&boxh;&boxh; 5. Jay-Em Cunanan</div>
                    <div>&boxvr;&boxh;&boxh; 6. Antonio Lontoc</div>
                    <div>&boxvr;&boxh;&boxh; 7. Elmo Trinidad</div>
                    <div>&boxvr;&boxh;&boxh; 8. Budoy Vidallon</div>
                    <div>&boxvr;&boxh;&boxh; 9. Poyi Buendia</div>
                    <div>&boxvr;&boxh;&boxh; 10. Sting Montehermoso</div>
                    <div className="text-amber-300 font-semibold">
                      &boxvr;&boxh;&boxh; [ABC President] Mark Albert
                      Montehermoso
                    </div>
                    <div className="text-amber-300 font-semibold">
                      &boxur;&boxh;&boxh; [SK Federation President] John Allyson
                      Sepacio
                    </div>
                  </div>
                </div>

                <div className="pl-4 space-y-1 pt-2">
                  <div className="text-purple-400 font-bold">
                    &boxur;&boxh;&boxh; 13 Constituent Barangays (Punong
                    Barangays):
                  </div>
                  <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0.5 text-slate-300">
                    <div>&boxvr;&boxh;&boxh; Aguado: Jaimer M. Sierra</div>
                    <div>&boxvr;&boxh;&boxh; Cabezas: Jaddy C. Alarca</div>
                    <div>
                      &boxvr;&boxh;&boxh; Cabuco: Mark Albert Montehermoso
                    </div>
                    <div>&boxvr;&boxh;&boxh; Conchu: Irene R. Aure</div>
                    <div>
                      &boxvr;&boxh;&boxh; De Ocampo: Nelson Lubigan Montehermoso
                    </div>
                    <div>&boxvr;&boxh;&boxh; Gregorio: Eliseo C. Dela Luya</div>
                    <div>&boxvr;&boxh;&boxh; Hugo Perez: Raymundo A. Villa</div>
                    <div>&boxvr;&boxh;&boxh; Inocencio: Rosendo P. Dilidli</div>
                    <div>&boxvr;&boxh;&boxh; Lallana: Cecilia M. Decillo</div>
                    <div>&boxvr;&boxh;&boxh; Lapidario: Remelyn D. Sierra</div>
                    <div>&boxvr;&boxh;&boxh; Luciano: Luisito R. Diloy</div>
                    <div>&boxvr;&boxh;&boxh; Osorio: Robert E. Penus</div>
                    <div className="md:col-span-2 text-amber-200 font-semibold">
                      &boxur;&boxh;&boxh; San Agustin (Poblacion): Cornelio L.
                      De Sagun
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
