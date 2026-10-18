import { ExpenseItem, CategoryType } from '../types';

export const ALL_CATEGORIES: CategoryType[] = [
  'Food',
  'Travel',
  'Shopping',
  'Education',
  'Entertainment',
  'Other',
];

// Scrapbook Coquette Palette for Category Tags & Bars
export const CATEGORY_COLORS: Record<CategoryType, { bg: string; text: string; bar: string; badge: string; icon: string }> = {
  Food: { 
    bg: '#FFF8EB', 
    text: '#382526', 
    bar: '#D99BAA', 
    badge: '#F3D2D8',
    icon: '🍰'
  },
  Travel: { 
    bg: '#F8F0C9', 
    text: '#382526', 
    bar: '#B7A59A', 
    badge: '#EADEC9',
    icon: '🛵'
  },
  Shopping: { 
    bg: '#FCE7EB', 
    text: '#382526', 
    bar: '#E8B4BC', 
    badge: '#F5C2CB',
    icon: '🎀'
  },
  Education: { 
    bg: '#FFF8EB', 
    text: '#382526', 
    bar: '#8E6F72', 
    badge: '#DFD1CE',
    icon: '📚'
  },
  Entertainment: { 
    bg: '#F8F0C9', 
    text: '#382526', 
    bar: '#9B5B68', 
    badge: '#E5C0C8',
    icon: '🎞️'
  },
  Other: { 
    bg: '#EFEAE2', 
    text: '#382526', 
    bar: '#B7A59A', 
    badge: '#DFD8CE',
    icon: '✨'
  },
};

export const INITIAL_POCKET_MONEY = 5000;

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    title: 'Canteen Iced Coffee & Croissant',
    amount: 180,
    category: 'Food',
    expenseDate: '2026-10-18',
    paymentMethod: 'UPI',
    note: 'Afternoon study break with roommate',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: 'exp-2',
    title: 'Metro Pass for College Commute',
    amount: 550,
    category: 'Travel',
    expenseDate: '2026-10-16',
    paymentMethod: 'Card',
    note: 'Monthly recharge for line 2',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: 'exp-3',
    title: 'Vintage Leather Journal & Pastel Pens',
    amount: 450,
    category: 'Education',
    expenseDate: '2026-10-12',
    paymentMethod: 'UPI',
    note: 'For college notes & creative sketches',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
  },
  {
    id: 'exp-4',
    title: 'Autumn Indie Film at Heritage Cinema',
    amount: 250,
    category: 'Entertainment',
    expenseDate: '2026-10-10',
    paymentMethod: 'Card',
    note: 'Student pass Sunday matinee',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
  {
    id: 'exp-5',
    title: 'Lace Ribbon & Scrapbook Stickers',
    amount: 140,
    category: 'Shopping',
    expenseDate: '2026-10-08',
    paymentMethod: 'Cash',
    note: 'Craft store finds for portfolio binder',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: 'exp-6',
    title: 'Hostel Tea & Strawberry Biscuits',
    amount: 110,
    category: 'Food',
    expenseDate: '2026-10-05',
    paymentMethod: 'Cash',
    note: 'Late night exam revision snack',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 13,
  },
  {
    id: 'exp-7',
    title: 'Vintage Ribbed Knit Cardigan',
    amount: 699,
    category: 'Shopping',
    expenseDate: '2026-10-03',
    paymentMethod: 'UPI',
    note: 'Thrift pop-up store in college campus',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
  },
];
