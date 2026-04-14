export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2";

  const styles = {
    primary: "",
    secondary: "",
  };

  const inlineStyles = {
    primary: {
      backgroundColor: 'var(--accent-subtle)',
      color: 'var(--accent)',
      border: '1px solid var(--accent)',
      borderColor: 'rgba(52, 211, 153, 0.2)',
    },
    secondary: {
      backgroundColor: 'var(--bg-card)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-primary)',
    },
  };

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      style={inlineStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
}