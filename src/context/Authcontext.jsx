import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../config/AxiosConfig";
import AiLoader from "../components/AILoader";
export const AuthProvider = createContext();

export const Authcontext = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setuser(res.data.user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <AiLoader/>;
  }

  return (
    <AuthProvider.Provider value={value}>{children}</AuthProvider.Provider>
  );
};

export const useAuth = () => useContext(AuthProvider);
