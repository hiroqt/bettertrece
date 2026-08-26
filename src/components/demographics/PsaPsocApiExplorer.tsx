import { useState, useEffect, useMemo } from 'react';
import type {
  PsocGroupLevel,
  PsocVersion,
  PsocQueryParams,
} from '../../types/psoc';
import {
  PSA_PSOC_VERSIONS,
  PSA_PSOC_ENDPOINTS,
  PSA_PSOC_MAJOR_SUMMARIES,
  fetchPsocData,
  buildPsocUrl,
  getStoredPsaToken,
  setStoredPsaToken,
} from '../../services/psoc';
import type { FetchPsocResult } from '../../types/psoc';
import {
  Play,
  Copy,
  Check,
  ExternalLink,
  Code2,
  FileJson,
  Database,
  Download,
  Info,
  RefreshCw,
  Zap,
  BookOpen,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Layers,
  Search,
} from 'lucide-react';

type ConsoleSubTab = 'cards' | 'response' | 'code' | 'docs';
type CodeSnippetTab = 'curl' | 'javascript' | 'python' | 'postman';

interface PresetOption {
  id: string;
  name: string;
  badge: string;
  group: PsocGroupLevel;
  majorcode: string;
  submajorcode: string;
  minorcode: string;
  unitcode: string;
  pageSize: number;
}

const PRESETS: PresetOption[] = [
  {
    id: 'all-major',
    name: '10 Major Groups',
    badge: '1-Digit Aggregates',
    group: 'major',
    majorcode: '',
    submajorcode: '',
    minorcode: '',
    unitcode: '',
    pageSize: 50,
  },
  {
    id: 'professionals',
    name: 'Professionals',
    badge: 'Major: 2 (Health, Tech, Education)',
    group: 'major',
    majorcode: '2',
    submajorcode: '',
    minorcode: '',
    unitcode: '',
    pageSize: 50,
  },
  {
    id: 'technicians',
    name: 'Technicians & IT',
    badge: 'Major: 3 (Applied Tech)',
    group: 'major',
    majorcode: '3',
    submajorcode: '',
    minorcode: '',
    unitcode: '',
    pageSize: 50,
  },
  {
    id: 'managers',
    name: 'Managers & Officials',
    badge: 'Major: 1 (LGU & Executives)',
    group: 'major',
    majorcode: '1',
    submajorcode: '',
    minorcode: '',
    unitcode: '',
    pageSize: 50,
  },
  {
    id: 'operators',
    name: 'Plant & Machine Operators',
    badge: 'Major: 8 (Cavite Ecozones & PUVs)',
    group: 'major',
    majorcode: '8',
    submajorcode: '',
    minorcode: '',
    unitcode: '',
    pageSize: 50,
  },
  {
    id: 'sales-services',
    name: 'Service & Sales',
    badge: 'Major: 5 (Retail & Security)',
    group: 'major',
    majorcode: '5',
    submajorcode: '',
    minorcode: '',
    unitcode: '',
    pageSize: 50,
  },
  {
    id: 'agriculture',
    name: 'Agri & Farmers',
    badge: 'Major: 6 (Coffee & Crops)',
    group: 'major',
    majorcode: '6',
    submajorcode: '',
    minorcode: '',
    unitcode: '',
    pageSize: 50,
  },
];

