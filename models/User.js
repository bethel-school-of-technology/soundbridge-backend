const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    spotify: {
        type: Boolean,
        default: false,
    },
    spotifyId: {
        type: String,
        default: null,
    },
    spotifyRefreshToken: {
        type: String,
        default: null,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = password => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
