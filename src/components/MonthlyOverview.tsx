import React from 'react';
import { MonthlyOverviewData } from '../types';
import { AlertTriangle, Edit3, Heart, Sparkles } from 'lucide-react';

interface MonthlyOverviewProps {
  overview: MonthlyOverviewData;
  monthFormatted: string;
  onOpenBudgetModal: () => void;
  expenseCount: number;
}

export const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({
  overview,
  monthFormatted,
  onOpenBudgetModal,
  expenseCount,
}) => {
  const {
    pocketMoney,
    totalSpent,
    moneyLeft,
    progressPercentage,
    isOverspent,
    overspentAmount,
  } = overview;

  return (
    <section id="overview" className="my-8 scroll-mt-24">
      
      {/* Section Header with Script title and typewriter badge */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-[#B7A59A]/30 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-script text-4xl sm:text-5xl text-[#382526] leading-none">
              Monthly Money Snapshot
            </h2>
            <span className="text-sm">🎀</span>
          </div>
          <p className="font-typewriter text-xs text-[#382526]/75 uppercase tracking-wider mt-1">
            Summary for {monthFormatted} &bull; {expenseCount} diary entries
          </p>
        </div>

        {/* Edit Pocket Money Pinned Note Button */}
        <button
          onClick={onOpenBudgetModal}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-typewriter rounded-full bg-[#FFF8EB] hover:bg-[#F8F0C9] text-[#382526] border border-[#B7A59A] polaroid-shadow transition-all"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#D99BAA]" />
          <span>Adjust Pocket Money</span>
        </button>
      </div>

      {/* Overspent Warning Alert Ribbon if applicable */}
      {isOverspent && (
        <div className="mb-6 p-4 rounded-xl bg-[#FFF8EB] border-2 border-[#D99BAA] polaroid-shadow relative overflow-hidden">
          <div className="washi-tape -top-2 left-10 rotate-[2deg]" />
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="font-typewriter text-xs sm:text-sm text-[#382526]">
              <span className="font-bold text-[#382526] uppercase tracking-wider block mb-0.5">
                Oh dear! You've exceeded your pocket money!
              </span>
              You have spent{' '}
              <strong className="text-[#382526] font-bold text-sm underline decoration-[#D99BAA]">
                ₹{overspentAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </strong>{' '}
              over your allowance this month. Time to review your diary entries! ♡
            </div>
          </div>
        </div>
      )}

      {/* 3 Scrapbook-Inspired Summary Cards with Different Shapes & Backgrounds */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Card 1: Pocket Money (Blush Pink Polka Dots with Polaroid Frame) */}
        <div className="relative group transition-transform hover:-translate-y-1">
          {/* Decorative tape */}
          <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 rotate-[-1deg]" />
          
          <div className="bg-[#FFF8EB] p-3 rounded-xl polaroid-shadow border border-[#B7A59A]/40 -rotate-1 h-full flex flex-col justify-between">
            <div className="bg-blush-dots-subtle rounded-lg p-5 border border-[#382526]/10 text-center flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between text-[#382526]">
                <span className="text-xs">✨</span>
                <span className="font-typewriter text-[11px] uppercase tracking-widest font-bold text-[#382526]">
                  Pocket Money
                </span>
                <span className="text-xs">✨</span>
              </div>

              <div className="my-4">
                <div className="font-serif-vintage text-3xl sm:text-4xl font-bold text-[#382526] tracking-tight">
                  ₹{pocketMoney.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="font-typewriter text-[11px] text-[#382526]/70 mt-1">
                  monthly allowance budget
                </div>
              </div>

              <div className="pt-2 border-t border-[#382526]/15 font-typewriter text-[10px] text-[#382526]/80 flex items-center justify-center gap-1">
                <span>♡</span>
                <span>Set for college semester</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Money Spent (Dark Chocolate Brown Panel with Warm Ivory Text) */}
        <div className="relative group transition-transform hover:-translate-y-1">
          {/* Decorative tape */}
          <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 rotate-[2deg]" />

          <div className="bg-[#FFF8EB] p-3 rounded-xl polaroid-shadow border border-[#B7A59A]/40 rotate-1 h-full flex flex-col justify-between">
            <div className="bg-[#382526] text-[#FFF8EB] rounded-lg p-5 border border-[#FFF8EB]/20 text-center flex flex-col justify-between flex-1">
              <div className="flex items-center justify-between text-[#E8B4BC]">
                <span className="text-xs">☕</span>
                <span className="font-typewriter text-[11px] uppercase tracking-widest font-bold text-[#E8B4BC]">
                  Money Spent
                </span>
                <span className="text-xs">🍰</span>
              </div>

              <div className="my-4">
                <div className="font-serif-vintage text-3xl sm:text-4xl font-bold text-[#FFF8EB] tracking-tight">
                  ₹{totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="font-typewriter text-[11px] text-[#E8B4BC]/80 mt-1">
                  total accounted expenses
                </div>
              </div>

              <div className="pt-2 border-t border-[#FFF8EB]/15 font-typewriter text-[10px] text-[#FFF8EB]/75 flex items-center justify-center gap-1">
                <span>across {expenseCount} recorded items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Money Left (Warm Ivory Paper with Rose Pink Accents) */}
        <div className="relative group transition-transform hover:-translate-y-1">
          {/* Decorative pin */}
          <div className="absolute -top-2 right-6 text-base z-10">📌</div>

          <div className="bg-[#FFF8EB] p-3 rounded-xl polaroid-shadow border border-[#B7A59A]/40 -rotate-0.5 h-full flex flex-col justify-between">
            <div className={`rounded-lg p-5 border text-center flex flex-col justify-between flex-1 ${
              isOverspent 
                ? 'bg-[#FBEBE8] border-[#E8B4BC]' 
                : 'bg-[#F5EFE3] border-[#B7A59A]/30'
            }`}>
              <div className="flex items-center justify-between text-[#382526]">
                <span className="text-xs">🎀</span>
                <span className="font-typewriter text-[11px] uppercase tracking-widest font-bold text-[#382526]">
                  {isOverspent ? 'Budget Deficit' : 'Money Left'}
                </span>
                <span className="text-xs">🎀</span>
              </div>

              <div className="my-4">
                <div className={`font-serif-vintage text-3xl sm:text-4xl font-bold tracking-tight ${
                  isOverspent ? 'text-[#8E2820]' : 'text-[#382526]'
                }`}>
                  ₹{isOverspent 
                    ? overspentAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : moneyLeft.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="font-typewriter text-[11px] text-[#382526]/70 mt-1">
                  {isOverspent ? 'over pocket-money limit' : 'safe remaining balance'}
                </div>
              </div>

              <div className="pt-2 border-t border-[#382526]/15 font-typewriter text-[10px] text-[#382526]/80 flex items-center justify-center gap-1">
                <span>♡</span>
                <span>
                  {isOverspent
                    ? '⚠️ Deficit alert'
                    : `${((moneyLeft / (pocketMoney || 1)) * 100).toFixed(0)}% allowance left`}
                </span>
                <span>♡</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Ribbon-Styled Spending Progress Bar */}
      <div className="mt-7 bg-[#FFF8EB] p-4 sm:p-5 rounded-2xl polaroid-shadow border border-[#B7A59A]/40 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-typewriter mb-2 gap-1">
          <div className="flex items-center gap-1.5 text-[#382526] font-bold">
            <span>🎀</span>
            <span className="uppercase tracking-wider">Ribbon Spending Tracker</span>
            <span className="text-[11px] text-[#382526]/60 font-normal">(capped at 100% for display)</span>
          </div>

          <div className="font-typewriter font-bold text-xs sm:text-sm text-[#382526]">
            {progressPercentage.toFixed(1)}% spent &bull;{' '}
            <span className="text-[#382526]/75">
              {isOverspent ? 'Over Budget!' : 'Under Control'}
            </span>
          </div>
        </div>

        {/* Ribbon Track */}
        <div className="relative w-full h-4 bg-[#F8F0C9] rounded-full p-0.5 border border-[#B7A59A]/60 overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out relative ${
              isOverspent
                ? 'bg-gradient-to-r from-[#D99BAA] to-[#8E2820]'
                : progressPercentage > 80
                ? 'bg-gradient-to-r from-[#F2CBD1] to-[#D99BAA]'
                : 'bg-gradient-to-r from-[#E8B4BC] to-[#D99BAA]'
            }`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          >
            {/* Delicate lace/stitch overlay on the ribbon */}
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,#FFF8EB_6px,#FFF8EB_8px)]" />
          </div>
        </div>

        {/* Ribbon Endpoints */}
        <div className="flex items-center justify-between font-typewriter text-[11px] text-[#382526]/70 mt-2">
          <span>₹0</span>
          <span className="italic font-serif-vintage text-xs">
            {isOverspent ? 'Exceeded monthly budget ♡' : 'Pacing well for this month ♡'}
          </span>
          <span>Budget: ₹{pocketMoney.toLocaleString('en-IN')}</span>
        </div>

      </div>

    </section>
  );
};
