// src/routes/categoryRoutes.js
import express from 'express';
import { createSubCategory, fetchAllSubCategoryByCategoryParrentId, editSubCategory, detailSubCategory, deleteSubCategory, softDeleteSubCategory, restoreSubCategory } from './sub-categoryController.js';
import validBodyRequest from '../../common/middlewares/validBodyRequest.js';
import subCategorySchema from './sub-category.schema.js';
const routerSubCategor = express.Router();

//  route tại đây



routerSubCategor.get('/', fetchAllSubCategoryByCategoryParrentId);
routerSubCategor.get('/:id', detailSubCategory);
routerSubCategor.delete('/:id', deleteSubCategory);
routerSubCategor.patch('/soft-delete/:id', softDeleteSubCategory);
routerSubCategor.patch('/restore/:id', restoreSubCategory);

routerSubCategor.post('/', validBodyRequest(subCategorySchema), createSubCategory);
routerSubCategor.put('/:id', validBodyRequest(subCategorySchema), editSubCategory);

export default routerSubCategor;
