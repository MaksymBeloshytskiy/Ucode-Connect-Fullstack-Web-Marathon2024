// Define a class called EatException that extends the built-in Error class
class EatException extends Error {
    // Constructor function that takes in the productName and mealType as parameters
    constructor(productName, mealType) {
        // Call the constructor of the Error class with a custom error message
        super(`Too many calories in ${productName} for ${mealType}`);
        
        // Set the name property of the error to 'EatException'
        this.name = 'EatException';
    }
}

// Export the EatException class as a module
module.exports = { EatException };
