import routerCategory from "../modules/category/categoryRoutes.js";
import routerSubCategory from "../modules/sub-category/sub-categoryRoutes.js";
import { Router } from 'express';
import productsRoutes from '../modules/product/productsRoutes.js';

const router = Router();

//product api

router.use('/products', productsRoutes);

//category api
router.use('/categories', routerCategory);
router.use('/sub-categories', routerSubCategory);
export default router;