const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Handle GET requests
        let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
        let extname = path.extname(filePath);
        let contentType = 'text/html';

        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    // File not found, return 404 page
                    fs.readFile(path.join(__dirname, '404.html'), (error, content) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                } else {
                    // Internal server error
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                }
            } else {
                // Return the requested file
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        // Handle POST requests to '/submit' endpoint
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // Parse the form data
            const data = new URLSearchParams(body);
            const answer = data.get('avenger');
            let result;

            if (answer === 'Hulk') {
                result = 'Correct! Hulk is the strongest Avenger.';
            } else {
                result = 'Incorrect! The correct answer is Hulk.';
            }

            // Return the result as JSON
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: result }));
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
