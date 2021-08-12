const express =  require('express');
const planetRouter = require('./routes/planets/planets.router');

const app =  express();
app.use(express.json());
app.use(planetRouter);

app.get('/', (req, res) => {
    res.send("Home page")
})

module.exports = app