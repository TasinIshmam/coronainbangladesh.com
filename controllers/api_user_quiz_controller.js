
const users_quiz_database_interface = require('../database/interface/users_quiz_interface');



let handle_PUT_user =  async (req, res) => {



    try {
        let result = await users_quiz_database_interface.add_new_user({
            name : req.body.name,
            email : req.body.email,
        });

        if (result) {
           return  res.send(200);
        } else return res.send(400);

    } catch (e) {
        return res.send(400);
    }


};


module.exports = {handle_PUT_user};