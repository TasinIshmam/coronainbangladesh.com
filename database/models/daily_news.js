const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
require('mongoose-type-url');



const daily_news_schema = new mongoose.Schema({

    text : {
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