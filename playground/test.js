
//THIS IS WHERE I TRY TOTALLY RANDOM SHIT. DO NOT TOUCH :'3
const parserUtils = require('../util/parser');

 require('../app');
 let {mongoose} = require('../database/mongoose');
 let moment = require('moment');

const live_news_controller = require('../controllers/live_news_controller');
const live_news_interface = require('../database/interface/live_news_interface');
const {LiveNews} = require('../database/models/live_news');
const daily_news_interfacec = require('../database/interface/daily_news_interface');




daily_news_interfacec.get_last_updated_date().then( (res) => {

    console.log(res);
    // console.log(res);
    // console.log(typeof res)
    // console.log(res instanceof Date)
    // let dateobj =new Date(res);
    // console.log(dateobj.toISOString());
    // let momentobj = moment(dateobj);
    // console.log(momentobj)




    mongoose.disconnect().then( () => {
        process.exit(0);
    });
});


// let axios = require('axios');
//
// axios.get("https://covid19.mathdro.id/api/countries/BD")
//     .then(response => {
//
//         console.log(response.data.confirmed.value)
//
//     });


//
// parserUtils.get_all_live_news().then( async (res) => {
//    // console.log(res.reverse());
//     await mongoose.connection.db.dropCollection('livenews');
//     await mongoose.connection.db.dropCollection('counters');
//
//     let subarr1 = res.slice(0,150);
//     let subarr2 = res.slice(100,200);
//
//     let inserted_elements1 = await live_news_interface.insert_live_news_many(subarr1);
//     console.debug("Response from parser length: " + inserted_elements1.length);
//
//     let resdb = await live_news_interface.get_all_live_news(200);
//     console.debug("Resdb Length: " + resdb.length);
//
//     let difwithdb = await live_news_controller.find_set_difference_news(subarr2, resdb);
//     console.debug("difwithdb Length: " + difwithdb.length);
//
//     let resdb2 = await live_news_interface.insert_live_news_many(difwithdb);
//     console.debug("Resdb2 Length: " + resdb2.length);
//
//     let res3 = await live_news_interface.get_all_live_news(600);
//
//      console.debug(res3[0]);
//     // console.debug(res3[2].id);
//      mongoose.disconnect().then( () => {
//         process.exit(0);
//     });
//
// });


//
//
// parserUtils.get_all_live_news().then( async (res) => {
//     // console.log(res.reverse());
//     // await mongoose.connection.db.dropCollection('livenews');
//     // await mongoose.connection.db.dropCollection('counters');
//
//
//     let inserted_elements = await live_news_interface.insert_live_news_many(res);
//     let result = await live_news_interface.get_all_live_news(300);
//
//     console.debug(result.length)
//     console.debug(inserted_elements.length);
//     // console.debug(res3[2].id);
//     mongoose.disconnect().then( () => {
//         process.exit(0);
//     });
//
// });
//
//
//



//
// daily_news_interface.get_BANGLA_daily_news_BD_with_date(new Date()).then((res) => {
//     console.log(res);
// });
//



// const moment = require('moment');

//
// require('../app');
// let {mongoose} = require('../database/mongoose');
//
// myth_interface = require('../database/interface/myth_interface');
// featured_news_interface = require('../database/interface/featured_news_interface');
// live_news_interface = require('../database/interface/live_news_interface');
//
//
//
// mongoose.disconnect();
//
// myth_interface.get_random_myths(12).then( (res ) => (console.debug(res)));
//
//
// today = moment().startOf('day');
// yesterday = moment().startOf('day').subtract(1, 'day');
//
// // console.debug(yesterday)
// // console.debug(today)
//
//
// // featured_news_interface.get_news_between_dates_with_count(10).then((res) => {
// //     console.debug(res);
// //     process.exit(0);
// // });
//
// live_news_interface.get_all_live_news(50).then((res) => (console.debug(res)));


//
// const fs = require('fs');


//
// const storeData = async ( path) => {
//     let data = await  live_news_interface.get_all_live_news();
//
//     try {
//         fs.writeFileSync(path, JSON.stringify(data, null, 4))
//         await mongoose.disconnect();
//         process.exit(0);
//     } catch (err) {
//         console.error(err);
//         await mongoose.disconnect();
//         process.exit(0);
//
//     }
// };
//
// storeData('livenewsdata.txt').then(() => {
//     mongoose.disconnect().then(() => {
//         process.exit(0);
//     });
//
// });
//
//
//
//
// let daily_news_object = {
//     text: "News Content",
//     reference: "URL of source",
//     image_url: "Url of image",  //optional
//     date: "Mongoose Date time object",
//     country_code: "BD or GLOBAL",
//     importance_rating: "0-5",  //default 3
//     language: "ENGLISH or BANGLA"
//
// }
//
// let a = [{
//     "id": 6,
//     "title": "করোনাভাইরাসের কারণে যুক্তরাষ্ট্রে জাতীয় জরুরি অবস্থা জারি করেছেন প্রেসিডেন্ট ডোনাল্ড ট্রাম্প।",
//     "date": "",
//     "time": "১০:৪৩",
//     "url": ""
// },
//     {
//         "id": 3,
//         "title": "দেশের বিভিন্ন জেলায় বাড়িতে কোয়ারেন্টিন থাকা ব্যক্তির সংখ্যা ১ হাজার ২০০ ছাড়িয়েছে",
//         "date": "",
//         "time": "১০:৪২",
//         "url": ""
//     },
//     {
//         "id": 2,
//         "title": "স্পেনের মাদ্রিদে বাংলাদেশের ৮ নাগরিক কোভিড–১৯ রোগে আক্রান্ত হয়ে হাসপাতালে চিকিৎসাধীন",
//         "date": "",
//         "time": "১০:৪১",
//         "url": ""
//     },
//     {
//         "id": 1,
//         "title": "বিশ্বে করোনায় মৃত্যু ৫ হাজার ছাড়াল",
//         "date": "",
//         "time": "১০:৪০",
//         "url": ""
//     }];
//
// let b = [{
//     "id": 4,
//     "title": "করোনাভাইরাসের কারণে যুক্তরাষ্ট্রে জাতীয় জরুরি অবস্থা জারি করেছেন প্রেসিডেন্ট ডোনাল্ড ট্রাম্প।",
//     "date": "",
//     "time": "১০:৪৩",
//     "url": ""
// },
//     {
//         "id": 3,
//         "title": "দেশের বিভিন্ন জেলায় বাড়িতে কোয়ারেন্টিন থাকা ব্যক্তির সংখ্যা ১ হাজার ২০০ ছাড়িয়েছে",
//         "date": "",
//         "time": "১০:৪২",
//         "url": ""
//     },
//     {
//         "id": 8,
//         "title": "স্পেনের মাদ্রিদে বাংলাদেশের ৮ নাগরিক কোভিড–১৯ রোগে আক্রান্ত হয়ে হাসপাতালে চিকিৎসাধীন",
//         "date": "",
//         "time": "১০:৪১",
//         "url": ""
//     },
//     {
//         "id": 0,
//         "title": "বিশ্বে করোনায় মৃত্যু ৫ হাজার ছাড়াল",
//         "date": "",
//         "time": "১০:৪০",
//         "url": ""
//     }];