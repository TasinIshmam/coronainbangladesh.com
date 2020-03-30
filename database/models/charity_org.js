const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validate = require('mongoose-validator');
const validator = require('validator');

function validateLength(val) {
    return val.length > 0;
}

const urlValidator_reference = [
    validate({
        validator: 'isURL',
        passIfEmpty: false,
        message: 'Should be URL',
    })
];

function donationMethodValidator(val) {
    try {
        return val.platform !== null && val.number !== null;
    } catch (e) {
        return false;
    }
}

/**
 * Takes a JSON object and validates if it has proper
 * @param val
 * @returns {boolean|*}
 */
function contactValidator(val) {
    try {
        if (val.platform === "phone") {
            return val.number !== null;
        } else {
            return validator.isURL(val.link);
        }
    } catch (e) {
        return false;
    }
}


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
    donate: {
        type: String,
        validate: urlValidator_reference,
    },
    how_to_donate: [{
        type: String,
        get: function(data) {
            try {
                return JSON.parse(data);
            } catch(e) {
                return data;
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        },
        validate: [donationMethodValidator, "The Donation Method Is Not Valid"]
    }],
    contact: [{
        type: String,
        get: function(data) {
            try {
                return JSON.parse(data);
            } catch(e) {
                return data;
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        },
        validate: [contactValidator, "Contact Method Is Not Valid"]
    }]
});