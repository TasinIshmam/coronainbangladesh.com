const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');

const mongoOpts = {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 100, // Reconnect every 100ms
};

const dbName = 'somedb';
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
    .catch((err) => {});
const mongoConn = mongoose.connection;
// Or
const mongoConn = mongoose.createConnection(`mongodb://127.0.0.1:27017/${dbName}`, mongoOpts);

const opts = {
    storeClient: mongoConn,
    points: 10, // Number of points
    duration: 1, // Per second(s)
};

const rateLimiterMongo = new RateLimiterMongo(opts);
rateLimiterMongo.consume(remoteAddress, 2) // consume 2 points
    .then((rateLimiterRes) => {
        // 2 points consumed
    })
    .catch((rateLimiterRes) => {
        // Not enough points to consume
    });
