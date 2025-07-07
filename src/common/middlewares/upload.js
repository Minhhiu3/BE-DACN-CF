import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from '../configs/cloudinary.js';


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'my_app_uploads', // 📁 Tên thư mục trên Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
});

const upload = multer({ storage });

export default upload;
