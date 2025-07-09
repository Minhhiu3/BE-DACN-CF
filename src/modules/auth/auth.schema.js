import { z } from "zod";
import MESSAGES from "../../common/helpers/message.js";

export const registerSchema = z.object({
    fullName: z.string().min(1,MESSAGES.USER.FULLNAME_REQUIRED),
    email: z.string().email(MESSAGES.EMAIL.EMAIL_INVALID),
    password: z.string().min(6, MESSAGES.PASSWORD.PASSWORD_TOSHORT).max(20, MESSAGES.PASSWORD.PASSWORD_TOLONG),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    bios: z.string().optional(),
    avatar: z.string().optional(),
    role: z.enum(["guest", "user", "admin"]).optional().default("guest"),
})

export const loginSchema = z.object({
    email: z.string().email(MESSAGES.EMAIL.EMAIL_INVALID),
    password: z.string().max(20,MESSAGES.AUTH.LOGIN_FAILED).min(6,MESSAGES.AUTH.LOGIN_FAILED),
})