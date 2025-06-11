import express from 'express';
import { createProduct, fetchAllProduct, fetchProductById, editProduct, deleteProduct, softDeleteProduct, restoreProduct } from '../controllers/productController.js';

const routerProducts = express.Router();
//  route tại đây
routerProducts.post('/', createProduct);
routerProducts.get('/', fetchAllProduct);
routerProducts.put('/:id', editProduct);
routerProducts.get('/:id', fetchProductById);
routerProducts.delete('/:id', deleteProduct);
routerProducts.patch('/soft-delete/:id', softDeleteProduct);
routerProducts.patch('/restore/:id', restoreProduct);

export default routerProducts;