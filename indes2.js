const http = require('http');
const url = require('url');

// Define the port to run the server on
const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
   
    const path = parsedUrl.pathname;

    
    switch(path) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Welcome to the home page!');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('This is some information about us...');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Sorry, we cannot find that!');
    }
    res.end();
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
