const express = require('express');
const router = express.Router();
const moment = require('moment');

// Importing DB Interfaces
const statistics_data_repository = require('../data_repository/statistics_data_repository');
const news_data_repository = require('../data_repository/news_data_repository');
const charity_orgs_data_repository = require('../data_repository/charity_org_data_repository');
const map_data_repository = require('../data_repository/map_data_repository');

/* GET bn home page. */
router.get('/', async function(req, res, next) {
	const stats = await statistics_data_repository.get_statistics_bangladesh();
	const featured_news = await news_data_repository.get_featured_news();
	const live_news = await news_data_repository.get_live_news(10);

	res.render('index', {
		stats: stats,
		featured_news: featured_news,
		live_news: live_news
	});
});

/* GET en home page. */
router.get('/en', async function(req, res, next) {
	const stats = await statistics_data_repository.get_statistics_bangladesh();
	const featured_news = await news_data_repository.get_featured_news();
	const live_news = await news_data_repository.get_live_news(10);

	res.render('index_en', {
		stats: stats,
		featured_news: featured_news,
		live_news: live_news
	});
});

/* GET bn live update page. */
router.get('/live-update', async function(req, res, next) {
	const stats = await statistics_data_repository.get_statistics_bangladesh();
	const world_stats = await statistics_data_repository.get_statistics_world();
	const live_news = await news_data_repository.get_live_news();

	res.render('live_update', {
		stats: stats,
		world_stats: world_stats,
		live_news: live_news
	});
});

/* GET en live update page. */
router.get('/en/live-update', async function(req, res, next) {
	const stats = await statistics_data_repository.get_statistics_bangladesh();
	const world_stats = await statistics_data_repository.get_statistics_world();
	const live_news = await news_data_repository.get_live_news();

	res.render('live_update_en', {
		stats: stats,
		world_stats: world_stats,
		live_news: live_news
	});
});

/* GET bn daily update page. */
router.get('/updates', async function(req, res, next) {
	let date = moment().format('Do MMMM, YYYY');
	let default_date = moment().format('MM/DD/YYYY');
	let db_date = moment();
	let latest_date = await news_data_repository.get_daily_news_last_updated_date();

	const dateReg = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/20[2-9][0-9]$/;

	if (req.query.date != null) {
		if (req.query.date.match(dateReg) !== null) {
			date = moment(req.query.date, 'MM/DD/YYYY').format('Do MMMM, YYYY');
			default_date = moment(req.query.date, 'MM/DD/YYYY').format('MM/DD/YYYY');
			db_date = moment(req.query.date, 'MM/DD/YYYY');
		}
	} else {
		date = latest_date.format('Do MMMM, YYYY');
		default_date = latest_date.format('MM/DD/YYYY');
		db_date = latest_date;
	}

	const stats = await statistics_data_repository.get_statistics_bangladesh();
	const world_stats = await statistics_data_repository.get_statistics_world();
	const bd_news = await news_data_repository.get_daily_news(db_date, 'BD');
	const world_news = await news_data_repository.get_daily_news(db_date, 'GLOBAL');

	res.render('daily_update', {
		stats: stats,
		world_stats: world_stats,
		bd_news: bd_news,
		world_news: world_news,
		date: date,
		default_date: default_date,
		latest_date: latest_date.format('MM/DD/YYYY'),
		validation_token: process.env.USER_PUT_SECRET_KEY
	});
});

/* GET en daily update page. */
router.get('/en/updates', async function(req, res, next) {
	let date = moment().format('Do MMMM, YYYY');
	let default_date = moment().format('MM/DD/YYYY');
	let db_date = moment();
	let latest_date = await news_data_repository.get_daily_news_last_updated_date();

	const dateReg = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/20[2-9][0-9]$/;

	if (req.query.date != null) {
		if (req.query.date.match(dateReg) !== null) {
			date = moment(req.query.date, 'MM/DD/YYYY').format('Do MMMM, YYYY');
			default_date = moment(req.query.date, 'MM/DD/YYYY').format('MM/DD/YYYY');
			db_date = moment(req.query.date, 'MM/DD/YYYY');
		}
	} else {
		date = latest_date.format('Do MMMM, YYYY');
		default_date = latest_date.format('MM/DD/YYYY');
		db_date = latest_date;
	}

	const stats = await statistics_data_repository.get_statistics_bangladesh();
	const world_stats = await statistics_data_repository.get_statistics_world();
	const bd_news = await news_data_repository.get_daily_news(db_date, 'BD');
	const world_news = await news_data_repository.get_daily_news(db_date, 'GLOBAL');

	res.render('daily_update_en', {
		stats: stats,
		world_stats: world_stats,
		bd_news: bd_news,
		world_news: world_news,
		date: date,
		default_date: default_date,
		latest_date: latest_date.format('MM/DD/YYYY'),
		validation_token: process.env.USER_PUT_SECRET_KEY
	});
});

/* GET bn what is corona page. */
router.get('/corona', async function(req, res, next) {
	const stats = await statistics_data_repository.get_statistics_world();

	res.render('coronavirus', {
		stats: stats
	});
});

/* GET en what is corona page. */
router.get('/en/corona', async function(req, res, next) {
	const stats = await statistics_data_repository.get_statistics_world();

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

/* GET bn donations page. */
router.get('/donations', async function(req, res, next) {
	const charity_orgs = await charity_orgs_data_repository.get_all_charity_org('BN');

	res.render('donations', {
		charity_orgs: charity_orgs
	});
});

/* GET en donations page. */
router.get('/en/donations', async function(req, res, next) {
	const charity_orgs = await charity_orgs_data_repository.get_all_charity_org('EN');

	res.render('donations_en', {
		charity_orgs: charity_orgs
	});
});

/* GET en dashboard page. */
router.get('/dashboard', function(req, res, next) {
	res.render('dashboard');
});

module.exports = router;
