class BankAccount {
  constructor(id, name, balance, type, bank) {
    this.id = id;
    this.name = name;
    this.balance = balance;
    this.type = type;
    this.bank = bank;
  }
}

module.exports = BankAccount;
