const redis = require('async-redis');


const REDISHOST = process.env.REDISHOST || 'localhost';
const REDISPORT = process.env.REDISPORT || 6379;

const client = redis.createClient(REDISPORT, REDISHOST, {
    retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
            console.log('SERVER REFUSED CONNECTION!');
            return new Error("The server refused the connection.");
        }
        return Math.min(options.attempt*100, 3000);
    }
});

client.on('error', (err) => {
    console.log("Errorrrrr " + err);
});


module.exports = {client};