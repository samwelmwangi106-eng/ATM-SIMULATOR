import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AtmCard from "../components/AtmCard";
import TransactionCard from "../components/TransactionCard";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const {
    currentUser,
    getCurrentUserTransactions,
  } = useAuth();

  const transactions = getCurrentUserTransactions();

  return (
    <>
      <Navbar />

      <main className="page-container">
        <section className="dashboard-header">
          <div>
            <p className="eyebrow">WELCOME BACK</p>
            <h1>Hello, {currentUser.name} 👋</h1>
            <p>Manage your account from your ATM dashboard.</p>
          </div>

          <div className="balance-box">
            <span>Available Balance</span>
            <strong>
              KES {currentUser.balance.toLocaleString()}
            </strong>
          </div>
        </section>

        <section className="dashboard-grid">
          <AtmCard user={currentUser} />

          <div className="quick-actions">
            <h2>Quick Actions</h2>

            <div className="action-grid">
              <Link to="/deposit" className="action-card">
                <span>💰</span>
                <strong>Deposit</strong>
                <small>Add money</small>
              </Link>

              <Link to="/withdraw" className="action-card">
                <span>💸</span>
                <strong>Withdraw</strong>
                <small>Get cash</small>
              </Link>

              <Link to="/transfer" className="action-card">
                <span>🔄</span>
                <strong>Transfer</strong>
                <small>Send money</small>
              </Link>

              <Link to="/transactions" className="action-card">
                <span>📜</span>
                <strong>Transactions</strong>
                <small>View history</small>
              </Link>
            </div>
          </div>
        </section>

        <section className="recent-section">
          <div className="section-heading">
            <h2>Recent Transactions</h2>
            <Link to="/transactions">View all</Link>
          </div>

          {transactions.length === 0 ? (
            <div className="empty-state">
              No transactions yet.
            </div>
          ) : (
            transactions
              .slice(0, 5)
              .map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
          )}
        </section>
      </main>
    </>
  );
}

export default Dashboard;
