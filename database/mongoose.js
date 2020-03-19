let mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("You are connected to the database"))
    .catch((err) => {
        console.error(err)
        console.error(process.env.MONGODB_URI)
    });

module.exports = {mongoose};
