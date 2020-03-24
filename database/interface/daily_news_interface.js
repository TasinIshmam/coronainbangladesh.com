const moment = require('moment');
const {DailyNews} = require('../models/daily_news');




async function get_BANGLA_daily_news_BD_with_date(targetDate) {

    let dummy_news_bd_23_march =[{
        "text": "দেশে করোনায় আক্রান্ত হয়ে আরো একজনের মৃত্যু। নতুন করে আক্রান্ত ৬ জন। দেশে এখন পর্যন্ত করোনায় আক্রান্ত হয়েছেন ৩৩ জন। মৃত্যুবরণ করেছেন ৩ জন। - আইইডিসিআর।",
        "reference": "https://www.prothomalo.com/bangladesh/article/1646517/দেশে-করোনায়-আরও-৬-জন-আক্রান্ত-একজনের-মৃত্যু",
        "image_url": "https://paloimages.prothom-alo.com/contents/cache/images/320x179x1/uploads/media/2020/03/11/1000d900564b8f758a3aa7b8aa4aaa93-5e68a57075cac.jpg",
        "date": "2020-03-23",
        "importance_rating": 3
    }, {
        "text": "করোনা ভাইরাস প্রতিরোধে ২৬ মার্চ থেকে ৪ এপ্রিল পর্যন্ত সরকারি ছুটি ঘোষণা করা হয়েছে। এর মধ্যে ২৯ মার্চ থেকে ২ এপ্রিল সাধারণ ছুটি ঘোষণা করা হয়েছে। এসময় সরকারি-বেসরকারি সব প্রতিষ্ঠান বন্ধ থাকবে। তবে এ ছুটি কাঁচাবাজার, হাসপাতাল এবং অন্যান্য জরুরী সেবার জন্য প্রযোজ্য হবেনা।",
        "reference": "https://www.prothomalo.com/bangladesh/article/1646516/টানা-১০-দিন-সাধারণ-ছুটি-ঘোষণা",
        "image_url": "https://paloimages.prothom-alo.com/contents/cache/images/320x179x1/uploads/media/2018/04/02/c1bfa328b1d3bbd2cbe8bab3a6798985-5ac21c0ed466c.jpg",
        "date": "2020-03-23",
        "importance_rating": 4
    }, {
        "text": "সামাজিক দূরত্ব নিশ্চিত করতে আগামীকাল মঙ্গলবার (২৪ মার্চ) থেকে মাঠে নামছে সেনাবাহিনী। বিভাগীয় ও জেলা শহরগুলোয় সামাজিক দূরত্ব বজায় রাখতে সতর্কতামূলক ব্যবস্থার নেয়ায় বেসামরিক প্রশাসনকে সহায়তা দিতে এই সিদ্ধান্ত।",
        "reference": "https://www.bbc.com/bengali/news-52001769",
        "image_url": "https://ichef.bbci.co.uk/news/660/cpsprodpb/3B9B/production/_111395251_01628447-55a8-4229-8c64-a4015323c475.jpg",
        "date": "2020-03-23",
        "importance_rating": 5
    }, {
        "text": "করোনা ভাইরাসের প্রাদুর্ভাব প্রতিরোধে বন্ধ থাকা সকল সরকারি এবং বেসরকারী বিশ্ববিদ্যালয় গুলোর প্রতি অনলাইনে পাঠদানের আহ্বান জানিয়েছে ‘বিশ্ববিদ্যালয় মঞ্জুরী কমিশন’ (ইউজিসি)",
        "reference": "https://www.thedailystar.net/country/news/conduct-academic-activities-online-during-closure-ugc-universities-1884748",
        "image_url": "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/big_2/public/feature/images/ugc-final.jpg?itok=3j-GiFnW",
        "date": "2020-03-23",
        "importance_rating": 2
    }, {
        "text": "করোনা ভাইরাসের কারণে উদ্ভূত পরিস্থিতি বিবেচনা করে স্বাধীনতা দিবসের সকল আয়োজন বাতিল ঘোষণা।",
        "reference": "https://www.prothomalo.com/bangladesh/article/1646500/করোনার-কারণে-স্বাধীনতা-দিবসের-সব-অনুষ্ঠান-বাতিল",
        "image_url": "https://paloimages.prothom-alo.com/contents/cache/images/640x358x1/uploads/media/2017/08/19/121525b3d6d5190b78a1ff660060f1f6-59984679acfa5.jpg",
        "date": "2020-03-23",
        "importance_rating": 1
    }];

    return dummy_news_bd_23_march;
}


