var app = require('../app');
const {Myth} = require('../database/models/myth');
const {FeaturedNews} = require('../database/models/featured_news');
const {LiveNews} = require('../database/models/live_news');
const daily_news_interface = require('../database/interface/daily_news_interface');
const live_news_interface = require('../database/interface/live_news_interface');
const featured_news_interface = require('../database/interface/featured_news_interface');
let {mongoose} = require('../database/mongoose');
let data = require('./object_dump');
const moment = require('moment');





async function populate_myths_collection() {
    const res = await Myth.insertMany(myths_data, {upsert: true, setDefaultOnInsert: true});

    console.debug("Myths populated. Count: " + res.length);

}

async function populate_featured_news_collection() {

    const res = await featured_news_interface.insert_many_featured_news(data.featured_news_data);
    console.debug("Featured News populated. Count: " + res.length);
}

async function populate_live_news_collection() {
    const res = await live_news_interface.insert_live_news_many(data.live_news_data);

    console.debug("Lve News populated. Count: " + res.length);
}


async function populate_daily_news_collection() {
    const res = await daily_news_interface.insert_many_daily_news(data.daily_news_data);
    console.debug("Daily News populated. Count: " + res.length);
}



async function call_db_interface() {

    try {
        const res = await daily_news_interface.insert_many_daily_news(bangladesh);
        console.log(res);
        console.log(res.length);
        mongoose.disconnect().then( () => {
            process.exit(0);
        })
    } catch (e) {
        console.log(e);
        mongoose.disconnect().then( () => {
            process.exit(0);
        })
    }
}





//insert_stuff_to_db();

// populate_liveNews_colelction().then((res, err) => {
//     populate_featuredNews_collection().then((res, err) => {
//         populate_myths_collection();
//     })
// });

