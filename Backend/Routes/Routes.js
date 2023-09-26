const express = require('express');
const { register, login, verifyOTP, initalizeresetPassword, resetPassword } = require('../Controllers/Register_controller');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateUser } = require('../Middleware/Auth');
const getAllData = require('../Controllers/Data_Controller');

//Registration Rules
const registerRules = [
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
];

const loginRules = [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("password is required")
]
const otpRules = [
    body("otp").notEmpty().withMessage("Otp is Required")
]

const initalizeresetPasswordRules = [
    body("email").notEmpty().withMessage({ message: "email is required" }).isEmail().withMessage({ message: "Email Invalid" })
]

const resetPasswordRules = [
    body("email").notEmpty().withMessage({ message: "email is required" }).isEmail().withMessage({ message: "Email Invalid" }),
    body("otp").notEmpty().withMessage({ message: "Otp is required" }),
    body("newpassword").notEmpty().withMessage({ message: "New Password is required" })
]

// Custom error formatter
const validationErrorHandler = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};


router.post("/register", registerRules, validationErrorHandler, register);
router.post("/login", loginRules, validationErrorHandler, login);
router.post("/verify", otpRules, authenticateUser, verifyOTP);
router.get("/getdata", authenticateUser, getAllData);
router.post("/initailize-reset-password", initalizeresetPasswordRules, initalizeresetPassword);
router.post("/reset-password", resetPasswordRules, resetPassword)

module.exports = router