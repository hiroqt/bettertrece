import { useState, useEffect } from 'react';
import { DpwhProject } from '../../data/dpwhTransparency';
import {
  X,
  Copy,
  Check,
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react';

interface DpwhProjectModalProps {
  project: DpwhProject | null;
  onClose: () => void;
}

export default function DpwhProjectModal({
  project,
  onClose,
}: DpwhProjectModalProps) {
  const [copiedContract, setCopiedContract] = useState(false);

  // Close on Escape key press for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const copyContractId = () => {
    navigator.clipboard.writeText(project.contractId);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const formatPHP = (val: number) => {
    return `₱${val.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('complete')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
          <CheckCircle2
            className="w-3.5 h-3.5 text-emerald-700"
            aria-hidden="true"
          />
          <span>Completed</span>
        </span>
      );
    }
    if (s.includes('on-going') || s.includes('ongoing')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
          <AlertCircle
            className="w-3.5 h-3.5 text-amber-700 animate-pulse"
            aria-hidden="true"
          />
          <span>On-Going ({project.progress}%)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-900 border border-red-300">
        <XCircle className="w-3.5 h-3.5 text-red-700" aria-hidden="true" />
        <span>{status}</span>
      </span>
    );
  };

  const googleMapsUrl =
    project.latitude && project.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${project.latitude},${project.longitude}`
      : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#00225e] to-[#003893] text-white p-6 sm:p-7 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/15 text-blue-100 border border-white/20">
              Contract #{project.contractId}
            </span>
            <button
              onClick={copyContractId}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-400/15 hover:bg-amber-400/25 px-2.5 py-1 rounded-lg transition-colors border border-amber-400/30 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-300 min-h-[32px]"
            >
              {copiedContract ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-xs">
              Brgy. {project.location.barangay}
            </span>
          </div>

          <h2
            id="modal-project-title"
            className="text-xl sm:text-2xl font-black text-white leading-snug pr-8"
          >
            {project.description}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-blue-100 font-medium">
            <div className="flex items-center gap-1.5">
              <Building2
                className="w-4 h-4 text-amber-300"
                aria-hidden="true"
              />
              <span>{project.category}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-300" aria-hidden="true" />
              <span>
                Barangay {project.location.barangay}, Trece Martires City
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow text-gray-800">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Approved Budget
              </span>
              <span className="text-xl font-black text-gray-900 font-mono">
                {formatPHP(project.budget)}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Status &amp; Progress
              </span>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(project.status)}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                Fiscal Year (GAA)
              </span>
              <span className="text-xl font-black text-gray-900 font-mono">
                {project.infraYear}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <div className="flex justify-between text-xs font-bold text-gray-700">
              <span>Physical Completion Status</span>
              <span className="font-mono text-gray-900 font-bold">
                {project.progress}%
              </span>
            </div>
            <div
              className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
              role="progressbar"
              aria-valuenow={project.progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Physical completion: ${project.progress}%`}
            >
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  project.progress === 100
                    ? 'bg-emerald-500'
                    : project.progress > 50
                      ? 'bg-blue-600'
                      : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, project.progress)}%` }}
              />
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-2">
              Contract &amp; Funding Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-semibold text-gray-600 block">
                  Contractor / Builder
                </span>
                <p className="font-bold text-gray-900 mt-0.5">
                  {project.contractor ||
                    'DPWH Cavite 1st District Engineering Administration'}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-600 block">
                  Fund Source / GAA Program
                </span>
                <p className="font-medium text-gray-800 mt-0.5">
                  {project.sourceOfFunds || project.programName}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-600 block">
                  Project Timeline
                </span>
                <p className="font-medium text-gray-800 mt-0.5 flex items-center gap-1.5">
                  <Calendar
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                  />
                  <span>
                    {project.startDate || 'TBD'} to{' '}
                    {project.completionDate || 'Ongoing'}
                  </span>
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-600 block">
                  Sub-Component Categories
                </span>
                <p className="font-medium text-gray-800 mt-0.5">
                  {project.componentCategories || project.category}
                </p>
              </div>
            </div>
          </div>

          {/* Location & GPS Mapping */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-900 border-b border-gray-200 pb-2">
              Location &amp; Geolocation
            </h3>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="w-4 h-4 text-[#003893]"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold text-gray-800">
                    Barangay {project.location.barangay}, Trece Martires City
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  <span>
                    Coordinates: {project.latitude ?? 'N/A'},{' '}
                    {project.longitude ?? 'N/A'}
                  </span>
                </div>
              </div>

              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#003893] hover:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#003893] min-h-[44px]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <span className="text-xs text-gray-600 font-medium">
            DPWH Cavite 1st District Engineering Office Registry
          </span>

          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-600 min-h-[40px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
