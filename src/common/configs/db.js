import mongoose from "mongoose";
import { DB_URI } from "./eviroments.js";
function connectDB() {
    mongoose.connect(DB_URI)
        .then(() => console.log('kết nối thành công tới mongodb'))
        .catch(err => console.error('kết nối thất bại:', err))
console.log(DB_URI);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD ? "OK" : "Missing");

}

export default connectDB;