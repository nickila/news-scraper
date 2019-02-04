var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    photoText: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },

    subtitle: {
        type: String,
        required: false
    },
    headline: {
        type: String,
        required: false
    },
    
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
    
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;