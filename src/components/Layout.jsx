import React from 'react';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <header className="app-header">Debt App</header>
      <aside className="app-sidebar">
        <nav>
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Debts</a></li>
            <li><a href="#">Income</a></li>
            <li><a href="#">Expenses</a></li>
          </ul>
        </nav>
      </aside>
      <main className="app-content">{children}</main>
      <nav className="app-bottom-nav">
        <a href="#">Overview</a>
        <a href="#">Debts</a>
        <a href="#">Income</a>
        <a href="#">Expenses</a>
      </nav>
    </div>
  );
}
