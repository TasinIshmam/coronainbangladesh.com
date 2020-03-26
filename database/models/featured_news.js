const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
var validate = require('mongoose-validator');



var urlValidator = [
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

    description: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 1
    },

    link: {
        type: String,
        validate: urlValidator,
        required: true,

    },
    image_url: {
        type: mongoose.SchemaTypes.Url,
        required: true,

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
    }
});
featured_news_schema.index( {"date" : 1, "importance_rating" : 1, "link" : 1, "image_url" : 1} , {unique: true});

featured_news_schema.plugin(beautifyUnique);

let FeaturedNews = mongoose.model("FeaturedNews", featured_news_schema);

module.exports = {FeaturedNews};