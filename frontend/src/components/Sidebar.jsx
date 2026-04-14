import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { path: "/", label: "Home", icon: "dashboard" },
  { path: "/add", label: "Expenses", icon: "credit_card" },
  { path: "/ai-help", label: "AI Insights", icon: "auto_awesome" },
  { path: "/calendar", label: "Trips", icon: "flight_takeoff" },
  { path: "/insights", label: "Approvals", icon: "task_alt" },
  { path: "/settings", label: "Settings", icon: "settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="fixed left-0 top-0 w-64 h-screen p-6 flex flex-col z-20"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-primary)',
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: 'var(--accent)' }}
      >
        ArthVeda
      </h2>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? 'var(--accent-subtle)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
            })}
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl transition w-full text-left"
        style={{ color: 'var(--danger)' }}
      >
        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
        Logout
      </button>
    </aside>
  );
}