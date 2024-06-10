const http = require('http');
const os = require('os');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Get the request URL
    const parsedUrl = url.parse(req.url, true);

    // Log the required information to the console
    console.log('File Name of Executed Script:', __filename);
    console.log('Arguments Passed to the Script:', process.argv.slice(2));
    console.log('IP Address of the Server:', getServerIpAddress());
    console.log('Host Name Invoking the Current Script:', os.hostname());
    console.log('Name and Version of the Information Protocol:', req.httpVersion);
    console.log('Query Method:', req.method);
    console.log('User-Agent Information:', req.headers['user-agent']);
    console.log('IP Address of the Client:', req.connection.remoteAddress);
    console.log('List of Parameters Passed by URL:', parsedUrl.query);
    console.log('\n');

    // Send a response back to the client
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Information logged to console');
});

// Function to get the server's IP address
function getServerIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'IP address not found';
}

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});
