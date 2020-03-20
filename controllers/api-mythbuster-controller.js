
const myth_interface = require('../database/interface/myth_interface');

handle_get_myths = async (req, res) => {
    let count;


    if(!isNaN(req.query.count)) {
        count =  Math.abs(parseInt(req.query.count));  //makes sure argument a number and is non negative.
    } else {
        count = 500; //If condition failed invalid argument. Then we kind of just return every myth.
    }

    try {
        let result = await myth_interface.get_random_myths(count);
        return res.status(200).send(result);
    } catch (e) {
        return res.send(400);
    }



};

module.exports = {handle_get_myths}