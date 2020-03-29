const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.user_register = (req, res, next) => {
    console.log("register/ " );

    // TODO: Remove once DB is up
    res.status(201).json({
        message: "User created"
    });

    User.find({ username: req.body.username })
    .exec()
    .then(user => {
        // Verify if the email is already in use
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Mail exists"
            });
        } else {
            const user = new User({
                username: req.body.username,
                password: req.body.password
            });
            
            user.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "User created"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                }); 
            });
        }
    })  
};

exports.user_login =  (req, res, next) => {
    User.find({ username: req.body.username })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }

        if (user[0].password === req.body.password) {
            return res.status(200).json({
                message: "Auth successful"
            });
        } else {
            res.status(401).json({
                message: "Auth failed"
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}