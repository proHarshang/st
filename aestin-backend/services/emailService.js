const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendOTPByEmail(email, otp) {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Provide your email service configuration here
        // For example, Gmail configuration:
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
    });

    // Define email options
    const mailOptions = {
        from: 'thakarharshang2@mail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}

module.exports = { sendOTPByEmail };