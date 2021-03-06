const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users');
const checkAuth = require('../middleware/check-token');

router.post("/register", UserController.user_register);

router.post("/login", UserController.user_login);

router.post("/modifyBalance", checkAuth, UserController.modifyBalance);

router.post("/addConflict", checkAuth, UserController.addConflict);

router.post("/getEntityTransaction", checkAuth, UserController.getEntityTransaction);

router.post("/getBalance", checkAuth, UserController.getBalance);

router.get("/getAll", UserController.getAll)

module.exports = router;