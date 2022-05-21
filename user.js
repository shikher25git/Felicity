const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    type: Number,
    follwers: Array,
    following: Array,
    favourite: Array,
    watched: Array
}) ;
module.exports = mongoose.model("User", UserSchema);