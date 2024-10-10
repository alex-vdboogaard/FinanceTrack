class Investment {
    constructor(amount, type, date, categoryId, userId) {
        this.amount = amount;
        this.type = type;
        this.date = date;
        this.categoryId = categoryId; // Reference to InvestmentCategory
        this.userId = userId;         // Reference to User
    }
}
