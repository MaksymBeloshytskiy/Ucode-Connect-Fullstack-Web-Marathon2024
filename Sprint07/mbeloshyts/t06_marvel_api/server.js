const express = require('express');
const https = require('https');
const path = require('path');
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 3000;

const API_BASE = "https://gateway.marvel.com/v1/public/comics";
const PUBLIC_KEY = "92ee3fbef4937cabd507380e8fcbc7f4";
const PRIVATE_KEY = "f66f0c4cedde7fde55aa73d332de73bfcae0793d";

app.use(express.static(path.join(__dirname, './')));

// Function to generate the hash for Marvel API authentication
function generateHash(timestamp) {
    return require('crypto').createHash('md5').update(timestamp + PRIVATE_KEY + PUBLIC_KEY).digest("hex");
}

// Route to fetch comics data from Marvel API
app.get('/api/comics', (req, res) => {
    const timestamp = Date.now().toString();
    const hash = generateHash(timestamp);
    
    const queryParams = querystring.stringify({
            ts: timestamp,
            apikey: PUBLIC_KEY,
            hash: hash
    });
    
    const apiUrl = `${API_BASE}?${queryParams}`;
    
    // Send a GET request to Marvel API
    const request = https.get(apiUrl, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                    data += chunk;
            });

            apiRes.on('end', () => {
                    try {
                            const jsonData = JSON.parse(data);
                            res.json(jsonData.data.results);
                    } catch (error) {
                            console.error('Error parsing JSON:', error);
                            res.status(500).send('Error parsing JSON from Marvel API');
                    }
            });
    });

    // Handle errors during the request to Marvel API
    request.on('error', (error) => {
            console.error('Error fetching data from Marvel API:', error);
            res.status(500).send('Error fetching data from Marvel API');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});
