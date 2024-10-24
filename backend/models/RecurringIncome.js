class RecurringIncome extends Income {
  constructor(amount, source, startDate, interval, categoryId, userId) {
    super(amount, source, startDate, categoryId, userId);
    this.interval = interval; // e.g., 'monthly', 'yearly'
  }
}
