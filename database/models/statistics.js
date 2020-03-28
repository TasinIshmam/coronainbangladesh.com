const beautifyUnique = require('mongoose-beautiful-unique-validation');
const mongoose = require('mongoose');

const statistics_schema = new mongoose.Schema({

    confirmed: {
        type: Number,
        required: true
    },
    recovered: {
        type: Number,
        required: true
    },
    deaths: {
        type: Number,
        required: true
    },
    locale: {
        type: String,
        enum : ['BD' , "GLOBAL"],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },

    stat_type: {
        type: String,
        enum: ['override' , 'timeseries'],
        default: 'timeseries'
    }

});

//todo find a way to ensure override entry for bd  can only have one value.

statistics_schema.index( {"date" : 1} , {unique: false});
statistics_schema.index( {"date" : 1, 'locale' : 1, 'stat_type' : 1} , {unique: true});
statistics_schema.plugin(beautifyUnique);

let Statistics = mongoose.model("Statistics", statistics_schema);

module.exports = {Statistics};