// src/routes/categoryRoutes.js
import express from 'express';
import {
    createBrand,
    fetchAllBrand,
    editBrand,
    detailBrand,
    deleteBrand,
    softDeleteBrand,
    restoreBrand
} from './brand.controller.js';
import validBodyRequest from '../../common/middlewares/validBodyRequest.js';
import brandSchema from './brand.schema.js';
const routerBrand = express.Router();

//  route tại đây
routerBrand.get('/', fetchAllBrand);
routerBrand.get('/:id', detailBrand);
routerBrand.delete('/:id', deleteBrand);
routerBrand.patch('/soft-delete/:id', softDeleteBrand);
routerBrand.patch('/restore/:id', restoreBrand);

routerBrand.post('/', validBodyRequest(brandSchema), createBrand);
routerBrand.put('/:id', validBodyRequest(brandSchema), editBrand);

export default routerBrand;
