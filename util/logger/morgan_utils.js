



let morgan_options = {
    skip: function (req, res) {

        if(process.env.NODE_ENV === 'development') {
            return false;
        }

        if (req.originalUrl.startsWith('/api')) {
            return false;
        }

        if (res.statusCode === 200 || res.statusCode === 304 || req.originalUrl('/images' || req.originalUrl('/css'))) {
            return true;
        }

        return false;
    }
};

module.exports = {morgan_options};