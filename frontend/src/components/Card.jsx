export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-300 ${className}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-primary)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {children}
    </div>
  );
}