const {Myth} = require('../models/myth');

async function get_random_myths(myth_count) {

    // let result = await Myth.findRandom({}, {}, {limit: myth_count});

    let result = await Myth.aggregate().sample(myth_count);
    return result;
}


module.exports = {get_random_myths}