const redis_init = require('../../cache/redis_init');

const client = redis_init.client;

async function get_cached_data(key) {
    client.get(key).then((result) => {

    }).catch((err) => {

    });
}