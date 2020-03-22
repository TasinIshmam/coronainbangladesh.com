var express = require('express');
var router = express.Router();

let cron_job_middleware = require('../middleware/cron_job_middleware');


//controllers for different routes
let api_mythbuster_controller = require('../controllers/api_mythbuster_controller');
let api_user_quiz_controller = require('../controllers/api_user_quiz_controller');
let cron_jobs_controller = require('../controllers/cron_jobs_controller');



/* GET users listing. */
router.get('/myths', api_mythbuster_controller.handle_get_myths );

router.post('/myths/users', api_user_quiz_controller.handle_PUT_user);


//in development environment no need for middleware for google source verification.
if (process.env.NODE_ENV === 'development') {
    router.get('/tasks/update-live-news', cron_jobs_controller.handle_live_news_update );
} else {  //in production environment, make sure request source is from google servers.
    router.get('/tasks/update-live-news', cron_job_middleware.verify_cron_job_gcloud_source, cron_jobs_controller.handle_live_news_update );
}
module.exports = router;
