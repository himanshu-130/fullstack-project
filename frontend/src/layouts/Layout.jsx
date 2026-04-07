import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout() {
  return (
    <div className="bg-black min-h-screen text-white flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 min-h-screen border-l border-zinc-900">
        <Topbar />
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}