//initialization
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	require('dotenv').config();
	process.env.MONGODB_URI = 'mongodb://localhost:27017/coronavirus_information_bot';
	// process.env.MONGODB_URI = process.env.MONGODB_URI_Atlas;  //Atlas DB URI.
	process.env.NODE_ENV = 'development';
	process.env.PORT = 1338;
}

//connect to database
require('./database/mongoose');

//load modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');


const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const {rate_limit_per_second_middleware} = require('./middleware/rate_limit_middleware');

const app = express();

morgan_format = process.env.NODE_ENV === 'development' ? 'dev' : 'common';
app.use(logger(morgan_format));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(rate_limit_per_second_middleware);  //prevents too many requests from the same ip

//Templating Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Handling routes
app.use('/', indexRouter);
app.use('/en', indexRouter);

app.use('/corona', indexRouter);
app.use('/en/corona', indexRouter);

app.use('/prevention', indexRouter);
app.use('/en/prevention', indexRouter);

app.use('/mythbuster', indexRouter);
app.use('/en/mythbuster', indexRouter);

app.use('/emergency', indexRouter);
app.use('/en/emergency', indexRouter);

app.use('/contact', indexRouter);
app.use('/en/contact', indexRouter);

app.use('/about', indexRouter);
app.use('/en/about', indexRouter);

app.use('/privacy-policy', indexRouter);
app.use('/en/privacy-policy', indexRouter);

//API ROUTES
app.use('/api', apiRouter);

//404
app.get('*', function(req, res) {
	res.status(404).render('404');
});

module.exports = app;
