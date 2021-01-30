

const {DistrictData} = require('../models/district_data');


/**
 * Bulk update. As Mongoose does not natively support this, we are doing it iteratively.
 * Due to the small number of documents, performance is not a concern.
 * @returns {Promise<[{DistrictData}]|[]>}
 * @param district_data_arr
 */
async function upsert_district_data(district_data_arr) {

    try {
        let res = [];

        for (let i = 0; i < district_data_arr.length; i++) {

            let temp = await DistrictData.findOneAndUpdate({
                "name": district_data_arr[i].name
            }, {
                $currentDate: {
                    last_update: true
                },
                $set: {
                    id: district_data_arr[i].id,
                    name: district_data_arr[i].name,
                    division: district_data_arr[i].division,
                    total_quarantined: district_data_arr[i].total_quarantined,
                    passengers_screened: district_data_arr[i].passengers_screened,
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
        console.error("ERROR: Error in upsert_district_data of district_data db interface");
        console.error(JSON.stringify(e, undefined, 4));
        return [];
    }
}

/**
 * Searches for district entry by district id
 * @param {Number} id - District id
 * @returns {Promise<{}|*>}
 */
async function get_district_by_id(id) {
    try {
        let result = await DistrictData.findOne({"id": id});

        if (result === undefined || result === null) return {};

        return result;

    } catch (e) {
        console.error("ERROR: Error in find_district_by_id");
        console.error(e);
        return {};
    }
}


/**
 * Get All method
 * @returns {Promise<[{DistrictData}]|[]>}
 */
async function get_district_all() {
    try {
        let result = await DistrictData.find();

        if (result === undefined || result === null) return [];

        return result;
    } catch (e) {
        console.error("ERROR: Error in get_district_all");
        console.error(e);
        return [];
    }
}


module.exports = {upsert_district_data, get_district_by_id, get_district_all};