const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, './')));

// Proxy endpoint to bypass CORS
app.get('/proxy-image', async (req, res) => {
    try {
        const imageUrl = req.query.url;
        if (!imageUrl) {
            throw new Error('Image URL is missing');
        }
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image')) {
            throw new Error('Response is not an image');
        }
        const imageBuffer = await response.buffer();
        res.writeHead(200, {
            'Content-Type': contentType
        });
        res.end(imageBuffer, 'binary');
    } catch (error) {
        console.error('Error proxying image:', error);
        res.status(500).send('Error proxying image');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:3000`);
});
