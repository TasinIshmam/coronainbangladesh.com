
let {RateLimiterMemory} = require('rate-limiter-flexible');



const opts = {
    points: 5, // 5 points. Each request consumes 1 point.
    duration: 1, // Per second
};


const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddlewareInMemory = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            console.error("ERROR: Too many request coming in from IP. HTTP: 429");
            return res.status(429).send('Too Many Requests');
        });
};


module.exports = {rateLimiterMiddlewareInMemory};
