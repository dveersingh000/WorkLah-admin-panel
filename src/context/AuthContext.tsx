import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import { axiosInstance } from '../lib/authInstances';
import Cookies from 'js-cookie';

interface User {
  email: string;
  fullName: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/user/authenticated/auth');
        console.log("Authenticated user data:", response.data);
        // if (response.data === null) {
        //   setIsAuthenticated(false);
        //   setIsLoading(false);
        //   return;
        // }
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    
    try {
      debugger
      console.log("Trying login with:", { email, password });
      const response = await axiosInstance.post('/user/login', { email, password });
      setUser(response.data.user);
      const { token} = response.data; // Assuming API returns token and user data
      // Cookies.set('authToken', token); // Save token in cookies for 7 days
      // Cookies.set('authToken', token, { expires: 7 }); // Save token in cookies for 7 days
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/user/signup', { fullName, email, password });
      setUser(response.data.user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/user/logout', {});
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};