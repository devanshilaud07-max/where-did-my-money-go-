import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MonthlyOverview } from './components/MonthlyOverview';
import { AddExpenseForm } from './components/AddExpenseForm';
import { SpendingBreakdown } from './components/SpendingBreakdown';
import { ExpenseHistory } from './components/ExpenseHistory';
import { PocketMoneyModal } from './components/PocketMoneyModal';
import { ExpenseItem, CategoryType, CategoryBreakdownItem, MonthlyOverviewData } from './types';
import { INITIAL_EXPENSES, INITIAL_POCKET_MONEY, ALL_CATEGORIES } from './data/initialData';
import { RotateCcw } from 'lucide-react';

const STORAGE_EXPENSES_KEY = 'where_did_my_money_go_coquette_expenses_v2';
const STORAGE_BUDGET_KEY = 'where_did_my_money_go_coquette_budget_v2';

export default function App() {
  // Expenses state with localStorage recovery
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EXPENSES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load expenses from localStorage:', e);
    }
    return INITIAL_EXPENSES;
  });

  // Monthly Pocket Money budget state with localStorage recovery
  const [pocketMoney, setPocketMoney] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BUDGET_KEY);
      if (saved) {
        const parsed = parseFloat(saved);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load budget from localStorage:', e);
    }
    return INITIAL_POCKET_MONEY;
  });

  // Modals state
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-10');

  // Ref to scroll to tracking section
  const trackingSectionRef = useRef<HTMLDivElement>(null);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EXPENSES_KEY, JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to save expenses to localStorage:', e);
    }
  }, [expenses]);

  // Save to localStorage whenever pocketMoney changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BUDGET_KEY, pocketMoney.toString());
    } catch (e) {
      console.error('Failed to save budget to localStorage:', e);
    }
  }, [pocketMoney]);

  // Extract all unique months from expenses + current month
  const availableMonths = useMemo(() => {
    const currentYm = '2026-10';
    const monthSet = new Set<string>();
    monthSet.add(currentYm);
    expenses.forEach((e) => {
      if (e.expenseDate && e.expenseDate.length >= 7) {
        monthSet.add(e.expenseDate.substring(0, 7));
      }
    });
    return Array.from(monthSet).sort().reverse();
  }, [expenses]);

  // Ensure selectedMonth is valid
  useEffect(() => {
    if (!availableMonths.includes(selectedMonth) && availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  // Monthly expenses for the selected month (for overview and breakdown)
  const monthlyAllExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (!selectedMonth || selectedMonth === 'ALL') return true;
      return e.expenseDate.startsWith(selectedMonth);
    });
  }, [expenses, selectedMonth]);

  // Filtered expenses for the History/Diary section (by category and month)
  const filteredHistoryExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchesCategory = selectedCategory === 'ALL' || e.category === selectedCategory;
      const matchesMonth = !selectedMonth || selectedMonth === 'ALL' || e.expenseDate.startsWith(selectedMonth);
      return matchesCategory && matchesMonth;
    });
  }, [expenses, selectedCategory, selectedMonth]);

  // Calculate Monthly Overview
  const overviewData: MonthlyOverviewData = useMemo(() => {
    const totalSpent = monthlyAllExpenses.reduce((sum, item) => sum + (item.amount || 0), 0);
    const moneyLeft = pocketMoney - totalSpent;
    const isOverspent = moneyLeft < 0;
    const overspentAmount = isOverspent ? Math.abs(moneyLeft) : 0;

    let progressPercentage = 0;
    if (pocketMoney > 0) {
      const calcProgress = (totalSpent / pocketMoney) * 100;
      progressPercentage = Math.min(calcProgress, 100);
    }

    return {
      pocketMoney,
      totalSpent,
      moneyLeft,
      progressPercentage,
      isOverspent,
      overspentAmount,
    };
  }, [monthlyAllExpenses, pocketMoney]);

  // Calculate Category Breakdown
  const categoryBreakdowns: CategoryBreakdownItem[] = useMemo(() => {
    const totalSpent = overviewData.totalSpent;
    const map = new Map<CategoryType, { total: number; count: number }>();

    ALL_CATEGORIES.forEach((cat) => {
      map.set(cat, { total: 0, count: 0 });
    });

    monthlyAllExpenses.forEach((e) => {
      const current = map.get(e.category) || { total: 0, count: 0 };
      map.set(e.category, {
        total: current.total + (e.amount || 0),
        count: current.count + 1,
      });
    });

    const result: CategoryBreakdownItem[] = [];
    ALL_CATEGORIES.forEach((cat) => {
      const data = map.get(cat) || { total: 0, count: 0 };
      const percentage = totalSpent > 0 ? (data.total / totalSpent) * 100 : 0;
      result.push({
        category: cat,
        totalAmount: data.total,
        percentage,
        count: data.count,
      });
    });

    return result.sort((a, b) => b.totalAmount - a.totalAmount);
  }, [monthlyAllExpenses, overviewData.totalSpent]);

  // Formatted Month Name (e.g., "October 2026")
  const formattedMonthName = useMemo(() => {
    try {
      const [year, monthNum] = selectedMonth.split('-');
      const date = new Date(parseInt(year), parseInt(monthNum) - 1, 1);
      return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    } catch {
      return selectedMonth;
    }
  }, [selectedMonth]);

  // Add Expense Handler
  const handleAddExpense = (newExpenseData: Omit<ExpenseItem, 'id' | 'createdAt'>) => {
    const newExpense: ExpenseItem = {
      ...newExpenseData,
      id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: Date.now(),
    };

    setExpenses((prev) => [newExpense, ...prev]);

    // Pastel Coquette Confetti
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#E8B4BC', '#D99BAA', '#382526', '#FFF8EB', '#F8F0C9'],
    });
  };

  // Delete Expense Handler
  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // Reset to initial sample data
  const handleResetData = () => {
    if (window.confirm('Reset all expenses and budget back to cozy college student diary sample data?')) {
      setExpenses(INITIAL_EXPENSES);
      setPocketMoney(INITIAL_POCKET_MONEY);
      setSelectedCategory('ALL');
      setSelectedMonth('2026-10');
      try {
        localStorage.removeItem(STORAGE_EXPENSES_KEY);
        localStorage.removeItem(STORAGE_BUDGET_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Scroll to track function
  const handleScrollToTrack = () => {
    if (trackingSectionRef.current) {
      trackingSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F0C9] text-[#382526] selection:bg-[#E8B4BC] selection:text-[#382526]">
      
      {/* HEADER */}
      <Header
        onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
        pocketMoney={pocketMoney}
      />

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex-1 space-y-8">
        
        {/* A. HERO SECTION */}
        <HeroSection
          onScrollToTrack={handleScrollToTrack}
          pocketMoney={pocketMoney}
          totalSpent={overviewData.totalSpent}
        />

        {/* Small Ribbon Divider */}
        <div className="flex items-center justify-center gap-3 my-2 opacity-60">
          <div className="h-px bg-[#382526]/20 flex-1" />
          <span className="text-xs">🎀 🦋 🎀</span>
          <div className="h-px bg-[#382526]/20 flex-1" />
        </div>

        {/* B. MONTHLY MONEY SNAPSHOT */}
        <div ref={trackingSectionRef}>
          <MonthlyOverview
            overview={overviewData}
            monthFormatted={formattedMonthName}
            onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            expenseCount={monthlyAllExpenses.length}
          />
        </div>

        {/* C. ADD EXPENSE (THE MONEY DIARY) & D. WHERE THE MONEY WENT (TWO-COLUMN COLLAGE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* C. Add an Expense — The Money Diary (Ivory Sheet on Blush Pink Scrapbook Page) */}
          <div className="lg:col-span-7">
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>

          {/* D. Where the Money Went (Labelled Paper Clippings Breakdown) */}
          <div className="lg:col-span-5">
            <SpendingBreakdown
              breakdowns={categoryBreakdowns}
              totalSpent={overviewData.totalSpent}
            />
          </div>
        </div>

        {/* E. MY SPENDING DIARY (EXPENSE HISTORY AS VINTAGE JOURNAL ENTRIES) */}
        <ExpenseHistory
          expenses={filteredHistoryExpenses}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
          availableMonths={availableMonths}
          onDeleteExpense={handleDeleteExpense}
          onResetFilters={() => {
            setSelectedCategory('ALL');
            if (availableMonths.length > 0) setSelectedMonth(availableMonths[0]);
          }}
        />

        {/* Reset / Demo Controls */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={handleResetData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8EB] hover:bg-[#FCE7EB] text-[#382526] border border-[#B7A59A] font-typewriter text-xs transition-colors shadow-2xs"
            title="Reset to sample student diary entries"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D99BAA]" />
            <span>Reset Demo Data</span>
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-16 bg-[#382526] text-[#FFF8EB] border-t-2 border-[#D99BAA]/30 py-8 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-2 font-typewriter">
          <p className="font-script text-3xl sm:text-4xl text-[#E8B4BC] leading-tight">
            Where Did My Money Go?
          </p>
          <p className="text-xs text-[#FFF8EB]/75">
            a little diary of your spending ♡
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-bold text-[#E8B4BC]">
            <button onClick={() => setIsBudgetModalOpen(true)} className="hover:underline">
              Adjust Pocket Money
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL */}
      <PocketMoneyModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        currentBudget={pocketMoney}
        onSaveBudget={(newBudget) => setPocketMoney(newBudget)}
      />

    </div>
  );
}
