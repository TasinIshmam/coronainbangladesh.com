let daily_news_interface = require('../database/interface/daily_news_interface');



/**
 * Bulk insert daily news to database.
 * eg:
 * req.body = [{DailyNews}]
 * @param req
 * @param res
 * @returns {Promise<HTTPResponseStatus>}
 */
async function handle_POST_daily_news(req, res) {
    try {

        if (req.query.validation_token !== process.env.VALIDATION_TOKEN_WEBSITE) {
            console.log("POST /api/dailynews with INVALID validation token. Discarding request");
            return res.send(401);
        }

        let daily_news_arr = req.body;
        let result = await daily_news_interface.insert_many_daily_news(daily_news_arr);

        if( daily_news_arr.length === result.length) {
            console.log("POST /api/dailynews successfully finished.")
            return res.sendStatus(200);

        } else {
            console.error("ERROR in POST /api/dailynews. Not all the news that were sent could be inserted in database.\nNew News found: " + daily_news_arr.length + "\nInserted in database: " + res.length);

            return res.sendStatus(500).send("ERROR in POST /api/dailynews. Not all the news that were sent could be inserted in database.\nNew News found: " + daily_news_arr.length + "\nInserted in database: " + res.length);
        }

    } catch (e) {
        console.error("ERROR in POST /api/dailynews");
        console.error(e);
        return res.sendStatus(500).send("ERROR in POST /api/dailynews");
    }

}

module.exports = {handle_POST_daily_news};