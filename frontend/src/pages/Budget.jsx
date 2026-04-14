import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Budgets() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({
    food: 0,
    living: 0,
    transport: 0,
    personal: 0
  });

  useEffect(() => {
    const txData = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(txData);

    // 📊 Calculate categories
    const temp = {
      food: 0,
      living: 0,
      transport: 0,
      personal: 0
    };

    txData.forEach(tx => {
      const amt = Math.abs(tx.amount);

      if (tx.category === 'Groceries') temp.food += amt;
      else if (tx.category === 'Rent') temp.living += amt;
      else if (tx.category === 'Transport') temp.transport += amt;
      else if (tx.category === 'Health') temp.personal += amt;
    });

    setBudgets(temp);
  }, []);

  const total = budgets.food + budgets.living + budgets.transport + budgets.personal;

  const budgetItems = [
    { key: 'food', label: 'Food', icon: 'restaurant', color: 'var(--success)' },
    { key: 'living', label: 'Living', icon: 'home', color: 'var(--info)' },
    { key: 'transport', label: 'Transport', icon: 'directions_car', color: 'var(--warning)' },
    { key: 'personal', label: 'Personal', icon: 'person', color: '#a855f7' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Budgets</h2>

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (
        <Card className="p-12 text-center">
          <span className="material-symbols-outlined text-5xl mb-4" style={{ color: 'var(--text-muted)' }}>savings</span>
          <p style={{ color: 'var(--text-muted)' }}>
            No budget data yet 🚀 <br />
            Add transactions to see insights
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {budgetItems.map(item => {
            const value = budgets[item.key];
            const percent = total > 0 ? (value / total) * 100 : 0;
            return (
              <Card key={item.key} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                  <h3 className="font-bold" style={{ color: 'var(--text-heading)' }}>{item.label}</h3>
                </div>
                <p className="text-2xl font-bold mb-3" style={{ color: 'var(--text-heading)' }}>₹{value}</p>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-raised)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${percent}%`, backgroundColor: item.color }}
                  />
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{percent.toFixed(1)}% of total</p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}