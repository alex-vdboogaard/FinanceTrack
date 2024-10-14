class Investment {
    constructor(id, description, invested, currentValue, type, userId) {
        this.id = id;
        this.description = description;
        this.invested = invested;
        this.type = type;
        this.currentValue = currentValue;
        this.userId = userId;
    }
}

module.exports = Investment;
