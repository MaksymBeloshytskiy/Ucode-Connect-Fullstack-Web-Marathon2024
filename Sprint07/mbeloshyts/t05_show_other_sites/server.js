const express = require('express');
const http = require('http');
const https = require('https');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

// Handle GET request to '/fetch-page' endpoint
app.get('/fetch-page', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    const protocol = url.startsWith('https') ? https : http;

    // Make a GET request to the specified URL
    protocol.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            // Extract the body content from the response
            const bodyContent = data.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

            if (bodyContent && bodyContent.length > 1) {
                // Escape special characters in the body content
                const escapedContent = bodyContent[1]
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');
                res.send(`<body><code>${escapedContent}</code></body>`);
            } else {
                // If body content extraction fails, send an error response
                res.status(500).send('Could not extract body content');
            }
        });
    }).on('error', (err) => {
        // If there's an error fetching the page, send an error response
        res.status(500).send('Error fetching the page');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
