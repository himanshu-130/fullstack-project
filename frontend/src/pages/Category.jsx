import React, { useEffect, useState } from 'react';

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

      <h2 className="text-3xl font-bold mb-6">Categories</h2>

      {/* ➕ ADD CATEGORY */}
      <div className="flex gap-3 mb-6">
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add category"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {categories.length === 0 ? (
<div className="h-40 flex items-center justify-center text-gray-400 text-center">
  No categories yet 
</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          {categories.map((cat, index) => {
            const count = transactions.filter(
              tx => tx.category === cat
            ).length;

            return (
              <div
                key={index}
                className="p-4 bg-white rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold">{cat}</h4>
                  <p className="text-sm text-gray-500">
                    {count} transactions
                  </p>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteCategory(cat)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
}