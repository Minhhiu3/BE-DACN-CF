import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_USER } from '../configs/eviroments.js';
import createError from './error.js';

const sendMail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
    });

    const mailOpiton = {
        from: "hieu 3 dep trai",
        to: email,
        subject: subject,
        html: text,
    };

    try {
        await transporter.sendMail(mailOpiton)
    } catch (error) {
        throw createError(500, `gui email khong thanh cong vi :${error.message}`)
    }
};

export default sendMail;