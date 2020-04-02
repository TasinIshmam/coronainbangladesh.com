const {DivisionData} =  require('../models/division_data');


/**
 * Basically this is bulk upsert. As Mongoose does not natively support this, we are doing it iteratively. Due to the small number of documents, inefficiency is not a concern.
 * @param [{DivisionData}] division_data_arr - Data to insert/update
 * @returns {Promise<[{DivisionData}]|[]>}
 */
async function upsert_division_data(division_data_arr) {
    //

    try {
        let res = [];
        for(let i = 0; i < division_data_arr.length ; i++) {

            let temp = await DivisionData.findOneAndUpdate({
                "name" : division_data_arr[i].name
            }, division_data_arr[i], {upsert: true, new: true, runValidators: true, useFindAndModify: false} );

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
 * Searches for division by division id
 * @param {Number} id - Division id
 * @returns {Promise<{}|*>}
 */
async function get_division_by_id(id) {
    try {
        let result = await DivisionData.findOne({"id" : id});

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


module.exports = { upsert_division_data, get_division_by_id, get_division_all};