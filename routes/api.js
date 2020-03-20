var express = require('express');
var router = express.Router();
let api_mythbuster_controller = require('../controllers/api_mythbuster_controller');
let api_user_quiz_controller = require('../controllers/api_user_quiz_controller');


/* GET users listing. */
router.get('/myths', api_mythbuster_controller.handle_get_myths );

router.post('/myths/users', api_user_quiz_controller.handle_PUT_user);

module.exports = router;
