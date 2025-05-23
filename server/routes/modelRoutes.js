
import express from 'express';
import { verifyUser } from '../middlewares/verifyUser.js';
const router = express.Router();

import { Camera,Model } from '../controllers/ModelController.js';


import multer from 'multer'
import { upload } from '../utils/multerConfig.js';
// import { upload } from '../utils/cloudinary.js';
// export const upload = multer({ dest: "uploads/" });

// 3D Model routes
router.post('/upload',verifyUser,upload.single("file"),Model.uploadModel);
router.get('/',verifyUser,Model.getModel);
router.delete('/deleteModel',verifyUser,Model.deleteModel);

// camera position routes
router.post('/camera',Camera.addPosition);
router.get('/camera',Camera.getPosition);

export default router