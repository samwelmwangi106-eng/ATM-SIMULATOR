import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function ChangePin() {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { changePin } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (newPin !== confirmPin) {
      setError("New PIN and confirmation PIN do not match.");
      return;
    }

    const result = changePin(currentPin, newPin);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setMessage(result.message);
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
  };

  return (
    <>
      <Navbar />

      <main className="form-page">
        <div className="form-card">
          <div className="page-icon">🔑</div>

          <h1>Change PIN</h1>
          <p>Update your four-digit ATM PIN.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="currentPin">Current PIN</label>

            <input
              id="currentPin"
              type="password"
              inputMode="numeric"
              maxLength="4"
              value={currentPin}
              onChange={(event) =>
                setCurrentPin(event.target.value)
              }
              placeholder="Current PIN"
            />

            <label htmlFor="newPin">New PIN</label>

            <input
              id="newPin"
              type="password"
              inputMode="numeric"
              maxLength="4"
              value={newPin}
              onChange={(event) =>
                setNewPin(event.target.value)
              }
              placeholder="New 4-digit PIN"
            />

            <label htmlFor="confirmPin">
              Confirm New PIN
            </label>

            <input
              id="confirmPin"
              type="password"
              inputMode="numeric"
              maxLength="4"
              value={confirmPin}
              onChange={(event) =>
                setConfirmPin(event.target.value)
              }
              placeholder="Confirm new PIN"
            />

            {error && <p className="error-message">{error}</p>}
            {message && (
              <p className="success-message">{message}</p>
            )}

            <button className="primary-button" type="submit">
              Change PIN
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

export default ChangePin;
