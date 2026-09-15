import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">🏧</span>
        <span>Python Bank</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/deposit">Deposit</NavLink>
        <NavLink to="/withdraw">Withdraw</NavLink>
        <NavLink to="/transfer">Transfer</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/change-pin">Change PIN</NavLink>
      </div>

      <div className="navbar-user">
        <span>{currentUser?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
