const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', CommentSchema);