const { RateLimiterMongo } = require('rate-limiter-flexible');
const {mongoose} = require('../database/mongoose');



const max_requests_every_second = 20;

const request_per_second_rate_limit = new RateLimiterMongo({
    storeClient: mongoose.connection,
    keyPrefix: 'too_many_requests_ip_per_second',
    points: max_requests_every_second,
    duration: 1,
    blockDuration: 60, // Block for one minute if requests exceeded.
});

const rate_limit_per_second_middleware = (req, res, next) => {
    request_per_second_rate_limit.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Too Many Requests from this ip');
        });
};

module.exports = {rate_limit_per_second_middleware};
