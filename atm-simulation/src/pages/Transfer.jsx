import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Transfer() {
  const [recipientAccount, setRecipientAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { transfer, currentUser } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const result = transfer(
      recipientAccount.trim(),
      Number(amount)
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    setMessage(result.message);
    setRecipientAccount("");
    setAmount("");
  };

  return (
    <>
      <Navbar />

      <main className="form-page">
        <div className="form-card">
          <div className="page-icon">🔄</div>

          <h1>Transfer Money</h1>
          <p>Send money to another Python Bank account.</p>

          <div className="current-balance">
            Available Balance:
            <strong>
              KES {currentUser.balance.toLocaleString()}
            </strong>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="recipient">
              Recipient Account Number
            </label>

            <input
              id="recipient"
              type="text"
              value={recipientAccount}
              onChange={(event) =>
                setRecipientAccount(event.target.value)
              }
              placeholder="e.g. 10010002"
            />

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
              Transfer Money
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

export default Transfer;
