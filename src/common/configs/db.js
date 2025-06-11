import mongoose from "mongoose";
const MONGO_URI = 'mongodb://localhost:27017/duancanhanCF';

function connectDB() {
    mongoose.connect(MONGO_URI)
        .then(() => console.log('kết nối thành công tới mongodb'))
        .catch(err => console.error('kết nối thất bại:', err))
}

export default connectDB;