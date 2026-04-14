import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import Card from '../components/Card';

export default function Home() {
  const [userName, setUserName] = useState('User');
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  // 🔥 DELETE FUNCTION
  const deleteTx = (id) => {
    const updated = transactions.filter((tx) => tx.id !== id);
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    updateChart(updated); // important
  };

  // 🔥 CHART UPDATE FUNCTION
  const updateChart = (txData) => {
    const grouped = {};

    txData.forEach(tx => {
      const day = new Date(tx.date).toLocaleDateString('en-US', {
        weekday: 'short'
      });

      if (!grouped[day]) {
        grouped[day] = { name: day, income: 0, expense: 0 };
      }

      if (tx.type === 'income') {
        grouped[day].income += tx.amount;
      } else {
        grouped[day].expense += Math.abs(tx.amount);
      }
    });

    setChartData(Object.values(grouped));
  };

  useEffect(() => {
    try {
      // 👤 USER
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const parsedUser = JSON.parse(userStr);
        setUserName(parsedUser.name?.split(' ')[0] || 'User');
      }

      // 💰 TRANSACTIONS
      const txData = JSON.parse(localStorage.getItem('transactions')) || [];
      setTransactions(txData);

      updateChart(txData);

    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}! 👋</h1>
        <p className="text-gray-600">
          Here's what's happening with your finances today.
        </p>
      </header>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-1">₹{transactions.reduce((acc, tx) => acc + tx.amount, 0).toFixed(2)}</div>
          <div className="text-sm font-medium text-gray-500">Total Balance</div>
        </Card>

        <Card className="p-8 text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-1">₹{transactions
            .filter(tx => tx.type === 'income')
            .reduce((acc, tx) => acc + tx.amount, 0)
            .toFixed(2)}</div>
          <div className="text-sm font-medium text-gray-500">Income</div>
        </Card>

        <Card className="p-8 text-center">
          <div className="text-3xl font-bold text-red-600 mb-1">₹{transactions
            .filter(tx => tx.type === 'expense')
            .reduce((acc, tx) => acc + Math.abs(tx.amount), 0)
            .toFixed(2)}</div>
          <div className="text-sm font-medium text-gray-500">Expenses</div>
        </Card>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* CHART */}
        <Card className="!p-0">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Spending Overview</h3>
          </div>

          <div className="p-6">
            {chartData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data 📊
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
                  <YAxis axisLine={false} tickLine={false} tickMargin={10} />
                  <Tooltip />
                  <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* TRANSACTIONS */}
        <Card className="!p-0">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
          </div>

          <div className="p-6 divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                No transactions yet 🚀
              </div>
            ) : (
              transactions.slice(0, 5).map(tx => (
                <div key={tx.id} className="py-4 flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-xl ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      <span className="material-symbols-outlined text-sm">
                        {tx.type === 'income' ? 'account_balance_wallet' : 'shopping_bag'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{tx.name}</h4>
                      <span className="text-sm text-gray-500">{tx.category} • {new Date(tx.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`font-semibold text-lg ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.type === 'income' ? '+' : '-'}₹{Math.abs(tx.amount).toFixed(2)}
                    </span>
                    <button
                      onClick={() => deleteTx(tx.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Delete transaction"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

      </section>
    </div>
  );
}