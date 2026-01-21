import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../api/auth.api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await getMe(token);
          // Backend getMe returns { success: true, user: {...} }
          setUser(res.user);
        } catch (error) {
          console.error('Failed to load user', error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setToken(data.token);
    // Backend login returns { success: true, name, email, token, ... } (flat object)
    // We should construct the user object from this or just use data as user (minus token ideally, but harmless)
    setUser(data); 
    localStorage.setItem('token', data.token);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    setToken(data.token);
    // Backend register returns similar flat structure
    setUser(data);
    localStorage.setItem('token', data.token);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
