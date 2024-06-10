// Define a Printable object
const Printable = {
    // Define a print method
    print() {
        // Iterate over each weapon in the weapons array and log it to the console
        this.weapons.forEach(weapon => console.log(weapon));
    }
};

// Export the Printable object
module.exports = Printable;
