let charity_org_interface = require('../database/interface/charity_org_interface');

/**
 * Receives charity_org json Array in request. Updates database.
 *
 * eg, req.body = [{CharityOrg}]
 *
 * @dependencies  ./database/interface/charity_org_interface,
 * @dependencies mongoose
 * @param {Httprequest} req
 * @param  {HttpResponse} res
 * @returns {Http Status}
 */

async function handle_POST_charity_org(req, res) {

    try {

        let charity_org_arr = req.body;
        let result = await charity_org_interface.insert_many_charity_org(charity_org_arr);

        if( charity_org_arr.length === result.length) {
            console.log("POST /api/featurednews successfully finished.");
            return res.status(200).send("Successful");

        } else {
            console.error("ERROR in POST /api/charityorgs. Not all the orgs that were sent could be inserted in database.\nNew charity orgs given " + charity_org_arr.length + "\nInserted in database: " + result.length);

            return res.status(500).send("ERROR in POST /api/charityorgs. Not all the ORGS that were sent could be inserted in database.\nNew charity orgs found: " + charity_org_arr.length + "\nInserted in database: " + result.length);
        }

    } catch (e) {
        console.error("ERROR in POST /api/charityorgs.");
        console.error(e);
        return res.status(500).send(e);
    }
}

module.exports = {handle_POST_charity_org};