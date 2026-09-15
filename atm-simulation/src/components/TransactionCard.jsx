function TransactionCard({ transaction }) {
  const isCredit =
    transaction.type === "Deposit";

  return (
    <div className="transaction-card">
      <div className="transaction-icon">
        {transaction.type === "Deposit" && "↓"}
        {transaction.type === "Withdrawal" && "↑"}
        {transaction.type === "Transfer" && "↔"}
      </div>

      <div className="transaction-info">
        <strong>{transaction.type}</strong>
        <span>{transaction.description}</span>
        <small>
          {new Date(transaction.date).toLocaleString()}
        </small>
      </div>

      <strong
        className={
          isCredit
            ? "transaction-amount credit"
            : "transaction-amount debit"
        }
      >
        {isCredit ? "+" : "-"} KES{" "}
        {transaction.amount.toLocaleString()}
      </strong>
    </div>
  );
}

export default TransactionCard;
