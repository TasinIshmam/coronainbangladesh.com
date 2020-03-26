const { FeaturedNews } = require('../models/featured_news');
const moment = require('moment');


/**
 * Inserts into db
 * @param [{FeaturedNews}]newsArray
 * @returns {Promise<[{FeaturedNews}]|*>}  elements inserted into database.
 */
async function insert_many_featured_news(newsArray) {
	try {
		let result = await FeaturedNews.insertMany(newsArray, { upsert: true, setDefaultOnInsert: true });

		if (result === null || result === undefined) return [];

		return result;
	} catch (e) {
		console.error("ERROR: Error in insert_many_featured_news");
		console.error(e);
		return [];
	}
}

//todo TEST THOROUGHLY.

/**
 *
 * @param {Number} count - Number of news items to return
 * @param {moment.Moment} startDate
 * @param {moment.Moment} endDate
 * @returns {Promise<[{FeaturedNews}]>} Fetched items array from Database
 */
async function get_news_between_dates_with_count(
	count = 20,
	startDate = moment().startOf('day').subtract(5, 'day'),
	endDate = moment().endOf('day')
) {
	try {
		let result = await FeaturedNews.find({ date: { $gte: startDate, $lte: endDate } })
			.select(' -_id -__v')
			.sort({ date: -1, importance_rating: -1 })
			.limit(count);

		if (result === null || result === undefined) return [];

		//console.debug(result.length);
		return result;
	} catch (e) {
		console.error("Error in featured_news interface in function get_news_between_dates_with_count");
		console.error(e);
		return [];
	}
}

module.exports = {  insert_many_featured_news,  get_news_between_dates_with_count };
