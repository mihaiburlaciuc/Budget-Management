const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const User = require("../models/users");

exports.user_register = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let balance = req.body.balance;

    console.log("Req.body: " + JSON.stringify(req.body));
    console.log("Req body " + username + " " + password + " " + balance);
    console.log("register/ called ");

    User.find({ username: username })
    .exec()
    .then(user => {
        // Verify if the username is already in use
        if (user.length >= 1) {
            return res.status(209).json({
                message: "Username already exists"
            });
        } else {
            const user = new User({
                username: username,
                password: password,
                balance: balance
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
    let username = req.body.username;
    let password = req.body.password;
    console.log("/login");
    console.log("Req.body: " + JSON.stringify(req.body));
    console.log("Req body " + username + " " + password);

    User.find({ username: req.body.username })
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(201).json({
                message: "Auth failed"
            });
        }
        
        const jwtKey = "JWT_SECRET_BUGET_APP";
        if (user[0].password === req.body.password) {
            const token = jwt.sign(
                {
                    username: username
                },
                jwtKey,
            );

            return res.status(200).json({
                message: "Auth successful",
                token: token
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

exports.addTransaction = (req, res, next) => {
    console.log("/addTransaction was called ");
    // 1 = LENDING, 2 = BORROWING
    let operation = req.body.operation;
    let mainUser = req.body.userData;
    let targetUser = req.body.targetUser;
    let amount = req.body.amount

}

// Reports = status between 2 users
exports.getUserReports= (req, res, next) => {
    console.log("/addTransaction was called ");
    let mainUser = req.body.userData;

}