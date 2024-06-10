const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
    // Send the index.html file
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Set the port number for the server
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});
