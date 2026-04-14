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
    return <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>Loading approvals...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold" style={{ color: 'var(--text-heading)' }}>Approvals & Breakdown</h1>
      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="p-8 shadow-xl rounded-2xl"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-primary)',
          }}
        >
          <p className="text-sm uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Total Requiring Approval</p>
          <h3 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-heading)' }}>
            ₹{totalExpense.toFixed(2)}
          </h3>
          {transactions.length === 0 && (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No data yet</p>
          )}
        </div>

        {/* ALERT */}
        <div
          className="md:col-span-2 p-8 rounded-2xl flex items-center"
          style={{
            backgroundColor: 'var(--warning-subtle)',
            border: '1px solid var(--warning)',
            borderColor: 'rgba(251, 191, 36, 0.2)',
          }}
        >
          {transactions.length === 0 ? (
            <p style={{ color: 'var(--warning)' }}>No pending approvals. Add transactions to request reimbursement 🚀</p>
          ) : (
            <p className="font-medium" style={{ color: 'var(--warning)' }}>Review your categorized expenses requiring approval 📊</p>
          )}
        </div>
      </section>

      {/* BREAKDOWN */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
           <div
             className="p-8 h-full rounded-2xl"
             style={{
               backgroundColor: 'var(--bg-card)',
               border: '1px solid var(--border-primary)',
             }}
           >
             <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Approval Queue</h3>
             {transactions.length > 0 ? (
               <div className="space-y-4">
                 {transactions.slice(0, 8).map(tx => (
                   <div
                     key={tx._id}
                     className="flex justify-between items-center p-4 rounded-xl"
                     style={{
                       backgroundColor: 'var(--bg-surface)',
                       border: '1px solid var(--border-primary)',
                     }}
                   >
                     <div>
                       <p className="font-medium" style={{ color: 'var(--text-heading)' }}>{tx.title}</p>
                       <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{new Date(tx.date).toLocaleDateString()}</p>
                     </div>
                     <div className="flex items-center gap-4">
                       <span
                         className="px-2 py-1 rounded text-xs font-bold"
                         style={{
                           backgroundColor: tx.type === 'expense' ? 'var(--danger-subtle)' : 'var(--success-subtle)',
                           color: tx.type === 'expense' ? 'var(--danger)' : 'var(--success)',
                         }}
                       >
                         {tx.type}
                       </span>
                       <span className="font-bold" style={{ color: 'var(--text-heading)' }}>₹{Math.abs(tx.amount).toFixed(2)}</span>
                     </div>
                   </div>
                 ))}
               </div>
             ) : (
               <p style={{ color: 'var(--text-muted)' }}>Queue is clear.</p>
             )}
           </div>
        </div>

        {/* CATEGORY */}
        <div className="lg:col-span-4">
           <div
             className="p-8 h-full rounded-2xl"
             style={{
               backgroundColor: 'var(--bg-card)',
               border: '1px solid var(--border-primary)',
             }}
           >
             <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Category Breakdown</h3>
             {totalExpense === 0 ? (
               <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                 No expense data to break down.
               </div>
             ) : (
               <div className="space-y-5">
                 {Object.entries(breakdown).map(([key, value]) => {
                   const percent = totalExpense ? (value / totalExpense) * 100 : 0;
                   return (
                     <div key={key}>
                       <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                         <span>{key}</span>
                         <span className="font-bold">₹{value.toFixed(2)}</span>
                       </div>
                       <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-raised)' }}>
                         <div
                           className="h-full rounded-full transition-all"
                           style={{ width: `${percent}%`, backgroundColor: 'var(--accent)' }}
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