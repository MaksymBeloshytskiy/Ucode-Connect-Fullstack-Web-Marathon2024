// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

// Create a server
const server = http.createServer((req, res) => {
    // Handle GET requests
    if (req.method === 'GET') {
        // Serve static files
        if (req.url === '/' || req.url === '/index.html') {
            fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                }
            });
        } else if (req.url === '/index.js') {
            fs.readFile(path.join(__dirname, 'index.js'), (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, {'Content-Type': 'application/javascript'});
                    res.end(data);
                }
            });
        } else if (req.url === '/package.json') {
            fs.readFile(path.join(__dirname, 'package.json'), (err, data) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(data);
                }
            });
        }
    }
    
    // Handle POST requests
    if (req.method === 'POST' && req.url === '/submit-hero') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = parse(body);
            // Handle form submission data here
            console.log(formData);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Form submitted successfully!');
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});
