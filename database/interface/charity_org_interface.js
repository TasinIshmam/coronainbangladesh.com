
const {CharityOrg} = require('../models/charity_org');


/**
 * Inerts multiple charity orgs
 * @param [{CharityOrg}]charity_org_arr - Elements to insert
 * @returns {Promise<[CharityOrg]|*>}   - Returns charity orgs successfully inserted.
 */
async function insert_many_charity_org(charity_org_arr) {
    try {
        let res = await CharityOrg.insertMany(charity_org_arr);

        if (res === null || res === undefined) return [];

        return res;

    } catch (e) {
        console.error("ERROR: Failed to insert_many charity_org");
        console.error(e);
        return [];
    }
}

/**
 *
 * @param {String} language  - Enum "EN" or "BN" value
 * @returns {Promise<void>}
 */
async function get_all_charity_org(language) {

    try {
        let res = await CharityOrg.find({ "language" : language}).sort({"importance_rating" : -1});

        if (res === null || res === undefined) return [];
        return res;

    } catch (e) {

        console.error("ERROR: Failed to insert_many daily news");
        console.error(e);
        return [];
    }
}


module.exports = {insert_many_charity_org, get_all_charity_org};