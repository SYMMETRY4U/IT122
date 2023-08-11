'use strict';

import express from 'express';
import Motorcycle from './models/Motorcycles.js';

const app = express();
                                            // app.set("port", process.env.PORT || 3000);
const PORT = process.env.PORT || 3000;  app.set('port', PORT);
app.use(express.static('./views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('home');
});

app.get('/detail', (req,res,next) => {
    Motorcycle.findOne({ brand:req.query.brand }).lean()
        .then((motorcycles) => {
            res.render('details', {result: motorcycles} );
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

// api's 
app.get('/api/v1/motorcycles/:brand', (req, res, next) => {
    let brand = req.params.brand;
    Motorcycle.findOne({brand: brand}, (err, result) => {
        if (err || !result) return next(err);
        res.json(result);    
    });
});     
// Add or update a motorcycles
app.get('/api/v1/motorcycles', (req, res, next) => {
    Motorcycle.find()
        .then(results => {
            if (!results) return next(new Error('Results not found'));
            res.json(results);
        })
        .catch(err => next(err));
});


app.get('/api/v1/delete/:id', async (req, res, next) => {
    try {
        let result = await Motorcycle.deleteOne({ "_id": req.params.id });
        // return # of items deleted
        res.json({ "deleted": result.n });
    } catch (err) {
        return next(err);
    }
});


app.post('/api/v1/add/', async (req, res, next) => {
    try {
        if (!req.body._id) { // insert new document
            let motorcycles = new Motorcycle(req.body);
            let newMotorcycles = await motorcycles.save();
            res.json({updated: 0, _id: newMotorcycles._id});
        } else { // update existing document
            let result = await Motorcycle.updateOne({ _id: req.body._id}, {brand:req.body.brand, model: req.body.model, year: req.body.year, color: req.body.color });
            res.json({updated: result.nModified, _id: req.body._id});
        }
    } catch(err) {
        return next(err);
    }
});


app.get('/api/v1/add/:brand/:model/:year/:color', (req,res, next) => {
    // find & update existing item, or add new 
    let brand = req.params.brand;
    Motorcycle.update({ brand: brand}, {brand:brand, model: req.params.model, year: req.params.year, color:req.params.color }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(PORT, () => {
    console.log(`Express started on http://localhost:${PORT}`);
});
