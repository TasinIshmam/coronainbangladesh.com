

const news_schmea = {
    title : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },
    description : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },
    link : {
        type: URL,
        required: true,

    },
    image_url : {
        type: URL,
        required: true,

    },
    date : {
        type : Date,
        default: Date.now
    },
    importance_rating: {
        type: Number,
        min: 0,
        max: 5
    }
}


let News = mongoose.model("News", news_schmea)

module.exports = {News};