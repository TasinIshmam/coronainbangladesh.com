const { LiveNews } = require('../models/live_news');

async function get_all_live_news(count = 50) {
	try {
		let result = LiveNews.find().select('-_id -__v').sort({ id: -1 }).limit(count);
		return result;
	} catch (e) {
		console.error(e);
		return {};
	}
}

async function insert_live_news_many (live_news_array) {


	try {
		const res = await LiveNews.insertMany(live_news_array, {upsert: true, setDefaultOnInsert: true});
		return res;
	} catch (e) {
		console.error(e);
		return {};
	}

}

module.exports = { get_all_live_news, insert_live_news_many };
