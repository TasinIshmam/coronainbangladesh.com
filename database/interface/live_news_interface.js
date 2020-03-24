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

	let res = []
	try {

		for(let i = 0; i < live_news_array.length ; i++) {
			let temp = await LiveNews.create(live_news_array[i]);
			res.push(temp);
		}

		return res;
	} catch (e) {
		console.error(e);
		return {};
	}

}

module.exports = { get_all_live_news, insert_live_news_many };
