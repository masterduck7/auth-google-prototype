require('dotenv').config();

var checkUser = function(res, userProfile){
    if (process.env.VALID_USERS.includes(userProfile["id"])) {
        res.send({
            "message": "Hello " + userProfile["displayName"],
        });
    }
    else {
        res.send({
            "message": "Error: User not registered",
        });
    }
};

module.exports = {
    checkUser: checkUser,
};