import PayOS from "@payos/node";
import handleAsync from "../../common/helpers/handleAsync.js";
import Order from "./order.model.js";

//cau hinh
import { PAYOS_API_KEY, PAYOS_CHECKSUM_KEY, PAYOS_CLIENT_ID } from "../../common/configs/eviroments.js";
import createResponse from "../../common/helpers/response.js";
import { Query } from "mongoose";
import createError from "../../common/helpers/error.js";

export const payOS = new PayOS(
    PAYOS_CLIENT_ID,
    PAYOS_API_KEY,
    PAYOS_CHECKSUM_KEY
);

const fakeData = {
    userId: "1",
    adress: "hanoi",
    phoneNumber: "084798558",
    note: "gi chu don hang 1",
    products: [
        {
            name: "giay 1",
            price: 20000,
            quantity: 1
        },
    ],
    totalPrice: 20000,
    isPaid: false,
    status: "pending"
};

export const createPayosPayment = handleAsync(async (req, res, next) => {
    // const newOrder = await Order.create({
    //     ...fakeData,
    //     paymentMethods: "ONLINE",
    // });
    const orderCode = Number(String(Date.now()).slice(-6))
    const bodyPayos = {
        orderCode: orderCode,
        amount: fakeData.totalPrice,
        description: "thanh toan don hang",
        items: fakeData.products,
        cancelUrl: "http://localhost:3000/cancel.html",
        returnUrl: "http://localhost:3000/success.html"
    };
    const createPaymentLink = await payOS.createPaymentLink(bodyPayos);
    return res.status(200).json(createResponse(
        true,
        200,
        "tao link thanh cong",
        createPaymentLink
    )
    );
});

export const returnConfirmPayment = handleAsync(async (req, res, next) => {
    const query = req.query;
    if (query.code === "00" && query.status === "PAID") {
        const foundOrder = await Order.findOne({
            orderCode: query.orderCode,
            isPaid: false,
        });
        if (!foundOrder) {
            return res.redirect(`http://localhost:3000/checkout/trangbaoloithanhtoanphiaclient`);
        }
        foundOrder.isPaid = true;
        await foundOrder.save();
        return res.redirect(`http://localhost:3000/checkout/success`);
    } else {
        return res.redirect(`http://localhost:3000/checkout/trangbaoloithanhtoanphiaclient`);
    }
});

export const handlePayOsWebhook = handleAsync(async (req, res) => {
    const orderCode = 123;
    const body = req.body;
    if (body?.data.orderCode === orderCode) {
        const webhookData = payOS.verifyPaymentWebhookData(body);
        console.log(webhookData);

        if (webhookData.code === "00" && webhookData.desc == "success") {
            const foundOrder = await Order.findOne({
                orderCode: webhookData.orderCode,
                isPaid: false,
            });
            if (!foundOrder) {
                throw createError(400, "Không tìm thấy đơn hàng");
            }
            foundOrder.isPaid = true;
            await foundOrder.save();
            return res.status(200).json(null);
        }
    }
return res.status(200).json(null);
})