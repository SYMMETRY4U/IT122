// Import express
const express = require('express');

const app = express();

// Define the port to run the server
const PORT = 3000;

// Define the route for the home page
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body>
            <div align="center">
            <h1>Welcome to the home page!</h1>
            <h2>For IT122 Assignment 1 By Brian St Louis</h2>
        </div>
            </body>
        </html>
    `);
});


// Define the route for the about page
app.get('/about', (req, res) => {
    res.send(`
        <html>
            <body>
            <div align="center">
            <h2>We are Symmetry Health Services LLC</h2>
            <h2>For IT122 Assignment 1 By Brian St Louis</h2>
        </div>
            </body>
        </html>
    `);
});

// Define a default route for all other paths to return a 404
app.use((req, res) => {
    res.status(404).send('Sorry, we cannot find that!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
