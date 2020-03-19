const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');


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
        type: URL,
        required: true,

    },
    image_url: {
        type: URL,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now
    },
    importance_rating: {
        type: Number,
        min: 0,
        max: 5
    }
});

Featured_News_Schema.plugin(beautifyUnique);

let FeaturedNews = mongoose.model("FeaturedNews", Featured_News_Schema);

module.exports = {FeaturedNews};