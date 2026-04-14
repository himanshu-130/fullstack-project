import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    if (data.success) {
      const userData = { ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return data;
    }
    return null;
  };

  const signup = async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', { name, email, password });
    if (data.success) {
      const userData = { ...data.user, accessToken: data.accessToken, refreshToken: data.refreshToken };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return data;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
