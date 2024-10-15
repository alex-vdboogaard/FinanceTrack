class Asset {
    constructor(id, name, boughtFor, currentValue, assetType) {
        this.id = id;
        this.name = name;
        this.boughtFor = boughtFor;
        this.currentValue = currentValue;
        this.assetType = assetType;
    }
}

module.exports = Asset;