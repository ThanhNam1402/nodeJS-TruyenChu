import express from "express";

import userController from "../controllers/userController";

import { checkTokenJWT } from "../middelware/jwt";

let router = express.Router();

// users 
router.post('/api/login', userController.handelLogin);
router.post('/api/logout', userController.handelLogout);
router.post('/api/refreshToken', userController.handelRefreshToken);
router.post('/api/account', userController.handelgetAccount);





export const routerClient = router