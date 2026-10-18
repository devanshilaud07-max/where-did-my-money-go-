export type CategoryType = 
  | 'Food' 
  | 'Travel' 
  | 'Shopping' 
  | 'Education' 
  | 'Entertainment' 
  | 'Other';

export type PaymentMethod = 'UPI' | 'Cash' | 'Card';

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: CategoryType;
  expenseDate: string; // YYYY-MM-DD
  paymentMethod: PaymentMethod;
  note?: string;
  createdAt: number;
}

export interface CategoryBreakdownItem {
  category: CategoryType;
  totalAmount: number;
  percentage: number;
  count: number;
}

export interface MonthlyOverviewData {
  pocketMoney: number;
  totalSpent: number;
  moneyLeft: number;
  progressPercentage: number;
  isOverspent: boolean;
  overspentAmount: number;
}
