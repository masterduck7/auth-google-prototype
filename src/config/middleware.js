require('dotenv').config();
const userController = require('../controllers/user');

var checkUser = async function(res, userProfile){
    try{
        const user = await userController.getUser(userProfile["id"]);

        // User not registered, needs to be registered
        if (!user) {
            const registerUser = await userController.createUser(userProfile["id"], userProfile["displayName"]);
            if (registerUser) {
                res.send({
                    "message": "Hello " + registerUser["googleName"] + ". You have been registered",
                });
            }
            else {
                res.status(500).json({message: error.message})
            }
        }
        else {
            res.send({
                "message": "Hello " + user["googleName"],
            });
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

module.exports = {
    checkUser: checkUser,
};