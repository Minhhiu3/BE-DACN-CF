import { Router } from "express";
import { updateCart,getCart,deleteCart, } from "./cart.controller.js";
import { verifyUser } from "../../common/middlewares/verifyUser.js"
const cartRouter = Router();
//CREATE cart
//GET cart
//UPDATE cart
//DELETE cart
console.log(cartRouter);
cartRouter.patch('/update', updateCart);
cartRouter.get('/', getCart);
cartRouter.delete('/delete', deleteCart);

export default cartRouter;