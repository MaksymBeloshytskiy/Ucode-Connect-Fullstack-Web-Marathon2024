class Product {
    constructor(name, kcal_per_portion) {
        this.name = name; // Name of the product
        this.kcal_per_portion = kcal_per_portion; // Calories per portion
    }

    isJunkFood() {
        return this.kcal_per_portion > 200; // Returns true if the product is considered junk food
    }
}

module.exports = { Product };
