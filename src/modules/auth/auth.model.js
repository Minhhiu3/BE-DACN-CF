import mongoose, { mongo, version } from "mongoose";
import { lowercase, required } from "zod/v4-mini";

const userSchema = new mongoose.Schema({

        fullName: {
            type: String,
            required: true,
        },
        email: {
            type : String,
            unique: true,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            unique: true,
            sparse: true
            // default: ""
        },
        isVerifyEmail: {
            type: Boolean,
            default: false
        },
        isVerifyPhone: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: "guest"
        },
        address: {
            type: String,
            default: ""
        },
        bios: {
            type: String
        },
        avatar: {
            type: String,
            default: "https://www.google.com/imgres?q=example%20avatar&imgurl=https%3A%2F%2Finnostudio.de%2Ffileuploader%2Fimages%2Fdefault-avatar.png&imgrefurl=https%3A%2F%2Finnostudio.de%2Ffileuploader%2Fdocumentation%2Fexamples%2Favatar%2F&docid=Pe7mvTyIXuG4OM&tbnid=XbselRCkuA3qhM&vet=12ahUKEwi8uaX72a6OAxWFafUHHUCdN48QM3oECG8QAA..i&w=256&h=256&hcb=2&ved=2ahUKEwi8uaX72a6OAxWFafUHHUCdN48QM3oECG8QAA"
        },
        isActive: {
            type: Boolean,
            default: true
        },

},{
        versionKey: false,
        timesTamps: true
})

const User = mongoose.model("User", userSchema);

export default User;