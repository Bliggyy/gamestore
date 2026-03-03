import { createContext, useState, useContext } from "react";
import { login as apiLogin } from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // keep token in localStorage for authenticated requests
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const login = async (username, password) => {
    const result = await apiLogin(username, password);
    // result should contain { token }
    setToken(result.token);
    localStorage.setItem("token", result.token);
    const userObj = { username };
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    return userObj;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// convenience hook
export function useAuth() {
  return useContext(AuthContext);
}
