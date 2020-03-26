
const users_quiz_database_interface = require('../database/interface/users_quiz_interface');

//todo find a secure way to send validation_token. Replace temporary token USER_PUT_SECRET_KEY with standard token VALIDATION_TOKEN_WEBSITE
/**
 * Adds quiz players user email and name to database.
 * eg:
 * req.body = {
 *     name:
 *     email:
 *     time: (Optional)
 * }
 * @param req
 * @param res
 * @returns {Promise<HTTPResponseStatus>}
 */
let handle_POST_user =  async (req, res) => {

    try {

        //todo This
        if (req.query.validation_token !==   process.env.USER_PUT_SECRET_KEY ) {
            console.log(req.query.validation_token);
            console.log("Received POST /api/myths/users with INVALID validation token. Discarding request");
            return res.sendStatus(401);
        }

        let result = await users_quiz_database_interface.add_new_user({
            name : req.body.name,
            email : req.body.email,
            newsletter_subscription_status: req.body.newsletter_subscription_status
        });

        if (result) {
           return  res.sendStatus(200);
        } else return res.sendStatus(400);

    } catch (e) {
        console.error("WARN: Failed to validate user credentials ")
        return res.sendStatus(400);
    }


};


module.exports = {handle_POST_user: handle_POST_user};