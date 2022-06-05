const mongoose = require("mongoose");
const ContentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        default: []
    },
    addedBy: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    links: {
        type: Array,
        default: []
    }
}) ;
module.exports = mongoose.model("Content", ContentSchema);