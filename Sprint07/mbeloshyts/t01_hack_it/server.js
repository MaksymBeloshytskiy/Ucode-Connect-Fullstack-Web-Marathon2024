const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

const sessions = {};

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            // Serve index.html
            fs.readFile('./index.html', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.html');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (req.url === '/index.js') {
            // Serve index.js
            fs.readFile('./index.js', (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading index.js');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                }
            });
        }
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            if (req.url === '/save') {
                // Save password and salt
                const { password, salt } = JSON.parse(body);
                const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
                const sessionId = Math.random().toString(36).substring(2);
                sessions[sessionId] = { hash, salt };
                res.writeHead(200, { 'Content-Type': 'application/json', 'Set-Cookie': `sessionId=${sessionId}` });
                res.end(JSON.stringify({ success: true, hash }));
            } else if (req.url === '/check') {
                // Check password against saved hash
                const { password } = JSON.parse(body);
                const sessionId = req.headers.cookie.split('=')[1];
                const sessionData = sessions[sessionId];
                if (sessionData && sessionData.hash === crypto.createHash('sha256').update(password + sessionData.salt).digest('hex')) {
                    delete sessions[sessionId];
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false }));
                }
            } else if (req.url === '/clear') {
                // Clear session data
                const sessionId = req.headers.cookie.split('=')[1];
                delete sessions[sessionId];
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
