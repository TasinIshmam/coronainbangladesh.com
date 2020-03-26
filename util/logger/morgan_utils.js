

//Not used because mysteriously decides to not work in app engine.
//Works perfectly fine in localhost lol.

let morgan_options = {
    skip: function (req, res) {


        if(process.env.NODE_ENV === 'development') {
            return false;
        }


        if (res.statusCode === 304 || req.url.startsWith('/images' || req.url.startsWith('/css'))) {
            return true;
        }

        return false;
    }
};

module.exports = {morgan_options};