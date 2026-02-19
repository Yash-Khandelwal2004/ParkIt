import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token) {
        // If we have a saved user object, parse it
        // If not, create a minimal user object just from the token so auth still works
        if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
          setUser(JSON.parse(savedUser));
        } else {
          // Fallback: token exists but no user data — still mark as logged in
          setUser({ name: "User", email: "" });
        }
      }
    } catch (e) {
      // If anything goes wrong parsing, clear storage and start fresh
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    if (!token) return;

    localStorage.setItem("token", token);

    // Safely store user data — even if backend doesn't return a user object
    const safeUser = userData || { name: "User", email: "" };
    localStorage.setItem("user", JSON.stringify(safeUser));

    setUser(safeUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Don't render children until we've checked localStorage
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