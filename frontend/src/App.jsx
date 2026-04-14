import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Add from "./pages/Add";
import Insights from "./pages/Insights";
import AiHelp from "./pages/AiHelp";
import Budget from "./pages/Budget";
import Category from "./pages/Category";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";

export default function App() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isLoggedIn = !!user;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme={theme === 'dark' ? 'dark' : 'light'} />
      <BrowserRouter>
        <Routes>

          {/* 🌐 PUBLIC ROUTES */}
          <Route
            path="/welcome"
            element={!isLoggedIn ? <Landing /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={
              !isLoggedIn ? <Login /> : <Navigate to="/" />
            }
          />

          <Route
            path="/signup"
            element={
              !isLoggedIn ? <Signup /> : <Navigate to="/" />
            }
          />

          {/* 🔐 PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Layout /> : <Navigate to="/welcome" />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="add" element={<Add />} />
            <Route path="insights" element={<Insights />} />
            <Route path="ai-help" element={<AiHelp />} />
            <Route path="budget" element={<Budget />} />
            <Route path="category" element={<Category />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 🚨 FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}