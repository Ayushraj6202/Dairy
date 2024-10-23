import nodemailer from 'nodemailer'
const senderEmail = process.env.SENDER_EMAIL;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', //'smtp.gmail.com' for Gmail
    port: 587, // Usually port 587 for TLS
    secure: false, // Set to true for port 465 if using SSL
    auth: {
        user: senderEmail, // Your email address
        pass: process.env.SENDER_PASSWORD, // Your email password or app-specific password
    },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: `"Khetalpura Dairy" <${senderEmail}>`,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error while sending email: ', error);
        throw error;
    }
};

export default sendEmail;
