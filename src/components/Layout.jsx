import { useState } from 'react';
import QuickAddExpense from './QuickAddExpense';

export default function Layout({ children, onAddExpense }) {
  const [open, setOpen] = useState(false);

  function handleSave(expense) {
    onAddExpense(expense);
    setOpen(false);
  }

  return (
    <>
      {children}
      <button className="fab" onClick={() => setOpen(true)}>
        +
      </button>
      {open && (
        <QuickAddExpense
          onSave={handleSave}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
