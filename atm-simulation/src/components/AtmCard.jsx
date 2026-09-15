function AtmCard({ user }) {
  return (
    <div className="atm-card">
      <div className="atm-card-top">
        <span>PYTHON BANK</span>
        <span>VISA</span>
      </div>

      <div className="chip">▦</div>

      <div className="card-number">
        {user.accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
      </div>

      <div className="card-bottom">
        <div>
          <small>CARD HOLDER</small>
          <strong>{user.name.toUpperCase()}</strong>
        </div>

        <div>
          <small>ACCOUNT</small>
          <strong>ACTIVE</strong>
        </div>
      </div>
    </div>
  );
}

export default AtmCard;
