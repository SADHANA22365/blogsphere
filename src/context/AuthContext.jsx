import { createContext, useContext, useState, useEffect } from "react";
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  logout as logoutUser,
  cleanupOrphanBlogs,   // ✅ ADD THIS
} from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  // ✅ CLEAN UP OLD ORPHAN BLOGS (RUNS ONCE)
  useEffect(() => {
    cleanupOrphanBlogs();
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(
      u => u.email === email && u.password === password
    );

    if (!found) throw new Error("Invalid credentials");

    setCurrentUser(found);
    setUser(found);

    localStorage.setItem("activeUser", JSON.stringify(found));
  };

  const register = (name, email, password) => {
    const users = getUsers();

    if (users.some(u => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: email.includes("admin") ? "admin" : "user",
    };

    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    setUser(newUser);

    localStorage.setItem("activeUser", JSON.stringify(newUser));
  };

  const logout = () => {
    logoutUser();
    setUser(null);

    localStorage.removeItem("activeUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
