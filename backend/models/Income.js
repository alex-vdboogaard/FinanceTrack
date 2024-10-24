class Income {
  constructor(amount, source, date, categoryId, userId) {
    this.amount = amount;
    this.source = source;
    this.date = date;
    this.categoryId = categoryId; // Reference to IncomeCategory
    this.userId = userId; // Reference to User
  }
}
