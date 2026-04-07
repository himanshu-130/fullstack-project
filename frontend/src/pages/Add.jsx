import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import Button from "../components/Button";

export default function Add() {
  const [form, setForm] = useState({
    title: "",
    amount: "0.00",
    category: "Dining",
    type: "expense",
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'Fuel', icon: 'local_gas_station' },
    { id: 'Dining', icon: 'restaurant' },
    { id: 'Travel', icon: 'flight' },
    { id: 'Offices', icon: 'domain' },
    { id: 'Other', icon: 'more_horiz' },
  ];

  const frequentMerchants = [
    { name: 'Starbucks', icon: 'local_cafe' },
    { name: 'Uber', icon: 'directions_car' },
    { name: 'AWS', icon: 'cloud' },
    { name: 'Amazon', icon: 'shopping_bag' },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (cat) => {
    setForm({ ...form, category: cat });
  };

  const handleMerchantSelect = (merchant) => {
    setForm({ ...form, title: merchant });
  };

  const handleAmountChange = (e) => {
    // Basic number handling for the large input
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setForm({ ...form, amount: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || parseFloat(form.amount) === 0) {
      toast.error("Please provide a valid merchant and amount.");
      return;
    }
    
    setLoading(true);
    try {
      await api.post("/api/transactions", { ...form, amount: parseFloat(form.amount) });
      toast.success("Transaction Added 🚀"); 
      setForm({ title: "", amount: "0.00", category: "Dining", type: "expense", date: new Date().toISOString().split('T')[0] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">New Transaction</h1>
          <p className="text-zinc-400 mt-1">Add details for your upcoming financial audit.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Amount Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Total Transaction Amount</span>
            <div className="flex items-center text-[#34d399] drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <span className="text-5xl font-bold mr-4">₹</span>
              <input
                type="text"
                value={form.amount}
                onChange={handleAmountChange}
                className="bg-transparent text-8xl font-black tracking-tighter outline-none w-[350px] text-center"
                placeholder="0.00"
              />
            </div>
            {/* Background decorative icon */}
            <span className="material-symbols-outlined absolute right-8 top-1/2 -translate-y-1/2 text-[150px] text-zinc-800/20 pointer-events-none">
              payments
            </span>
          </div>

          {/* Details Form Box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 block ml-1">Merchant Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">storefront</span>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Select Merchant"
                      className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 outline-none focus:border-[#34d399] transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 block ml-1">Transaction Date</label>
                  <div className="relative">
                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">calendar_month</span>
                     <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      style={{ colorScheme: 'dark' }}
                      className="w-full bg-black border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-[#34d399] transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <label className="text-xs font-bold text-zinc-400 block ml-1">Expense Category</label>
                 <div className="flex flex-wrap gap-4">
                   {categories.map((cat) => (
                     <button
                       key={cat.id}
                       type="button"
                       onClick={() => handleCategorySelect(cat.id)}
                       className={`flex flex-col items-center justify-center w-24 py-4 rounded-2xl border transition-all ${
                         form.category === cat.id 
                           ? 'border-[#34d399] bg-[#34d399]/10 text-[#34d399]' 
                           : 'border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600'
                       }`}
                     >
                       <span className="material-symbols-outlined mb-2">{cat.icon}</span>
                       <span className="text-xs font-bold">{cat.id}</span>
                     </button>
                   ))}
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 block ml-1">Internal Note (Optional)</label>
                <textarea
                  rows="3"
                  placeholder="Describe the business purpose..."
                  className="w-full bg-black border border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-600 outline-none focus:border-[#34d399] transition-all resize-none"
                ></textarea>
              </div>

               <div className="pt-4 flex justify-end gap-4 items-center">
                 {/* Type Switcher (Expense/Income) styled purely as optional toggle since this is mainly expense view */}
                 <div className="mr-auto flex items-center bg-black border border-zinc-800 rounded-xl p-1">
                    <button type="button" onClick={() => setForm({...form, type: 'expense'})} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${form.type === 'expense' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Expense</button>
                    <button type="button" onClick={() => setForm({...form, type: 'income'})} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${form.type === 'income' ? 'bg-[#34d399]/20 text-[#34d399]' : 'text-zinc-500 hover:text-zinc-300'}`}>Income</button>
                 </div>

                 <button type="button" className="px-8 py-4 rounded-xl bg-zinc-800 text-white font-bold hover:bg-zinc-700 transition">
                   Save Draft
                 </button>
                 <button type="submit" disabled={loading} className="px-8 py-4 rounded-xl bg-[#34d399] text-[#090b10] font-extrabold hover:bg-[#2ebc87] transition shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                   {loading ? "Adding..." : "Add"}
                 </button>
               </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Scanners & Policy */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">
             <div className="flex items-center gap-2 mb-2">
               <span className="material-symbols-outlined text-[#34d399] text-xl">verified_user</span>
               <h3 className="font-bold text-white text-lg">Smart Scan</h3>
             </div>
             <p className="text-zinc-400 text-xs mb-6">AI-powered receipt recognition</p>

             <div className="border-2 border-dashed border-zinc-700 rounded-2xl bg-black relative h-48 flex flex-col items-center justify-center group cursor-pointer hover:border-[#34d399]/50 hover:bg-zinc-900/50 transition-all overflow-hidden">
                <span className="material-symbols-outlined text-4xl text-[#34d399] mb-2 group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">add_a_photo</span>
                <span className="text-white font-bold text-sm">Upload Receipt</span>
                <span className="text-zinc-500 text-[10px] mt-1">PNG, JPG or PDF up to 10MB</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
             </div>

             <div className="flex gap-3 mt-6 items-start">
               <span className="material-symbols-outlined text-blue-400 text-sm mt-0.5">info</span>
               <p className="text-zinc-400 text-[11px] leading-relaxed">
                 Receipt scanning extracts merchant, date, and tax details automatically with <span className="text-white font-bold">99.4%</span> accuracy.
               </p>
             </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg space-y-5">
             <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Policy Check</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#34d399]/10 text-[#34d399] tracking-wider">COMPLIANT</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Tax Rate</span>
                <span className="text-white font-bold text-xs">8.25% (Standard)</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Reimbursable</span>
                <div className="w-8 h-4 bg-[#34d399] rounded-full relative shadow-[0_0_10px_rgba(52,211,153,0.3)] cursor-pointer">
                  <div className="w-3 h-3 bg-zinc-900 rounded-full absolute right-0.5 top-0.5"></div>
                </div>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Project Code</span>
                <span className="text-[#a855f7] font-bold text-[11px] tracking-wider">#LOGIC-2024-X</span>
             </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Frequent Merchants</h3>
            <div className="grid grid-cols-2 gap-3">
              {frequentMerchants.map((m) => (
                 <button 
                   key={m.name}
                   type="button"
                   onClick={() => handleMerchantSelect(m.name)}
                   className="flex items-center gap-3 bg-black border border-zinc-800 p-3 rounded-xl hover:border-zinc-600 transition-colors"
                 >
                    <span className="material-symbols-outlined text-zinc-400 text-sm">{m.icon}</span>
                    <span className="text-white font-bold text-xs">{m.name}</span>
                 </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
