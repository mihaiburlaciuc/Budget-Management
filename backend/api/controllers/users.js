const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.user_register = (req, res, next) => {
    console.log("Req.body: " + JSON.stringify(req.body));
    console.log("Req body " + req.body.username + " " + req.body.password);
    console.log("register/ called ");

    User.find({ username: req.body.username })
    .exec()
    .then(user => {
        // Verify if the username is already in use
        if (user.length >= 1) {
            return res.status(209).json({
                message: "Username already exists"
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
    console.log("/login");
    console.log("Req.body: " + JSON.stringify(req.body));
    console.log("Req body " + req.body.username + " " + req.body.password);

    User.find({ username: req.body.username })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(201).json({
                message: "Auth failed"
            });
        }

        if (user[0].password === req.body.password) {
            return res.status(200).json({
                message: "Auth successful"
            });
        } else {
            res.status(201).json({
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

exports.getAll = (req, res, next) => {
    console.log("/getAll was called ");

    User.find()
    .select("username password")
    .exec()
    .then(docs => {
        console.log("getAll/ request: Users", docs);

        res.status(201).json({
            users: docs
        })
    })
    .catch(err => {
        console.log("getAll/ ", err);

        res.status(500).json({
            error: err
          });
    });
}