const mongoose = require("mongoose");
const ContentSchema = new mongoose.Schema({
    type:String,
    name: String,
    genre: Array
}) ;
module.exports = mongoose.model("Content",ContentSchema);