export default function PsaPsocApiExplorer() {
  const [version, setVersion] = useState<PsocVersion>('2012');
  const [group, setGroup] = useState<PsocGroupLevel>('major');
  const [majorcode, setMajorcode] = useState('');
  const [submajorcode, setSubmajorcode] = useState('');
  const [minorcode, setMinorcode] = useState('');
  const [unitcode, setUnitcode] = useState('');
  const [pageSize, setPageSize] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const [token, setToken] = useState<string>(() => getStoredPsaToken());
  const [showToken, setShowToken] = useState(false);
  const [includeRealTokenInSnippets, setIncludeRealTokenInSnippets] =
    useState(false);
  const [activePreset, setActivePreset] = useState<string>('all-major');

  const [activeSubTab, setActiveSubTab] = useState<ConsoleSubTab>('cards');
  const [codeTab, setCodeTab] = useState<CodeSnippetTab>('curl');
  const [isExpanded, setIsExpanded] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [apiResult, setApiResult] = useState<FetchPsocResult | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [tokenSaved, setTokenSaved] = useState(false);
  const [cardSearchQuery, setCardSearchQuery] = useState('');

  // Construct current query params
  const currentQueryParams = useMemo<PsocQueryParams>(() => {
    const p: PsocQueryParams = {};
    if (token.trim()) p.token = token.trim();
    if (majorcode.trim()) p.majorcode = majorcode.trim();
    if (submajorcode.trim()) p.submajorcode = submajorcode.trim();
    if (minorcode.trim()) p.minorcode = minorcode.trim();
    if (unitcode.trim()) p.unitcode = unitcode.trim();
    if (page > 1) p.page = page;
    if (pageSize > 0) p.page_size = pageSize;
    return p;
  }, [token, majorcode, submajorcode, minorcode, unitcode, page, pageSize]);

  // Masked URL for safe screen display
  const maskedFullUrl = useMemo(() => {
    return buildPsocUrl(version, group, currentQueryParams, false, true);
  }, [version, group, currentQueryParams]);

  // Real URL for functional copying
  const realFullUrl = useMemo(() => {
    return buildPsocUrl(version, group, currentQueryParams, false, false);
  }, [version, group, currentQueryParams]);

  // Execute request
  const executeQuery = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const res = await fetchPsocData({
        version,
        group,
        params: currentQueryParams,
        token: token.trim(),
        forceRefresh,
      });
      setApiResult(res);
    } catch {
      // Handled inside service
    } finally {
      setIsLoading(false);
    }
  };

  // Run initial query on mount
  useEffect(() => {
    executeQuery(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Preset selection
  const handleApplyPreset = (preset: PresetOption) => {
    setActivePreset(preset.id);
    setGroup(preset.group);
    setMajorcode(preset.majorcode);
    setSubmajorcode(preset.submajorcode);
    setMinorcode(preset.minorcode);
    setUnitcode(preset.unitcode);
    setPageSize(preset.pageSize);
    setPage(1);
  };

  const handleSaveToken = () => {
    setStoredPsaToken(token);
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 2500);
  };

  const handleClearToken = () => {
    setToken('');
    setStoredPsaToken('');
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(identifier);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const downloadJson = () => {
    if (!apiResult?.rawResponse) return;
    const jsonStr = JSON.stringify(apiResult.rawResponse, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `psoc_${version}_${group}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter records in cards view
  const filteredCardRecords = useMemo(() => {
    if (!apiResult?.records) return [];
    if (!cardSearchQuery.trim()) return apiResult.records;
    const q = cardSearchQuery.toLowerCase();
    return apiResult.records.filter(r => {
      const titleMatch = r.title?.toLowerCase().includes(q);
      const descMatch = r.description?.toLowerCase().includes(q);
      const codeMatch =
        String(r.majorcode || '').includes(q) ||
        String(r.submajorcode || '').includes(q) ||
        String(r.unitcode || '').includes(q);
      const jobMatch = r.example_jobs?.some(j => j.toLowerCase().includes(q));
      return titleMatch || descMatch || codeMatch || jobMatch;
    });
  }, [apiResult, cardSearchQuery]);

  // Generate code snippets
  const codeSnippets = useMemo(() => {
    const tokenForCode = includeRealTokenInSnippets
      ? token.trim() || 'YOUR_PSA_API_TOKEN'
      : 'YOUR_PSA_API_TOKEN';

    const snippetParams: PsocQueryParams = {
      ...currentQueryParams,
      token: tokenForCode,
    };
    const snippetUrl = buildPsocUrl(
      version,
      group,
      snippetParams,
      false,
      false
    );

    return {
      curl: `curl -X GET "${snippetUrl}" \\\n  -H "Accept: application/json"`,
      javascript: `// Philippine Standard Occupational Classification (PSOC) API Client
async function getPsocData() {
  const url = "${snippetUrl}";
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log("PSOC Records:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch PSOC data:", error);
  }
}

getPsocData();`,
      python: `# Python 3 with 'requests' library
import requests

url = "${snippetUrl}"
headers = {
    "Accept": "application/json"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    data = response.json()
    print("Fetched", len(data), "PSOC occupational records")
    print(data)
except requests.exceptions.RequestException as e:
    print(f"Error fetching PSA PSOC data: {e}")`,
      postman: `// Postman Setup Guide:
1. Method: GET
2. URL: ${snippetUrl}
3. Headers:
   Key: Accept | Value: application/json
4. Send Request to view occupational taxonomy payload.`,
    };
  }, [version, group, currentQueryParams, token, includeRealTokenInSnippets]);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Console Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#002855] to-[#004b87] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/10 text-sky-100">
              PSOC {version} Standard
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              <span>National Labor Taxonomy</span>
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Philippine Standard Occupational Classification (PSOC) API Console
          </h3>
          <p className="text-xs text-sky-100/90 max-w-2xl leading-relaxed">
            Query official PSA occupational classifications across 10 Major
            Groups, 43 Sub-Major Groups, 130 Minor Groups, and 456 Unit Groups
            aligned with ISCO-08 international standards.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://psa.gov.ph/classification/psoc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-amber-300 transition-all shadow-sm"
          >
            <span>PSA PSOC Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20"
            title={isExpanded ? 'Collapse API console' : 'Expand API console'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-6">
          {/* Quick Presets Strip */}
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Query Presets:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleApplyPreset(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activePreset === p.id
                      ? 'bg-[#003893] border-[#003893] text-white shadow-xs'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{p.name}</span>
                  <span className="text-[10px] ml-1.5 opacity-75 font-normal">
                    ({p.badge})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
            {/* Version */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                Version
              </label>
              <select
                value={version}
                onChange={e => {
                  setVersion(e.target.value);
                  setActivePreset('custom');
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {PSA_PSOC_VERSIONS.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Occupational Group Level */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                Occupational Level (Group)
              </label>
              <select
                value={group}
                onChange={e => {
                  setGroup(e.target.value as PsocGroupLevel);
                  setActivePreset('custom');
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {PSA_PSOC_ENDPOINTS.map(ep => (
                  <option key={ep.group} value={ep.group}>
                    {ep.group} ({ep.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Hierarchical Code Filters */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                Code Filters (Major / Sub / Unit)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <input
                  type="text"
                  value={majorcode}
                  placeholder="Major (1)"
                  onChange={e => {
                    setMajorcode(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-center text-gray-900"
                  title="1-Digit Major Code (0-9)"
                />
                <input
                  type="text"
                  value={submajorcode}
                  placeholder="Sub (21)"
                  onChange={e => {
                    setSubmajorcode(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-center text-gray-900"
                  title="2-Digit Sub-Major Code"
                />
                <input
                  type="text"
                  value={unitcode}
                  placeholder="Unit (2512)"
                  onChange={e => {
                    setUnitcode(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-center text-gray-900"
                  title="4-Digit Unit Code"
                />
              </div>
            </div>

            {/* PSA Token & Security Features */}
            <div className="flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  PSA Token
                </label>
                {token && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Protected</span>
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={token}
                  placeholder="Enter PSA token (?token=...)"
                  onChange={e => setToken(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  title={showToken ? 'Hide token' : 'Show token'}
                >
                  {showToken ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Live Request Endpoint Bar with Masked Display & Safe Copy */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700 uppercase tracking-wider">
                  Live Generated REST URL (GET)
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium hidden sm:inline">
                  Token query parameter is safely masked on screen
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToken}
                  className="text-[11px] text-[#003893] hover:underline font-bold"
                >
                  {tokenSaved ? '✓ Token Saved' : 'Save Token Locally'}
                </button>
                {token && (
                  <button
                    onClick={handleClearToken}
                    className="text-[11px] text-rose-600 hover:underline"
                  >
                    Clear Token
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-slate-900 text-sky-400 rounded-2xl p-3 sm:px-4 border border-slate-800 shadow-inner">
              <code className="text-xs font-mono truncate select-all">
                GET {maskedFullUrl}
              </code>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => copyToClipboard(realFullUrl, 'real-url')}
                  className="px-2.5 py-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                  title="Copy working URL to clipboard"
                >
                  {copiedText === 'real-url' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy URL</span>
                </button>

                <button
                  onClick={() => executeQuery(true)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 disabled:opacity-50 transition-all shadow-md cursor-pointer"
                >
                  {isLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                  )}
                  <span>{isLoading ? 'Running...' : 'Run Query'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-tabs: Visual Cards, JSON Payload, Code Generator, Documentation */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between border-b border-gray-200 pb-2 gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveSubTab('cards')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSubTab === 'cards'
                      ? 'bg-[#003893] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    Visual Taxonomy (
                    {apiResult?.records ? apiResult.records.length : 0} items)
                  </span>
                </button>

                <button
                  onClick={() => setActiveSubTab('response')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSubTab === 'response'
                      ? 'bg-[#003893] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>JSON Payload</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('code')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSubTab === 'code'
                      ? 'bg-[#003893] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Snippets</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('docs')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSubTab === 'docs'
                      ? 'bg-[#003893] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>API Docs</span>
                </button>
              </div>

              {/* Status & Latency Badges */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    apiResult?.statusCode === 200
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Status: {apiResult?.statusCode || 200}
                </span>
                <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                  {apiResult?.latencyMs ?? 0}ms
                </span>
              </div>
            </div>

            {/* Sub-tab 1: Visual Taxonomy Cards View */}
            {activeSubTab === 'cards' && (
              <div className="space-y-4">
                {/* Search / Filter within current result set */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter current results by title, keyword, or job role (e.g. Engineer, Driver, Manager)..."
                      value={cardSearchQuery}
                      onChange={e => setCardSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="text-[11px] text-gray-500 self-center whitespace-nowrap font-medium">
                    Showing {filteredCardRecords.length} of{' '}
                    {apiResult?.records.length || 0} classifications
                  </div>
                </div>

                {/* Grid of Occupational Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCardRecords.map(item => {
                    const code =
                      item.unitcode ||
                      item.minorcode ||
                      item.submajorcode ||
                      item.majorcode;
                    const level =
                      item.hierarchy_level ||
                      (item.unitcode
                        ? 'Unit'
                        : item.minorcode
                          ? 'Minor'
                          : item.submajorcode
                            ? 'Sub-Major'
                            : 'Major');

                    return (
                      <div
                        key={`${item.id}-${code}`}
                        className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#003893] text-white">
                                Code: {code}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                                {level} Group
                              </span>
                            </div>
                            {item.skill_level && (
                              <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                ISCO Level: {item.skill_level}
                              </span>
                            )}
                          </div>

                          <h4 className="text-base font-extrabold text-gray-900 mb-2 leading-snug">
                            {item.title}
                          </h4>

                          <p className="text-xs text-gray-600 leading-relaxed mb-3">
                            {item.description}
                          </p>

                          {/* Example Job Roles */}
                          {item.example_jobs &&
                            item.example_jobs.length > 0 && (
                              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-amber-500" />
                                  <span>Representative Occupations:</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {item.example_jobs.map(job => (
                                    <span
                                      key={job}
                                      className="px-2 py-0.5 bg-white border border-gray-200 text-gray-700 rounded-md text-[11px] font-medium"
                                    >
                                      {job}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Tasks bullet list if available */}
                          {item.tasks && item.tasks.length > 0 && (
                            <div className="space-y-1 mb-3">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                Key Occupational Tasks:
                              </div>
                              <ul className="text-[11px] text-gray-600 list-disc list-inside space-y-0.5">
                                {item.tasks.map((task, i) => (
                                  <li key={i}>{task}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                          <span>PSOC Version {item.version || version}</span>
                          <span>ID: {item.id}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sub-tab 2: JSON Response Payload */}
            {activeSubTab === 'response' && (
              <div className="bg-slate-950 text-sky-400 font-mono text-xs rounded-2xl p-4 relative overflow-hidden shadow-inner max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>
                    Payload Source:{' '}
                    <strong className="text-slate-200">
                      {apiResult?.source === 'live_api'
                        ? 'PSA Remote REST API'
                        : apiResult?.source === 'cached'
                          ? 'Local Cache'
                          : 'Authoritative PSOC Verified Baseline'}
                    </strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(
                            apiResult?.rawResponse || apiResult?.records,
                            null,
                            2
                          ),
                          'json-payload'
                        )
                      }
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] flex items-center gap-1 font-sans font-bold"
                    >
                      {copiedText === 'json-payload' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy JSON</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadJson}
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg"
                      title="Download JSON file"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <pre className="leading-relaxed whitespace-pre text-[11px]">
                  {JSON.stringify(
                    apiResult?.rawResponse || apiResult?.records,
                    null,
                    2
                  )}
                </pre>
              </div>
            )}

            {/* Sub-tab 3: Code Generator */}
            {activeSubTab === 'code' && (
              <div className="bg-slate-950 text-slate-100 rounded-2xl p-4 relative overflow-hidden shadow-inner">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-3 border-b border-slate-800 pb-3 gap-2">
                  <div className="flex items-center gap-1">
                    {(
                      [
                        'curl',
                        'javascript',
                        'python',
                        'postman',
                      ] as CodeSnippetTab[]
                    ).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setCodeTab(tab)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors capitalize ${
                          codeTab === tab
                            ? 'bg-[#003893] text-white'
                            : 'text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {tab === 'curl'
                          ? 'cURL'
                          : tab === 'javascript'
                            ? 'JavaScript'
                            : tab === 'python'
                              ? 'Python'
                              : 'Postman'}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeRealTokenInSnippets}
                        onChange={e =>
                          setIncludeRealTokenInSnippets(e.target.checked)
                        }
                        className="rounded border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <span>Include real token in snippet</span>
                    </label>

                    <button
                      onClick={() =>
                        copyToClipboard(
                          codeSnippets[codeTab],
                          `code-${codeTab}`
                        )
                      }
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-bold inline-flex items-center gap-1"
                    >
                      {copiedText === `code-${codeTab}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="font-mono text-xs text-sky-200 leading-relaxed overflow-x-auto whitespace-pre p-1">
                  {codeSnippets[codeTab]}
                </pre>
              </div>
            )}

            {/* Sub-tab 4: Documentation & Hierarchy Specification */}
            {activeSubTab === 'docs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-[#003893]" />
                      <span>PSOC Endpoints Structure</span>
                    </h4>
                    <div className="space-y-1.5 text-[11px] text-gray-600">
                      {PSA_PSOC_ENDPOINTS.map(ep => (
                        <div
                          key={ep.group}
                          className="flex justify-between py-1 border-b border-gray-100"
                        >
                          <span className="font-semibold text-gray-800">
                            {ep.title}
                          </span>
                          <code className="font-mono text-[10px] text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                            /{ep.group}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-600" />
                      <span>Hierarchy &amp; Parameter Rules</span>
                    </h4>
                    <div className="space-y-1 text-[11px] text-gray-600">
                      <div>
                        <strong>1-Digit (Major):</strong> 10 broad occupational
                        aggregates.
                      </div>
                      <div>
                        <strong>2-Digit (Sub-Major):</strong> 43 sub-major
                        occupational categories.
                      </div>
                      <div>
                        <strong>3-Digit (Minor):</strong> 130 occupational
                        groups.
                      </div>
                      <div>
                        <strong>4-Digit (Unit):</strong> 456 specific
                        occupational titles.
                      </div>
                      <div className="pt-2">
                        <a
                          href="https://psa.gov.ph/classifications-api/request-access-form"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#003893] hover:underline font-bold inline-flex items-center gap-1"
                        >
                          <span>Request Official PSA API Token</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 10 Major Groups Summary Matrix */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-gray-900 text-sm mb-3">
                    PSOC 2012: The 10 Major Occupational Groups Matrix
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                    {PSA_PSOC_MAJOR_SUMMARIES.map(item => (
                      <div
                        key={item.code}
                        className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-xs bg-[#003893] text-white px-2 py-0.5 rounded">
                            Major {item.code}
                          </span>
                          <span className="text-[10px] text-gray-500 font-medium">
                            {item.unitCount} Unit Groups
                          </span>
                        </div>
                        <div className="font-bold text-gray-900 text-xs truncate">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-gray-500 line-clamp-2">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
