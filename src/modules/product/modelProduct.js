import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: false,
            unique: true
        },
        price: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            default: "Chua co mo ta",
            required: false
        },
        category: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false,
            unique: true
        },
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