const mongoose = require("mongoose");

const writeSchema = new mongoose.Schema({
    userId: {
        type: Number,
        reqired: true
    },
    user: {
        type: String,
        reqired: true
    },
    commentId: {
        type: Number,
        reqired: true,
        unique: true
    },
    comment: {
        type: String,
        reqired: true
    },
    password: {
        type: String,
        reqired: true
    },
    date: {
        type: String,
        reqired: true
    },
});

module.exports = mongoose.model("Write", writeSchema);