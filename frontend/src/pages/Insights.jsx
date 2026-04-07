import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';

export default function Insights() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/transactions');
        setTransactions(res.data.data);
      } catch (e) {
        console.error("Failed to load transactions", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  // Group by category
  const breakdown = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  if (loading) {
    return <div className="p-6 text-center text-white">Loading approvals...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Approvals & Breakdown</h1>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-zinc-900 shadow-xl border border-zinc-800 rounded-2xl">
          <p className="text-sm uppercase text-zinc-400 mb-1">Total Requiring Approval</p>
          <h3 className="text-4xl font-bold text-white mb-4">
            ₹{totalExpense.toFixed(2)}
          </h3>
          {transactions.length === 0 && (
            <p className="text-sm text-zinc-500">No data yet</p>
          )}
        </div>

        {/* ALERT */}
        <div className="md:col-span-2 p-8 rounded-[1.5rem] border border-yellow-500/20 bg-yellow-500/10 flex items-center">
          {transactions.length === 0 ? (
            <p className="text-yellow-400">No pending approvals. Add transactions to request reimbursement 🚀</p>
          ) : (
            <p className="text-yellow-400 font-medium">Review your categorized expenses requiring approval 📊</p>
          )}
        </div>
      </section>

      {/* BREAKDOWN */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
           <div className="p-8 h-full bg-zinc-900 border border-zinc-800 rounded-2xl">
             <h3 className="text-xl font-bold text-white mb-6">Approval Queue</h3>
             {transactions.length > 0 ? (
               <div className="space-y-4">
                 {transactions.slice(0, 8).map(tx => (
                   <div key={tx._id} className="flex justify-between items-center p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                     <div>
                       <p className="text-white font-medium">{tx.title}</p>
                       <p className="text-xs text-zinc-500">{new Date(tx.date).toLocaleDateString()}</p>
                     </div>
                     <div className="flex items-center gap-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${tx.type === 'expense' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                         {tx.type}
                       </span>
                       <span className="text-white font-bold">₹{Math.abs(tx.amount).toFixed(2)}</span>
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-zinc-500">Queue is clear.</p>
             )}
           </div>
        </div>

        {/* CATEGORY */}
        <div className="lg:col-span-4">
           <div className="p-8 h-full bg-zinc-900 border border-zinc-800 rounded-2xl">
             <h3 className="text-xl font-bold text-white mb-6">Category Breakdown</h3>
             {totalExpense === 0 ? (
               <div className="text-zinc-500 text-sm">
                 No expense data to break down.
               </div>
             ) : (
               <div className="space-y-5">
                 {Object.entries(breakdown).map(([key, value]) => {
                   const percent = totalExpense ? (value / totalExpense) * 100 : 0;
                   return (
                     <div key={key}>
                       <div className="flex justify-between text-sm mb-2 text-white">
                         <span>{key}</span>
                         <span className="font-bold">₹{value.toFixed(2)}</span>
                       </div>
                       <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                         <div
                           className="bg-zinc-400 h-full rounded-full"
                           style={{ width: `${percent}%` }}
                         />
                       </div>
                     </div>
                   );
                 })}
               </div>
             )}
           </div>
        </div>
      </section>
    </div>
  );
}