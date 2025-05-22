const nodemailer = require('nodemailer');

const sendVerificationEmail = async (to, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject: 'Email Verification',
        html: `<p>Please click the following link to verify your email:</p>
               <a href="${verificationLink}">${verificationLink}</a>`
    });
};

module.exports = { sendVerificationEmail };
