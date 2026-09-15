import Navbar from "../components/Navbar";
import TransactionCard from "../components/TransactionCard";
import { useAuth } from "../context/AuthContext";

function Transactions() {
  const { getCurrentUserTransactions } = useAuth();

  const transactions = getCurrentUserTransactions();

  return (
    <>
      <Navbar />

      <main className="page-container">
        <section className="page-title">
          <p className="eyebrow">ACCOUNT ACTIVITY</p>
          <h1>Transaction History</h1>
          <p>View all transactions made on your account.</p>
        </section>

        <section className="transactions-list">
          {transactions.length === 0 ? (
            <div className="empty-state">
              No transactions available.
            </div>
          ) : (
            transactions.map((transaction) => (
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

export default Transactions;
