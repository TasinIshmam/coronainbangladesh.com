const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
require('mongoose-type-url');


const live_news_schema = new mongoose.Schema({



    url: {
        type: String,
        required: false,

    },

    date: {
        type: String,
        required: false
    },

    time: {
        type: String,
        required: true
    },

    id: {
        type: Number,
        required: true,
        unique:  true
    },
    title: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minLength: 1
    },

});
//live_news_schema.index({id: 1}, {unique: true});

live_news_schema.plugin(beautifyUnique);

let LiveNews = mongoose.model("LiveNews", live_news_schema);

module.exports = {LiveNews};