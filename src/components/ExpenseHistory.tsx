import React from 'react';
import { Trash2, Filter, Calendar, Heart, Inbox } from 'lucide-react';
import { ExpenseItem, CategoryType } from '../types';
import { ALL_CATEGORIES, CATEGORY_COLORS } from '../data/initialData';

interface ExpenseHistoryProps {
  expenses: ExpenseItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
  availableMonths: string[];
  onDeleteExpense: (id: string) => void;
  onResetFilters: () => void;
}

export const ExpenseHistory: React.FC<ExpenseHistoryProps> = ({
  expenses,
  selectedCategory,
  onSelectCategory,
  selectedMonth,
  onSelectMonth,
  availableMonths,
  onDeleteExpense,
  onResetFilters,
}) => {
  // Format Date for vintage diary entry (e.g. "Oct 18, 2026")
  const formatDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="history" className="my-10 scroll-mt-24">
      
      {/* Dark Chocolate Brown Diary Header Box */}
      <div className="bg-[#382526] text-[#FFF8EB] rounded-2xl p-5 sm:p-7 polaroid-shadow border-2 border-[#D99BAA]/30 mb-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-script text-4xl sm:text-5xl text-[#E8B4BC] leading-none">
                My Spending Diary
              </h2>
              <span className="text-sm">📖</span>
            </div>
            <p className="font-typewriter text-xs text-[#FFF8EB]/75 uppercase tracking-widest mt-1">
              Personal journal entries &bull; {expenses.length} record{expenses.length === 1 ? '' : 's'} found
            </p>
          </div>

          {/* Functional Filters Styled like Vintage Paper Tags */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-[#FFF8EB] text-[#382526] px-3 py-1.5 rounded-full border border-[#B7A59A] text-xs font-typewriter">
              <span className="text-[10px] uppercase font-bold text-[#382526]/70">Cat:</span>
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="bg-transparent font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                {ALL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Filter */}
            <div className="flex items-center gap-1.5 bg-[#FFF8EB] text-[#382526] px-3 py-1.5 rounded-full border border-[#B7A59A] text-xs font-typewriter">
              <span className="text-[10px] uppercase font-bold text-[#382526]/70">Month:</span>
              <select
                value={selectedMonth}
                onChange={(e) => onSelectMonth(e.target.value)}
                className="bg-transparent font-bold text-xs focus:outline-none cursor-pointer"
              >
                {availableMonths.map((m) => {
                  const [year, monthNum] = m.split('-');
                  const monthName = new Date(parseInt(year), parseInt(monthNum) - 1, 1).toLocaleString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  });
                  return (
                    <option key={m} value={m}>
                      {monthName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Clear Filter Button */}
            {(selectedCategory !== 'ALL' || selectedMonth !== availableMonths[0]) && (
              <button
                onClick={onResetFilters}
                className="font-typewriter text-xs px-3 py-1.5 rounded-full bg-[#E8B4BC] hover:bg-[#D99BAA] text-[#382526] font-bold transition-colors"
              >
                Reset
              </button>
            )}

          </div>
        </div>

      </div>

      {/* Diary Entries List (Paper Cards instead of sterile table) */}
      {expenses.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-[#FFF8EB] border-2 border-dashed border-[#B7A59A] my-4 polaroid-shadow">
          <span className="text-3xl block mb-2">🎀</span>
          <p className="font-script text-3xl sm:text-4xl text-[#382526]">
            Nothing in the diary yet. Your first entry goes here ♡
          </p>
          <p className="font-typewriter text-xs text-[#382526]/70 mt-2 max-w-sm mx-auto">
            Use the form above to record your pocket-money spend or adjust your filters.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-4 inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#E8B4BC] text-[#382526] font-typewriter text-xs font-bold hover:bg-[#D99BAA] transition-colors"
          >
            <span>Show All Diary Entries</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {expenses.map((expense, idx) => {
            const colors = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;
            const rotation = idx % 3 === 0 ? '-rotate-0.5' : idx % 2 === 0 ? 'rotate-0.5' : 'rotate-0';

            return (
              <div
                key={expense.id}
                className={`bg-[#FFF8EB] p-4 sm:p-5 rounded-2xl border-2 border-[#382526]/20 polaroid-shadow transition-transform hover:-translate-y-1 relative flex flex-col justify-between ${rotation}`}
              >
                {/* Washi tape accent on random entries */}
                {idx % 2 === 0 && (
                  <div className="washi-tape -top-2 left-6 rotate-[-3deg] opacity-80" />
                )}

                <div>
                  {/* Top Bar: Date & Category & Payment */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#382526]/10 text-xs font-typewriter">
                    <div className="flex items-center gap-1.5 text-[#382526]/75">
                      <span>📅</span>
                      <span>{formatDate(expense.expenseDate)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#382526]/20" style={{ backgroundColor: colors.badge, color: '#382526' }}>
                        {colors.icon} {expense.category}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#F8F0C9] text-[#382526] border border-[#B7A59A]/60 font-bold">
                        {expense.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Title & Rupee Amount */}
                  <div className="flex items-start justify-between gap-3 my-1">
                    <div>
                      <h4 className="font-serif-vintage font-bold text-lg sm:text-xl text-[#382526] leading-snug">
                        {expense.title}
                      </h4>
                      {expense.note && (
                        <p className="font-typewriter text-xs text-[#382526]/75 mt-1 italic">
                          “{expense.note}”
                        </p>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-serif-vintage text-2xl font-bold text-[#382526]">
                        ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Delete action & Little Stamp */}
                <div className="mt-4 pt-2 border-t border-[#382526]/10 flex items-center justify-between text-xs font-typewriter">
                  <span className="text-[10px] text-[#382526]/60">
                    entry #{expense.id.slice(-4)} &bull; saved ♡
                  </span>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete entry "${expense.title}" (₹${expense.amount}) from your diary?`)) {
                        onDeleteExpense(expense.id);
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[#382526] hover:text-[#8E2820] hover:bg-[#FBEBE8] border border-transparent hover:border-[#D99BAA] text-[11px] font-bold transition-colors"
                    title="Delete Diary Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Diary Summary Footer */}
      <div className="mt-6 p-4 rounded-xl bg-[#FFF8EB] border border-[#B7A59A]/40 flex flex-col sm:flex-row items-center justify-between font-typewriter text-xs text-[#382526] gap-2">
        <span>Showing {expenses.length} journal record(s)</span>
        <div className="font-bold">
          Subtotal:{' '}
          <span className="font-serif-vintage text-base text-[#382526]">
            ₹{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

    </section>
  );
};
