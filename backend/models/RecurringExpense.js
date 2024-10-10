class RecurringExpense extends Expense {
    constructor(amount, description, startDate, interval, categoryId, userId) {
        super(amount, description, startDate, categoryId, userId);
        this.interval = interval; // e.g., 'monthly', 'yearly'
    }
}
