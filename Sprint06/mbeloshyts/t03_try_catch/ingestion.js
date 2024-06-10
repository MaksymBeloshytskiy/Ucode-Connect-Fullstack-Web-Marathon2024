const { EatException } = require('./eat-exception');
const { Product } = require('./product');

// Define the Ingestion class
class Ingestion {
    constructor(meal_type, day_of_diet) {
        this.id = Date.now(); // Generate a unique ID based on the current timestamp
        this.meal_type = meal_type; // Set the meal type
        this.day_of_diet = day_of_diet; // Set the day of the diet
        this.products = []; // Initialize an empty array to store products
    }

    // Method to add a product to the ingestion
    setProduct(product) {
        this.products.push(product); // Add the product to the products array
    }

    // Method to get information about a specific product
    getProductInfo(productName) {
        const product = this.products.find(p => p.name === productName); // Find the product with the given name
        if (!product) {
            throw new Error(`Product ${productName} not found`); // Throw an error if the product is not found
        }
        return { name: product.name, kcal: product.kcal_per_portion }; // Return the product information
    }

    // Method to get a product from the fridge
    getFromFridge(productName) {
        const product = this.products.find(p => p.name === productName); // Find the product with the given name
        if (!product) {
            throw new Error(`Product ${productName} not found`); // Throw an error if the product is not found
        }
        if (product.isJunkFood()) {
            throw new EatException(product.name, this.meal_type); // Throw an EatException if the product is junk food
        }
    }
}

module.exports = { Ingestion }; // Export the Ingestion class
