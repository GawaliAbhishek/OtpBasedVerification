const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = (user, otp) => {
    const message = {
        from: process.env.EMAIL, // Sender's email address
        to: user.email, // Recipient's email address
        subject: 'Email Verification',
        html: `<p> Hey ${user.name} Thank you for Registration ....<br> 
        Your One time password is <h3><b>${otp}</b></h3><br>
        Regards<br>
        Abhishek Gawali
         </p>
         `
    };


    transporter.sendMail(message, (err) => {
        if (err) {
            console.log("Error in sending the verification mail", err);
        }
        else {
            console.log("Verification Mail has been Send");
        }
    })
};

const sendresetPasswordMail = (user, otp) => {

    const message = {
        from: process.env.EMAIL, // Sender's email address
        to: user.email, // Recipient's email address
        subject: 'Email Verification',
        html: `<p> Hey ${user.name}<br> 
        Your One time password for password reset is <h3><b>${otp}</b></h3><br>
        Regards<br>
        Abhishek Gawali
         </p>
         `
    };


    transporter.sendMail(message, (err) => {
        if (err) {
            console.log("Error in sending the verification mail", err);
        }
        else {
            console.log("Verification Mail has been Send");
        }
    })
}

module.exports = { sendVerificationEmail, sendresetPasswordMail };