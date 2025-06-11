import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
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
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})
const Category = mongoose.model('category', categorySchema);
export default Category;