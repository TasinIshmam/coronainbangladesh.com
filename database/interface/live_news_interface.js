const { LiveNews } = require('../models/live_news');

async function get_all_live_news() {
	try {
		let result = LiveNews.find().select('-_id -__v').sort({ id: -1 });
		return result;
	} catch (e) {
		return {};
	}
}

module.exports = { get_all_live_news };
