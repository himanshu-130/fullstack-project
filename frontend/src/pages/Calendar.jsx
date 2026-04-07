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
    return <div className="p-6 text-center text-zinc-500">Loading trips data...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-headline font-extrabold tracking-tight text-white">Travel & Trips</h2>
          <p className="text-zinc-400 max-w-xl">
            Track your expedition expenses. Below is a ledger of your travels across the planet.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col items-end min-w-[150px]">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Total Travel Spend</span>
            <span className="text-2xl font-headline font-bold text-white">₹{totalSpent.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Main List */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="p-8 bg-zinc-900 border-zinc-800 min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Trip Log</h3>
            </div>

            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map(tx => (
                  <div key={tx._id} className="p-4 rounded-xl bg-black border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <span className="material-symbols-outlined text-lg">flight_takeoff</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{tx.title}</h4>
                        <p className="text-xs text-zinc-500">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-400">-₹{Math.abs(tx.amount).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-zinc-500 py-12">
                 <p>No travel expenses logged yet.</p>
                 <p className="text-sm mt-2">Add a transaction with the category "Travel" and it will appear here.</p>
              </div>
            )}
          </Card>
        </div>

        {/* Info Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="p-8 bg-zinc-900 border-zinc-800 flex flex-col justify-center text-center">
             <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-4">
               <span className="material-symbols-outlined text-zinc-400 text-2xl">luggage</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Ready for a trip?</h3>
             <p className="text-zinc-400 text-sm mb-6">
               Ensure you tag any transport, lodging, or vacation meals under the "Travel" category to maintain this ledger.
             </p>
             <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition">
               Plan Budget
             </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
