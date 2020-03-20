const {UsersQuiz} = require('../models/users_quiz');



async function add_new_user(user) {

    try {
        let ret = await UsersQuiz.create(user);
        return true;
    }   catch (e) {
        return false;
    }

}



module.exports = {add_new_user}