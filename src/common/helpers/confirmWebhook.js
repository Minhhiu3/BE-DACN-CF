// import PayOS from "@payos/node"
import {payOS} from "../../modules/order/order.controller.js"
export const confirmWebhook = async (url) => {
    try {
        await payOS.confirmWebhook(url)
    } catch (error) {
        console.log(error)
    }
}