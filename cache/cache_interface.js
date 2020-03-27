const NodeCache = require('node-cache');
const my_cache = new NodeCache();


/**
 * Takes one argument, returns a JSON object containing a status and data
 * @param key - a key that will be used to search the cache
 * @returns {{data: null, status: boolean}|{data: (null|JSON), status: boolean}} 
 */
function get_cached_data(key) {
    try {
        let data = my_cache.get(key);
        return {
            status: true,
            data: ( data === undefined || data === null ) ? null : data
        }
    } catch (e) {
        return {
            status: false,
            data: null
        }
    }
}


/**
 * Takes two arguments, returns a JSON object containing a status
 * @param key - the key to set the value against
 * @param val - the value to be set against the key
 * @returns {Promise<{status: boolean}>}
 */
function set_cache(key, val) {
    try {
        my_cache.set(key, val);
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
 * Takes three arguments, returns a JSON object containing a status
 * @param key - the key to set the value against
 * @param val - the value to be set against the key
 * @param exp - the expiration time (in seconds)
 * @returns {Promise<{status: boolean}>}
 */
function set_cache_with_exp(key, val, exp) {
    try {
        my_cache.set(key, exp, val);
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