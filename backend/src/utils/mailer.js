import nodemailer from 'nodemailer'
const senderEmail = "ayushrajavinashkhetalpura@gmail.com";
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587,
    secure: false,
    auth: {
        user: process.env.SENDER_EMAIL, 
        pass: process.env.SENDER_PASSWORD,
    },
});

const sendEmail = async (to, subject, text, html) => {
    console.log(to,subject);
    
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
