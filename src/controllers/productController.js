import Product from "../models/Product.js";
import handleAsync from "../helpers/handleAsync.js";
import createResponse from "../helpers/response.js";
import createError from "../helpers/error.js";

// Thêm sản phẩm
export const createProduct = handleAsync(async (req, res, next) => {
    const data = await Product.create(req.body);
    if (data) {
        return res.json(createResponse(true, 201, "Thêm sản phẩm thành công", data));
    }
    next(createError(400, "Thêm sản phẩm thất bại"));
});

// Lấy danh sách tất cả sản phẩm (chưa bị xóa mềm)
export const fetchAllProduct = handleAsync(async (req, res, next) => {
    const data = await Product.find({ deletedAt: null });
    if (data) {
        return res.json(createResponse(true, 200, "Lấy danh sách sản phẩm thành công", data));
    }
    next(createError(400, "Có lỗi khi lấy danh sách sản phẩm"));
});

// Lấy chi tiết 1 sản phẩm theo ID
export const fetchProductById = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await Product.findById(id);
    if (data) {
        return res.json(createResponse(true, 200, "Lấy thông tin sản phẩm thành công", data));
    }
    next(createError(404, "Sản phẩm không tồn tại"));
});

// Cập nhật sản phẩm
export const editProduct = handleAsync(async (req, res, next) => {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (data) {
        return res.json(createResponse(true, 200, "Chỉnh sửa sản phẩm thành công", data));
    }
    next(createError(400, "Có lỗi khi chỉnh sửa sản phẩm"));
});

// Xóa sản phẩm vĩnh viễn
export const deleteProduct = handleAsync(async (req, res, next) => {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (data) {
        return res.json(createResponse(true, 200, "Xóa sản phẩm thành công", data));
    }
    next(createError(400, "Có lỗi khi xóa sản phẩm"));
});

// Ẩn (soft delete) sản phẩm
export const softDeleteProduct = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await Product.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (data) {
        return res.json(createResponse(true, 200, "Ẩn sản phẩm thành công", data));
    }
    next(createError(400, "Có lỗi khi ẩn sản phẩm"));
});

// Khôi phục sản phẩm đã bị ẩn
export const restoreProduct = handleAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await Product.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
    if (data) {
        return res.json(createResponse(true, 200, "Khôi phục sản phẩm thành công", data));
    }
    next(createError(400, "Có lỗi khi khôi phục sản phẩm"));
});
