import express from 'express';
import path from 'path';
import { Motorcycle } from './models/Motorcycles.js'; 

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Express views directory
app.use(express.static(path.join(process.cwd(), 'views')));

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Define the route for the home page
app.get('/', async (req, res) => {
    try {
        const data = await Motorcycle.find({}).lean();
        res.render('home', { data });
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
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
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
    }
});

// Define the route for deleting a record
app.delete('/delete', async (req, res) => {
    const { brand } = req.query;
    try {
        const result = await Motorcycle.findOneAndDelete({ brand });
        if (result) {
            res.send({ message: "Successfully deleted the item.", data: result });
        } else {
            res.status(404).send({ message: "Item not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred while attempting to delete the item." });
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
