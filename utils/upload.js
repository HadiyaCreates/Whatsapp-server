// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import dotenv from 'dotenv';

// dotenv.config();

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

// const storage = new GridFsStorage({
//   url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.lvw8k2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
//   options: { useUnifiedTopology: true, useNewUrlParser: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpg", "image/jpeg"];
//     if (!match.includes(file.mimetype)) {
//       // Reject file by returning null (do NOT throw or reject)
//       return null;
//     }
//     return {
//       bucketName: 'photos',
//       filename: `${Date.now()}-file-${file.originalname}`
//     };
//   }
// });

// const upload = multer({ storage });

// export default upload;
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
  url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.lvw8k2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    // const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return null; // Reject files other than allowed image types
    }
    return {
      bucketName: 'photos', // Must match with bucketName in image.controller.js
      filename: `${Date.now()}-file-${file.originalname}`
    };
  }
});

const upload = multer({ storage });

export default upload;
