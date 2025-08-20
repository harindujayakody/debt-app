import { useState, useEffect } from 'react';

const currency = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
});

export default function Income() {
  const [incomes, setIncomes] = useState(() =>
    JSON.parse(localStorage.getItem('incomes') || '[]')
  );
  const [incomeDesc, setIncomeDesc] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  function addIncome(e) {
    e.preventDefault();
    if (!incomeDesc || !incomeAmount) return;
    setIncomes([
      ...incomes,
      { id: Date.now(), desc: incomeDesc, amount: Number(incomeAmount) },
    ]);
    setIncomeDesc('');
    setIncomeAmount('');
  }

  function removeIncome(id) {
    setIncomes(incomes.filter(i => i.id !== id));
  }

  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <section className="section">
      <h2>Income</h2>
      <form onSubmit={addIncome} className="form">
        <label htmlFor="income-source">Source</label>
        <input
          id="income-source"
          placeholder="Source"
          value={incomeDesc}
          onChange={e => setIncomeDesc(e.target.value)}
        />
        <label htmlFor="income-amount">Amount (LKR)</label>
        <input
          id="income-amount"
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
            <span>
              {i.desc}: {currency.format(i.amount)}
            </span>
            <button className="remove" onClick={() => removeIncome(i.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="summary">Total Income: {currency.format(totalIncome)}</p>
    </section>
  );
}

