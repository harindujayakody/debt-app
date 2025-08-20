import { useState, useEffect } from 'react';

const categories = ['Food', 'Transport', 'Utilities', 'Other'];

export default function QuickAddExpense({ onSave, onClose }) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(
    () => localStorage.getItem('lastExpenseCategory') || categories[0]
  );

  useEffect(() => {
    localStorage.setItem('lastExpenseCategory', category);
  }, [category]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!desc || !amount) return;
    onSave({ desc, amount: Number(amount), category });
    setDesc('');
    setAmount('');
  }

  return (
    <div className="quick-add-overlay">
      <form className="quick-add-form" onSubmit={handleSubmit}>
        <h2>Quick Add Expense</h2>
        <label>
          Description
          <input value={desc} onChange={e => setDesc(e.target.value)} />
        </label>
        <label>
          Amount (LKR)
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </label>
        <label>
          Category
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <div className="actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
