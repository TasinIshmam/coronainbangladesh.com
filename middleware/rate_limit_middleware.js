
let {RateLimiterMemory} = require('rate-limiter-flexible');



const opts = {
    points: 10, // 6 points
    duration: 1, // Per second
};


const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddlewareInMemory = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).send('Too Many Requests');
        });
};


module.exports = {rateLimiterMiddlewareInMemory};
