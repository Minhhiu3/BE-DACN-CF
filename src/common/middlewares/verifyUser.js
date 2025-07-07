import handleAsync from "../helpers/handleAsync";
import createError from "../helpers/error";
import jwt, { decode } from "jsonwebtoken";
export const verifyUser = handleAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split("")[1];
    console.log(token);

    if (!token) {
        return res.status(401).json(createError(401, 'invalid token'))
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY, function(err,decoded){
        if (err) {
        return res.status(401).json(createError(401, 'invalid token'))
    }
    return decoded;

    });

    const user = await User.findById(decoded.id);
    if (!User) {
        return res.status(404).json(createError(404, "user khong ton tai"))
    }
    req.user = user;
    next();

    
});



