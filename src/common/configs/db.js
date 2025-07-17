import mongoose from "mongoose";
import { DB_URI, NGROCK_AUTH_TOKEN, PORT } from "./eviroments.js";
import { confirmWebhook } from "../helpers/confirmWebhook.js";
function connectDB() {
    mongoose.connect(DB_URI)
        .then(() => console.log('kết nối thành công tới mongodb'))
        .then(async () => {
            const ngrock = await import("@ngrok/ngrok");
            const listener = await ngrock.forward({
                addr: PORT,
                // authToken_from_env : true, // co the bo di neu da co auth token
                authtoken: NGROCK_AUTH_TOKEN,
            });
            const urlNgrockWebhook = `${listener.url()}/webhook`;
            confirmWebhook(urlNgrockWebhook);
        })
        .catch(err => console.error('kết nối thất bại:', err))
console.log(DB_URI);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "OK" : "Missing");

}

export default connectDB;