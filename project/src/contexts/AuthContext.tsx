import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { api } from '../services/api';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface Subscription {
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  subscription: Subscription | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    
    if (session) {
      // Set token in API header
      api.defaults.headers.common['Authorization'] = `Bearer ${session}`;
      
      // Mock user data for demo, would normally fetch from server
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user?.role === 'patient') {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .single();

      if (error) throw error;
      setSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription:', err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, mocking the authentication response
      if (email === 'admin@meditrack.com' && password === 'password123') {
        const mockUser = { 
          id: '1', 
          name: 'Admin User', 
          email: 'admin@meditrack.com', 
          role: 'admin' as UserRole 
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      } else if (email === 'doctor@meditrack.com' && password === 'password123') {
        const mockUser = { 
          id: '2', 
          name: 'Doctor Smith', 
          email: 'doctor@meditrack.com', 
          role: 'doctor' as UserRole 
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      } else if (email === 'nurse@meditrack.com' && password === 'password123') {
        const mockUser = { 
          id: '3', 
          name: 'Nurse Johnson', 
          email: 'nurse@meditrack.com', 
          role: 'nurse' as UserRole 
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      } else if (email === 'receptionist@meditrack.com' && password === 'password123') {
        const mockUser = { 
          id: '4', 
          name: 'Receptionist Brown', 
          email: 'receptionist@meditrack.com', 
          role: 'receptionist' as UserRole 
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      } else if (email === 'patient@meditrack.com' && password === 'password123') {
        const mockUser = { 
          id: '5', 
          name: 'John Patient', 
          email: 'patient@meditrack.com', 
          role: 'patient' as UserRole 
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      } else {
        throw new Error('Invalid credentials');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setSubscription(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error,
      subscription,
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};