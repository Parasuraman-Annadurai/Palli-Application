import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  //Maintain user related data(username, id, role)
  return (
    <AuthContext.Provider value={{ user,setUser }}>{children}</AuthContext.Provider>
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
