const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');


const division_data_schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    id: {
        type: Number,
        required: true
    },

    quarantine_ongoing: {
        type: Number,
        required: true
    },

    quarantine_complete: {
        type: Number,
        required: true
    },

    isolation_beds: {
        type: Number,
        required: true
    },

    last_update: {
        type: Date,
        required: false,
        default: Date.now
    }
});


division_data_schema.index( {"id" : 1} , {unique: true});
division_data_schema.index( {"name" : 1} , {unique: true});

division_data_schema.plugin(beautifyUnique);


let DivisionData = mongoose.model("DivisionData", division_data_schema);

DivisionData.createIndexes();  //idempotent operation.

module.exports = {DivisionData};