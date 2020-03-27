let cache = require('../cache/cache_interface');
let statistics_interface = require('../database/interface/statistics_interface');







async function get_statistics_bangladesh() {


        let result = cache.get_cached_data("statistics_bangladesh");

        if(result.status) {  //cache hit
            return result.data;
        } else {  //cache miss
            let api_result = await statistics_interface.get_statistics_bangladesh();  //API call
            let cache_result =  cache.set_cache_with_exp("statistics_bangladesh", api_result, 900 );   //cache Update
            console.log("LOG: Bangladesh Statistics Cache Updated");
            return api_result;
        }

}

async function get_statistics_world() {


    let result = cache.get_cached_data("statistics_world");

    if(result.status) {  //cache hit
        return result.data;
    } else {  //cache miss
        let api_result = await statistics_interface.get_statistics_world();  //API call
        let cache_result =  cache.set_cache_with_exp("statistics_world", api_result, 900 );   //cache Update
        console.log("LOG: World Statistics Cache Updated");
        return api_result;
    }

}



module.exports = {get_statistics_world, get_statistics_bangladesh};