import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase/fbinstance";

const AuthContext = createContext();

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
