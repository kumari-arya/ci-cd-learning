import React, {
  createContext, useState, useContext, useEffect, useMemo,
} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      try {
        const response = await axios.get('/api/auth/me');
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { token, user: loggedInUser } = response.data.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(loggedInUser);
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user: registeredUser } = response.data.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(registeredUser);
      toast.success('Registered successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
    setUser(null);
    toast.success('Logged out successfully!');
  };

  const authValue = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
