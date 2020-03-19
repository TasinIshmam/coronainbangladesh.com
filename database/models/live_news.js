const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');


const live_news_schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },

    link: {
        type: URL,
        required: false,

    },

    date: {
        type: Date,
        required: false
    },

    index: {
        type: Number,
        required: true,
        unique:  true
    }

});

live_news_schema.plugin(beautifyUnique);

let FeaturedNews = mongoose.model("LiveNews", live_news_schema);

module.exports = {LiveNews};