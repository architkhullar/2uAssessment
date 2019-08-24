require('dotenv').config();
const http = require('http');
const bodyParser = require('body-parser');

// for session handelling -TODO in future
//const jsonwebtoken = require("jsonwebtoken");

// Initialize express
const express = require('express');
const app = express();


// Initialize MongoDB
const mongoose = require('mongoose');
const Invoice = require('../api/models/InvoiceModel');

// Mongo db connection
console.log(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
}, err => {
  if(err) {
    console.log(`Error connecting to the database ${err}`);
    process.exit(1);
  }
});

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb+srv://aMad:1201912019@cluster0-axmyu.mongodb.net/2U?retryWrites=true&w=majority',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('../api/routes/Route'); //importing route
routes(app); //register the route

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
