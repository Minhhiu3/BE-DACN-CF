import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Nên là Product, không phải User
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1,
            }
        }
    ]
}, {
    timestamps: true, // đúng là timestamps, không phải timeStamps
    versionKey: false
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;