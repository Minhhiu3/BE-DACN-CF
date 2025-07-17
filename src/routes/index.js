import routerCategory from "../modules/category/category.routes.js";
import routerSubCategory from "../modules/sub-category/sub-category.routes.js";
import { Router } from 'express';
import productsRoutes from '../modules/product/products.routes.js';
import routerBrand from "../modules/brand/brand.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import authRouter from "../modules/auth/auth.router.js";
import orderRouter from "../modules/order/order.router.js";
const router = Router();

//product api

router.use('/products', productsRoutes);

//category api
router.use('/categories', routerCategory);
router.use('/sub-categories', routerSubCategory);
router.use('/brands', routerBrand);
router.use('/auth',authRouter);
router.use('/order',orderRouter);

router.use('/cart',cartRouter);
router.use('/orders', cartRouter);
export default router;