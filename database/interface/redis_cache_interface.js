const redis_init = require('../../cache/redis_init');

const client = redis_init.client;

/**
 * Tries to get cached data.
 * @params
 *    {string} key - the key used to search the redis cache
 * @returns
 *    {boolean} status - 'true' if the redis server responds, 'false' if there is an error.
 *    {string} data - contains cached data if there is a cache hit and null if there is a cache miss
*/
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


/**
 * Tries to set cached data.
 * @params
 *    {string} key - the key that will be used to search the redis cache
 *    {string} value - the value that will be set against key
 * @returns {status, data}
 *    {boolean} status - 'true' if the redis server responds, 'false' if there is an error.
 *    {string} data - contains cached data if there is a cache hit and null if there is a cache miss
 */
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


/**
 * Tries to set cached data with an expiration time.
 * @params
 *    {string} key - the key that will be used to search the redis cache
 *    {string} value - the value that will be set against key
 *    {Number} exp - the expiration time for this key-value pair
 * @returns {status, data}
 *    {boolean} status - 'true' if the redis server responds, 'false' if there is an error.
 *    {string} data - contains cached data if there is a cache hit and null if there is a cache miss
 */
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