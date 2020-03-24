const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
require('mongoose-type-url');



const daily_news_schema = new mongoose.Schema({

    text_english : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },

    text_bangla: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },

    reference: {
        type: mongoose.SchemaTypes.Url,
        required: true,

    },
    image_url: {
        type: mongoose.SchemaTypes.Url,
        required: false,

    },

    locale: {
        type: String,
        enum : ['BD' , "GLOBAL"],
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: true
    },

    importance_rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 3
    }
});

daily_news_schema.index( {"date" : 1, "locale" : 1} , {unique: false});

daily_news_schema.plugin(beautifyUnique);

let DailyNews = mongoose.model("DailyNews", daily_news_schema);

module.exports = {DailyNews};