const {DivisionData} = require('../models/division_data');


/**
 * Bulk update. As Mongoose does not natively support this, we are doing it iteratively.
 * Due to the small number of documents, performance is not a concern.
 * @returns {Promise<[{DivisionData}]|[]>}
 * @param division_data_arr
 */
async function upsert_division_data(division_data_arr) {
    //

    try {
        let res = [];
        for (let i = 0; i < division_data_arr.length; i++) {

            let temp = await DivisionData.findOneAndUpdate({
                "name": division_data_arr[i].name
            }, {
                $currentDate: {
                    last_update: true
                },
                $set: {
                    name: division_data_arr[i].name,
                    id: division_data_arr[i].id,
                    quarantine_ongoing: division_data_arr[i].quarantine_ongoing,
                    quarantine_complete: division_data_arr[i].quarantine_complete,
                    isolation_beds: division_data_arr[i].isolation_beds,
                }
            }, {
                upsert: true,
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

            res.push(temp);
        }

        return res;

    } catch (e) {
        console.error("ERROR: Error in upsert_division_data of division_data db interface");
        console.error(e);
        return [];
    }
}

/**
 * Searches for division entry by division id
 * @param {Number} id - Division id
 * @returns {Promise<{}|*>}
 */
async function get_division_by_id(id) {
    try {
        let result = await DivisionData.findOne({"id": id});

        if (result === undefined || result === null) return {};

        return result;

    } catch (e) {
        console.error("ERROR: Error in find_division_by_id");
        console.error(e);
        return {};
    }
}


/**
 * Get All method
 * @returns {Promise<[{DivisionData}]|[]>}
 */
async function get_division_all() {
    try {
        let result = await DivisionData.find();

        if (result === undefined || result === null) return [];

        return result;
    } catch (e) {
        console.error("ERROR: Error in get_division_all");
        console.error(e);
        return [];
    }
}


module.exports = {upsert_division_data, get_division_by_id, get_division_all};