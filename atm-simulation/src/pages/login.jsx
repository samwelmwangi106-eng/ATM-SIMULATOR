import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  // This function MUST be inside Login
  // because the form uses it through onSubmit.
  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!accountNumber || !pin) {
      setError("Please enter your account number and PIN.");
      return;
    }

    const result = login(accountNumber, pin);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-header">
          <h1>Python Bank</h1>
          <p>ATM Simulation</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accountNumber">
              Account Number
            </label>

            <input
              id="accountNumber"
              type="text"
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
              value={pin}
              onChange={(event) =>
                setPin(event.target.value)
              }
              placeholder="Enter PIN"
              maxLength="4"
            />
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <p>Demo Account</p>
          <span>Account: 10010001</span>
          <span>PIN: 1234</span>
        </div>
      </section>
    </main>
  );
}

export default Login;