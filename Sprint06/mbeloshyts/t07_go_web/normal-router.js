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

// Function to handle the normal router
function normalRouter(req, res) {
  // Calculate the time in normal space
  const normalTime = calculateTimeNormal();

  // Read the contents of the normal.ejs file
  fs.readFile('./views/normal.ejs', 'utf8', (err, data) => {
    if (err) {
      // If there's an error reading the file, send a 404 response
      res.writeHead(404);
      res.end('File not found!');
    } else {
      // Render the HTML using the normal.ejs template and the calculated time
      const renderedHtml = ejs.render(data, { time: normalTime });

      // Send a 200 response with the rendered HTML
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(renderedHtml);
    }
  });
}

// Export the normalRouter function to be used by other modules
module.exports = normalRouter;
