import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir los tipos del contexto
interface AuthContextType {
  isLogued: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogued, setIslogued] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIslogued(!!token);
    };
    checkToken();
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setIslogued(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIslogued(false);
  };

  return (
    <AuthContext.Provider value={{ isLogued, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
