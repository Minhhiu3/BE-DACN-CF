import routerCategory from "../modules/category/category.routes.js";
import routerSubCategory from "../modules/sub-category/sub-category.routes.js";
import { Router } from 'express';
import productsRoutes from '../modules/product/products.routes.js';

const router = Router();

//product api

router.use('/products', productsRoutes);

//category api
router.use('/categories', routerCategory);
router.use('/sub-categories', routerSubCategory);
export default router;