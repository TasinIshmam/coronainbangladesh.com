let featured_news_interface = require('../database/interface/featured_news_interface');

/**
 * Receives featurednews json Array in request. Updates database.
 *
 * validation_token needed as query parameter
 * eg, req.body = [
 * {
 *     featured_news_object
 * }]
 * @dependencies  ./database/interface/featured_news_interface,
 * @dependencies mongoose
 * @param {Httprequest}req
 * @param  {HttpResponse}res
 * @returns {Http Status}
 */

async function handle_POST_featured_news(req, res) {

    try {
        if (req.query.validation_token !== process.env.VALIDATION_TOKEN_WEBSITE) {
            console.log("POST /api/featurednews with INVALID validation token. Discarding request");
            return res.send(401);
        }

        let news_arr = req.body;
        let result = await featured_news_interface.insert_many_featured_news(news_arr);
        if( news_arr.length === result.length) {
            console.log("POST /api/featurednews successfully finished.")
            return res.sendStatus(200);

        } else {
            console.error("ERROR in POST /api/featurednews. Not all the news that were sent could be inserted in database.\nNew News found: " + news_arr.length + "\nInserted in database: " + res.length);
            return res.sendStatus(500).send("ERROR in POST /api/featurednews. Not all the news that were sent could be inserted in database.\nNew News found: " + news_arr.length + "\nInserted in database: " + res.length);
        }

    } catch (e) {
        console.error("ERROR in POST /api/featurednews");
        console.error(e);
        return res.sendStatus(500).send("ERROR in POST /api/featurednews");
    }
}

module.exports = {handle_POST_featured_news};