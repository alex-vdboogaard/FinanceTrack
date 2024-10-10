class Expense {
    constructor(amount, description, date, categoryId, userId) {
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.categoryId = categoryId; // Reference to ExpenseCategory
        this.userId = userId;         // Reference to User
    }
}
