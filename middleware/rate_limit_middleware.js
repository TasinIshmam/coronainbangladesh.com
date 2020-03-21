

//const rateLimit = require("express-rate-limit");



// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
// });

//  apply to all requests

//module.exports = {rate_limit_middleware}













// const { RateLimiterMongo } = require('rate-limiter-flexible');
// const {mongoose} = require('../database/mongoose');
//
//
//
// const max_requests_every_second = 30;
//
// const request_per_second_rate_limit = new RateLimiterMongo({
//     storeClient: mongoose.connection,
//     keyPrefix: 'too_many_requests_ip_per_second',
//     points: max_requests_every_second,
//     duration: 1,
//     blockDuration: 120, // Block for one minute if requests exceeded.
// });
//
// const rate_limit_per_second_middleware = (req, res, next) => {
//
//     let ipconsumed = req.ip;
//     console.debug(req.ip);
//     console.debug(typeof req.ip);
//     console.debug("HELLO WORLD");
//
//     if(!ipconsumed ) {
//         ipconsumed = "::1";
//         console.debug("::1")
//     }
//     request_per_second_rate_limit.consume(ipconsumed)
//         .then(() => {
//             next();
//         })
//         .catch(() => {
//             res.status(429).send('Too Many Requests from this ip');
//         });
// };
//
// module.exports = {rate_limit_per_second_middleware};
