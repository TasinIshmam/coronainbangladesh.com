const { FeaturedNews } = require('../models/featured_news');
const moment = require('moment');

async function insertManyNews(newsArray) {
	try {
		let result = await FeaturedNews.insertMany(newsArray, { upsert: true, setDefaultOnInsert: true });

		return result.length === newsArray.length;
	} catch (e) {
		return false;
	}
}

//todo TEST THOROUGHLY.
//todo if endDate is given, make sure it includes everything in End Date REGARDLESS of the time value.
async function getNewsBetweenDatesWithCount(
	count = 200,
	startDate = moment().startOf('day').subtract(5, 'day'),
	endDate = moment().endOf('day')
) {
	try {
		let result = await FeaturedNews.find({ date: { $gte: startDate, $lte: endDate } })
			.select(' -_id -__v')
			.sort({ date: -1, importance_rating: -1 })
			.limit(count);
		//console.debug(result.length);
		return result;
	} catch (e) {
		return {};
	}
}

module.exports = { insertManyNews, getNewsBetweenDatesWithCount };
