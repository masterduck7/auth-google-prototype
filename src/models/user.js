const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    googleId: {
        required: true,
        type: Number,
        unique: true,
    },
    googleName: {
        required: true,
        type: String,
        unique: false,
    }
})

module.exports = mongoose.model('User', userSchema)