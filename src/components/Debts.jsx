import { useState, useEffect } from 'react';

const currency = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
});

export default function Debts() {
  const [debts, setDebts] = useState(() =>
    JSON.parse(localStorage.getItem('debts') || '[]')
  );
  const [debtor, setDebtor] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('debts', JSON.stringify(debts));
  }, [debts]);

  function addDebt(e) {
    e.preventDefault();
    if (!debtor || !debtAmount) return;
    if (editingId !== null) {
      setDebts(
        debts.map(d =>
          d.id === editingId
            ? { ...d, person: debtor, amount: Number(debtAmount) }
            : d
        )
      );
      setEditingId(null);
    } else {
      setDebts([
        ...debts,
        { id: Date.now(), person: debtor, amount: Number(debtAmount) },
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

  const totalDebt = debts.reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <section className="section">
      <h2>Debts</h2>
      <form onSubmit={addDebt} className="form">
        <label htmlFor="debt-person">Debtor</label>
        <input
          id="debt-person"
          placeholder="For who"
          value={debtor}
          onChange={e => setDebtor(e.target.value)}
        />
        <label htmlFor="debt-amount">Amount (LKR)</label>
        <input
          id="debt-amount"
          placeholder="Amount (LKR)"
          type="number"
          value={debtAmount}
          onChange={e => setDebtAmount(e.target.value)}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <ul className="list">
        {debts.map(d => (
          <li key={d.id} className="list-item">
            <span>
              {d.person}: {currency.format(d.amount)}
            </span>
            <div>
              <button className="edit" onClick={() => editDebt(d.id)}>
                Edit
              </button>
              <button className="pay" onClick={() => payDebt(d.id)}>
                Pay
              </button>
              <button className="remove" onClick={() => removeDebt(d.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="summary">Total Debt: {currency.format(totalDebt)}</p>
    </section>
  );
}

