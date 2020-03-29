const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
var validate = require('mongoose-validator');


const charity_org_schema = new mongoose.Schema({
   name: {
       type: String,
       required: true,
       unique: true,

   }
});