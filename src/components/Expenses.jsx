import { useState, useEffect } from 'react';

const currency = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
});

export default function Expenses() {
  const [expenses, setExpenses] = useState(() =>
    JSON.parse(localStorage.getItem('expenses') || '[]')
  );
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  function addExpense(e) {
    e.preventDefault();
    if (!expenseDesc || !expenseAmount) return;
    setExpenses([
      ...expenses,
      { id: Date.now(), desc: expenseDesc, amount: Number(expenseAmount) },
    ]);
    setExpenseDesc('');
    setExpenseAmount('');
  }

  function removeExpense(id) {
    setExpenses(expenses.filter(ex => ex.id !== id));
  }

  const totalExpense = expenses.reduce((sum, ex) => sum + Number(ex.amount), 0);

  return (
    <section className="section">
      <h2>Expenses</h2>
      <form onSubmit={addExpense} className="form">
        <label htmlFor="expense-desc">Description</label>
        <input
          id="expense-desc"
          placeholder="Description"
          value={expenseDesc}
          onChange={e => setExpenseDesc(e.target.value)}
        />
        <label htmlFor="expense-amount">Amount (LKR)</label>
        <input
          id="expense-amount"
          placeholder="Amount (LKR)"
          type="number"
          value={expenseAmount}
          onChange={e => setExpenseAmount(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="list">
        {expenses.map(ex => (
          <li key={ex.id} className="list-item">
            <span>
              {ex.desc}: {currency.format(ex.amount)}
            </span>
            <button className="remove" onClick={() => removeExpense(ex.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="summary">Total Expenses: {currency.format(totalExpense)}</p>
    </section>
  );
}

