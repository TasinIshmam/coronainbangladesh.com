var express = require('express');
var router = express.Router();

//middleware
let cron_job_middleware = require('../middleware/cron_job_middleware');


//controllers for different routes
let api_mythbuster_controller = require('../controllers/api_mythbuster_controller');
let api_user_quiz_controller = require('../controllers/api_user_quiz_controller');
let live_news_controller = require('../controllers/live_news_controller');
let featured_news_controller = require('../controllers/featured_news_controller');
let daily_news_controller = require('../controllers/daily_news_controller');
let statistics_controller = require('../controllers/statistics_controller');


//get mythbuster json array
router.get('/myths', api_mythbuster_controller.handle_get_myths );


//route for emails of users playing mythbusters
router.post('/myths/users', api_user_quiz_controller.handle_POST_user);


//post new featured news
router.post('/featurednews' , featured_news_controller.handle_POST_featured_news);


//Cron job routes
router.get('/tasks/update-live-news', cron_job_middleware.verify_cron_job_gcloud_source, live_news_controller.handle_live_news_update );


//dailynews
router.post('/dailynews' , daily_news_controller.handle_POST_daily_news);


//statistics
router.post('/statistics/override' , statistics_controller.handle_POST_update_override_statistics_bangladesh);



module.exports = router;
