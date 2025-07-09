import { Router } from "express";
import { updateCart,getCart,deleteCart } from "./cart.controller.js";

const cartRouter = Router();
//CREATE cart
//GET cart
//UPDATE cart
//DELETE cart
console.log(cartRouter);
// cartRouter.post('/', verifyUser(),createCart)
cartRouter.patch('/', updateCart);
cartRouter.get('/', getCart);
cartRouter.delete('/', deleteCart);
export default cartRouter;