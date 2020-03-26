const { LiveNews } = require('../models/live_news');


/**
 * Get the latest live news from collection. Sorted based on max id.
 * @param {Number} count - Max number of elements to return
 * @returns {Promise<[{LiveNews}]>}
 */
async function get_all_live_news(count = 50) {
	try {
		let result = LiveNews.find().select('-_id -__v').sort({ id: -1 }).limit(count);

		if (result === null || result === undefined) return [];

		return result;
	} catch (e) {
		console.error(e);
		return [];
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
