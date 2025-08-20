import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="container">
      <h1>Debt Manager</h1>
      <nav>
        <ul className="nav">
          <li><Link to="/debts">Debts</Link></li>
          <li><Link to="/income">Income</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/summary">Summary</Link></li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
