// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const User = require("../models/users");

exports.user_signup = (req, res, next) => {
    // TODO: save the user in a db
    var user = new User(req.body.username, req.body.password);
    console.log("Signing up user: " + user.username + " " + user.password);

    res.status(201).json({
        message: "Signing up succesful",
        username: user.getUsername(),
        password: user.getPassword()
    });
}

exports.user_login =  (req, res, next) => {
    // TODO: save the user in a db
    var user = new User(req.body.username, req.body.password);
    console.log("Logging in user: " + user.username + " " + user.password);

    res.status(201).json({
        message: "Logging in succesful",
        username: user.getUsername(),
        password: user.getPassword()
    });
}