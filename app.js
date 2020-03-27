//initialization
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {

   // process.env.MONGODB_URI = 'mongodb://localhost:27017/coronavirus_information_bot';
   process.env.MONGODB_URI = process.env.MONGODB_URI;  //Atlas DB URI.  //todo make a package.json to do this run locally connect to livedb thing.
    process.env.NODE_ENV = 'development';
    process.env.PORT = 1338;
}

//console.log(process.env.MONGODB_URI);


//connect to database
let {mongoose} = require('./database/mongoose');
//load modules
const responseTime = require('response-time');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const limiter = require('./middleware/rate_limit_middleware');

const app = express();

//logging
app.use(morgan('short'));


//middleware
app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter.rateLimiterMiddlewareInMemory); //prevents too many requests from the same ip

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

app.use('/live-update', indexRouter);
app.use('/en/live-update', indexRouter);

app.use('/updates', indexRouter);
app.use('/en/updates', indexRouter);

//API ROUTES
app.use('/api', apiRouter);

//404
app.get('*', function (req, res) {
    res.status(404).render('404');
});

process.on('SIGINT', async function () {
    //todo shift from console.error to something more...reasonable
    console.error('SIGINT called');
    await mongoose.disconnect();
    console.error('Mongoose connection terminated');
    process.exit(0);
});

process.on('SIGTERM', async function () {
    console.error('SIGTERM called');
    await mongoose.disconnect();
    console.error('Mongoose connection terminated');
    process.exit(0);
});

module.exports = app;
