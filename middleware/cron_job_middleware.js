
//ensures request is from google servers.
//https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml

const verify_cron_job_gcloud_source = (req, res, next) => {

    try {

        if  (req.header('X-Appengine-Cron') === "true" && (req.ip === "::ffff:127.0.0.1" || req.ip === "::ffff:10.0.0.1") ) {
            return next();
        } else {
            console.error("Cron job failed. Could not verify gcloud source.\nRequest sent from ip: " + req.ip);
            return res.sendStatus(401);
        }
    } catch (e) {
        return res.sendStatus(500);
    }


};

module.exports = {verify_cron_job_gcloud_source};