const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
var validate = require('mongoose-validator');



var urlValidator_image_url = [
    validate({
        validator: 'isURL',
        passIfEmpty: true,
        message: 'Should be URL or Empty',
    })
];

var urlValidator_reference = [
    validate({
        validator: 'isURL',
        passIfEmpty: false,
        message: 'Should be URL',
    })
];

const daily_news_schema = new mongoose.Schema({


    reference: {
        type: String,
        validate: urlValidator_reference,
        required: true,

    },
    image_url: {
        type: String,
        validate: urlValidator_image_url,
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

    text_english : {  //Text English is unique to enforce uniqueness for each collection.  (Prevents duplicate entriess in db.)
        type: String,
        required: true,
        unique : true,
        trim: true,
        minLength: 1
    },

    text_bangla: {  // As Text Bangla consumes more characters, it is ommitted. Indexing ha 1024 character limit.
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