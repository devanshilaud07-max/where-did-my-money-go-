import React, { useState } from 'react';
import { PlusCircle, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { CategoryType, ExpenseItem, PaymentMethod } from '../types';
import { ALL_CATEGORIES } from '../data/initialData';

interface AddExpenseFormProps {
  onAddExpense: (expense: Omit<ExpenseItem, 'id' | 'createdAt'>) => void;
}

export const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryType>('Food');
  const [expenseDate, setExpenseDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [note, setNote] = useState('');

  // Validation & Toast state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Student Scrapbook Presets
  const studentPresets = [
    { title: 'Canteen Iced Coffee', amount: '120', category: 'Food' as CategoryType, paymentMethod: 'UPI' as PaymentMethod },
    { title: 'Metro Auto Rickshaw', amount: '60', category: 'Travel' as CategoryType, paymentMethod: 'UPI' as PaymentMethod },
    { title: 'Assignment Printouts', amount: '45', category: 'Education' as CategoryType, paymentMethod: 'Cash' as PaymentMethod },
    { title: 'Pastel Highlighters & Diary', amount: '180', category: 'Education' as CategoryType, paymentMethod: 'Card' as PaymentMethod },
  ];

  const handleApplyPreset = (preset: typeof studentPresets[0]) => {
    setTitle(preset.title);
    setAmount(preset.amount);
    setCategory(preset.category);
    setPaymentMethod(preset.paymentMethod);
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate title
    if (!title.trim()) {
      setErrorMessage('Please give your little expense a name.');
      return;
    }

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Expense amount must be a positive rupee value.');
      return;
    }

    // Validate date
    if (!expenseDate) {
      setErrorMessage('Please select a diary date.');
      return;
    }

    // Call add handler
    onAddExpense({
      title: title.trim(),
      amount: Math.round(numericAmount * 100) / 100,
      category,
      expenseDate,
      paymentMethod,
      note: note.trim() ? note.trim() : undefined,
    });

    // Reset fields
    setTitle('');
    setAmount('');
    setNote('');
    setErrorMessage(null);

    // Toast feedback
    setSuccessToast(`Saved "₹${numericAmount}" to your spending diary ♡`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  return (
    <section id="add-expense" className="relative scroll-mt-24">
      
      {/* Outer Blush-Pink Scrapbook Page with Subtle Dots */}
      <div className="bg-blush-dots p-3 sm:p-5 rounded-2xl polaroid-shadow border-2 border-[#382526]/20 relative">
        
        {/* Top Washi Tape strip */}
        <div className="washi-tape -top-2.5 left-10 rotate-[-2deg]" />
        
        {/* Decorative corner butterfly / ribbon stamp */}
        <div className="absolute top-3 right-4 text-sm opacity-80 select-none">
          🦋 🎀
        </div>

        {/* Inner Ivory Paper Sheet placed on the blush page */}
        <div className="bg-[#FFF8EB] rounded-xl p-5 sm:p-7 border border-[#382526]/30 shadow-sm relative">
          
          {/* Header */}
          <div className="pb-4 border-b border-[#B7A59A]/30 mb-5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="font-script text-3xl sm:text-4xl text-[#382526] leading-none">
                Add a little expense
              </h2>
              <span className="text-sm">🍰</span>
            </div>
            <p className="font-typewriter text-xs text-[#382526]/70 uppercase tracking-widest mt-1">
              The Money Diary &bull; Record every little spend
            </p>
          </div>

          {/* Quick presets row */}
          <div className="mb-5 p-3 rounded-lg bg-[#F8F0C9] border border-[#B7A59A]/40">
            <span className="font-typewriter text-[10px] uppercase tracking-wider font-bold text-[#382526]/75 block mb-1.5">
              ✨ Quick Student Diary Shortcuts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {studentPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="font-typewriter text-[11px] px-2.5 py-1 rounded bg-[#FFF8EB] hover:bg-[#E8B4BC]/40 text-[#382526] border border-[#B7A59A]/50 transition-colors"
                >
                  {preset.title} <strong className="text-[#382526]">₹{preset.amount}</strong>
                </button>
              ))}
            </div>
          </div>

          {/* Alert messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-[#FBEBE8] border border-[#D99BAA] text-xs font-typewriter text-[#8E2820]">
              ⚠️ {errorMessage}
            </div>
          )}

          {successToast && (
            <div className="mb-4 p-3 rounded-lg bg-[#F2CBD1] border border-[#D99BAA] text-xs font-typewriter text-[#382526] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#382526]" />
              <span>{successToast}</span>
            </div>
          )}

          {/* The Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Expense Name */}
            <div>
              <label htmlFor="diary-title" className="block font-typewriter text-xs uppercase tracking-wider text-[#382526] font-bold mb-1">
                Expense Name *
              </label>
              <input
                id="diary-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Canteen iced tea, metro ride, thrift cardigan"
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FFF8EB] border border-[#382526]/40 text-[#382526] font-typewriter text-xs sm:text-sm placeholder-[#B7A59A] focus:outline-none focus:border-[#D99BAA] focus:ring-2 focus:ring-[#E8B4BC]/40 transition-all"
              />
            </div>

            {/* Row: Amount in ₹ & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Amount */}
              <div>
                <label htmlFor="diary-amount" className="block font-typewriter text-xs uppercase tracking-wider text-[#382526] font-bold mb-1">
                  Amount in ₹ *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-serif font-bold text-[#382526]">
                    ₹
                  </span>
                  <input
                    id="diary-amount"
                    type="number"
                    step="0.50"
                    min="0.50"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="150.00"
                    required
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-[#FFF8EB] border border-[#382526]/40 text-[#382526] font-typewriter text-xs sm:text-sm font-bold placeholder-[#B7A59A] focus:outline-none focus:border-[#D99BAA] focus:ring-2 focus:ring-[#E8B4BC]/40 transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="diary-category" className="block font-typewriter text-xs uppercase tracking-wider text-[#382526] font-bold mb-1">
                  Category *
                </label>
                <select
                  id="diary-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FFF8EB] border border-[#382526]/40 text-[#382526] font-typewriter text-xs sm:text-sm focus:outline-none focus:border-[#D99BAA] focus:ring-2 focus:ring-[#E8B4BC]/40 transition-all cursor-pointer"
                >
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row: Date Picker & Payment Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Date */}
              <div>
                <label htmlFor="diary-date" className="block font-typewriter text-xs uppercase tracking-wider text-[#382526] font-bold mb-1">
                  Date *
                </label>
                <input
                  id="diary-date"
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FFF8EB] border border-[#382526]/40 text-[#382526] font-typewriter text-xs sm:text-sm focus:outline-none focus:border-[#D99BAA] focus:ring-2 focus:ring-[#E8B4BC]/40 transition-all"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block font-typewriter text-xs uppercase tracking-wider text-[#382526] font-bold mb-1">
                  Payment Method *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Cash', 'Card'] as PaymentMethod[]).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-2 text-xs font-typewriter font-bold rounded-lg border transition-all text-center ${
                        paymentMethod === method
                          ? 'bg-[#382526] text-[#FFF8EB] border-[#382526] shadow-xs'
                          : 'bg-[#FFF8EB] text-[#382526] border-[#382526]/40 hover:bg-[#F8F0C9]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <label htmlFor="diary-note" className="block font-typewriter text-xs uppercase tracking-wider text-[#382526] font-bold mb-1">
                Optional Short Note
              </label>
              <input
                id="diary-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Shared split with Roomie, 20% student discount"
                maxLength={100}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FFF8EB] border border-[#382526]/40 text-[#382526] font-typewriter text-xs sm:text-sm placeholder-[#B7A59A] focus:outline-none focus:border-[#D99BAA] focus:ring-2 focus:ring-[#E8B4BC]/40 transition-all"
              />
            </div>

            {/* Submit Button: Dusty Pink with Chocolate Brown Text */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#E8B4BC] hover:bg-[#D99BAA] text-[#382526] font-typewriter font-bold text-xs sm:text-sm tracking-wider uppercase border border-[#382526]/30 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>♡</span>
                <span>Save to My Diary</span>
                <span>♡</span>
              </button>
            </div>

          </form>

        </div>
      </div>

    </section>
  );
};
