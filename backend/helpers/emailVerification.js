const nodemailer = require('nodemailer');
require('dotenv').config();
const generateError = require('../helpers/generateError');

const { SMTP_USER, SMTP_PASSWORD } = require('../config');

const transport = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
});

async function sendVerifyEmail (email, subject, html) {
    const emailOptions = {
        from: SMTP_USER,
        to: email,
        subject,
        html
    };

    try {
        await transport.sendMail(emailOptions);
    } catch (error) {
        console.log(error);
        throw generateError('Ha ocurrido un error', 500);
    }
};

module.exports = sendVerifyEmail;
