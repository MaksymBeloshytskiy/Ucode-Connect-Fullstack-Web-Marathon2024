const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const normalRouter = require('./normal-router');
const quantumRouter = require('./quantum-router');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        // Serve the index page
        fs.readFile('./views/index.ejs', 'utf8', (err, data) => {
            if (err) {
                // If file not found, return 404
                res.writeHead(404);
                res.end('File not found!');
            } else {
                // Render the EJS template and send the rendered HTML
                const renderedHtml = ejs.render(data);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(renderedHtml);
            }
        });
    } else if (url === '/normal') {
        // Handle requests for the normal route
        normalRouter(req, res);
    } else if (url === '/quantum') {
        // Handle requests for the quantum route
        quantumRouter(req, res);
    } else {
        // If the requested URL doesn't match any of the above, return 404
        res.writeHead(404);
        res.end('Page not found!');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
