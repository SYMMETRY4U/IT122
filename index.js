// Import express
const express = require('express');
const path = require('path');
const { getAll, getItem } = require('./data'); // Import data.js module

const app = express();

// Set EJS as view engine and specify directory for ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

// Express to serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the port to run the server
const PORT = 3000;

// Define the route for the home page
app.get('/', (req, res) => {
    const data = getAll();
    res.render('home', { data }); // Render home.ejs and pass the data to it
});

// Define the route for the detail page
app.get('/detail', (req, res) => {
    const { brand } = req.query;
    const item = getItem(brand);
    if (item) {
        res.render('detail', { title: `Detail for ${brand}`, item }); // Pass title and item to the detail.ejs
    } else {
        res.status(404).render('404'); // Render 404.ejs page
    }
});

// Define the route for the about page
app.get('/about', (req, res) => {
    res.render('about'); // Render about.ejs page
});

// Define a default route for all other paths to return a 404
app.use((req, res) => {
    res.status(404).render('404'); 
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
