import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/", label: "Home", icon: "🏠" },
  { path: "/add", label: "Expenses", icon: "💳" },
  { path: "/ai-help", label: "AI Insights", icon: "🤖" },
  { path: "/calendar", label: "Trips", icon: "📍" },
  { path: "/insights", label: "Approvals", icon: "📋" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 w-64 bg-black border-r border-zinc-900 h-screen p-6 flex flex-col z-20">
      <h2 className="text-xl font-bold text-white mb-6">MindfulLedger</h2>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
               ? "bg-zinc-900 text-white font-medium"
               : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition w-full text-left"
      >
        <span>🚪</span> Logout
      </button>
    </aside>
  );
}