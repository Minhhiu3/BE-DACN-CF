import handleAsync from "../../../src/common/helpers/handleAsync.js"
import createError from "../../common/helpers/error.js";
import MESSAGES from "../../common/helpers/message.js";
import User from "./auth.model.js";
import createResponse from "../../common/helpers/response.js";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_EXPIRES_IN_FOR_EMAIL, JWT_SECRET_KEY, JWT_SECRET_KEY_FOR_EMAIL } from "../../common/configs/eviroments.js";
import jwt from "jsonwebtoken"
import sendMail from "../../common/helpers/mailSender.js";
import emailTemplate from "../../common/helpers/emailTemplate.js";
import { createCartForUser } from "../cart/cart.service.js";
export const authRegister = handleAsync(async (req, res, next) => {
    const { email, password, phoneNumber } = req.body;

    try {
        const existingUserEmail = await User.findOne({ email });

        if (req.body.phoneNumber === ""){
            delete req.body.phoneNumber;
        }

        if (existingUserEmail) {
            return next(createError(400, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
        }
        if (phoneNumber) {
            const existingPhoneNumber = await User.findOne({ phoneNumber })
            if (existingPhoneNumber) {
                return next(createError(400, MESSAGES.AUTH.PHONENUMBER_ALREADY_EXISTS))
            }
        }
       
        //ma hoa mk
        const salt = bcrypt.genSaltSync(10);
        console.log(salt);

        const hash = bcrypt.hashSync(password, salt);
        console.log(hash);

        //create user
        const newUser = await User.create({
            ...req.body,
            password: hash,
            role: "guest",
        })

        if (!newUser) {
            return next(createError(500, MESSAGES.AUTH.REGISTER_FAILED));
        }
        //verify email
        const verifyEmailToken = jwt.sign({ id: newUser._id }, JWT_SECRET_KEY_FOR_EMAIL, { expiresIn: JWT_EXPIRES_IN_FOR_EMAIL });
        const verifyEmailLink = `http://${req.get('host')}/api/auth/verify-email/${verifyEmailToken}`;

        const emailContent = emailTemplate(newUser.fullName, verifyEmailLink);
        await sendMail(
            newUser.email,
            MESSAGES.EMAIL.VERIFICATION_SUBJECT,
            emailContent
        );
        
        //them gio hang mac dinh
        const cartUserData = await createCartForUser(newUser._id);
        console.log(cartUserData);
        

        //resonse
        newUser.password = undefined;
        return res.status(201).json(createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, newUser));
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: MESSAGES.GENERAL.SERVER_ERROR,
            error: error.message
        })
    }
});

export const authLogin = handleAsync(async (req, res, next) => {
    const { email,password } = req.body;
    const existingUser = await User.findOne({ email });
    const isEmailVerified = existingUser.isVerifyEmail;

    if (!isEmailVerified) {
        return next(createError(400, MESSAGES.AUTH.EMAIL_NOT_VERIFIED));
    }

    if (!existingUser) {
        return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED))
    }

    const checkUserPasswordIsMatch = bcrypt.compareSync(password,existingUser.password);

    if (!checkUserPasswordIsMatch) {
        return next(createError(400,MESSAGES.AUTH.LOGIN_FAILED));
    }
    //genarate token
    const accessToken = jwt.sign({id: existingUser._id},JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })

    if (accessToken) {
        existingUser.password = undefined;
        return res.status(200).json(createResponse(true,200,MESSAGES.AUTH.LOGIN_SUCCESS, {
            user: existingUser,
            accessToken
        }));
    }else{
    return next(createError(500,MESSAGES.AUTH.LOGIN_FAILED));
    }
})
 
// export const authVerifyEmail = handleAsync(async (req,res,next) => {
//     const { token } = req.params
// })
