// Đúng nếu file là "category.Model.js"
import Category from "./category.model.js";

import handleAsync from "../../common/helpers/handleAsync.js";
import createReponse from "../../common/helpers/response.js";
import createError from "../../common/helpers/error.js";
import findByIdCategory from "./category.service.js";

//them moi san pham
export const createCategory = handleAsync(async (req, res, next) => {
    const existing = await Category.findOne({ title: req.body.title })
    if (existing) return next(createError(400, "This category already exists!"))
    const data = await Category.create(req.body)
    return res.json(createReponse(true, 201, "Create Category successfully!", data))
})

//lay ra all san pham
export const fetchAllCategory = handleAsync(async (req, res, next) => {
    const data = await Category.find();
    if (data) {
        return res.json(createReponse(true, 201, "Lấy danh sách danh mục thành công :", data));
    }
    next(createError(400, "Có lỗi khi lấy danh sách danh mục"))
})

// chinh sua san pham
export const editCategory = handleAsync(async (req, res, next) => {
    // const { id } = req.params
    // if (id) {
    //     const data = await Category.findByIdAndUpdate(id, req.body)
    //     return res.json(createReponse(true, 200, "Update categori thành công!", data))
    // }
    // next(createError(false, 404, "Có lỗi khi update categori!"))
    const data = await Category.findByIdAndUpdate(req, params.id, req.body);
    if (data) {
        return res.json(createReponse(true, 200, "tcong", data));
    }
    next(createError(false, 404, "faill"));

})

//chi tiet san pham
export const detailCategory = handleAsync(async (req, res, next) => {
    const data = await findByIdCategory(req.params.id);
    if (data) {
        next(createError(404, "category không tồn tại"))
    }
    return res.json(createReponse(true, 200, "Lấy chi tiết danh mục thành công!", data));
})

// xoa san pham
export const deleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        await category.findByIdAndDelete(id);
        return res.json(createReponse(true, 200, "Xoá danh mục thành công!"))
    }
    next(createError(false, 400, "xóa danh mục thất bại!"))
})

//xoa mem san pham
export const softDeleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findOneAndUpdate({ id, deletedAt: { $ne: null } }, {
            deletedAt: new Date(),

        });
        return res.json(createReponse(true, 200, "Ẩn category thành công"));
    }
    next(createError(400, "có lỗi khi ẩn"))
})

//khoi phuc san pham bi xoa mem
export const restoreCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByIdAndUpdate(
            { id, deletedAt: { $ne: null } },
            {
                deletedAt: null
            }
        );
        return res.json(createReponse(true, 200, "Khôi phục category thành công"));
    }
    next(createError(400, "có lỗi khi khôi phục danh mục"))
});
