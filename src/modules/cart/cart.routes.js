import { Router } from "express";
import { verifyUser } from "../../common/middlewares/verifyUser";
import { updateCart,getCart,deleteCart } from "./cart.controller";

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