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
    description: {
        type: String
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
        type: Array,
        default: []
    },
    links: {
        type: Array,
        default: []
    }
});
module.exports = mongoose.model("Content", ContentSchema);