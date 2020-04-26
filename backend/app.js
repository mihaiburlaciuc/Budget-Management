const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json() );

const apiMetrics = require('prometheus-api-metrics');
app.use(apiMetrics());

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
const DB_URI = "mongodb://mongo:27017/budgetDB";

console.log("_________________________ NODE.JS BACKEND STARTED ________________________");
mongoose.connect(DB_URI).then(() => {
    console.log("Connected to mongo db");
})
.catch(err => {
    console.log("Mongo err " + err);
});

app.get('/', (req, res) => {
    console.log('HW req --- ');
    res.send('Hello World');
});

const userRoutes = require('./api/routes/users');

app.use('/users', userRoutes);

const vendorRoutes = require('./api/routes/vendors');

app.use('/vendors', vendorRoutes);

// Catch all requests that go past /products or /orders
app.use((req, res, next) => {
    console.log("404 page not found: did you add the route?");
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