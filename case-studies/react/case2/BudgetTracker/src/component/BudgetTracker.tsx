import React, { useReducer } from 'react';
import type { BudgetState, BudgetTrackerProps, IncomeEntry, ExpenseEntry } from '../types/budget';
import BudgetActions from './BudgetActions';
import BudgetDisplay from './BudgetDislpay';

type BudgetAction =
  | { type: 'add_income'; income: IncomeEntry }
  | { type: 'add_expense'; expense: ExpenseEntry }
  | { type: 'set_currency'; currency: 'USD' | 'EUR' | 'INR' };

const budgetReducer = (state: BudgetState, action: BudgetAction): BudgetState => {
  switch (action.type) {
    case 'add_income':
      return {
        ...state,
        incomes: [...state.incomes, action.income]
      };

    case 'add_expense':
      const totalIncomeUSD = state.incomes.reduce((sum, i) => sum + i.amount, 0);
      const newTotalExpenseUSD = state.expenses.reduce((sum, e) => sum + e.amount, 0) + action.expense.amount;
      
      // Type-safe negative balance prevention
      if (totalIncomeUSD < newTotalExpenseUSD) {
        alert('Cannot spend more than you earn!');
        return state;
      }
      
      return {
        ...state,
        expenses: [...state.expenses, action.expense]
      };

    case 'set_currency':
      return { ...state, selectedCurrency: action.currency };

    default:
      return state;
  }
};

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ conversionRates }) => {
  const [state, dispatch] = useReducer(budgetReducer, {
    incomes: [],
    expenses: [],
    selectedCurrency: 'USD'
  });

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: 'Arial, sans-serif',
      color: 'black',
      background: '#ffffff',
    }}>
      <h1 style={{ textAlign: 'center', color: '#28a745' }}>💳 Secure Budget Tracker</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        TypeScript + React.FC + useReducer + Type Safety Demo
      </p>
      
      <BudgetActions dispatch={dispatch} />
      <BudgetDisplay state={state} conversionRates={conversionRates} />
    </div>
  );
};

export default BudgetTracker;
