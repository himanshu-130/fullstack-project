export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-[#111827]/70 backdrop-blur-xl 
        border border-[#1f2937] 
        rounded-2xl 
        shadow-[0_0_20px_rgba(0,0,0,0.4)]
        p-5
        transition-all duration-300
        hover:shadow-cyan-500/10 hover:border-cyan-500/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}