import express from 'express';
import cors from 'cors';
// used to test server
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.get('/:name', (req, res) => {
    let name = req.params.name;

    res.json({
        message: `Hello ${name}`
    });
});

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});
