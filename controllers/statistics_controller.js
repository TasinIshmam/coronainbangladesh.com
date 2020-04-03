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
            return res.status(200).send("OK");
        } else {
            console.error("ERROR in POST /api/statistics/override\nDatabase could not be updated.");
            return res.status(400).send("ERROR in POST /api/statistics/override\\nDatabase could not be updated.");
        }


    } catch (e) {
        console.error("ERROR in POST /api/statistics/override\nDatabase could not be updated.");
        console.error(e);
        return res.status(500).send(e);
    }
}

/**
 * Updates statistics collection with timeseries data from the given day (For Bangladesh)
 * Cron job handler.
 * @param req
 * @param res
 * @returns {Promise<HTTPResponse>}
 */
async function handle_timeseries_update_cronjob_bangladesh(req, res) {
    try {
        let result = await statistics_interface.update_timeseries_today_BD();
        if(result) {
            return res.status(200).send("OK");
        } else {
            return res.status(500).send("update_timeseries_today_BD returned false.");
        }
    } catch (e) {
        console.error("ERROR: in handle_timeseries_update_cronjob_bangladesh");
        console.error(e);
        return res.status(500).send(e);
    }
}

module.exports = {handle_POST_update_override_statistics_bangladesh, handle_timeseries_update_cronjob_bangladesh};