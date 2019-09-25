const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);