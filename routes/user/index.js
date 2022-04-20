const router = require("express").Router();
const userController = require("./user.controller");

// (최종목적지) POST /api/user/login
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router; // /api/user
