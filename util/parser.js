const axios = require('axios');
const cheerio = require('cheerio');

async function getAllLiveNews() {
	/*
 * parses current live news from ProthomAlo/Live.
 * 
 * @dependencies axios, cheerio
 * 
 * @return {Array} 
 * eg: [
 * { id: 97,
 *   title:
 *    'করোনার কারণে আপাতত দেশের সব খেলাধুলা বন্ধ থাকবে: ক্রীড়া প্রতিমন্ত্রী',
 *   url: '',
 *   date: '১৬-০৩-২০২০',
 *  time: '০৬:০৫' }, 
 * ...]
 */

	const options = {
		headers: {
			'user-agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36'
		}
	};

	let response = await axios.get('https://service.prothomalo.com/commentary/index.php', options);

	const $ = cheerio.load(response.data);

	const allNewsTime = [];
	const allNewsTitle = [];

	$('.time').each(function(i, elem) {
		let time = $(this).text();
		time = time.trim().replace('\n', '');
		let firstSpaceIdx = time.indexOf(' ');
		let lastSpaceIdx = time.lastIndexOf(' ');
		let dt = '';
		let tm = '';
		if (firstSpaceIdx == lastSpaceIdx) {
			tm = time;
		} else {
			dt = time.substr(0, firstSpaceIdx);
			tm = time.substr(lastSpaceIdx + 1);
		}
		allNewsTime.unshift({ date: dt, time: tm });
	});

	$('.content').each(function(i, elem) {
		allNewsTitle.unshift($(this).text().trim());
	});

	const allLiveNews = [];
	for (let i = 0; i < allNewsTitle.length; i++) {
		allLiveNews.push({
			id: i + 1,
			title: allNewsTitle[i],
			url: '',
			date: allNewsTime[i].date,
			time: allNewsTime[i].time
		});
	}

	return allLiveNews;
}

module.exports = { getAllLiveNews };
