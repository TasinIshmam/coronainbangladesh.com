const express = require('express');
const router = express.Router();
const moment = require('moment');

// Importing DB Interfaces
const stat_interface = require('../database/interface/statistics_interface');
const live_news_interface = require('../database/interface/live_news_interface');
const featured_news_interface = require('../database/interface/featured_news_interface');
const daily_news_interface = require('../database/interface/daily_news_interface');
// const myth_interface = require('../database/interface/myth_interface');

/* GET bn home page. */
router.get('/', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_bangladesh();
	const featured_news = await featured_news_interface.getNewsBetweenDatesWithCount();
	const live_news = await live_news_interface.get_all_live_news(10);

	res.render('index', {
		stats: stats,
		featured_news: featured_news,
		live_news: live_news
	});
});

/* GET en home page. */
router.get('/en', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_bangladesh();
	const featured_news = await featured_news_interface.getNewsBetweenDatesWithCount();
	const live_news = await live_news_interface.get_all_live_news(10);

	res.render('index_en', {
		stats: stats,
		featured_news: featured_news,
		live_news: live_news
	});
});

/* GET bn live update page. */
router.get('/live-update', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_bangladesh();
	const world_stats = await stat_interface.get_statistics_world();
	const live_news = await live_news_interface.get_all_live_news();

	res.render('live_update', {
		stats: stats,
		world_stats: world_stats,
		live_news: live_news
	});
});

/* GET en live update page. */
router.get('/en/live-update', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_bangladesh();
	const world_stats = await stat_interface.get_statistics_world();
	const live_news = await live_news_interface.get_all_live_news();

	res.render('live_update_en', {
		stats: stats,
		world_stats: world_stats,
		live_news: live_news
	});
});

/* GET bn daily update page. */
router.get('/updates', async function(req, res, next) {
	console.log(req.query.date);

	const stats = await stat_interface.get_statistics_bangladesh();
	const world_stats = await stat_interface.get_statistics_world();
	const bd_news = await daily_news_interface.get_BANGLA_daily_news_BD_with_date();
	const world_news = await daily_news_interface.get_BANGLA_daily_news_GLOBAL_with_date();
	const date = moment().format('Do MMMM, YYYY');

	res.render('daily_update', {
		stats: stats,
		world_stats: world_stats,
		bd_news: bd_news,
		world_news: world_news,
		date: date
	});
});

/* GET en daily update page. */
router.get('/en/updates', async function(req, res, next) {
	console.log(req.query.date);

	const stats = await stat_interface.get_statistics_bangladesh();
	const world_stats = await stat_interface.get_statistics_world();
	const bd_news = await daily_news_interface.get_ENGLISH_daily_news_BD_with_date();
	const world_news = await daily_news_interface.get_ENGLISH_daily_news_GLOBAL_with_date();
	const date = moment().format('Do MMMM, YYYY');

	res.render('daily_update_en', {
		stats: stats,
		world_stats: world_stats,
		bd_news: bd_news,
		world_news: world_news,
		date: date
	});
});

/* GET bn what is corona page. */
router.get('/corona', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_world();

	res.render('coronavirus', {
		stats: stats
	});
});

/* GET en what is corona page. */
router.get('/en/corona', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_world();

	res.render('coronavirus_en', {
		stats: stats
	});
});

/* GET bn prevention page. */
router.get('/prevention', function(req, res, next) {
	res.render('preventions');
});

/* GET en prevention page. */
router.get('/en/prevention', function(req, res, next) {
	res.render('preventions_en');
});

/* GET bn prevention page. */
router.get('/mythbuster', function(req, res, next) {
	res.render('mythbuster', {
		validation_token: process.env.USER_PUT_SECRET_KEY
	});
});

/* GET en mythbuster page. */
router.get('/en/mythbuster', function(req, res, next) {
	res.render('mythbuster_en', {
		validation_token: process.env.USER_PUT_SECRET_KEY
	});
});

/* GET bn emergency page. */
router.get('/emergency', function(req, res, next) {
	res.render('emergencies');
});

/* GET en emergency page. */
router.get('/en/emergency', function(req, res, next) {
	res.render('emergencies_en');
});

/* GET bn contact page. */
router.get('/contact', function(req, res, next) {
	res.render('contact');
});

/* GET en contact page. */
router.get('/en/contact', function(req, res, next) {
	res.render('contact_en');
});

/* GET bn about page. */
router.get('/about', function(req, res, next) {
	res.render('about');
});

/* GET en about page. */
router.get('/en/about', function(req, res, next) {
	res.render('about_en');
});

/* GET bn privacy page. */
router.get('/privacy-policy', function(req, res, next) {
	res.render('privacy');
});

/* GET en privacy page. */
router.get('/en/privacy-policy', function(req, res, next) {
	res.render('privacy_en');
});

module.exports = router;
