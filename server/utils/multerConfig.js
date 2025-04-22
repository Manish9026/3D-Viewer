// import cloudinary from '../config/cloudinary.js';
import multer from 'multer';
import path from 'path';
// import fs from 'fs';

// Store locally before uploading to Cloudinary
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const allowedExt = ['glb', 'gltf', 'obj', 'fbx', 'stl'];
    const ext = path.extname(file.originalname).toLowerCase().slice(1);
    if (allowedExt.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only 3D model files are allowed!'));
    }
  },
});

export {upload}