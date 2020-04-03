const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const district_data_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    total_quarantined: {
        type: Number,
        required: true
    },
    passengers_screened: {
        type: Number,
        required: true
    },
    last_update: {
        type: Date,
        required: false,
        default: Date.now
    }

});



district_data_schema.index( {"id" : 1} , {unique: true});
district_data_schema.index( {"name" : 1} , {unique: true});

district_data_schema.plugin(beautifyUnique);


let DistrictData = mongoose.model("DistrictData", district_data_schema);

DistrictData.createIndexes();  //idempotent operation.

module.exports = {DistrictData};