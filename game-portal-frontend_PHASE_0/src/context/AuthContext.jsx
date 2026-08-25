import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    if (token) {
      // Validate current token
      api.get('/me')
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          fetchFavoritesCount();
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const fetchFavoritesCount = async () => {
    try {
      const res = await api.get('/favorites');
      setFavoritesCount(res.data.data ? res.data.data.length : 0);
    } catch (e) {
      setFavoritesCount(0);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    const { token: newToken, user: newUser } = res.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoginModalOpen(false);
    return res.data;
  };

  const register = async (userData) => {
    const res = await api.post('/register', userData);
    const { token: newToken, user: newUser } = res.data;
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoginModalOpen(false);
    return res.data;
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post('/logout');
      }
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setToken(null);
      setFavoritesCount(0);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  };

  const updateProfile = async (data) => {
    const res = await api.put('/profile', data);
    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        favoritesCount,
        fetchFavoritesCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
