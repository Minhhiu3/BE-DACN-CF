import mongoose, { mongo, Schema } from "mongoose";
import { required } from "zod/v4-mini";

const ordersSchema = new Schema({
    // orderCode: {
    //     type: String
    // },
    uerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    adress: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    note: {
        type: String
    },
    products:{
        type: [
            {

                    productsId: {
                        type: mongoose.Schema.Types.ObjectId,
                    },
                    variantId: {
                        type: mongoose.Schema.Types.ObjectId
                    },
                    name: {
                        type: String
                    },
                    price: {
                        type: Number
                    },
                    quantity: {
                        type: Number
                    }
                
            }
        ]
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    custommerInfor: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethods: {
        type: String,
        enum: ["COD", "PAYOS"],
    },
    status: {
        type: String,
        enum: ["pending","confirm", "shipping", "delivired", "done"]
    }
}, {
    timestamps: true,
    versionKey: false
})
const Order = mongoose.model('Order', ordersSchema);
export default Order;