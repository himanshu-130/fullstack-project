import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Sidebar />
      <div className="flex-1 ml-64 p-6 min-h-screen" style={{ borderLeft: '1px solid var(--border-primary)' }}>
        <Topbar />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}