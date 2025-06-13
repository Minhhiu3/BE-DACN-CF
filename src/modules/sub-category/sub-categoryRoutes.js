// src/routes/categoryRoutes.js
import express from 'express';
import { createCategory, fetchAllCategory, editCategory, detailCategory, deleteCategory, softDeleteCategory, restoreCategory } from './sub-categoryController.js';

const routerCategory = express.Router();

//  route tại đây

routerCategory.get('/', fetchAllCategory);
routerCategory.post('/', createCategory);
routerCategory.put('/:id', editCategory);
routerCategory.get('/:id', detailCategory);
routerCategory.delete('/:id', deleteCategory);
routerCategory.patch('/soft-delete/:id', softDeleteCategory);
routerCategory.patch('/restore/:id', restoreCategory);

export default routerCategory;
