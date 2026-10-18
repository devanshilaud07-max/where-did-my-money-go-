import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onScrollToTrack: () => void;
  pocketMoney: number;
  totalSpent: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToTrack,
  pocketMoney,
  totalSpent,
}) => {
  return (
    <section className="relative my-4 sm:my-6">
      
      {/* Decorative Washi Tape on Top Left & Top Right of Main Panel */}
      <div className="washi-tape -top-2.5 left-8 rotate-[-4deg]" />
      <div className="washi-tape -top-2.5 right-12 rotate-[3deg]" />

      {/* Main Dark Chocolate Brown Panel */}
      <div className="relative bg-[#382526] text-[#FFF8EB] rounded-2xl p-6 sm:p-10 md:p-12 polaroid-shadow-lg border-2 border-[#D99BAA]/30 overflow-hidden">
        
        {/* Subtle decorative background charm pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FFF8EB_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Decorative corner accents */}
        <div className="absolute top-4 right-6 text-xl text-[#E8B4BC] select-none flex items-center gap-1.5 opacity-85">
          <span>🎀</span>
          <span className="text-sm">🦋</span>
          <span className="text-xs">✨</span>
        </div>

        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center">
          
          {/* Scrapbook Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2C1D1E] border border-[#E8B4BC]/40 text-[#E8B4BC] text-xs font-typewriter tracking-widest uppercase mb-4 shadow-inner">
            <span>♡</span>
            <span>A Student Pocket-Money Expense Diary</span>
            <span>♡</span>
          </div>

          {/* Oversized Dusty-Pink Cursive Title */}
          <h1 className="font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#E8B4BC] tracking-normal leading-[1.05] drop-shadow-sm my-1">
            Where Did My Money Go?
          </h1>

          {/* Smaller Typewriter Subtitle */}
          <p className="font-typewriter text-xs sm:text-sm md:text-base text-[#FFF8EB]/85 tracking-widest uppercase mt-2">
            a little diary of your spending
          </p>

          {/* Small Decorative Line with Bow */}
          <div className="flex items-center justify-center gap-3 w-48 sm:w-64 my-4 opacity-75">
            <div className="h-px bg-gradient-to-r from-transparent via-[#E8B4BC] to-transparent flex-1" />
            <span className="text-[#E8B4BC] text-xs">🎀</span>
            <div className="h-px bg-gradient-to-r from-transparent via-[#E8B4BC] to-transparent flex-1" />
          </div>

          {/* Scrapbook Introduction */}
          <p className="font-serif-vintage italic text-lg sm:text-xl md:text-2xl text-[#FFF8EB] max-w-xl leading-relaxed mb-6">
            “Every rupee has a story. Let's find yours.”
          </p>

          {/* Mini Collage Note card inside hero */}
          <div className="bg-[#FFF8EB] text-[#382526] px-4 py-2.5 rounded-lg border border-[#B7A59A] polaroid-shadow -rotate-1 max-w-md w-full mb-8 font-typewriter text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">📌</span>
              <span>October Student Ledger</span>
            </div>
            <div className="text-[#382526] font-bold">
              Spent ₹{totalSpent.toLocaleString('en-IN')} / ₹{pocketMoney.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Prominent Dusty Pink "Track My Spending" Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={onScrollToTrack}
              className="px-8 py-3.5 rounded-full bg-[#E8B4BC] hover:bg-[#D99BAA] text-[#382526] font-typewriter font-bold text-sm tracking-wider uppercase transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg border border-[#FFF8EB]/60 flex items-center gap-2"
            >
              <span>Track My Spending</span>
              <ArrowDown className="w-4 h-4 text-[#382526]" />
            </button>
          </div>

        </div>

        {/* Bottom vintage stamp detail */}
        <div className="mt-8 pt-4 border-t border-[#FFF8EB]/10 flex items-center justify-between text-[11px] font-typewriter text-[#B7A59A]">
          <span className="flex items-center gap-1.5">
            <span>🌸</span>
            <span>Every little spend recorded with care</span>
          </span>
          <span className="hidden sm:inline">
            Keep your college savings blooming ♡
          </span>
        </div>

      </div>

    </section>
  );
};
