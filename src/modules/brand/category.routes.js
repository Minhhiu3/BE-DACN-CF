// src/routes/categoryRoutes.js
import express from 'express';
import {
    createCategory,
    fetchAllCategory,
    editCategory,
    detailCategory,
    deleteCategory,
    softDeleteCategory,
    restoreCategory
} from './brand.controller.js';
import validBodyRequest from '../../common/middlewares/validBodyRequest.js';
import brandSchema from './brand.schema.js';
const routerBrand = express.Router();

//  route tại đây
routerBrand.get('/', fetchAllCategory);
routerBrand.get('/:id', detailCategory);
routerBrand.delete('/:id', deleteCategory);
routerBrand.patch('/soft-delete/:id', softDeleteCategory);
routerBrand.patch('/restore/:id', restoreCategory);

routerBrand.post('/', validBodyRequest(brandSchema), createCategory);
routerBrand.put('/:id', validBodyRequest(brandSchema), editCategory);

export default routerBrand;
