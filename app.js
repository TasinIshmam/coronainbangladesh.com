

//initialization
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    require('dotenv').config();
    process.env.MONGODB_URI = 'mongodb://localhost:27017/coronavirus_information_bot';
   // process.env.MONGODB_URI = process.env.MONGODB_URI_Atlas;  //Atlas DB URI.
    process.env.NODE_ENV = "development";
    process.env.PORT = 1338;
}

//connect to database
require('./database/mongoose');

//load modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);


module.exports = app;
