import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import api from '../services/api';

export default function Calendar() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/transactions');
        // Filter specifically for "Travel" category, or all expenses if none
        const allTx = res.data.data;
        const trips = allTx.filter(t => t.category === 'Travel');
        setTransactions(trips);
      } catch (e) {
        console.error("Failed to load trips", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalSpent = transactions.reduce((acc, t) => acc + Math.abs(t.amount), 0);

  if (loading) {
    return <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>Loading trips data...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>Travel & Trips</h2>
          <p className="max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Track your expedition expenses. Below is a ledger of your travels across the planet.
          </p>
        </div>
        <div className="flex gap-4">
          <div
            className="p-4 rounded-xl flex flex-col items-end min-w-[150px]"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>Total Travel Spend</span>
            <span className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>₹{totalSpent.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Main List */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="p-8 min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>Trip Log</h3>
            </div>

            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map(tx => (
                  <div
                    key={tx._id}
                    className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--bg-surface-raised)', color: 'var(--text-muted)' }}
                      >
                        <span className="material-symbols-outlined text-lg">flight_takeoff</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm" style={{ color: 'var(--text-heading)' }}>{tx.title}</h4>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color: 'var(--danger)' }}>-₹{Math.abs(tx.amount).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
                 <p>No travel expenses logged yet.</p>
                 <p className="text-sm mt-2">Add a transaction with the category "Travel" and it will appear here.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Info Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="p-8 flex flex-col justify-center text-center">
             <div
               className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
               style={{ backgroundColor: 'var(--bg-surface-raised)', color: 'var(--text-muted)' }}
             >
               <span className="material-symbols-outlined text-2xl">luggage</span>
             </div>
             <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>Ready for a trip?</h3>
             <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
               Ensure you tag any transport, lodging, or vacation meals under the "Travel" category to maintain this ledger.
             </p>
             <button
               className="px-6 py-3 font-semibold rounded-xl transition"
               style={{
                 backgroundColor: 'var(--accent)',
                 color: 'white',
               }}
             >
               Plan Budget
             </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
