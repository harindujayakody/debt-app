import { Routes, Route } from 'react-router-dom';
import Debts from './components/Debts';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Summary from './components/Summary';

export default function App() {
  return (
    <Routes>
      <Route path="/debts" element={<Debts />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/" element={<Summary />} />
    </Routes>
  );
}

