var express = require('express');
var router = express.Router();
let api_mythbuster_controller = require('../controllers/api-mythbuster-controller');


/* GET users listing. */
router.get('/myths', api_mythbuster_controller.handle_get_myths );



module.exports = router;
