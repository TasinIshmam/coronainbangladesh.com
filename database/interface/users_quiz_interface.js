const {UsersQuiz} = require('../models/users_quiz');

/**
 * Adds a new user to the quizusers collection. Also used for daily_news newsletter subscribers
 * @param user
 * @returns {Promise<boolean>} - Weather insert operation was successful.
 */

async function add_new_user(user) {

    try {
        let ret = await UsersQuiz.create(user);
        if (ret === undefined || ret === null) return false;
        return true;
    }   catch (e) {
         console.error("Error in add_new_user");
         console.error(e);

        return false;
    }

}



module.exports = {add_new_user}