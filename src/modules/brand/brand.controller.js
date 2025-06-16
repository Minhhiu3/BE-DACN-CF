// Đúng nếu file là "category.Model.js"
import Brand from "./brand.model.js";

import handleAsync from "../../common/helpers/handleAsync.js";
import createReponse from "../../common/helpers/response.js";
import createError from "../../common/helpers/error.js";
import findByIdBrand from "./brand.service.js";
import MESSAGES from "../../common/helpers/message.js";

//them moi san pham
export const createBrand = handleAsync(async (req, res, next) => {
    const existing = await Brand.findOne({ title: req.body.title })
    if (existing) return next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR_EXISTS))
    const data = await Brand.create(req.body)
    return res.json(createReponse(true, 201, MESSAGES.CATEGORY.CREATE_SUCCESS, data))
})

//lay ra all san pham
export const fetchAllBrand = handleAsync(async (req, res, next) => {
    const data = await Brand.find();
    if (data) {
        return res.json(createReponse(true, 201, MESSAGES.CATEGORY.GET_BY_ID_SUCCESS, data));
    }
    next(createError(400, MESSAGES.CATEGORY.NOT_FOUND))
})

// chinh sua san pham
export const editBrand = handleAsync(async (req, res, next) => {
    // const { id } = req.params
    // if (id) {
    //     const data = await Brand.findByIdAndUpdate(id, req.body)
    //     return res.json(createReponse(true, 200, "Update categori thành công!", data))
    // }
    // next(createError(false, 404, "Có lỗi khi update categori!"))
    const data = await Brand.findByIdAndUpdate(req.params.id, req.body);
    if (data) {
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data));
    }
    next(createError(false, 404, MESSAGES.CATEGORY.UPDATE_ERROR));

})

//chi tiet san pham
export const detailBrand = handleAsync(async (req, res, next) => {
    const data = await findByIdBrand(req.params.id);
    if (data) {
        next(createError(404, MESSAGES.CATEGORY.NOT_FOUND))
    }
    return res.json(createReponse(true, 200, MESSAGES.CATEGORY.GET_BY_ID_SUCCESS, data));
})

// xoa san pham
export const deleteBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        await Brand.findByIdAndDelete(id);
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.DELETE_SUCCESS))
    }
    next(createError(false, 400, MESSAGES.CATEGORY.DELETE_ERROR))
})

//xoa mem san pham
export const softDeleteBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Brand.findByIdAndUpdate({ _id: id, deletedAt: { $ne: null } }, {
            deletedAt: new Date(),

        });
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS));
    }
    next(createError(400, MESSAGES.CATEGORY.SOFT_DELETE_FAILED))
})

//khoi phuc san pham bi xoa mem
export const restoreBrand = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Brand.findOneAndUpdate(
            { _id: id, deletedAt: { $ne: null } },
            {
                deletedAt: null
            }
        );
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.RESTORE_SUCCESS));
    }
    next(createError(400, MESSAGES.CATEGORY.RESTORE_FAILED))
});
