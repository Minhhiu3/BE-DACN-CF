import express from 'express';
import { createProduct, fetchAllProduct, fetchProductById, editProduct, deleteProduct, softDeleteProduct, restoreProduct } from './product.controller.js';
import createProductSchema from './product.schema.js';
const routerProducts = express.Router();
import validBodyRequest from '../../common/middlewares/validBodyRequest.js';
//  route tại đây
routerProducts.post('/', validBodyRequest(createProductSchema), createProduct);
routerProducts.get('/', fetchAllProduct);
routerProducts.put('/:id', validBodyRequest(createProductSchema), editProduct);
routerProducts.get('/:id', fetchProductById);
routerProducts.delete('/:id', deleteProduct);
routerProducts.patch('/soft-delete/:id', softDeleteProduct);
routerProducts.patch('/restore/:id', restoreProduct);

export default routerProducts;