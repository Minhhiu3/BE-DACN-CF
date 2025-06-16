// src/routes/categoryRoutes.js
import express from 'express';
import { createCategory, fetchAllCategory, editCategory, detailCategory, deleteCategory, softDeleteCategory, restoreCategory } from './category.controller.js';
import validBodyRequest from '../../common/middlewares/validBodyRequest.js';
import categorySchema from './category.schema.js';
const routerCategory = express.Router();

//  route tại đây
routerCategory.get('/', fetchAllCategory);
routerCategory.get('/:id', detailCategory);
routerCategory.delete('/:id', deleteCategory);
routerCategory.patch('/soft-delete/:id', softDeleteCategory);
routerCategory.patch('/restore/:id', restoreCategory);

routerCategory.post('/', validBodyRequest(categorySchema), createCategory);
routerCategory.put('/:id', validBodyRequest(categorySchema), editCategory);

export default routerCategory;
