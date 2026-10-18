import React from 'react';
import { CategoryBreakdownItem, CategoryType } from '../types';
import { CATEGORY_COLORS } from '../data/initialData';

interface SpendingBreakdownProps {
  breakdowns: CategoryBreakdownItem[];
  totalSpent: number;
}

export const SpendingBreakdown: React.FC<SpendingBreakdownProps> = ({
  breakdowns,
  totalSpent,
}) => {
  return (
    <section id="breakdown" className="relative scroll-mt-24 h-full flex flex-col justify-between">
      
      {/* Scrapbook Container */}
      <div className="bg-[#FFF8EB] border-2 border-[#382526]/30 rounded-2xl p-5 sm:p-7 polaroid-shadow relative overflow-hidden flex flex-col justify-between flex-1">
        
        {/* Top washi tape accent */}
        <div className="washi-tape -top-2.5 right-10 rotate-[3deg]" />

        {/* Decorative corner flower/heart */}
        <div className="absolute top-4 right-4 text-xs text-[#382526] select-none opacity-70">
          🌸 ♡
        </div>

        <div>
          {/* Header */}
          <div className="pb-3 border-b border-[#B7A59A]/30 mb-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-script text-3xl sm:text-4xl text-[#382526] leading-none">
                  Where the Money Went
                </h2>
                <p className="font-typewriter text-xs text-[#382526]/70 uppercase tracking-widest mt-1">
                  category percentage breakdown
                </p>
              </div>

              <div className="bg-[#F8F0C9] px-2.5 py-1 rounded border border-[#B7A59A] text-right font-typewriter text-[11px] font-bold text-[#382526]">
                Total: ₹{totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Empty state or Scrapbook Clippings */}
          {totalSpent === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[#F8F0C9] border border-dashed border-[#B7A59A] my-4">
              <span className="text-2xl block mb-2">🎀</span>
              <p className="font-script text-2xl text-[#382526]">
                No spending clippings yet
              </p>
              <p className="font-typewriter text-xs text-[#382526]/70 mt-1 max-w-xs mx-auto">
                Add your first diary entry on the left to see your category ribbon breakdown!
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {breakdowns.map((item, idx) => {
                const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;
                return (
                  <div
                    key={item.category}
                    className="p-3 rounded-xl bg-[#F8F0C9]/70 hover:bg-[#F8F0C9] border border-[#B7A59A]/50 transition-all polaroid-shadow group"
                  >
                    {/* Top Row: Icon + Name + Percentage + Amount */}
                    <div className="flex items-center justify-between font-typewriter text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{colors.icon}</span>
                        <span className="font-bold text-[#382526]">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-[#382526]/60">
                          ({item.count} item{item.count === 1 ? '' : 's'})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#382526]">
                          ₹{item.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#E8B4BC] text-[#382526] font-bold text-[10px] border border-[#382526]/20 min-w-[45px] text-center">
                          {item.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Ribbon progress bar */}
                    <div className="w-full h-2.5 bg-[#FFF8EB] rounded-full overflow-hidden border border-[#B7A59A]/40 p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: colors.bar,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Vintage Stamp Note */}
        <div className="mt-6 pt-3 border-t border-[#B7A59A]/30 flex items-center justify-between font-typewriter text-[10px] text-[#382526]/70">
          <span>Category Percentage Share ♡</span>
          <span>Accounted in full ✨</span>
        </div>

      </div>

    </section>
  );
};
