const {FeaturedNews} = require('../models/featured_news');



async function insertManyNews(newsArray) {

    try {
        let result = await FeaturedNews.insertMany(newsArray, {upsert: true, setDefaultOnInsert: true});

        return result.length === newsArray.length;

    } catch (e) {
        return false;
    }

}

//todo TEST THOROUGHLY.
async function getNewsBetweenDatesWithCount(startDate, endDate, count) {
    try {
        let result = await FeaturedNews.find({"date": {"$gte": startDate, "$lte": endDate}   })
            .select(' -_id -__v')
            .sort({importance_rating : -1})
            .limit(count);

        //console.debug(result.length);

        return result;
    } catch (e) {
        return {};
    }
}





module.exports = {insertManyNews, getNewsBetweenDatesWithCount}