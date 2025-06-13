import routerCategory from "../modules/category/categoryRoutes.js";
import { Router } from 'express';
import productsRoutes from './productsRoutes.js';

const router = Router();

//product api
router.use('/products', productsRoutes);

//category api
router.use('/categories', routerCategory);

export default router;