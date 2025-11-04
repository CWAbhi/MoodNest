import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('moodnest_token');
    const userData = localStorage.getItem('moodnest_user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('moodnest_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
    };

    users.push(newUser);
    localStorage.setItem('moodnest_users', JSON.stringify(users));

    // Auto login after signup
    const token = btoa(`${email}:${Date.now()}`);
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    
    localStorage.setItem('moodnest_token', token);
    localStorage.setItem('moodnest_user', JSON.stringify(userData));
    setUser(userData);

    return { success: true };
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('moodnest_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    const token = btoa(`${email}:${Date.now()}`);
    const userData = { id: user.id, name: user.name, email: user.email };
    
    localStorage.setItem('moodnest_token', token);
    localStorage.setItem('moodnest_user', JSON.stringify(userData));
    setUser(userData);

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('moodnest_token');
    localStorage.removeItem('moodnest_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
