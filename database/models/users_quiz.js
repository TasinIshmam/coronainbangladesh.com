const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validator = require('validator');


const users_quiz_schema =  new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    date: {
        type: Date,
        default: Date.now
    }

});


users_quiz_schema.plugin(beautifyUnique);

const UsersQuiz = mongoose.model("UsersQuiz", users_quiz_schema);

module.exports = {UsersQuiz};
