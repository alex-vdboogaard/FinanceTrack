class BankAccount {
    constructor(accountNumber, balance, categoryId, userId) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.categoryId = categoryId; // Reference to BankAccountCategory
        this.userId = userId;         // Reference to User
    }
}