async function get_ENGLISH_daily_news_BD_with_date(targetDate) {

    let dummy_news_bd_23_march = [{
        "text": "One more patient dies of corona infection. The number of newly diagnosed cases is 6, which brings the total to 33. Death toll rises to 3 - IEDCR.",
        "reference": "https://www.prothomalo.com/bangladesh/article/1646517/দেশে-করোনায়-আরও-৬-জন-আক্রান্ত-একজনের-মৃত্যু",
        "image_url": "https://paloimages.prothom-alo.com/contents/cache/images/320x179x1/uploads/media/2020/03/11/1000d900564b8f758a3aa7b8aa4aaa93-5e68a57075cac.jpg",
        "date": "2020-03-23",
        "importance_rating": 3
    }, {
        "text": "Government holidays have been declared from 26th March to 4th April to combat the corona outbreak. Of these, 29 March to 2 April have been declared general holidays, during which all private and public institutions will remain closed. However the holiday mandate does not apply to hospitals, grocery markets and emergency services.",
        "reference": "https://www.prothomalo.com/bangladesh/article/1646516/টানা-১০-দিন-সাধারণ-ছুটি-ঘোষণা",
        "image_url": "https://paloimages.prothom-alo.com/contents/cache/images/320x179x1/uploads/media/2018/04/02/c1bfa328b1d3bbd2cbe8bab3a6798985-5ac21c0ed466c.jpg",
        "date": "2020-03-23",
        "importance_rating": 4
    }, {
        "text": "To ensure social distancing, Bangladesh Army will be deployed throughout the country from Tuesday (24 March). They will aid the division and district level local administrations in ensuring social distancing within their respective jurisdictions.",
        "reference": "https://www.bbc.com/bengali/news-52001769",
        "image_url": "https://ichef.bbci.co.uk/news/660/cpsprodpb/3B9B/production/_111395251_01628447-55a8-4229-8c64-a4015323c475.jpg",
        "date": "2020-03-23",
        "importance_rating": 5
    }, {
        "text": "The University Grants Commission (UGC) has asked all private and public universities to take online classes amidst the corona outbreak, to prevent further spreading of the disease.",
        "reference": "https://www.thedailystar.net/country/news/conduct-academic-activities-online-during-closure-ugc-universities-1884748",
        "image_url": "https://assetsds.cdnedge.bluemix.net/sites/default/files/styles/big_2/public/feature/images/ugc-final.jpg?itok=3j-GiFnW",
        "date": "2020-03-23",
        "importance_rating": 2
    }, {
        "text": "All arrangements and activities centered around the Independence Day have been cancelled on account of the current state of the corona outbreak.",
        "reference": "https://www.prothomalo.com/bangladesh/article/1646500/করোনার-কারণে-স্বাধীনতা-দিবসের-সব-অনুষ্ঠান-বাতিল",
        "image_url": "https://paloimages.prothom-alo.com/contents/cache/images/640x358x1/uploads/media/2017/08/19/121525b3d6d5190b78a1ff660060f1f6-59984679acfa5.jpg",
        "date": "2020-03-23",
        "importance_rating": 1
    }];
    return dummy_news_bd_23_march;
}





async function get_BANGLA_daily_news_GLOBAL_with_date(targetDate) {

    let dummy_news_bd_23_march = [ {
        "text": "ইতালীতে গত চব্বিশ ঘন্টায় ৬৫১ জনের মৃত্যু; সর্বমোট মৃত্যুবরণ করেছেন ৫,৪৭৬ জন; আক্রান্তের সংখ্যা ৫৯,১৩৮।",
        "reference": "https://coronavirus.jhu.edu/map.html?fbclid=IwAR2Nd2b77YSttHTU3Ts5HsFGA5WLYV8z5a62g4ZmAMWX4KyHNf_0dTYzizY",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 4
    }, {
        "text": "স্পেনে মৃতের সংখ্যা ছাড়িয়েছে দুই হাজার (২,১৮২ জন); যুক্তরাষ্ট্রে মৃতের সংখ্যা বেড়ে ৪৭১ জন; ফ্রান্সে ৬৭৪ জন; ইরানে ১,৮১২ জন; যুক্তরাজ্যে ২৮১ জন।",
        "reference": "https://coronavirus.jhu.edu/map.html?fbclid=IwAR2Nd2b77YSttHTU3Ts5HsFGA5WLYV8z5a62g4ZmAMWX4KyHNf_0dTYzizY",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 3
    }, {
        "text": "করোনাভাইরাস প্রতিরোধে ভারতে ৮০ টি অঞ্চলে ৩১ মার্চ পর্যন্ত লকডাউন ঘোষণা; বাতিল করা হয়েছে সকল অভ্যন্তরীণ বিমান চলাচল।",
        "reference": "https://www.ndtv.com/india-news/coronavirus-in-india-live-updates-367-confirmed-covid-19-reported-in-india-lockdown-in-80-cities-2198959",
        "image_url": "https://c.ndtvimg.com/2020-03/dbtsg6n8_india-coronavirus-lockdown_650x400_22_March_20.jpg",
        "date": "2020-03-23",
        "importance_rating": 2
    }, {
        "text": "করোনার বিস্তার ঠেকাতে সৌদিআরবে কারফিউ জারির ঘোষণা; ২ জুলাই পর্যন্ত সাধারণ নির্বাচন স্থগিত ঘোষণা করেছে মালাওয়ি।",
        "reference": "https://www.aljazeera.com/news/2020/03/italy-bans-internal-travel-stop-virus-spread-live-updates-200322235532945.html",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }, {
        "text": "সাময়িকভাবে ট্রানজিট সুবিধা স্থগিত করছে সিংগাপুর এবং সংযুক্ত আরব আমিরাত।",
        "reference": "https://www.aljazeera.com/news/2020/03/italy-bans-internal-travel-stop-virus-spread-live-updates-200322235532945.html",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }, {
        "text": "২০২০ সালের অলিম্পিক ও প্যারাঅলিম্পিক গেমসে দল না পাঠানোর ঘোষণা দিয়েছে কানাডা।",
        "reference": "https://www.aljazeera.com/news/2020/03/italy-bans-internal-travel-stop-virus-spread-live-updates-200322235532945.html",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }, {
        "text": "ভাইরাস ছড়ানোর হার পর্যবেক্ষণ করছেন ব্রিটিশ বিজ্ঞানীগণ।",
        "reference": "https://www.reuters.com/article/us-health-coronavirus-britain-sequencing/uk-scientists-to-track-mutations-in-coronavirus-to-map-spread-idUSKBN21A007",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }];
    return dummy_news_bd_23_march;
}


