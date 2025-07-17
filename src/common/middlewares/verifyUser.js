import handleAsync from "../helpers/handleAsync.js";
import createError from "../helpers/error.js";
import jwt, { decode } from "jsonwebtoken";
import User from "../../modules/auth/auth.model.js"
import { JWT_SECRET_KEY } from "../configs/eviroments.js";
export const verifyUser = handleAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split("")[1];
    console.log(token);

    if (!token) {
        return res.status(401).json(createError(401, 'khong co token hoac sai'))
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY, function(err,decoded){
        if (err) {
        return res.status(401).json(createError(401, 'co loi'))
    }
    return decoded;

    });

    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(404).json(createError(404, "user khong ton tai"))
    }
    req.user = user;
    next();

    
});



