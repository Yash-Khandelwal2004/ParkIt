import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Decode JWT payload without a library — just base64 decode the middle part
const getTokenExpiry = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null; // convert to ms
  } catch {
    return null;
  }
};

const isTokenExpired = (token) => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return false; // if we can't read expiry, let backend decide
  return Date.now() > expiry;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token) {
        // ✅ Auto-logout if token is expired on page load
        if (isTokenExpired(token)) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        } else if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
          setUser(JSON.parse(savedUser));
        } else {
          setUser({ name: "User", email: "" });
        }
      }
    } catch (e) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Auto-logout timer — clears session exactly when token expires
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    const expiry = getTokenExpiry(token);
    if (!expiry) return;

    const msUntilExpiry = expiry - Date.now();
    if (msUntilExpiry <= 0) return;

    const timer = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    }, msUntilExpiry);

    return () => clearTimeout(timer);
  }, [user]);

  const login = (token, userData) => {
    if (!token) return;

    localStorage.setItem("token", token);

    const safeUser = userData || { name: "User", email: "" };
    localStorage.setItem("user", JSON.stringify(safeUser));

    setUser(safeUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}