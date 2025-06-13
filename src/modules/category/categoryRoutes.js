// src/routes/categoryRoutes.js
import express from 'express';
import { createCategory, fetchAllCategory, editCategory, detailCategory, deleteCategory, softDeleteCategory, restoreCategory } from './categoryController.js';
import validBodyRequest from '../../common/middlewares/validBodyRequest.js';
import categorySchema from './category.model.js';
const routerCategory = express.Router();

//  route tại đây
routerCategory.get('/', fetchAllCategory);
routerCategory.get('/:id', detailCategory);
routerCategory.delete('/:id', deleteCategory);
routerCategory.patch('/soft-delete/:id', softDeleteCategory);
routerCategory.patch('/restore/:id', restoreCategory);


routerCategory.use(validBodyRequest(categorySchema))
routerCategory.post('/', createCategory);
routerCategory.put('/:id', editCategory);

export default routerCategory;
