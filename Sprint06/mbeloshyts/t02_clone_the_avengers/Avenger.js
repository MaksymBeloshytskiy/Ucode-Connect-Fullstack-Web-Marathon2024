// Define the Avenger class
class Avenger {
    // Constructor function to initialize the Avenger object
    constructor(name, alias, gender, age, powers, hp) {
        this.name = name; // The Avenger's real name
        this.alias = alias; // The Avenger's alias or superhero name
        this.gender = gender; // The Avenger's gender
        this.age = age; // The Avenger's age
        this.powers = powers; // An array of the Avenger's powers
        this.hp = hp; // The Avenger's health points
    }
}

// Export the Avenger class to be used in other files
module.exports = { Avenger };
