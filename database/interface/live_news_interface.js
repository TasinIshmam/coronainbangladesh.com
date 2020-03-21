const { LiveNews } = require('../models/live_news');

async function get_all_live_news(count = 50) {
	try {
		let result = LiveNews.find().select('-_id -__v').sort({ id: -1 }).limit(count);
		return result;
	} catch (e) {
		return {};
	}
}

module.exports = { get_all_live_news };
