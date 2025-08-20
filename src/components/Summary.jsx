const currency = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR',
});

export default function Summary() {
  const debts = JSON.parse(localStorage.getItem('debts') || '[]');
  const incomes = JSON.parse(localStorage.getItem('incomes') || '[]');
  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');

  const totalDebt = debts.reduce((sum, d) => sum + Number(d.amount), 0);
  const totalIncome = incomes.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = totalIncome - totalExpense - totalDebt;

  return (
    <section className="section">
      <h2>Summary</h2>
      <p className="summary">Remaining Balance: {currency.format(remaining)}</p>
    </section>
  );
}

