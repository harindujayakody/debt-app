import { Link, Routes, Route } from 'react-router-dom';
import Debts from './components/Debts';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Summary from './components/Summary';

export default function App() {
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
      <Routes>
        <Route path="/debts" element={<Debts />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/" element={<Summary />} />
      </Routes>
    </div>
  );
}

