import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

import Card from "../components/Card";
import Table from "../components/Table";

export default function Dashboard() {
  const { user } = useAuth();
  const [userName, setUserName] = useState("User");
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  
  // Filtering states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/transactions');
      setTransactions(res.data.data);
      buildChart(res.data.data);
    } catch (err) {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name.split(" ")[0]);
    }
    fetchTransactions();
  }, [user]);

  function buildChart(data) {
    const daily = {};

    data.forEach((tx) => {
      const date = new Date(tx.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
      // Separate income and expense for chart
      if (!daily[date]) {
         daily[date] = { name: date, income: 0, expense: 0 };
      }
      if (tx.type === 'income') {
         daily[date].income += tx.amount;
      } else {
         daily[date].expense += Math.abs(tx.amount);
      }
    });

    const result = Object.values(daily);
    setChartData(result.slice(-7));
  }

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/api/transactions/${id}`);
      toast.success("Transaction deleted");
      fetchTransactions();
    } catch (err) {
      toast.error("Failed to delete transaction");
    }
  };

  // Safe data filtering
  const filteredTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    const inCategory = filterCategory ? tx.category.toLowerCase().includes(filterCategory.toLowerCase()) : true;
    const afterStart = filterStartDate ? txDate >= new Date(filterStartDate) : true;
    const beforeEnd = filterEndDate ? txDate <= new Date(filterEndDate) : true;
    return inCategory && afterStart && beforeEnd;
  });

  const balance = filteredTransactions.reduce((sum, tx) => Object.is(tx.type, 'income') ? sum + tx.amount : sum - Math.abs(tx.amount), 0);
  const income = filteredTransactions.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0);
  const expense = filteredTransactions.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const tableData = filteredTransactions.slice(0, 5).map((tx) => ({
    title: tx.title,
    category: tx.category,
    type: tx.type === 'income' ? <span className="text-emerald-400">Income</span> : <span className="text-red-400">Expense</span>,
    amount: <span className={tx.type === 'income' ? "text-emerald-400" : "text-red-400"}> {tx.type === 'income' ? '+' : '-'}₹{Math.abs(tx.amount).toFixed(2)} </span>,
    date: new Date(tx.date).toLocaleDateString(),
    actions: (
      <button onClick={() => handleDelete(tx._id)} className="text-red-500 hover:text-red-400 p-1">
        <span className="material-symbols-outlined text-sm">delete</span>
      </button>
    )
  }));

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    { header: "Type", accessor: "type" },
    { header: "Amount", accessor: "amount" },
    { header: "Date", accessor: "date" },
    { header: "", accessor: "actions" }
  ];

  if (loading) {
     return <div className="p-6 text-center text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
     </div>
  }

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-white">
        Welcome, {userName} 👋
      </h1>

      {/* FILTERING ROW */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800/50 p-4 rounded-[1.5rem] border border-slate-700">
        <div className="flex-1 w-full">
           <label className="text-xs text-slate-400 block mb-1">Search Category</label>
           <input 
             type="text" 
             placeholder="e.g. Food, Salary..." 
             value={filterCategory} 
             onChange={e => setFilterCategory(e.target.value)} 
             className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-500" 
           />
        </div>
        <div className="flex-1 w-full">
           <label className="text-xs text-slate-400 block mb-1">Start Date</label>
           <input 
             type="date" 
             value={filterStartDate} 
             onChange={e => setFilterStartDate(e.target.value)} 
             className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-500" 
             style={{ colorScheme: 'dark' }}
           />
        </div>
        <div className="flex-1 w-full">
           <label className="text-xs text-slate-400 block mb-1">End Date</label>
           <input 
             type="date" 
             value={filterEndDate} 
             onChange={e => setFilterEndDate(e.target.value)} 
             className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-500" 
             style={{ colorScheme: 'dark' }}
           />
        </div>
        <button onClick={() => {setFilterCategory(''); setFilterStartDate(''); setFilterEndDate('');}} className="md:mt-5 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all w-full md:w-auto">
          Clear
        </button>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <p className="text-gray-400">Balance</p>
          <h2 className="text-2xl text-white font-bold">₹{balance.toFixed(2)}</h2>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400">Income</p>
          <h2 className="text-emerald-400 text-2xl font-bold">₹{income.toFixed(2)}</h2>
        </Card>

        <Card className="p-6">
          <p className="text-gray-400">Expenses</p>
          <h2 className="text-red-400 text-2xl font-bold">₹{expense.toFixed(2)}</h2>
        </Card>
      </div>

      {/* CHART */}
      <Card className="p-6">
        <h2 className="text-white mb-4">Weekly Spending</h2>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
              <Bar dataKey="income" fill="#34d399" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-slate-500">
            No spending data found.
          </div>
        )}
      </Card>

      {/* TABLE */}
      <Card className="p-6">
        <h2 className="text-white mb-4">Recent Transactions</h2>
        {filteredTransactions.length > 0 ? (
            <Table columns={columns} data={tableData} />
        ) : (
           <p className="text-slate-500 text-sm">No transactions match your filters.</p>
        )}
      </Card>

    </div>
  );
}