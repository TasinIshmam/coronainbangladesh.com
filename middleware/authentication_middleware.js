

/**
 * Middleware to ensure requests come from Google servers (With appropriate header and ip)
 * https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml
 * OR
 * They have appropriate validation token (For debugging from localhost)
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const verify_cron_job_gcloud_source = (req, res, next) => {

    try {
        if(req.query.validation_token === process.env.VALIDATION_TOKEN_WEBSITE){
            return next();
        } else if  (req.header('X-Appengine-Cron') === "true" && (req.ip === "::ffff:127.0.0.1" || req.ip === "::ffff:10.0.0.1" ) ) {
            return next();
        } else {
            console.error("ERROR: Cron job failed. Could not verify gcloud source.\nRequest sent from ip: " + req.ip);
            return res.status(401).send("Unauthorized");
        }
    } catch (e) {
        console.error("Error in verify_cron_job_gcloud_source ");
        console.error(e);
        return res.sendStatus(500);
    }

};

/**
 * Middleware to ensure validation token was sent with query parameters.
 * Used primarily for POST /api endpoints.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const verify_validation_token = (req, res, next) => {
    try {
        if(req.query.validation_token === process.env.VALIDATION_TOKEN_WEBSITE) {
            return next();
        } else {
            return res.status(401).send("Unauthorized");
        }

    } catch (e) {
        console.error("Error in verify_validation_token ");
        console.error(e);
        return res.sendStatus(500);
    }
};

module.exports = {verify_cron_job_gcloud_source, verify_validation_token};