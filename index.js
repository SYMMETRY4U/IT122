// Import express
import express from 'express';
import path from 'path';
import { getAll, getItem } from './data.js'; // Import data.js module

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Express views directory
app.use(express.static(path.join(process.cwd(), 'views')));

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Define the route for the home page
app.get('/', (req, res) => {
    const data = getAll();
    res.render('home', { data }); // Render home.ejs
});

// Define the route for the detail page
app.get('/detail', (req, res) => {
    const { brand } = req.query;
    const item = getItem(brand);
    if (item) {
        res.render('detail', { title: `Detail for ${brand}`, item, pageTitle: 'Vintage Bike Info', header: 'Vintage Motocross' }); 
    } else {
        res.status(404).render('404'); 
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
