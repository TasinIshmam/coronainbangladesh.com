const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
require('mongoose-type-url');


const Featured_News_Schema = new mongoose.Schema({

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
        unique: true,
        trim: true,
        minLength: 1
    },
    link: {
        type: mongoose.SchemaTypes.Url,
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
        default: 3 //todo default to 3 when done testing
    }
});

Featured_News_Schema.plugin(beautifyUnique);

let FeaturedNews = mongoose.model("FeaturedNews", Featured_News_Schema);

module.exports = {FeaturedNews};