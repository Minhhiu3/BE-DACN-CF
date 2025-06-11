import Category from "../models/Category.js";
import handleAsync from "../helpers/handleAsync.js";
import createReponse from "../helpers/response.js";
import createError from "../helpers/error.js";

export const createCategory = handleAsync(async (req, res, next) => {
    const existing = await Category.findOne({ title: req.body.title })
    if (existing) return next(createError(400, "This category already exists!"))
    const data = await Category.create(req.body)
    return res.json(createReponse(true, 201, "Create Category successfully!", data))
})

export const fetchAllCategory = handleAsync(async (req, res, next) => {
    const data = await Category.find();
    if (data) {
        return res.json(createReponse(true, 201, "Lấy danh sách danh mục thành công :", data));
    }
    next(createError(400, "Có lỗi khi lấy danh sách danh mục"))
})

export const editCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Category.findByIdAndUpdate(id, req.body)
        return res.json(createReponse(true, 200, "Update categori thành công!", data))
    }
    next(createError(false, 404, "Có lỗi khi update categori!"))
})

export const detailCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        const data = await Category.findById(id)
        return res.json(createReponse(true, 200, "Lấy chi tiết danh mục thành công!", data))
    }
    next(createError(false, 404, "Categori k tồn tại!"))
})

export const deleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    if (id) {
        await category.findByIdAndDelete(id);
        return res.json(createReponse(true, 200, "Xoá danh mục thành công!"))
    }
    next(createError(false, 400, "xóa danh mục thất bại!"))
})

export const softDeleteCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByIdAndUpdate(id, {
            deletedAt: new Date()
        });
        return res.json(createReponse(true, 200, "Ẩn category thành công"));
    }
    next(createError(400, "có lỗi khi ẩn"))
})

export const restoreCategory = handleAsync(async (req, res, next) => {
    const { id } = req.params
    if (id) {
        await Category.findByIdAndUpdate(id, {
            deletedAt: null
        });
        return res.json(createReponse(true, 200, "Khôi phục category thành công"));
    }
    next(createError(400, "có lỗi khi khôi phục danh mục"))
})
