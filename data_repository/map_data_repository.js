let cache = require('../cache/cache_interface');
let division_data_interface = require('../database/interface/division_data_interface');
let district_data_interface = require('../database/interface/district_data_interface');


const EXPIRATION_TIME = 900;


/**
 * Get all division entries method
 * @returns {Promise<{DivisionData}[]|[]>}
 */
async function get_division_all() {
    let key = "division_data_all";
    let response = cache.get_cached_data(key);

    if (response.status) {
        return response.data;
    } else {
        let db_result = await division_data_interface.get_division_all();
        cache.set_cache_with_exp(key, db_result, EXPIRATION_TIME);
        console.log("Division data cache update");
        return db_result;
    }
}


/**
 * Get all district entries method
 * @returns {Promise<{DistrictData}[]|[]>}
 */
async function get_district_all() {
    let key = "district_data_all";
    let response = cache.get_cached_data(key);

    if (response.status) {
        return response.data;
    } else {
        let db_result = await district_data_interface.get_district_all();
        cache.set_cache_with_exp(key, db_result, EXPIRATION_TIME);
        console.log("District data cache update");
        return db_result;
    }
}


module.exports = {get_division_all, get_district_all};