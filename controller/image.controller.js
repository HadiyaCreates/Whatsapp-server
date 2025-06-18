
import grid from 'gridfs-stream';
import mongoose from 'mongoose';

// const url = 'http://localhost:8000';  // your base URL
const url = 'https://whatsapp-server-p38k.onrender.com';  // your base URL

let gfs, gridFsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'photos'   // MUST match your multer storage bucketName
  });

  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('photos');
});

export const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(404).json('File not found');
  }
  const fileUrl = `${url}/file/${req.file.filename}`;
  return res.status(200).json({ fileUrl });
};


export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Allowed content types: images + pdf
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

    if (allowedTypes.includes(file.contentType)) {
      res.set('Content-Type', file.contentType);
      const readStream = gridFsBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } else {
      return res.status(400).json({ message: 'File type not supported for display' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
