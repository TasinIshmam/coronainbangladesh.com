const redis_init = require('../../cache/redis_init');

const client = redis_init.client;


//Tries to get cached data. Takes one argument - key.
//Returns an object with two attributes - status and data.
//status is 'true' if the redis server responds either with a cache hit or miss.
//status is 'false' if there is an error.
//data is the cached data. Value is null for cache miss.

async function get_cached_data(key) {
    try {
        let data = await client.get(key);
        return {
            status: true,
            data: data
        }
    } catch (e) {
        return {
            status: false,
            data: null
        }
    }
}



//Tries to set cache data. Takes two arguments - key and val.
//Sets the value of key to be val in the cache.
//Returns an object with one attribute - status.
//status is 'true' if data is set successfully and 'false' if there is an error.

async function set_cache(key, val) {
    try {
        await client.set(key, val);
        return {
            status: true
        }
    } catch (e) {
        return {
            status: false
        }
    }
}



//Tries to set cache data. Takes three arguments - key and val and exp.
//Sets the value of key to be val for exp seconds in the cache.
//After exp seconds the value will automatically become null.
//Returns an object with one attribute - status.
//status is 'true' if data is set successfully and 'false' if there is an error.

async function set_cache_with_exp(key, val, exp) {
    try {
        await client.setex(key, exp, val);
        return {
            status: true
        }
    } catch (e) {
        return {
            status: false
        }
    }
}

module.exports = {get_cached_data, set_cache, set_cache_with_exp};