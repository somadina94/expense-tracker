const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassowrd);

router.use(authController.protect);

router.patch("/updatePassword", authController.updatePassword);

module.exports = router;
