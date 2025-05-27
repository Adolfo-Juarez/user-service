import transporter from "../config/mail.ts";
import dotenv from "dotenv";

dotenv.config();

interface SendRecoveryPasswordMailParams {
    receiverEmail: string;
    receiverUsername: string;
    password: string;
}

export default class MailHelper {
    static async sendRecoveryPasswordMail(params: SendRecoveryPasswordMailParams) {
        // Hacer la implementacion con nodeMailer
        transporter.sendMail({
            from: process.env.MAIL_USER,
            to: params.receiverEmail,
            subject: 'Recuperar Contraseña',
            text: `Hola ${params.receiverUsername},\r\n\r\n` +
                `Has solicitado recuperar tu contraseña. Si no has solicitado esto, ignora este correo.\r\n\r\n` +
                `Tu nueva contraseña es: ${params.password}\r\n\r\n` +
                `Si tienes problemas para acceder, contacta al soporte.\r\n\r\n` +
                `Atentamente,\r\n` +
                `Tu Aplicación de Usuarios`
        })
    }
}