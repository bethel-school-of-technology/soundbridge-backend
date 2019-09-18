const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    Age: {
        type: Number,
        require: true
    },
    spotify: {
        type: Boolean,
        default: false,
        require: true
    },
    spotifyId: {
        type: String,
        default: null,
        require: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;