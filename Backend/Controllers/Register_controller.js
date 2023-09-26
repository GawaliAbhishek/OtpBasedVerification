const User = require("../Models/User");
const bcrypt = require('bcryptjs');
const { sendVerificationEmail, sendresetPasswordMail } = require("../Middleware/Email");
const generateOTP = require("../Middleware/OneTimePassword");


const register = async (req, res) => {
    const { name, email, password } = req.body;
    const doesExist = await User.findOne({ email });
    if (doesExist) {
        res.status(404).json({ message: "Already a user" });
        return;
    }
    const user = new User({
        name,
        email,
        password
    });
    try {
        const result = await user.save();
        const otp = generateOTP();
        if (result) {
            sendVerificationEmail(result, otp);
            req.session.otp = otp;
            res.status(200).json({ status: "Success", msg: "User Created", token: result.tokens });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const result = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, result.password);
        if (isMatch) {
            const token = await result.genrateToken();
            res.status(200).json({ message: "Logged in", token });
        }
        else {
            res.status(404).json({ message: "Invalid Credentails" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
}

const verifyOTP = async (req, res) => {
    const otptoCheck = req.body.otp;
    const otpwehave = req.session.otp;
    const email = req.body.email;


    if (otptoCheck === otpwehave) {
        const toUpdate = await User.findOne({ email });
        toUpdate.isverified = true;
        await toUpdate.save();
        res.status(200).json({ message: "User Verified" });
    }
    else {
        res.status(400).json({ message: "Invalid Otp" });
    }

}

const initalizeresetPassword = async (req, res) => {
    const { email } = req.body;
    const doesExist = await User.findOne({ email });
    if (!doesExist) {
        res.status(404).json({ message: "Not a user" });
        return;
    }

    const otp = generateOTP();
    sendresetPasswordMail(doesExist,otp);
    req.session.otp = otp;
    res.status(200).json({ message: "password reset mail send" });
}

const resetPassword = async(req, res) => {
    const {email, otp, newpassword } = req.body;
    if(otp===req.session.otp){
        const toUpdate=await User.findOne({email});
        toUpdate.password=newpassword;
        console.log(toUpdate);
       const result= await toUpdate.save(); 
        res.status(200).json({message:"password updated"});
    }else{
        res.status(400).json({message:"invalid Otp"});
    }
}
module.exports = { register, login, verifyOTP, initalizeresetPassword,resetPassword } 