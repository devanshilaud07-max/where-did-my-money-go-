import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface PocketMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBudget: number;
  onSaveBudget: (newBudget: number) => void;
}

export const PocketMoneyModal: React.FC<PocketMoneyModalProps> = ({
  isOpen,
  onClose,
  currentBudget,
  onSaveBudget,
}) => {
  const [budgetInput, setBudgetInput] = useState(currentBudget.toString());
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const presets = [
    { label: 'Hostel Allowance', amount: 3000 },
    { label: 'Standard College', amount: 5000 },
    { label: 'City Commuter', amount: 8000 },
    { label: 'Full Semester', amount: 12000 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(budgetInput);
    if (isNaN(val) || val < 0) {
      setError('Pocket money budget must be a positive rupee number (₹0 or more).');
      return;
    }
    onSaveBudget(val);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#382526]/60 backdrop-blur-xs">
      <div className="bg-[#FFF8EB] border-2 border-[#382526] rounded-2xl max-w-md w-full p-6 sm:p-7 polaroid-shadow-lg relative animate-in fade-in duration-200">
        
        {/* Top Decorative Pin & Washi Tape */}
        <div className="washi-tape -top-2.5 left-10 rotate-[-2deg]" />
        <div className="absolute -top-3 right-8 text-xl">📌</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-[#382526] hover:bg-[#F8F0C9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4 text-center sm:text-left">
          <span className="font-typewriter text-[10px] uppercase tracking-widest text-[#382526]/70 block mb-0.5">
            Pocket Money Settings &bull; Pinned Note
          </span>
          <h3 className="font-script text-3xl sm:text-4xl text-[#382526] leading-none">
            Monthly Pocket Money
          </h3>
          <p className="font-typewriter text-xs text-[#382526]/75 mt-1">
            Set your budget to automatically recalculate remaining balance
          </p>
        </div>

        {/* Suggested Presets */}
        <div className="mb-5">
          <label className="block font-typewriter text-xs uppercase font-bold text-[#382526] mb-2">
            Suggested Presets:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.amount}
                type="button"
                onClick={() => {
                  setBudgetInput(preset.amount.toString());
                  setError(null);
                }}
                className={`p-2.5 rounded-xl border text-left font-typewriter text-xs transition-all ${
                  parseFloat(budgetInput) === preset.amount
                    ? 'bg-[#E8B4BC] border-[#382526] text-[#382526] font-bold shadow-xs'
                    : 'bg-[#F8F0C9] border-[#B7A59A] text-[#382526] hover:bg-[#FFF8EB]'
                }`}
              >
                <div className="text-[11px]">{preset.label}</div>
                <div className="font-serif-vintage text-base font-bold text-[#382526]">
                  ₹{preset.amount.toLocaleString('en-IN')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pinned-budget-input" className="block font-typewriter text-xs uppercase font-bold text-[#382526] mb-1">
              Custom Monthly Budget (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-serif font-bold text-base text-[#382526]">
                ₹
              </span>
              <input
                id="pinned-budget-input"
                type="number"
                min="0"
                step="100"
                value={budgetInput}
                onChange={(e) => {
                  setBudgetInput(e.target.value);
                  setError(null);
                }}
                className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-[#FFF8EB] border-2 border-[#382526]/40 text-[#382526] font-typewriter font-bold text-base focus:outline-none focus:border-[#D99BAA] focus:ring-2 focus:ring-[#E8B4BC]/40"
                placeholder="5000"
                required
              />
            </div>
            {error && (
              <p className="font-typewriter text-xs text-[#8E2820] mt-1.5 font-bold">
                ⚠️ {error}
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-typewriter text-xs rounded-full bg-[#F8F0C9] hover:bg-[#EFEAE2] text-[#382526] border border-[#B7A59A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-typewriter text-xs font-bold rounded-full bg-[#E8B4BC] hover:bg-[#D99BAA] text-[#382526] border border-[#382526]/30 shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Budget Note</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
