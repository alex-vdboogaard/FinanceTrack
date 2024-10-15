class Investment {
    constructor(id, description, invested, currentValue, type) {
        this.id = id;
        this.description = description;
        this.invested = invested;
        this.type = type;
        this.currentValue = currentValue;
    }
}

module.exports = Investment;
