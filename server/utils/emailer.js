const nodemailer = require('nodemailer');

const sendEmail = async options =>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from:'Training Placement Office <tpo@nith.ac.in>',
        to:options.email,
        subject:options.subject,
        html:`<p>${options.message}</p>`
    }
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;