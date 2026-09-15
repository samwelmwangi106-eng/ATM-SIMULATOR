export const initialUsers = [
  {
    id: 1,
    accountNumber: "10010001",
    name: "Samwel",
    pin: "1234",
    balance: 50000,
  },
  {
    id: 2,
    accountNumber: "10010002",
    name: "Valentine",
    pin: "5678",
    balance: 75000,
  },
];

export const initialTransactions = [
  {
    id: 1,
    accountNumber: "10010001",
    type: "Deposit",
    amount: 50000,
    description: "Initial account balance",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    accountNumber: "10010002",
    type: "Deposit",
    amount: 75000,
    description: "Initial account balance",
    date: new Date().toISOString(),
  },
];
