const express = require('express');
const router = express.Router();

// Importing DB Interfaces
const stat_interface = require('../database/interface/statistics_interface');
const live_news_interface = require('../database/interface/live_news_interface');
const featured_news_interface = require('../database/interface/featured_news_interface');
const myth_interface = require('../database/interface/myth_interface');

/* GET bn home page. */
router.get('/', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_bangladesh();
	const featured_news = await featured_news_interface.getNewsBetweenDatesWithCount();
	const live_news = await live_news_interface.get_all_live_news();

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
	const live_news = await live_news_interface.get_all_live_news();

	res.render('index_en', {
		stats: stats,
		featured_news: featured_news,
		live_news: live_news
	});
});

/* GET bn home page. */
router.get('/corona', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_world();

	res.render('coronavirus', {
		stats: stats
	});
});

/* GET en home page. */
router.get('/en/corona', async function(req, res, next) {
	const stats = await stat_interface.get_statistics_world();

	res.render('coronavirus_en', {
		stats: stats
	});
});

module.exports = router;
