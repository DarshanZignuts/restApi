const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");


router.post("/signup", async function (req, res) {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email });
        console.log("user : ", user);

        if (user) {
            return res.status(400).json({
                msg: "User already registered!"
            });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(400).json({
                        msg: "Unable to hash password!",
                        error: err
                    });
                } else {
                    let newUser = new User({
                        email: email,
                        password: hash
                    });
                    await newUser.save();
                    
                    return res.status(200).json({
                        msg: "User created successfully..."
                    });
                }
            });
        }
    } catch (err) {
        console.log("error : ", err);
        res.status(400).json({
            msg: "error ....",
            error: err
        })
    }
})


router.get("/:userId", async function (req, res) {
    try {
        let id = await User.findOne({ _id: req.params.userId });
        if (id) {
            console.log("findOne data ::: ", id);
            res.status(200).json({
                msg: "success ....",
                data: id
            })
        } else {
            res.status(400).json({
                msg: "data not found ...."
            })
        }
    } catch (err) {
        console.log("error : ", err);
        res.status(400).json({
            msg: "error ....",
            error: err
        })
    }
})


router.delete("/:userId", async function (req, res) {
    try {
        let id = req.params.userId;
        let user = await User.remove({ _id: id })
        if (user) {
            res.status(200).json({
                message: `User id number ${id} Deleted...! `
            })
        } else {
            res.status(404).json({
                message: `User id number ${id} not found that means already deleted..!`
            })
        }
    } catch (err) {
        if (err) {
            res.status(404).json({
                message: 'problem in delete a record..!'
            })
        }
    }
})



module.exports = router;