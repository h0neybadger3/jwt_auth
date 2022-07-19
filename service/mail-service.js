const nodemailer = require('nodemailer');

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, API_URL } = process.env;
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
});

const sendActivationMail = async (to, link) => {
    await transporter.sendMail({
        from: SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + API_URL,
        text: '',
        html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
};

module.exports = {
    sendActivationMail,
};
