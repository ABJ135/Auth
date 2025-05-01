const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: "Email Verification OTP",
    text: `Your OTP for email verification is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtpEmail;
