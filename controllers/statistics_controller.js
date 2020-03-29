const statistics_interface = require('../database/interface/statistics_interface');


/**
 * Adds override statistics to database.
 * eg req.body = {
 *     recovered: {Number},
 *     confirmed: {Number},
 *     deaths: {Number},
 *     date: {DATE} (Optional)
 * }
 * @param req
 * @param res
 * @returns response status
 */

async function handle_POST_update_override_statistics_bangladesh(req, res) {

    try {

        let statistics_obj = req.body;

        let result = await statistics_interface.update_override_statistics_bangladesh(statistics_obj);

        if (result && result !== {}) {
            return res.status(200).send();
        } else {
            console.error("Error in POST /api/statistics/override\nDatabase could not be updated.");
            return res.status(400).send();
        }


    } catch (e) {
        console.error("Error in POST /api/statistics/override\nDatabase could not be updated.");
        console.error(e);
        return res.status(500).send();
    }
}


module.exports = {handle_POST_update_override_statistics_bangladesh};