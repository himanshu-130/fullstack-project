import React from 'react';

export default function Table({ columns, data }) {
  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        border: '1px solid var(--border-primary)',
        backgroundColor: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <table className="min-w-full text-left text-sm" style={{ color: 'var(--text-secondary)' }}>
        <thead style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
          <tr>
            {columns.map((column) => (
              <th key={column.header} className="px-5 py-4 font-semibold text-xs uppercase tracking-wider">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              className="transition duration-200"
              style={{
                borderBottom: '1px solid var(--border-primary)',
              }}
            >
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
