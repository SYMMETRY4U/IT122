import express from 'express';
import path from 'path';
import cors from 'cors';
import { Motorcycle } from './models/Motorcycles.js';


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'views')));

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

app.get('/', async (req, res) => {
    try {
        const data = await Motorcycle.find({}).lean();
        res.render('home', { data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/detail', async (req, res) => {
    const { brand } = req.query;
    try {
        const item = await Motorcycle.findOne({ brand }).lean();
        if (item) {
            res.render('detail', { item }); 
        } else {
            res.status(404).render('404'); 
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/motorcycle', async (req, res) => {
    const { brand, model, year, color } = req.body;
    try {
        const data = { brand, model, year: Number(year), color };
        const existingMotorcycle = await Motorcycle.findOne({ brand }).lean();
        const updatedMotorcycle = await Motorcycle.findOneAndUpdate({ brand }, data, { upsert: true, new: true });
        if (existingMotorcycle) {
            res.status(200).json({ message: 'Motorcycle updated', data: updatedMotorcycle });
        } else {
            res.status(200).json({ message: 'Motorcycle added', data: updatedMotorcycle });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.delete('/motorcycle', async (req, res) => {
    const { brand } = req.body;
    try {
        const result = await Motorcycle.deleteOne({ brand });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Motorcycle deleted', data: result });
        } else {
            res.status(200).json({ message: 'Motorcycle not found', data: result });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

app.use((req, res) => {
    res.status(404).render('404'); 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
