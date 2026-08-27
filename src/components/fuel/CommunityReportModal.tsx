import React, { useState } from 'react';
import {
  TRECE_GAS_STATIONS,
  type GasStation,
} from '../../data/fuel/fuelStationsData';
import {
  saveCommunityReport,
  type CommunityFuelReport,
} from '../../data/fuel/communityReports';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Send,
  Users,
  ShieldCheck,
} from 'lucide-react';

interface CommunityReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStation?: GasStation | null;
  onReportSubmitted?: (report: CommunityFuelReport) => void;
}

export default function CommunityReportModal({
  isOpen,
  onClose,
  initialStation,
  onReportSubmitted,
}: CommunityReportModalProps) {
  const [selectedStationId, setSelectedStationId] = useState<string>(
    initialStation
      ? String(initialStation.id)
      : String(TRECE_GAS_STATIONS[0].id)
  );
  const [fuelType, setFuelType] = useState<
    'diesel' | 'ron91' | 'ron95' | 'kerosene'
  >('diesel');
  const [reportedPrice, setReportedPrice] = useState<string>('');
  const [reportedBy, setReportedBy] = useState<string>('Commuter / Driver');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentStation =
    TRECE_GAS_STATIONS.find(s => String(s.id) === selectedStationId) ||
    TRECE_GAS_STATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(reportedPrice);
    if (isNaN(priceNum) || priceNum <= 0 || priceNum > 250) {
      setErrorMsg(
        'Please enter a valid pump price between ₱40.00 and ₱200.00 per liter.'
      );
      return;
    }

    const fuelNameMap = {
      diesel: 'Automotive Diesel (ADO)',
      ron91: 'Unleaded Gasoline (RON 91)',
      ron95: 'Premium Gasoline (RON 95)',
      kerosene: 'Household Kerosene (Gaas)',
    };

    const newReport = saveCommunityReport({
      stationId: String(currentStation.id),
      stationName: currentStation.name,
      brand: currentStation.brand,
      fuelType,
      fuelName: fuelNameMap[fuelType],
      reportedPrice: priceNum,
      reportedBy: reportedBy.trim() || 'Citizen Contributor',
      notes: notes.trim() || undefined,
    });

    setIsSuccess(true);
    if (onReportSubmitted) {
      onReportSubmitted(newReport);
    }

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Thank you for reporting!
            </h3>
            <p className="text-sm text-slate-600 max-w-xs mx-auto">
              Your pump price update has been added to the community database
              for Trece Martires City.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#003893] border border-blue-200 mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Community Price Tracker</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Report Station Pump Price
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Help fellow Treceños find accurate and verified pump prices in
                Trece Martires City.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Station Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Gas Station in Trece
              </label>
              <select
                value={selectedStationId}
                onChange={e => setSelectedStationId(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold text-slate-800 focus:bg-white focus:border-[#003893] focus:ring-2 focus:ring-[#003893]/15"
              >
                {TRECE_GAS_STATIONS.map(station => (
                  <option key={station.id} value={String(station.id)}>
                    {station.name} ({station.brand} • {station.corridor})
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type Tabs */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Fuel Product
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'diesel', label: 'Diesel', color: 'text-amber-700' },
                  { id: 'ron91', label: 'Unleaded 91', color: 'text-sky-700' },
                  { id: 'ron95', label: 'Premium 95', color: 'text-rose-700' },
                  {
                    id: 'kerosene',
                    label: 'Kerosene',
                    color: 'text-purple-700',
                  },
                ].map(item => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setFuelType(
                        item.id as 'diesel' | 'ron91' | 'ron95' | 'kerosene'
                      )
                    }
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      fuelType === item.id
                        ? 'bg-[#003893] text-white border-[#003893] shadow-xs ring-2 ring-[#003893]/20'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actual Pump Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Actual Pump Price (₱ per Liter)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold font-mono">
                  ₱
                </span>
                <input
                  type="number"
                  step="0.05"
                  required
                  placeholder="e.g. 71.90"
                  value={reportedPrice}
                  onChange={e => {
                    setReportedPrice(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold font-mono text-slate-900 focus:bg-white focus:border-[#003893] focus:ring-2 focus:ring-[#003893]/15"
                />
              </div>
            </div>

            {/* Reporter Alias & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Role / Alias (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tricycle Driver, Commuter"
                  value={reportedBy}
                  onChange={e => setReportedBy(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white focus:border-[#003893]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Station Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. GCash discount / LED board"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:bg-white focus:border-[#003893]"
                />
              </div>
            </div>

            {/* Disclaimer in Modal */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Community reports help verify actual pump prices in Trece
                Martires against official DOE weekly monitoring records.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#003893] hover:bg-blue-800 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Price Update</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
