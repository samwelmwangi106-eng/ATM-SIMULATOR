import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  initialUsers,
  initialTransactions,
} from "../data/mockData";

const AuthContext = createContext(null);

function getStoredUsers() {
  const stored = localStorage.getItem("atm_users");

  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem("atm_users", JSON.stringify(initialUsers));
  return initialUsers;
}

function getStoredTransactions() {
  const stored = localStorage.getItem("atm_transactions");

  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem(
    "atm_transactions",
    JSON.stringify(initialTransactions)
  );

  return initialTransactions;
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(getStoredUsers);
  const [transactions, setTransactions] = useState(
    getStoredTransactions
  );

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("atm_current_user");

    if (!stored) {
      return null;
    }

    return JSON.parse(stored);
  });

  useEffect(() => {
    localStorage.setItem("atm_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "atm_transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "atm_current_user",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("atm_current_user");
    }
  }, [currentUser]);

  const login = (accountNumber, pin) => {
    const user = users.find(
      (item) =>
        item.accountNumber === accountNumber &&
        item.pin === pin
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid account number or PIN.",
      };
    }

    setCurrentUser(user);

    return {
      success: true,
      user,
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const refreshCurrentUser = () => {
    if (!currentUser) {
      return;
    }

    const updatedUser = users.find(
      (user) => user.id === currentUser.id
    );

    if (updatedUser) {
      setCurrentUser(updatedUser);
    }
  };

  const updateBalance = (amount) => {
    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in.",
      };
    }

    const updatedUsers = users.map((user) => {
      if (user.id !== currentUser.id) {
        return user;
      }

      return {
        ...user,
        balance: user.balance + amount,
      };
    });

    setUsers(updatedUsers);

    const updatedUser = updatedUsers.find(
      (user) => user.id === currentUser.id
    );

    setCurrentUser(updatedUser);

    return {
      success: true,
      user: updatedUser,
    };
  };

  const deposit = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        success: false,
        message: "Enter a valid deposit amount.",
      };
    }

    const result = updateBalance(amount);

    if (!result.success) {
      return result;
    }

    const transaction = {
      id: Date.now(),
      accountNumber: currentUser.accountNumber,
      type: "Deposit",
      amount,
      description: "Cash deposit",
      date: new Date().toISOString(),
    };

    setTransactions((previous) => [
      transaction,
      ...previous,
    ]);

    return {
      success: true,
      message: `KES ${amount.toLocaleString()} deposited successfully.`,
    };
  };

  const withdraw = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        success: false,
        message: "Enter a valid withdrawal amount.",
      };
    }

    if (amount > currentUser.balance) {
      return {
        success: false,
        message: "Insufficient funds.",
      };
    }

    const result = updateBalance(-amount);

    if (!result.success) {
      return result;
    }

    const transaction = {
      id: Date.now(),
      accountNumber: currentUser.accountNumber,
      type: "Withdrawal",
      amount,
      description: "Cash withdrawal",
      date: new Date().toISOString(),
    };

    setTransactions((previous) => [
      transaction,
      ...previous,
    ]);

    return {
      success: true,
      message: `KES ${amount.toLocaleString()} withdrawn successfully.`,
    };
  };

  const transfer = (recipientAccount, amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        success: false,
        message: "Enter a valid transfer amount.",
      };
    }

    if (recipientAccount === currentUser.accountNumber) {
      return {
        success: false,
        message: "You cannot transfer money to yourself.",
      };
    }

    if (amount > currentUser.balance) {
      return {
        success: false,
        message: "Insufficient funds.",
      };
    }

    const recipient = users.find(
      (user) => user.accountNumber === recipientAccount
    );

    if (!recipient) {
      return {
        success: false,
        message: "Recipient account was not found.",
      };
    }

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          balance: user.balance - amount,
        };
      }

      if (user.id === recipient.id) {
        return {
          ...user,
          balance: user.balance + amount,
        };
      }

      return user;
    });

    setUsers(updatedUsers);

    const updatedCurrentUser = updatedUsers.find(
      (user) => user.id === currentUser.id
    );

    setCurrentUser(updatedCurrentUser);

    const timestamp = Date.now();

    const senderTransaction = {
      id: timestamp,
      accountNumber: currentUser.accountNumber,
      type: "Transfer",
      amount,
      description: `Transfer to ${recipient.name} (${recipient.accountNumber})`,
      date: new Date().toISOString(),
    };

    const recipientTransaction = {
      id: timestamp + 1,
      accountNumber: recipient.accountNumber,
      type: "Transfer",
      amount,
      description: `Transfer from ${currentUser.name} (${currentUser.accountNumber})`,
      date: new Date().toISOString(),
    };

    setTransactions((previous) => [
      senderTransaction,
      recipientTransaction,
      ...previous,
    ]);

    return {
      success: true,
      message: `KES ${amount.toLocaleString()} transferred successfully.`,
    };
  };

  const changePin = (currentPin, newPin) => {
    if (currentPin !== currentUser.pin) {
      return {
        success: false,
        message: "Current PIN is incorrect.",
      };
    }

    if (!/^\d{4}$/.test(newPin)) {
      return {
        success: false,
        message: "New PIN must contain exactly 4 digits.",
      };
    }

    if (currentPin === newPin) {
      return {
        success: false,
        message: "New PIN must be different from the old PIN.",
      };
    }

    const updatedUsers = users.map((user) => {
      if (user.id !== currentUser.id) {
        return user;
      }

      return {
        ...user,
        pin: newPin,
      };
    });

    setUsers(updatedUsers);

    const updatedUser = updatedUsers.find(
      (user) => user.id === currentUser.id
    );

    setCurrentUser(updatedUser);

    return {
      success: true,
      message: "PIN changed successfully.",
    };
  };

  const getCurrentUserTransactions = () => {
    if (!currentUser) {
      return [];
    }

    return transactions.filter(
      (transaction) =>
        transaction.accountNumber === currentUser.accountNumber
    );
  };

  const value = {
    currentUser,
    users,
    transactions,
    isAuthenticated: Boolean(currentUser),
    login,
    logout,
    deposit,
    withdraw,
    transfer,
    changePin,
    refreshCurrentUser,
    getCurrentUserTransactions,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}
