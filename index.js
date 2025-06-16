import express, { Router } from 'express';
import cors from 'cors';
import connectDB from './src/common/configs/db.js';
import router from './src/routes/index.js';
import errorHandler from './src/common/middlewares/errorHandle.js';
import { HOST, PORT } from './src/common/configs/eviroments.js';
import setupSwagger from './src/common/configs/swagger-config.js';

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


app.use(errorHandler)
setupSwagger(app);
//run swag


app.listen(PORT, HOST, () => {
    const server = app.listen(PORT, () => {
        console.log(`Server đang chạy ở: http://${HOST}:${PORT}/api`);
        console.log(`Swagger Docs sẵn sàng tại: ${HOST}:${PORT}/api-docs`);
    });
});
