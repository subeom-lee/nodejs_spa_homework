const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: Number,
        reqired: true,
        unique: true
    },
    user: {
        type: String,
        reqired: true,
        unique: true
    },
    title: {
        type: String,
        reqired: true
    },
    comment: {
        type: String,
        reqired: true
    },
    date: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        reqired: true
    },
});

module.exports = mongoose.model("Post", postSchema);