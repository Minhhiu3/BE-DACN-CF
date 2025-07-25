import mongoose, { Schema } from "mongoose";
import { required } from "zod/v4-mini";

const subCategorySchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    categoryParrentId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})
const subCategoryModel = mongoose.model('subCategory', subCategorySchema);
export default subCategoryModel;