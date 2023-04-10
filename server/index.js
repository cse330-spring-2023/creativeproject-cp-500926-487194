const express = require('express');
const app = express();
const db = require('./dbconnection');

app.use('/api/dbconnection', db);

app.get('/api/dbconnection', (req, res) => {
    res.send("hello world from express");
});

app.listen(1234);