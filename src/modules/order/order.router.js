import { Router } from "express";
import { createPayosPayment, returnConfirmPayment } from "./order.controller.js";

const orderRouter = Router();

orderRouter.post("/createPayos", createPayosPayment);
orderRouter.get("/returnPeyment", returnConfirmPayment);

export default orderRouter;