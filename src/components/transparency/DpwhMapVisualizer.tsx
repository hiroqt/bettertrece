import { useState, useMemo } from 'react';
import type { DpwhProject } from '../../data/transparency/dpwhTransparency';
import type { DPWHProject } from '../../types/dpwh';
import {
  MapPin,
  ExternalLink,
  Layers,
  Search,
  Navigation,
  CheckCircle2,
  HardHat,
  Eye,
  SlidersHorizontal,
  Compass,
} from 'lucide-react';

type AnyProject = DpwhProject | DPWHProject;

interface DpwhMapVisualizerProps {
  projects: AnyProject[];
  onSelectProject?: (project: AnyProject) => void;
}

export default function DpwhMapVisualizer({
  projects,
  onSelectProject,
}: DpwhMapVisualizerProps) {
  // Default to first project with coordinates or Trece center
  const [selectedProject, setSelectedProject] = useState<AnyProject | null>(
    () => projects.find(p => p.latitude && p.longitude) || projects[0] || null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBarangay, setSelectedBarangay] = useState<string>('All');

  // Filter projects with coordinates
  const geoProjects = useMemo(() => {
    return projects.filter(p => {
      if (!p.latitude || !p.longitude) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory)
        return false;
      const brgy = p.location?.barangay || '';
      if (selectedBarangay !== 'All' && brgy !== selectedBarangay) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.contractId.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          brgy.toLowerCase().includes(q) ||
          p.contractor.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [projects, selectedCategory, selectedBarangay, searchQuery]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  const barangays = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => {
      const b = p.location?.barangay;
      if (b) set.add(b);
    });
    return ['All', ...Array.from(set).sort()];
  }, [projects]);

  // Generate OpenStreetMap embed URL centered around selected project or Trece Martires City
  const mapUrl = useMemo(() => {
    const lat = selectedProject?.latitude || 14.2811;
    const lon = selectedProject?.longitude || 120.8672;
    const delta = 0.018; // Zoom level bounding box delta

    const minLon = (lon - delta).toFixed(5);
    const minLat = (lat - delta * 0.7).toFixed(5);
    const maxLon = (lon + delta).toFixed(5);
    const maxLat = (lat + delta * 0.7).toFixed(5);

    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lon}`;
  }, [selectedProject]);

  const googleMapsUrl = useMemo(() => {
    if (!selectedProject?.latitude || !selectedProject?.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=Trece+Martires+City+Cavite`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${selectedProject.latitude},${selectedProject.longitude}`;
  }, [selectedProject]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Map Header & Controls */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                Live Map View
              </span>
              <span className="text-xs font-semibold text-gray-500">
                {geoProjects.length} Mapped Projects
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Trece Martires Public Works Map
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Explore public works locations across Trece Martires City on the
              interactive street map.
            </p>
          </div>

          {selectedProject && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs shrink-0 self-start md:self-auto"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions in Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search project or contractor..."
              className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedBarangay}
              onChange={e => setSelectedBarangay(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All 13 Barangays</option>
              {barangays
                .filter(b => b !== 'All')
                .map(b => (
                  <option key={b} value={b}>
                    Brgy. {b}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              {categories
                .filter(c => c !== 'All')
                .map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Map & Project List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real OpenStreetMap Interactive Embed */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[520px] sm:h-[580px]">
          {/* Active Project Location Bar */}
          {selectedProject && (
            <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between gap-3 text-xs border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-white truncate">
                  {selectedProject.location?.barangay || 'Trece Martires City'}:{' '}
                  <span className="text-slate-300 font-normal">
                    {selectedProject.description}
                  </span>
                </span>
              </div>
              <span className="font-mono text-blue-300 shrink-0 hidden sm:inline">
                {selectedProject.latitude?.toFixed(4)}°N,{' '}
                {selectedProject.longitude?.toFixed(4)}°E
              </span>
            </div>
          )}

          {/* Interactive Map Iframe */}
          <div className="relative flex-grow w-full h-full bg-slate-100">
            <iframe
              title="Trece Martires City Public Works Map"
              src={mapUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Map Footer Helper */}
          <div className="bg-slate-50 px-4 py-2.5 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500 shrink-0">
            <span>Center: Trece Martires City, Cavite (Region IV-A)</span>
            <span>Map data © OpenStreetMap contributors</span>
          </div>
        </div>

        {/* Mapped Project List Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-5 flex flex-col h-[520px] sm:h-[580px]">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3 shrink-0">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Select Location to Pin
              </h4>
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {geoProjects.length} Projects
            </span>
          </div>

          {/* Scrollable list of projects */}
          <div className="overflow-y-auto space-y-2.5 flex-grow pr-1 custom-scrollbar">
            {geoProjects.length === 0 ? (
              <div className="py-12 text-center text-xs text-gray-500 space-y-2">
                <SlidersHorizontal className="w-6 h-6 text-gray-400 mx-auto" />
                <p>No projects match your filter selection.</p>
              </div>
            ) : (
              geoProjects.map(p => {
                const isSelected = selectedProject?.contractId === p.contractId;
                const isCompleted = p.status.toLowerCase().includes('complete');

                return (
                  <div
                    key={p.contractId}
                    onClick={() => setSelectedProject(p)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-2 ring-blue-500/20'
                        : 'bg-white hover:bg-slate-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-md">
                        {p.contractId}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <HardHat className="w-3 h-3 text-amber-600" />
                            {p.progress}%
                          </span>
                        )}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
                      {p.description}
                    </h5>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1 font-semibold text-blue-900">
                        <MapPin className="w-3 h-3 text-blue-500" />
                        Brgy. {p.location?.barangay || 'Trece'}
                      </span>
                      <span className="font-black text-gray-900">
                        ₱
                        {p.budget.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>

                    {isSelected && onSelectProject && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectProject(p);
                        }}
                        className="w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Project Details</span>
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
