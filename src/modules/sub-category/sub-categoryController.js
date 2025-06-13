// Đúng nếu file là "category.Model.js"
import Category from "./sub-category.model.js";

import handleAsync from "../../common/helpers/handleAsync.js";
import createReponse from "../../common/helpers/response.js";
import createError from "../../common/helpers/error.js";
import findByIdCategory from "./sub-category.service.js";
import MESSAGES from "../../common/helpers/message.js";

//them moi san pham
export const createCategory = handleAsync(async (req, res, next) => {
    const existing = await Category.findOne({ title: req.body.title })
    if (existing) return next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR_EXISTS))
    const data = await Category.create(req.body)
    return res.json(createReponse(true, 201, MESSAGES.CATEGORY.CREATE_SUCCESS, data))
})

//lay ra all san pham
export const fetchAllCategory = handleAsync(async (req, res, next) => {
    const data = await Category.find();
    if (data) {
        return res.json(createReponse(true, 201, MESSAGES.CATEGORY.GET_BY_ID_SUCCESS, data));
    }
    next(createError(400, MESSAGES.CATEGORY.NOT_FOUND))
})

// chinh sua san pham
export const editCategory = handleAsync(async (req, res, next) => {
    // const { id } = req.params
    // if (id) {
    //     const data = await Category.findByIdAndUpdate(id, req.body)
    //     return res.json(createReponse(true, 200, "Update categori thành công!", data))
    // }
    // next(createError(false, 404, "Có lỗi khi update categori!"))
    const data = await Category.findByIdAndUpdate(req.params.id, req.body);
    if (data) {
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data));
    }
    next(createError(false, 404, MESSAGES.CATEGORY.UPDATE_ERROR));

})

//chi tiet san pham
export const detailCategory = handleAsync(async (req, res, next) => {
    const data = await findByIdCategory(req.params.id);
    if (data) {
        next(createError(404, MESSAGES.CATEGORY.NOT_FOUND))
    }
    return res.json(createReponse(true, 200, MESSAGES.CATEGORY.GET_BY_ID_SUCCESS, data));
})

// xoa san pham
export const deleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        await Category.findByIdAndDelete(id);
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.DELETE_SUCCESS))
    }
    next(createError(false, 400, MESSAGES.CATEGORY.DELETE_ERROR))
})

//xoa mem san pham
export const softDeleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByIdAndUpdate({ _id: id, deletedAt: { $ne: null } }, {
            deletedAt: new Date(),

        });
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS));
    }
    next(createError(400, MESSAGES.CATEGORY.SOFT_DELETE_FAILED))
})

//khoi phuc san pham bi xoa mem
export const restoreCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findOneAndUpdate(
            { _id: id, deletedAt: { $ne: null } },
            {
                deletedAt: null
            }
        );
        return res.json(createReponse(true, 200, MESSAGES.CATEGORY.RESTORE_SUCCESS));
    }
    next(createError(400, MESSAGES.CATEGORY.RESTORE_FAILED))
});
