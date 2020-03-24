const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
require('mongoose-type-url');
var validate = require('mongoose-validator');



var urlValidator = [
    validate({
        validator: 'isURL',
        passIfEmpty: true,
        message: 'Should be URL',
    })
];

const daily_news_schema = new mongoose.Schema({


    reference: {
        type: String,
        validate: urlValidator,
        required: true,

    },
    image_url: {
        type: String,
        validate: urlValidator,
        required: false,

    },

    locale: {
        type: String,
        enum : ['BD' , "GLOBAL"],
        required: true
    },

    date: {
        type: Date,

        required: true
    },

    importance_rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 3
    },

    text_english : {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },

    text_bangla: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },

});

daily_news_schema.index( {"date" : 1, "locale" : 1} , {unique: false});

daily_news_schema.plugin(beautifyUnique);

let DailyNews = mongoose.model("DailyNews", daily_news_schema);

module.exports = {DailyNews};