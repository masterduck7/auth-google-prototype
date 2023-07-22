const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        required: true,
        type: Number,
        unique: true,
    },
    googleName: {
        required: false,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)