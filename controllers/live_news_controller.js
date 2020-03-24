

const live_news_interface = require('../database/interface/live_news_interface');
const parser = require('../util/parser');


/**
 * Gets all live news from web source (prothomalo) by using a parser
 * Gets all live news from a database.
 * Finds new lives from the web source not included in database (Set difference)
 * Adds them to database
 * @param req
 * @param res
 * @returns response status
 */
async function handle_live_news_update(req, res) {

    try {
        let live_result = await parser.get_all_live_news();
        let db_result = await live_news_interface.get_all_live_news(5000); //todo change get all live news to default to all.
        let new_news = find_set_difference_news(live_result, db_result);
        let db_response = await live_news_interface.insert_live_news_many(new_news);

        if( db_response.length === new_news.length) {
            console.log("GET /api/tasks/update-live-news successfully finished.")
            return res.sendStatus(200);

        } else {
            console.error("Error in /api/tasks/update-live-news. Not all the news that were found could be inserted in database.\nNew News found: " + new_news.length + "\nInserted in database: " + res.length);
            return res.sendStatus(500).send("Error in /api/tasks/update-live-news. Not all the news that were found could be inserted in database.\nNew News found: " + new_news.length + "\nInserted in database: " + res.length);
        }
    } catch (e) {
        console.error("ERROR in GET /api/tasks/update-live-news");
        console.error(e);
        return res.sendStatus(500).send("ERROR in GET /api/tasks/update-live-news");
    }


}


/**
 * Finds the set difference between new_news_arr and old_news_arr ( new_news_arr - old_news_arr)
 *
 * @param {Array} old_news_arr
 * @param {Array} new_news_arr
 *
 * @return {Array} live_news set difference
 */

function find_set_difference_news(new_news_arr, old_news_arr) {


    let difference = new_news_arr.filter( (element) => {

        let old_news_element = old_news_arr.filter( old_arr_element => {
            return old_arr_element.title === element.title;
        });

         return old_news_element.length === 0;

            });

    return difference;

}

module.exports = {find_set_difference_news , handle_live_news_update }