import mongoose from "mongoose";
import { DB_URI } from "./eviroments.js";
function connectDB() {
    mongoose.connect(DB_URI)
        .then(() => console.log('kết nối thành công tới mongodb'))
        .catch(err => console.error('kết nối thất bại:', err))
}

export default connectDB;