import mongoose, { Schema } from "mongoose";
import { required } from "zod/v4-mini";

const productSchema = new mongoose.Schema(
    {
        //name la title
        name: {
            type: String,
            required: false,
            unique: true
        },
        thumbnail: {
            type: String,
            required: false,
            unique: true
        },
        specification: {
            type: String,
            default: "Chua co thong so ky thuat",
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        oldPrice: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            default: "Chua co mo ta",
            required: false
        },
        rating: {
            type: Number,
            default: 0,
            required: false
        },
        stock: {
            type: Number,
            default: 0,
            required: false
        },
        soldCount: {
            type: Number,
            default: 0,
            required: false
        },
        image: {
            type: String,
            required: false,
            unique: true
        },
        size: {
            type: [String],
            required: false,
            default: "Chưa có kích thước"
        },
        //seo
        slug: {
            type: String,
            required: true,
            unique: true
        },
        seoTitle: {
            type: String,
            required: false
        },
        seoDescription: {
            type: String,
            required: false
        },

        //chua crud
        tags: {
            type: [String],
            // type: Schema.Types.ObjectId,
            // ref: "Tag",
            default: [],
            required: false
        },
        brand: {
            type: [String],
            // type: Schema.Types.ObjectId,
            // ref: "Brand",
            default: [],
            required: true
        },

        //khoa ngoai

        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        subCategoryId: {
            type: Schema.Types.ObjectId,
            ref: "subCategoryModel",
            required: true
        },



        //time
        deletedAt: {
            type: Date,
            default: null
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const Product = mongoose.model('product', productSchema);
export default Product;