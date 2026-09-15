import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Withdraw() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { withdraw, currentUser } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const result = withdraw(Number(amount));

    if (!result.success) {
      setError(result.message);
      return;
    }

    setMessage(result.message);
    setAmount("");
  };

  return (
    <>
      <Navbar />

      <main className="form-page">
        <div className="form-card">
          <div className="page-icon">💸</div>

          <h1>Withdraw Money</h1>
          <p>Enter the amount you would like to withdraw.</p>

          <div className="current-balance">
            Available Balance:
            <strong>
              KES {currentUser.balance.toLocaleString()}
            </strong>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="amount">Amount</label>

            <input
              id="amount"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="Enter amount"
            />

            {error && <p className="error-message">{error}</p>}
            {message && (
              <p className="success-message">{message}</p>
            )}

            <button className="primary-button" type="submit">
              Withdraw Money
            </button>
          </form>

          <Link to="/dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    </>
  );
}

export default Withdraw;
