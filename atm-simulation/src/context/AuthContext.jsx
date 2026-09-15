import { createContext, useContext, useState } from "react";
import { users } from "../data/mockData";

// Create the authentication context.
// This allows authentication state to be shared
// across the entire React application.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // currentUser stores the currently logged-in user.
  // null means that nobody is logged in.
  const [currentUser, setCurrentUser] = useState(null);

  // Authenticate a user using their account number and PIN.
  const login = (accountNumber, pin) => {
    // Search our temporary mock users for matching credentials.
    const user = users.find(
      (user) =>
        user.accountNumber === accountNumber &&
        user.pin === pin
    );

    // No matching account was found.
    if (!user) {
      return {
        success: false,
        message: "Invalid account number or PIN.",
      };
    }

    // Store the authenticated user in React state.
    setCurrentUser(user);

    return {
      success: true,
      user,
    };
  };

  // Remove the current user from authentication state.
  const logout = () => {
    setCurrentUser(null);
  };

  // Values exposed to components using useAuth().
  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for accessing the authentication context.
export function useAuth() {
  const context = useContext(AuthContext);

  // This gives us a clearer error if useAuth()
  // is accidentally used outside AuthProvider.
  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}