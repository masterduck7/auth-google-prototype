const express=require('express');
const router=express.Router();
const User = require('../models/user');

router.get('/login/:googleId', async (req, res) => {
    try{
        const user = await User.findOne({"googleId": req.params.googleId});
        if (!user) {
            res.status(404).json({message: "User not found"})
        } else {
            res.json(user)   
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/register', async (req, res) => {
    const user = new User({
        googleId: req.body.googleId,
        googleName: req.body.googleName
    })

    try {
        const newUser = await user.save();
        res.status(200).json(newUser)
    }
    catch (error) {
        if (error["code"] == 11000) {
            // TODO: HANDLE THIS
            res.status(400).json({message: "User registered"})
        }
        else {
            res.status(400).json({message: error.message})
        }
    }
})

router.get('/all', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports=router;