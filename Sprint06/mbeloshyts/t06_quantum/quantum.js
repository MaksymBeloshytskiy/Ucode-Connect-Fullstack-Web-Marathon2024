const normalTime = require('./normal').calculateTime();

// Function to calculate time passed in quantum space
function calculateTimeQuantum() {
    // Importing the calculateTime function from the 'normal' module

    // Calculating the number of quantum years
    const quantumYears = Math.floor(normalTime.years / 7);

    // Calculating the number of quantum months
    const quantumMonths = Math.floor((normalTime.years % 7) * 12 / 7) + Math.floor(normalTime.months / 7);

    // Getting the number of quantum days
    const quantumDays = normalTime.days;

    // Returning the calculated quantum time as an array
    return [quantumYears, quantumMonths, quantumDays];
}

// Exporting the calculateTimeQuantum function as the calculateTime property of the module.exports object
module.exports = {
    calculateTime: calculateTimeQuantum
};
