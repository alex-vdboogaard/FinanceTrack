class Asset {
    constructor(id, name, boughtFor, currentValue, assetType, userId) {
        this.id = id;
        this.name = name;
        this.boughtFor = boughtFor;
        this.currentValue = currentValue;
        this.assetType = assetType;
        this.userId = userId;
    }
}

module.exports = Asset;