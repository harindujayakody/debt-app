import { useState, useEffect } from 'react';

const currency = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
});

export default function App() {
  // Debt state
  const [debts, setDebts] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('debts') || '[]');
    return saved.map(d => ({ ...d, original: d.original ?? d.amount }));
  });
  const [debtor, setDebtor] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Income state
  const [incomes, setIncomes] = useState(() =>
    JSON.parse(localStorage.getItem('incomes') || '[]')
  );
  const [incomeDesc, setIncomeDesc] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  // Expense state
  const [expenses, setExpenses] = useState(() =>
    JSON.parse(localStorage.getItem('expenses') || '[]')
  );
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const totalDebt = debts.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = totalIncome - totalExpense - totalDebt;
  const usedPercent = totalIncome
    ? ((totalDebt + totalExpense) / totalIncome) * 100
    : 0;
  const remainingPercent = Math.max(0, 100 - usedPercent);

  useEffect(() => {
    localStorage.setItem('debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  function addDebt(e) {
    e.preventDefault();
    if (!debtor || !debtAmount) return;
    if (editingId !== null) {
      setDebts(
        debts.map(d =>
          d.id === editingId
            ? {
                ...d,
                person: debtor,
                amount: Number(debtAmount),
                original: Number(debtAmount),
              }
            : d
        )
      );
      setEditingId(null);
    } else {
      setDebts([
        ...debts,
        {
          id: Date.now(),
          person: debtor,
          amount: Number(debtAmount),
          original: Number(debtAmount),
        },
      ]);
    }
    setDebtor('');
    setDebtAmount('');
  }

  function editDebt(id) {
    const d = debts.find(x => x.id === id);
    if (d) {
      setDebtor(d.person);
      setDebtAmount(String(d.amount));
      setEditingId(id);
    }
  }

  function removeDebt(id) {
    setDebts(debts.filter(d => d.id !== id));
  }

  function payDebt(id) {
    const payment = Number(prompt('Payment amount (LKR)'));
    if (!payment || isNaN(payment)) return;
    setDebts(
      debts.map(d =>
        d.id === id ? { ...d, amount: Math.max(d.amount - payment, 0) } : d
      )
    );
  }

  function addIncome(e) {
    e.preventDefault();
    if (!incomeDesc || !incomeAmount) return;
    setIncomes([...incomes, { id: Date.now(), desc: incomeDesc, amount: Number(incomeAmount) }]);
    setIncomeDesc('');
    setIncomeAmount('');
  }

  function removeIncome(id) {
    setIncomes(incomes.filter(i => i.id !== id));
  }

  function addExpense(e) {
    e.preventDefault();
    if (!expenseDesc || !expenseAmount) return;
    setExpenses([...expenses, { id: Date.now(), desc: expenseDesc, amount: Number(expenseAmount) }]);
    setExpenseDesc('');
    setExpenseAmount('');
  }

  function removeExpense(id) {
    setExpenses(expenses.filter(ex => ex.id !== id));
  }

  return (
    <div className="container">
      <h1>Money Tracker</h1>

      <div className="dashboard">
        <div className="card">
          <h3>Gross Income</h3>
          <p className="value">{currency.format(totalIncome)}</p>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${Math.min(usedPercent, 100)}%` }} />
          </div>
          <div className="card-footer">
            <span>Spent {(usedPercent).toFixed(0)}%</span>
            <span>Remaining {remainingPercent.toFixed(0)}%</span>
          </div>
        </div>
        <div className="card">
          <h3>Total Debt</h3>
          <p className="value">{currency.format(totalDebt)}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p className="value">{currency.format(totalExpense)}</p>
        </div>
        <div className="card">
          <h3>Remaining Balance</h3>
          <p className="value">{currency.format(remaining)}</p>
        </div>
      </div>

      <section className="section">
        <h2>Debts</h2>
        <form onSubmit={addDebt} className="form">
          <input
            placeholder="For who"
            value={debtor}
            onChange={e => setDebtor(e.target.value)}
          />
          <input
            placeholder="Amount (LKR)"
            type="number"
            value={debtAmount}
            onChange={e => setDebtAmount(e.target.value)}
          />
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        </form>
        <ul className="list">
          {debts.map(d => {
            const paid = ((d.original - d.amount) / d.original) * 100;
            return (
              <li key={d.id} className="list-item">
                <div className="debt-text">
                  <span>{d.person}: {currency.format(d.amount)}</span>
                  <div className="progress tiny">
                    <div className="progress-bar" style={{ width: `${Math.min(paid,100)}%` }} />
                  </div>
                </div>
                <div>
                  <button className="edit" onClick={() => editDebt(d.id)}>Edit</button>
                  <button className="pay" onClick={() => payDebt(d.id)}>Pay</button>
                  <button className="remove" onClick={() => removeDebt(d.id)}>Remove</button>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="summary">Total Debt: {currency.format(totalDebt)}</p>
      </section>

      <section className="section">
        <h2>Income</h2>
        <form onSubmit={addIncome} className="form">
          <input
            placeholder="Source"
            value={incomeDesc}
            onChange={e => setIncomeDesc(e.target.value)}
          />
          <input
            placeholder="Amount (LKR)"
            type="number"
            value={incomeAmount}
            onChange={e => setIncomeAmount(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul className="list">
          {incomes.map(i => (
            <li key={i.id} className="list-item">
              <span>{i.desc}: {currency.format(i.amount)}</span>
              <button className="remove" onClick={() => removeIncome(i.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p className="summary">Total Income: {currency.format(totalIncome)}</p>
      </section>

      <section className="section">
        <h2>Expenses</h2>
        <form onSubmit={addExpense} className="form">
          <input
            placeholder="Description"
            value={expenseDesc}
            onChange={e => setExpenseDesc(e.target.value)}
          />
          <input
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
              <span>{ex.desc}: {currency.format(ex.amount)}</span>
              <button className="remove" onClick={() => removeExpense(ex.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p className="summary">Total Expenses: {currency.format(totalExpense)}</p>
      </section>
    </div>
  );
}
