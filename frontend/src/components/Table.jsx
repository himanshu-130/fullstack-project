import React from 'react';

export default function Table({ columns, data }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/95 shadow-lg shadow-slate-950/20">
      <table className="min-w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-950/90 text-xs uppercase tracking-[0.18em] text-slate-400">
          <tr>
            {columns.map((column) => (
              <th key={column.header} className="px-5 py-4 font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-900/90">
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="transition duration-200 hover:bg-slate-950/80">
              {columns.map((column) => (
                <td key={column.header} className="px-5 py-4 align-top">
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
