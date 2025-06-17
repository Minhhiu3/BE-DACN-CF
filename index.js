import express, { Router } from 'express';
import cors from 'cors';
import connectDB from './src/common/configs/db.js';
import router from './src/routes/index.js';
import errorHandler from './src/common/middlewares/errorHandle.js';
import { HOST, PORT } from './src/common/configs/eviroments.js';
import setupSwagger from './src/common/configs/swagger-config.js';
import upload from './src/common/middlewares/upload.js';

connectDB();

const app = express();

app.use(cors({
    origin: '*', // Cho phép tất cả các nguồn gốc
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Các phương thức HTTP được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
    credentials: true // Cho phép cookie và thông tin xác thực
}));

app.use(express.json());

app.use("/api", router);

//test
// app.get("/health", (req, res) => {
//     res.send("API is running...");
// });

router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Không có file nào được upload' });
    }

    // file đã được upload lên Cloudinary, đường dẫn nằm trong req.file.path
    res.json({
        message: 'Upload thành công!',
        url: req.file.path,
    });
});
app.use(errorHandler)
setupSwagger(app);
//run swag

// console.log(HOST);

app.listen(PORT, () => {
    const server = app.listen(PORT, () => {
        console.log(`Server đang chạy ở: http://${HOST}:${PORT}/api`);
        console.log(`Swagger Docs sẵn sàng tại: ${HOST}:${PORT}/api-docs`);
    });
});
