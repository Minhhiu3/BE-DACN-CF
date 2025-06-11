import createError from "../helpers/error";
import { z } from "zod";
const validBodyRequest = (req, res, next) => {
    try {
        const data = z.parse(req.body);
        req.data = data;
        next;
    } catch (error) {
        const err = error.errors[0];
        return res.status(400).json({ "valid body request": `${err.path} : ${err.message}` });
    }
};

export default validBodyRequest;