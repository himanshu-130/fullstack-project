import React, { useEffect, useState } from 'react';

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

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Budgets</h2>

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (
        <div className="empty-state">
          No budget data yet 🚀 <br />
          Add transactions to see insights
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FOOD */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-bold mb-2">Food</h3>
            <p>₹{budgets.food}</p>
            <div className="bar">
              <div style={{ width: `${(budgets.food / total) * 100}%` }} />
            </div>
          </div>

          {/* LIVING */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-bold mb-2">Living</h3>
            <p>₹{budgets.living}</p>
            <div className="bar">
              <div style={{ width: `${(budgets.living / total) * 100}%` }} />
            </div>
          </div>

          {/* TRANSPORT */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-bold mb-2">Transport</h3>
            <p>₹{budgets.transport}</p>
            <div className="bar">
              <div style={{ width: `${(budgets.transport / total) * 100}%` }} />
            </div>
          </div>

          {/* PERSONAL */}
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-bold mb-2">Personal</h3>
            <p>₹{budgets.personal}</p>
            <div className="bar">
              <div style={{ width: `${(budgets.personal / total) * 100}%` }} />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}