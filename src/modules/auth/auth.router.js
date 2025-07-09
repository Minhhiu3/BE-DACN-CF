import { Router } from "express";
import { authLogin, authRegister } from "./auth.controller.js";
import validBodyRequest from "../../../src/common/middlewares/validBodyRequest.js"
import { loginSchema, registerSchema } from "./auth.schema.js";
const authRouter = Router();


authRouter.post("/register", validBodyRequest(registerSchema),authRegister);
authRouter.post("/login", validBodyRequest(loginSchema), authLogin);

export default authRouter;