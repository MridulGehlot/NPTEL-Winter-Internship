export interface IncomeEntry {
  id: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'INR';
  description: string;
  date: Date;
}

export interface ExpenseEntry {
  id: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'INR';
  description: string;
  date: Date;
}

export interface BudgetTrackerProps {
  conversionRates: Record<'USD' | 'EUR' | 'INR', number>; // USD base
}

export interface BudgetState {
  incomes: IncomeEntry[];
  expenses: ExpenseEntry[];
  selectedCurrency: 'USD' | 'EUR' | 'INR';
}
