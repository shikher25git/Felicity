const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 0
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    favourite: {
        type: Array,
        default: []
    },
    watched: {
        type: Array,
        default: []
    }
}) ;
module.exports = mongoose.model("User", UserSchema);