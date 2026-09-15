import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!accountNumber || !pin) {
      setError("Please enter your account number and PIN.");
      return;
    }

    const result = login(
      accountNumber.trim(),
      pin.trim()
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">🏧</div>

        <div className="login-header">
          <h1>Python Bank</h1>
          <p>Secure ATM Banking</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accountNumber">
              Account Number
            </label>

            <input
              id="accountNumber"
              type="text"
              inputMode="numeric"
              value={accountNumber}
              onChange={(event) =>
                setAccountNumber(event.target.value)
              }
              placeholder="Enter account number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pin">PIN</label>

            <input
              id="pin"
              type="password"
              inputMode="numeric"
              maxLength="4"
              value={pin}
              onChange={(event) =>
                setPin(event.target.value)
              }
              placeholder="Enter 4-digit PIN"
            />
          </div>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <button className="primary-button" type="submit">
            Login Securely
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Demo Account</strong>
          <span>Account: 10010001</span>
          <span>PIN: 1234</span>
        </div>
      </section>
    </main>
  );
}

export default Login;
