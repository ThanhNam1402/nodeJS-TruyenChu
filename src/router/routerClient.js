import express from "express";

import authController from "../controllers/authController";

import { checkTokenJWT } from "../middelware/jwt";

let router = express.Router();

// users 
router.post('/login', authController.handleLogin);
router.post('/logout', authController.handleLogout);
router.post('/refresh', authController.handleRefreshToken);
router.post('/me', checkTokenJWT, authController.handleGetAccount);

export const routerClient = router