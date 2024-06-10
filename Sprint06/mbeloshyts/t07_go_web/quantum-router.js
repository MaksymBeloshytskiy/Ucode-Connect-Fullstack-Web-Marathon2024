const fs = require('fs');
const ejs = require('ejs');

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

// Function to calculate time passed in quantum space
function calculateTimeQuantum() {
    const normalTime = calculateTimeNormal();

    // Calculating the number of quantum years
    const quantumYears = Math.floor(normalTime.years / 7);

    // Calculating the number of quantum months
    const quantumMonths = Math.floor((normalTime.years % 7) * 12 / 7) + Math.floor(normalTime.months / 7);

    // Getting the number of quantum days
    const quantumDays = normalTime.days;

    // Returning the calculated quantum time as an array
    return [quantumYears, quantumMonths, quantumDays];
}

// Request handler for the quantum router
function quantumRouter(req, res) {
  const quantumTime = calculateTimeQuantum();
  fs.readFile('./views/quantum.ejs', 'utf8', (err, data) => {
    if (err) {
      // If the file is not found, send a 404 response
      res.writeHead(404);
      res.end('File not found!');
    } else {
      // Render the HTML using the quantum time data
      const renderedHtml = ejs.render(data, { time: quantumTime });
      // Send a 200 response with the rendered HTML
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderedHtml);
    }
  });
}

module.exports = quantumRouter;
