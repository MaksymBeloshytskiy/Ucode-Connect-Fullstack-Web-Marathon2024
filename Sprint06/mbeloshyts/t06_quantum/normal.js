// Function to calculate time passed in normal space
function calculateTimeNormal() {
    // Set the start date as January 1, 1939
    const startDate = new Date('1939-01-01');
    // Get the current date
    const today = new Date();

    // Calculate the time difference in milliseconds between the start date and today
    const timeDifference = today.getTime() - startDate.getTime();
    // Calculate the number of days passed
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate the number of years passed
    const years = Math.floor(daysDifference / 365);
    // Calculate the number of months passed
    const months = Math.floor((daysDifference % 365) / 30);
    // Calculate the number of days remaining
    const days = (daysDifference % 365) % 30;

    // Return an object with the calculated years, months, and days
    return { years, months, days };
}

// Export the calculateTimeNormal function as calculateTime
module.exports = {
    calculateTime: calculateTimeNormal
};
