const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validate = require('mongoose-validator');

function validateLength(val) {
    return val.length > 0;
}

const urlValidator_reference = [
    validate({
        validator: 'isURL',
        passIfEmpty: true,
        message: 'Should be URL',
    })
];

const charity_org_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    activities: {
        type: [String],
        validate: [validateLength, 'Error: Activity List Can Not Be Empty.']
    },
    locations: {
        type: [String],
        validate: [validateLength, 'Error: Location List Can Not Be Empty.']
    },

    language: {
        type: String,
        enum: ["BN", "EN"],
        required: true
    },

    donate_website: {
        type: String,
        validate: urlValidator_reference,
        required : false,
        default: ""
    },

    how_to_donate: [{
        platform : {
            type: String,
            require: true,
        },
        contact_info : {
            type: String,
            required: true
        }
    }],
    contact: [{
        platform : {
            type: String,
            require: true,
        },
        contact_info : {
            type: String,
            required: true
        },
        type : {
            type: String,
            enum: ["EMAIL", "PHONE", "URL", "MISC" ],
            default: "MISC"
        }
    }],

    importance_rating: {  //Higher is Better.
        type: Number,
        default: 3
    }
});


charity_org_schema.index({"name" : 1, "language" : 1}, {unique: true});  //for uniqueness
charity_org_schema.index({"language" : 1}, {unique: false});  //for fast search


charity_org_schema.plugin(beautifyUnique);

let CharityOrg = mongoose.model("CharityOrg", charity_org_schema);

module.exports = {CharityOrg};