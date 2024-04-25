import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/user/:name', (req, res) => {
    res.status(500).send("still needs to be implemented");
});

app.post('/user', (req, res) => {
    res.status(500).send("still needs to be implemented");
});

app.put('/user/:name', (req, res) => {
    res.status(500).send("still needs to be implemented");
});

app.get('/artist/:name', (req, res) => {
    res.status(500).send("still needs to be implemented");
});

app.get('/songs/:id', (req, res) => {
    res.status(500).send("still needs to be implemented");
});

app.listen(port, () => {
    console.log('Running...');
})