const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers for CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    // The browser sends an OPTIONS request at some point - find out when
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const mongoose = require("mongoose");
// Protocol: mongodb://localhost:27017/test
const DB_URI = "mongodb://mongo:27017/budget";




mongoose.connect(DB_URI).then(() => {
    console.log("_________________________ NODEJS => APP.JS ________________________");
    console.log("Connected to mongo db");
})
.catch(err => {
    console.log("_________________________ NODEJS => APP.JS ________________________");
    console.log("Mongo err " + err);
});

app.get('/', (req, res) => {
    console.log('HW req --- ');
    res.send('Hello World');
});

// TODO: add routes
const userRoutes = require('./api/routes/users');

app.use('/users', userRoutes);

// Catch all requests that go past /products or /orders
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;