async function get_ENGLISH_daily_news_GLOBAL_with_date(targetDate) {

    let dummy_news_bd_23_march =[{
        "text": "In Italy 651 people have died in the last 24 hours, bringing the death toll to 5,476. Total number of infected people has risen to 59,138.",
        "reference": "https://coronavirus.jhu.edu/map.html?fbclid=IwAR2Nd2b77YSttHTU3Ts5HsFGA5WLYV8z5a62g4ZmAMWX4KyHNf_0dTYzizY",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 4
    }, {
        "text": "Total number of deaths in Spain crosses two thousand (2,182); death toll has increased to 471 in the USA; 674 in France; 1,812 in Iran and 281 in the UK.",
        "reference": "https://coronavirus.jhu.edu/map.html?fbclid=IwAR2Nd2b77YSttHTU3Ts5HsFGA5WLYV8z5a62g4ZmAMWX4KyHNf_0dTYzizY",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 3
    }, {
        "text": "To contain the spreading of the coronavirus, India has cancelled all internal flights and locked down 80 regions till 31 March.",
        "reference": "https://www.ndtv.com/india-news/coronavirus-in-india-live-updates-367-confirmed-covid-19-reported-in-india-lockdown-in-80-cities-2198959",
        "image_url": "https://c.ndtvimg.com/2020-03/dbtsg6n8_india-coronavirus-lockdown_650x400_22_March_20.jpg",
        "date": "2020-03-23",
        "importance_rating": 2
    }, {
        "text": "Saudi Arabia has declared Curfew; Malawi has postponed general elections till 2 July.",
        "reference": "https://www.aljazeera.com/news/2020/03/italy-bans-internal-travel-stop-virus-spread-live-updates-200322235532945.html",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }, {
        "text": "Singapore and the United Arab Emirates have temporarily suspended all transits in combat the corona outbreak.",
        "reference": "https://www.aljazeera.com/news/2020/03/italy-bans-internal-travel-stop-virus-spread-live-updates-200322235532945.html",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }, {
        "text": "Canada has decided not to send teams to the 2020 Olympic and Paralympic Games.",
        "reference": "https://www.aljazeera.com/news/2020/03/italy-bans-internal-travel-stop-virus-spread-live-updates-200322235532945.html",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }, {
        "text": "British scientists work to track spread of virus",
        "reference": "https://www.reuters.com/article/us-health-coronavirus-britain-sequencing/uk-scientists-to-track-mutations-in-coronavirus-to-map-spread-idUSKBN21A007",
        "image_url": "",
        "date": "2020-03-23",
        "importance_rating": 1
    }];
    return dummy_news_bd_23_march;
}

/**
 * Bulk Insert Daily News from Json Array.
 * @param [{DailyNews}] dailys_news_arr
 * @returns  [{DailyNews}] inserted elements
 */
async function insert_many_daily_news(dailys_news_arr) {
    try {
        let res = await DailyNews.insertMany(dailys_news_arr);
        return res;
    } catch (e) {
        console.error(e);
        return {};
    }
}

/**
 * Get's daily news
 * @param {moment} date - All news from that given date.
 * @param @enum {"BD", "GLOBAL"} locale  - Bangladesh news or global news
 * @returns [{DailyNews}] Query Result
 */

async function get_daily_news(date, locale) {

    let startDate = date.clone().startOf('day');
    let endDate = date.clone().endOf('day');

    try {
        let res = await DailyNews.find( { date: { $gte: startDate, $lte: endDate }, "locale": locale}).sort({ importance_rating: -1});
        return res;
    } catch (e) {
        console.error(e);
        return {};
    }
}

module.exports = {get_BANGLA_daily_news_BD_with_date, get_ENGLISH_daily_news_BD_with_date, get_BANGLA_daily_news_GLOBAL_with_date, get_ENGLISH_daily_news_GLOBAL_with_date, insert_many_daily_news, get_daily_news};