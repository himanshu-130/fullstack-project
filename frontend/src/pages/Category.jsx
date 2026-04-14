import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const txData = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(txData);

    // Extract unique categories
    const unique = [...new Set(txData.map(tx => tx.category))];
    setCategories(unique);
  }, []);

  // ➕ ADD CATEGORY
  const addCategory = () => {
    if (!newCategory.trim()) return;

    const updated = [...categories, newCategory];
    setCategories(updated);

    setNewCategory("");
  };

  // ❌ DELETE CATEGORY
  const deleteCategory = (cat) => {
    const updated = categories.filter(c => c !== cat);
    setCategories(updated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>Categories</h2>

      {/* ➕ ADD CATEGORY */}
      <div className="flex gap-3 mb-6">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add category"
          className="p-2 rounded-xl w-full outline-none"
          style={{
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-input)',
            color: 'var(--text-primary)',
          }}
        />
        <button
          onClick={addCategory}
          className="px-4 rounded-xl font-bold transition"
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
        >
          Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {categories.length === 0 ? (
        <Card className="p-12 text-center">
          <p style={{ color: 'var(--text-muted)' }}>No categories yet</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, index) => {
            const count = transactions.filter(
              tx => tx.category === cat
            ).length;

            return (
              <Card key={index} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-bold" style={{ color: 'var(--text-heading)' }}>{cat}</h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {count} transactions
                  </p>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteCategory(cat)}
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--danger)' }}
                >
                  Delete
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}