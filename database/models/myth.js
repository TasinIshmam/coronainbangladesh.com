const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoose = require('mongoose');
require('mongoose-type-url');


const myth_schema = new mongoose.Schema({
    question_bangla : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },

    question_english : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },

    truth_value : {
        type: Boolean,
        required: true
    },
    explanation_bangla : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },

    explanation_english : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },
    source: {
        type: mongoose.SchemaTypes.Url ,
        required: true
    }


});


let Myth = mongoose.model("Myth", myth_schema)

module.exports = {Myth};