import React from 'react';

interface HeaderProps {
  onOpenBudgetModal: () => void;
  pocketMoney: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBudgetModal,
  pocketMoney,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#382526] text-[#FFF8EB] border-b-2 border-[#D99BAA]/30 shadow-md">
      
      {/* Top tiny decorative scalloped accent ribbon */}
      <div className="h-1 bg-gradient-to-r from-[#E8B4BC] via-[#FFF8EB] to-[#D99BAA] opacity-90" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FFF8EB]/15 flex items-center justify-center shadow-xs border border-[#E8B4BC]/40 shrink-0 transition-transform hover:scale-105 hover:rotate-12">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Soft Pink Petals */}
              <circle cx="12" cy="6.8" r="3.5" fill="#E8B4BC" />
              <circle cx="16.8" cy="10.2" r="3.5" fill="#D99BAA" />
              <circle cx="15" cy="16" r="3.5" fill="#E8B4BC" />
              <circle cx="9" cy="16" r="3.5" fill="#D99BAA" />
              <circle cx="7.2" cy="10.2" r="3.5" fill="#E8B4BC" />
              {/* Petal Inner Highlights */}
              <circle cx="12" cy="7.5" r="1.5" fill="#FFF8EB" opacity="0.6" />
              <circle cx="15.8" cy="10.8" r="1.5" fill="#FFF8EB" opacity="0.6" />
              <circle cx="14.3" cy="15.2" r="1.5" fill="#FFF8EB" opacity="0.6" />
              <circle cx="9.7" cy="15.2" r="1.5" fill="#FFF8EB" opacity="0.6" />
              <circle cx="8.2" cy="10.8" r="1.5" fill="#FFF8EB" opacity="0.6" />
              {/* Warm Ivory Center with Soft Rose Core */}
              <circle cx="12" cy="12" r="2.8" fill="#FFF8EB" stroke="#382526" strokeWidth="0.75" />
              <circle cx="12" cy="12" r="1.3" fill="#D99BAA" />
            </svg>
          </div>
          <div>
            <span className="font-script text-2xl sm:text-3xl text-[#E8B4BC] tracking-wide leading-none">
              Where Did My Money Go?
            </span>
            <p className="text-[11px] font-typewriter text-[#FFF8EB]/70 tracking-tight">
              a little diary of your spending
            </p>
          </div>
        </div>

        {/* Center / Right Navigation & Action Buttons */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          <nav className="flex items-center gap-1 bg-[#2C1D1E] px-2.5 py-1 rounded-full border border-[#FFF8EB]/15">
            <a
              href="#overview"
              className="px-2.5 py-1 text-xs font-typewriter text-[#FFF8EB]/80 hover:text-[#E8B4BC] rounded-full transition-colors"
            >
              Overview
            </a>
            <span className="text-[#B7A59A]/40 text-xs">&bull;</span>
            <a
              href="#add-expense"
              className="px-2.5 py-1 text-xs font-typewriter text-[#FFF8EB]/80 hover:text-[#E8B4BC] rounded-full transition-colors"
            >
              Add Expense
            </a>
            <span className="text-[#B7A59A]/40 text-xs">&bull;</span>
            <a
              href="#history"
              className="px-2.5 py-1 text-xs font-typewriter text-[#FFF8EB]/80 hover:text-[#E8B4BC] rounded-full transition-colors"
            >
              Diary
            </a>
          </nav>

          {/* Pocket Money Quick Set Tag */}
          <button
            onClick={onOpenBudgetModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-typewriter rounded-full bg-[#FFF8EB] text-[#382526] hover:bg-[#F8F0C9] transition-colors border border-[#B7A59A] shadow-2xs"
            title="Update Monthly Pocket Money Budget"
          >
            <span className="text-[#D99BAA]">♡</span>
            <span>Budget: ₹{pocketMoney.toLocaleString('en-IN')}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
