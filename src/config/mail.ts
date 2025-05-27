import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST ?? "smtp.ethereal.email",
    port: parseInt(process.env.MAIL_PORT ?? "587"),// true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER ?? "maddison53@ethereal.email",
        pass: process.env.MAIL_PASSWORD ?? "jn7jnAPss4f63QBp6D",
    },
});

export default transporter;
