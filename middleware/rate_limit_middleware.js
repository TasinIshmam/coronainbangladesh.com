
let {RateLimiterMemory} = require('rate-limiter-flexible');



const opts = {
    points: 5, // 6 points
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
            return res.sendStatus(429).send('Too Many Requests');
        });
};


module.exports = {rateLimiterMiddlewareInMemory};
