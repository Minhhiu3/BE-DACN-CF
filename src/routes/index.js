import routerCategory from "./categoryRoutes.js";
import { Router } from 'express';
import productsRoutes from './productsRoutes.js';

const router = Router();

//product api
router.use('/products', productsRoutes);

//category api
router.use('/categories', routerCategory);

export default router;