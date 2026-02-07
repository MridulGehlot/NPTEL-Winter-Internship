import React, { useState } from 'react';

interface BudgetActionsProps {
  dispatch: React.Dispatch<any>;
}

const BudgetActions: React.FC<BudgetActionsProps> = ({ dispatch }) => {
  const [tempIncome, setTempIncome] = useState({ amount: '', description: '' });
  const [tempExpense, setTempExpense] = useState({ amount: '', description: '' });

  const addIncome = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(tempIncome.amount);
    if (isNaN(amount) || !tempIncome.description) return;

    dispatch({
      type: 'add_income' as const,
      income: {
        id: Date.now().toString(),
        amount,
        currency: 'USD' as const,
        description: tempIncome.description,
        date: new Date()
      }
    });
    setTempIncome({ amount: '', description: '' });
  };

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(tempExpense.amount);
    if (isNaN(amount) || !tempExpense.description) return;

    dispatch({
      type: 'add_expense' as const,
      expense: {
        id: Date.now().toString(),
        amount,
        currency: 'USD' as const,
        description: tempExpense.description,
        date: new Date()
      }
    });
    setTempExpense({ amount: '', description: '' });
  };

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <form onSubmit={addIncome} style={{ flex: 1, padding: '15px', border: '1px solid #28a745' }}>
        <h4>Income</h4>
        <input
          type="number"
          placeholder="Amount"
          value={tempIncome.amount}
          onChange={(e) => setTempIncome({ ...tempIncome, amount: e.target.value })}
          step="0.01"
          style={{ padding: '8px', marginRight: '5px', width: '80px' }}
        />
        <input
          placeholder="Source"
          value={tempIncome.description}
          onChange={(e) => setTempIncome({ ...tempIncome, description: e.target.value })}
          style={{ padding: '8px', marginRight: '5px', width: '120px' }}
          maxLength={20}
        />
        <button type="submit" style={{ padding: '8px 12px', background: '#28a745', color: 'white', border: 'none' }}>
          Add
        </button>
      </form>

      <form onSubmit={addExpense} style={{ flex: 1, padding: '15px', border: '1px solid #dc3545' }}>
        <h4>Expense</h4>
        <input
          type="number"
          placeholder="Amount"
          value={tempExpense.amount}
          onChange={(e) => setTempExpense({ ...tempExpense, amount: e.target.value })}
          step="0.01"
          style={{ padding: '8px', marginRight: '5px', width: '80px' }}
        />
        <input
          placeholder="Description"
          value={tempExpense.description}
          onChange={(e) => setTempExpense({ ...tempExpense, description: e.target.value })}
          style={{ padding: '8px', marginRight: '5px', width: '120px' }}
          maxLength={20}
        />
        <button type="submit" style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none' }}>
          Add
        </button>
      </form>
    </div>
  );
};

export default BudgetActions;
