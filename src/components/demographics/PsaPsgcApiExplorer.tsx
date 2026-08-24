import { useState, useEffect, useMemo } from 'react';
import { PsgcLevel, PsgcVersion, PsgcQueryParams } from '../../types/psgc';
import {
  PSA_PSGC_VERSIONS,
  PSA_PSGC_ENDPOINTS,
  fetchPsgcData,
  buildPsgcUrl,
  getStoredPsaToken,
  setStoredPsaToken,
  FetchPsgcResult,
} from '../../services/psgc';
import {
  Play,
  Copy,
  Check,
  ExternalLink,
  Code2,
  FileJson,
  Database,
  Terminal,
  Download,
  Info,
  RefreshCw,
  Zap,
  BookOpen,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

type ConsoleSubTab = 'response' | 'code' | 'docs';
type CodeSnippetTab = 'curl' | 'javascript' | 'python' | 'postman';

interface PresetOption {
  id: string;
  name: string;
  badge: string;
  level: PsgcLevel;
  reg: string;
  prv: string;
  mun: string;
  bgy: string;
  pageSize: number;
}

const PRESETS: PresetOption[] = [
  {
    id: 'trece-barangays',
    name: 'Trece Martires 13 Barangays',
    badge: 'Mun: 22 (Barangays)',
    level: 'barangays',
    reg: '04',
    prv: '21',
    mun: '22',
    bgy: '',
    pageSize: 50,
  },
  {
    id: 'cavite-municipalities',
    name: 'Cavite Province LGUs',
    badge: 'Prv: 21 (Cities/Mun)',
    level: 'municipalities',
    reg: '04',
    prv: '21',
    mun: '',
    bgy: '',
    pageSize: 50,
  },
  {
    id: 'region-4a',
    name: 'Region IV-A (CALABARZON)',
    badge: 'Reg: 04 (Regional)',
    level: 'regions',
    reg: '04',
    prv: '',
    mun: '',
    bgy: '',
    pageSize: 20,
  },
  {
    id: 'income-class',
    name: 'Income Classification',
    badge: 'BLGF / PSA Class',
    level: 'income_classification',
    reg: '04',
    prv: '21',
    mun: '22',
    bgy: '',
    pageSize: 50,
  },
  {
    id: 'urban-rural',
    name: 'Urban / Rural Class',
    badge: 'Zone Demographics',
    level: 'urban_rural',
    reg: '04',
    prv: '21',
    mun: '22',
    bgy: '',
    pageSize: 50,
  },
];

export default function PsaPsgcApiExplorer() {
  const [version, setVersion] = useState<PsgcVersion>('Q2_2024');
  const [level, setLevel] = useState<PsgcLevel>('barangays');
  const [reg, setReg] = useState('04');
  const [prv, setPrv] = useState('21');
  const [mun, setMun] = useState('22');
  const [bgy, setBgy] = useState('');
  const [pageSize, setPageSize] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('trece-barangays');

  const [activeSubTab, setActiveSubTab] = useState<ConsoleSubTab>('response');
  const [codeTab, setCodeTab] = useState<CodeSnippetTab>('curl');
  const [isExpanded, setIsExpanded] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [apiResult, setApiResult] = useState<FetchPsgcResult | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [tokenSaved, setTokenSaved] = useState(false);

  // Load saved token on mount
  useEffect(() => {
    const saved = getStoredPsaToken();
    if (saved) {
      setToken(saved);
    }
  }, []);

  // Construct current query params
  const currentQueryParams = useMemo<PsgcQueryParams>(() => {
    const p: PsgcQueryParams = {};
    if (token.trim()) p.token = token.trim();
    if (reg.trim()) p.reg = reg.trim();
    if (prv.trim()) p.prv = prv.trim();
    if (mun.trim()) p.mun = mun.trim();
    if (bgy.trim()) p.bgy = bgy.trim();
    if (page > 1) p.page = page;
    if (pageSize > 0) p.page_size = pageSize;
    return p;
  }, [token, reg, prv, mun, bgy, page, pageSize]);

  // Full URL for display
  const currentFullUrl = useMemo(() => {
    return buildPsgcUrl(version, level, currentQueryParams, false);
  }, [version, level, currentQueryParams]);

  // Execute request
  const executeQuery = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const res = await fetchPsgcData({
        version,
        level,
        params: currentQueryParams,
        token: token.trim(),
        forceRefresh,
      });
      setApiResult(res);
    } catch {
      // Error handled inside service
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
    setLevel(preset.level);
    setReg(preset.reg);
    setPrv(preset.prv);
    setMun(preset.mun);
    setBgy(preset.bgy);
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
    a.download = `psgc_${version}_${level}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate code snippets
  const codeSnippets = useMemo(() => {
    const tokenPlaceholder = token ? token : 'YOUR_PSA_TOKEN';
    const displayParams: PsgcQueryParams = {
      ...currentQueryParams,
      token: tokenPlaceholder,
    };
    const curlUrl = buildPsgcUrl(version, level, displayParams, false);

    return {
      curl: `curl -X GET "${curlUrl}" \\\n  -H "Accept: application/json"`,
      javascript: `// PSA Standard Geographic Code (PSGC) API Client
async function getPsgcData() {
  const url = "${curlUrl}";
  
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
    console.log("PSGC Records:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch PSGC data:", error);
  }
}

getPsgcData();`,
      python: `# Python 3 with 'requests' library
import requests

url = "${curlUrl}"
headers = {
    "Accept": "application/json"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    data = response.json()
    print("Fetched", len(data), "PSGC records")
    print(data)
except requests.exceptions.RequestException as e:
    print(f"Error fetching PSA PSGC data: {e}")`,
      postman: `// Postman Quick Setup:
1. Method: GET
2. URL: ${curlUrl}
3. Headers:
   Key: Accept | Value: application/json
4. Send Request to view JSON payload.`,
    };
  }, [version, level, currentQueryParams, token]);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
      {/* Console Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 inline-flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Official PSA REST API</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/10 text-blue-100">
              v{version}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Geographic Service
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Philippine Standard Geographic Code (PSGC) API Console
          </h3>
          <p className="text-xs text-blue-100/90 max-w-2xl leading-relaxed">
            Query official PSA geographic reference data, administrative levels,
            urban/rural tags, and census populations across standard PSGC
            versions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://classification.psa.gov.ph/psgc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-amber-300 transition-all shadow-sm"
          >
            <span>PSA Portal</span>
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
                {PSA_PSGC_VERSIONS.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Geographic Level */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                Geographic Level
              </label>
              <select
                value={level}
                onChange={e => {
                  setLevel(e.target.value as PsgcLevel);
                  setActivePreset('custom');
                }}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {PSA_PSGC_ENDPOINTS.map(ep => (
                  <option key={ep.level} value={ep.level}>
                    {ep.level} ({ep.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Region / Province / Mun Codes */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                Location Codes (Reg / Prv / Mun)
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <input
                  type="text"
                  value={reg}
                  placeholder="04"
                  onChange={e => {
                    setReg(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-center text-gray-900"
                  title="Region Code"
                />
                <input
                  type="text"
                  value={prv}
                  placeholder="21"
                  onChange={e => {
                    setPrv(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-center text-gray-900"
                  title="Province Code"
                />
                <input
                  type="text"
                  value={mun}
                  placeholder="22"
                  onChange={e => {
                    setMun(e.target.value);
                    setActivePreset('custom');
                  }}
                  className="w-full px-2 py-2 bg-white border border-gray-300 rounded-xl text-xs font-mono font-bold text-center text-gray-900"
                  title="Municipality/City Code"
                />
              </div>
            </div>

            {/* Optional Token & Execute */}
            <div className="flex flex-col justify-between">
              <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                PSA Token (Optional)
              </label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={token}
                  placeholder="Enter token (?token=...)"
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

          {/* Live Request Endpoint Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-700 uppercase tracking-wider">
                Live Generated REST URL (GET)
              </span>
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

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-slate-900 text-emerald-400 rounded-2xl p-3 sm:px-4 border border-slate-800 shadow-inner">
              <code className="text-xs font-mono truncate select-all">
                GET {currentFullUrl}
              </code>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  onClick={() => copyToClipboard(currentFullUrl, 'url')}
                  className="px-2.5 py-1.5 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                  title="Copy URL"
                >
                  {copiedText === 'url' ? (
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

          {/* Sub-tabs: JSON Response, Code Snippets, Documentation */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveSubTab('response')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeSubTab === 'response'
                      ? 'bg-[#003893] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileJson className="w-3.5 h-3.5" />
                  <span>
                    JSON Payload ({apiResult?.records.length ?? 0} records)
                  </span>
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
                  <span>API Specification</span>
                </button>
              </div>

              {/* Status and Latency Indicators */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
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

            {/* Sub-tab 1: JSON Response Payload */}
            {activeSubTab === 'response' && (
              <div className="bg-slate-950 text-emerald-400 font-mono text-xs rounded-2xl p-4 relative overflow-hidden shadow-inner max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>
                    Payload Source:{' '}
                    <strong className="text-slate-200">
                      {apiResult?.source === 'live_api'
                        ? 'PSA Remote REST API'
                        : apiResult?.source === 'cached'
                          ? 'Local Cache'
                          : 'Authoritative Verified Baseline'}
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

            {/* Sub-tab 2: Code Generator */}
            {activeSubTab === 'code' && (
              <div className="bg-slate-950 text-slate-100 rounded-2xl p-4 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
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

                  <button
                    onClick={() =>
                      copyToClipboard(codeSnippets[codeTab], `code-${codeTab}`)
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
                <pre className="font-mono text-xs text-blue-200 leading-relaxed overflow-x-auto whitespace-pre p-1">
                  {codeSnippets[codeTab]}
                </pre>
              </div>
            )}

            {/* Sub-tab 3: Documentation & Specification */}
            {activeSubTab === 'docs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-[#003893]" />
                    <span>Endpoints Reference</span>
                  </h4>
                  <div className="space-y-1.5 text-[11px] text-gray-600">
                    {PSA_PSGC_ENDPOINTS.slice(0, 5).map(ep => (
                      <div
                        key={ep.level}
                        className="flex justify-between py-1 border-b border-gray-100"
                      >
                        <span className="font-semibold text-gray-800">
                          {ep.title}
                        </span>
                        <code className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                          /{ep.level}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>Parameters &amp; Auth</span>
                  </h4>
                  <div className="space-y-1 text-[11px] text-gray-600">
                    <div>
                      <strong>token:</strong> Access token from PSA request
                      access form.
                    </div>
                    <div>
                      <strong>reg / prv / mun / bgy:</strong> Hierarchical code
                      filters.
                    </div>
                    <div>
                      <strong>page &amp; page_size:</strong> Pagination
                      (default: 50, max: 1000).
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
