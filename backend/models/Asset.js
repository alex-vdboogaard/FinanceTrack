class Asset {
    constructor(name, boughtFor, currentValue, assetType) {
        this.name = name;
        this.boughtFor = boughtFor;
        this.currentValue = currentValue;
        this.assetType = assetType;
    }
}

module.exports = Asset;