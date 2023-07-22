const mongoose = require('mongoose');
const User = require('../models/user');

async function getUser(googleId) {
    const user = await User.findOne({"googleId":googleId});
    return user;
}

async function createUser(googleId, googleName) {
    const user = new User({
        _id: new mongoose.Types.ObjectId().toHexString(),
        googleId: Number(googleId),
        googleName: googleName
    });

    await user.save();
    return user;
}

module.exports = {
    getUser: getUser,
    createUser: createUser,
};