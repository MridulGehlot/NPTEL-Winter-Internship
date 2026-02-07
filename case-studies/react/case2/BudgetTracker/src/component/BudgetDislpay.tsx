import type { BudgetState } from '../types/budget';

interface BudgetDisplayProps {
  state: BudgetState;
  conversionRates: Record<'USD' | 'EUR' | 'INR', number>;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({ state, conversionRates }) => {
  const totalIncomeUSD = state.incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenseUSD = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const netBalanceUSD = totalIncomeUSD - totalExpenseUSD;

  const getConvertedValue = (usdAmount: number, currency: 'USD' | 'EUR' | 'INR'): number => {
    return usdAmount * (conversionRates[currency] || 1);
  };

  return (
    <div style={{ padding: '20px', background: '#f8f9fa' }}>
      <h4>💰 Net Balance</h4>
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        fontSize: '20px', 
        fontWeight: 'bold',
        justifyContent: 'center'
      }}>
        <div style={{ color: netBalanceUSD >= 0 ? '#28a745' : '#dc3545' }}>
          💵 USD: ${netBalanceUSD.toFixed(2)}
        </div>
        <div>
          💶 EUR: €{getConvertedValue(netBalanceUSD, 'EUR').toFixed(2)}
        </div>
        <div>
          💴 INR: ₹{getConvertedValue(netBalanceUSD, 'INR').toFixed(2)}
        </div>
      </div>

      {state.incomes.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h5>📈 Recent Incomes ({state.incomes.length})</h5>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {state.incomes.slice(-3).map((income) => (
              <li key={income.id} style={{ padding: '8px', background: '#d4edda', margin: '5px 0' }}>
                +${income.amount.toFixed(2)} - {income.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {state.expenses.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h5>📉 Recent Expenses ({state.expenses.length})</h5>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {state.expenses.slice(-3).map((expense) => (
              <li key={expense.id} style={{ padding: '8px', background: '#f8d7da', margin: '5px 0' }}>
                -${expense.amount.toFixed(2)} - {expense.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BudgetDisplay;
