const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users');
// const checkAuth = require('../middleware/check-auth');

router.post("/register", UserController.user_register);

router.post("/login", UserController.user_login);

module.exports = router;