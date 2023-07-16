// Import express
import express from 'express';
import path from 'path';
import { Motorcycle } from './models/Motorcycles.js'; 

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(express.static(path.join(process.cwd(), 'views')));

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// home page
app.get('/', async (req, res) => {
    try {
        const data = await Motorcycle.find({}).lean();
        res.render('home', { data }); // Render home.ejs
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Define the route for the detail page
app.get('/detail', async (req, res) => {
    const { brand } = req.query;
    try {
        const item = await Motorcycle.findOne({ brand }).lean();
        if (item) {
            res.render('detail', { title: `Detail for ${brand}`, item, pageTitle: 'Vintage Bike Info', header: 'Vintage Motocross' }); 
        } else {
            res.status(404).render('404'); 
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// Define the route for the about page
app.get('/about', (req, res) => {
    res.render('about'); // Render about.ejs page
});

app.use((req, res) => {
    res.status(404).render('404'); 
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
