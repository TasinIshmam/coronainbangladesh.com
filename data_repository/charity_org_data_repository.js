const cache = require('../cache/cache_interface');
const charity_org_interface = require('../database/interface/charity_org_interface');


const CACHE_EXPIRATION_TIME = 1800;

/**
 * Get charity orgs as array, specify language
 * @param {String }language - Values "EN" or "BN"
 * @returns {Promise<[{CharityOrg}]|[]>}
 */
async function get_all_charity_org(language) {

    let key = "charity_orgs_all_" + language;
    let response = cache.get_cached_data(key);

    if(response.status){
        return response.data;
    } else {
        let db_result = await charity_org_interface.get_all_charity_org(language);
        cache.set_cache_with_exp(key, db_result, CACHE_EXPIRATION_TIME);
        return db_result;
    }
}


module.exports = {get_all_charity_org};