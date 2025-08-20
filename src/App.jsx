import { useState } from 'react';

export default function App() {
  // Debt state
  const [debts, setDebts] = useState([]);
  const [debtor, setDebtor] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Income state
  const [incomes, setIncomes] = useState([]);
  const [incomeDesc, setIncomeDesc] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  // Expense state
  const [expenses, setExpenses] = useState([]);
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const totalDebt = debts.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = totalIncome - totalExpense - totalDebt;

  function addDebt(e) {
    e.preventDefault();
    if (!debtor || !debtAmount) return;
    if (editingId !== null) {
      setDebts(debts.map(d => d.id === editingId ? { ...d, person: debtor, amount: Number(debtAmount) } : d));
      setEditingId(null);
    } else {
      setDebts([...debts, { id: Date.now(), person: debtor, amount: Number(debtAmount) }]);
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
      <h1>Debt Manager</h1>

      <section className="section">
        <h2>Debts</h2>
        <form onSubmit={addDebt} className="form">
          <input
            placeholder="For who"
            value={debtor}
            onChange={e => setDebtor(e.target.value)}
          />
          <input
            placeholder="Amount"
            type="number"
            value={debtAmount}
            onChange={e => setDebtAmount(e.target.value)}
          />
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        </form>
        <ul className="list">
          {debts.map(d => (
            <li key={d.id} className="list-item">
              <span>{d.person} owes ${d.amount}</span>
              <div>
                <button onClick={() => editDebt(d.id)}>Edit</button>
                <button onClick={() => removeDebt(d.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <p className="summary">Total Debt: ${totalDebt}</p>
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
            placeholder="Amount"
            type="number"
            value={incomeAmount}
            onChange={e => setIncomeAmount(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul className="list">
          {incomes.map(i => (
            <li key={i.id} className="list-item">
              <span>{i.desc}: ${i.amount}</span>
              <button onClick={() => removeIncome(i.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p className="summary">Total Income: ${totalIncome}</p>
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
            placeholder="Amount"
            type="number"
            value={expenseAmount}
            onChange={e => setExpenseAmount(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul className="list">
          {expenses.map(ex => (
            <li key={ex.id} className="list-item">
              <span>{ex.desc}: ${ex.amount}</span>
              <button onClick={() => removeExpense(ex.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p className="summary">Total Expenses: ${totalExpense}</p>
      </section>

      <section className="section">
        <h2>Summary</h2>
        <p className="summary">Remaining Balance: ${remaining}</p>
      </section>
    </div>
  );
}
