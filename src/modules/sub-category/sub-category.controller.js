// Đúng nếu file là "category.Model.js"
import SubCategory from "./sub-category.model.js";

import handleAsync from "../../common/helpers/handleAsync.js";
import createReponse from "../../common/helpers/response.js";
import createError from "../../common/helpers/error.js";
import findByIdSubCategory from "./sub-category.service.js";
import MESSAGES from "../../common/helpers/message.js";

//them moi san pham
export const createSubCategory = handleAsync(async (req, res, next) => {
    const { categoryParrentId } = req.body;
    console.log(req.body);

    if (!categoryParrentId) {
        return next(createError(400, MESSAGES.SUBCATEGORY.CREATE_ERROR_PARRENT_ID))
    }


    const existing = await SubCategory.findOne({ title: req.body.title })
    if (existing) return next(createError(400, MESSAGES.SUBCATEGORY.CREATE_ERROR_EXISTS))
    const data = await SubCategory.create(req.body)
    return res.json(createReponse(true, 201, MESSAGES.SUBCATEGORY.CREATE_SUCCESS, data))
})

//lay ra all san pham
export const fetchAllSubCategoryByCategoryParrentId = handleAsync(async (req, res, next) => {
    const { categoryParrentId } = req.query;
    const filter = categoryParrentId ? { categoryParrentId } : {};
    const data = await SubCategory.find(filter);
    if (!data && !data.length === 0) {
        return next(createError(404, MESSAGES.SUBCATEGORY.NOT_FOUND));
    }
    if (data) {
        return res.json(createReponse(true, 201, MESSAGES.SUBCATEGORY.GET_BY_ID_SUCCESS, data));
    }
    next(createError(400, MESSAGES.SUBCATEGORY.NOT_FOUND))
})

// chinh sua san pham
export const editSubCategory = handleAsync(async (req, res, next) => {
    // const { id } = req.params
    // if (id) {
    //     const data = await SubCategory.findByIdAndUpdate(id, req.body)
    //     return res.json(createReponse(true, 200, "Update categori thành công!", data))
    // }
    // next(createError(false, 404, "Có lỗi khi update categori!"))
    const data = await SubCategory.findByIdAndUpdate(req.params.id, req.body);
    if (data) {
        return res.json(createReponse(true, 200, MESSAGES.SUBCATEGORY.UPDATE_SUCCESS, data));
    }
    next(createError(false, 404, MESSAGES.SUBCATEGORY.UPDATE_ERROR));

})

//chi tiet san pham
export const detailSubCategory = handleAsync(async (req, res, next) => {
    const data = await findByIdSubCategory(req.params.id);
    if (data) {
        next(createError(404, MESSAGES.SUBCATEGORY.NOT_FOUND))
    }
    return res.json(createReponse(true, 200, MESSAGES.SUBCATEGORY.GET_BY_ID_SUCCESS, data));
})

// xoa san pham
export const deleteSubCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        await SubCategory.findByIdAndDelete(id);
        return res.json(createReponse(true, 200, MESSAGES.SUBCATEGORY.DELETE_SUCCESS))
    }
    next(createError(false, 400, MESSAGES.SUBCATEGORY.DELETE_ERROR))
})

//xoa mem san pham
export const softDeleteSubCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await SubCategory.findByIdAndUpdate({ _id: id, deletedAt: { $ne: null } }, {
            deletedAt: new Date(),

        });
        return res.json(createReponse(true, 200, MESSAGES.SUBCATEGORY.SOFT_DELETE_SUCCESS));
    }
    next(createError(400, MESSAGES.SUBCATEGORY.SOFT_DELETE_FAILED))
})

//khoi phuc san pham bi xoa mem
export const restoreSubCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await SubCategory.findOneAndUpdate(
            { _id: id, deletedAt: { $ne: null } },
            {
                deletedAt: null
            }
        );
        return res.json(createReponse(true, 200, MESSAGES.SUBCATEGORY.RESTORE_SUCCESS));
    }
    next(createError(400, MESSAGES.SUBCATEGORY.RESTORE_FAILED))
});
