import express from 'express';
import { verifyUser } from '../middlewares/verifyUser.js';
import { Auth } from '../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/login',Auth.loginUser);
authRouter.post('/register',Auth.registerUser);
authRouter.get('/refresh-token',Auth.refreshToken)
authRouter.get('/verify',verifyUser,Auth.verifyUser)
authRouter.post('/logout',Auth.logoutUser)

export {authRouter};
