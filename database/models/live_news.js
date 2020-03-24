const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
        required: false
    },

    id: {
        type: Number,
    },
    title: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        minLength: 1
    },

});

live_news_schema.plugin(AutoIncrement, {inc_field: 'id', id: "sequence_livenews" , "start_seq" : 1, "inc_amount" : 1});


live_news_schema.plugin(beautifyUnique);

let LiveNews = mongoose.model("LiveNews", live_news_schema);

module.exports = {LiveNews};