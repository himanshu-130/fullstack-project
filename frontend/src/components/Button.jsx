export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2";

  const styles = {
    primary:
      "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/20 backdrop-blur-md hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]",

    secondary:
      "bg-[#111827] text-gray-300 border border-[#1f2937] hover:border-cyan-500/30 hover:text-white hover:shadow-[0_0_10px_rgba(34,211,238,0.15)]",
  };

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}