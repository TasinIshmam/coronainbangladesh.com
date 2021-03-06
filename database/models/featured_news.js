const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validate = require('mongoose-validator');


const urlValidator_image_url = [
    validate({
        validator: 'isURL',
        passIfEmpty: true,
        message: 'Should be URL or Empty',
    })
];

const urlValidator_link = [
    validate({
        validator: 'isURL',
        passIfEmpty: false,
        message: 'Should be URL',
    })
];

const featured_news_schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },

    link: {
        type: String,
        validate: urlValidator_link,
        required: true,

    },
    image_url: {
        type: String,
        required: false,
        validate: urlValidator_image_url

    },
    date: {
        type: Date,
        default: Date.now
    },
    importance_rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 3
    } ,

    description: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 1
    }
});

featured_news_schema.index( {"date" : 1} , {unique: false});

featured_news_schema.plugin(beautifyUnique);

let FeaturedNews = mongoose.model("FeaturedNews", featured_news_schema);

module.exports = {FeaturedNews};