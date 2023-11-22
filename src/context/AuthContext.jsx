import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [token, setToken] = useState(()=>localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : {});

  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider value={{ user,token,setUser,setToken }}>{children}</AuthContext.Provider>
  );
};

//Custom hook for simplified usage of context

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};
