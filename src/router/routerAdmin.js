import express from "express";

import userController from "../controllers/userController";

import topicController from "../controllers/topicController";

import approveController from "../controllers/approveController"

import { checkTokenJWT } from "../middelware/jwt";

let router = express.Router();

// users 
router.get('/api/users', checkTokenJWT, userController.handelGetAllUser);
router.post('/api/createUser', userController.handelCreateUser);
router.delete('/api/delUser', userController.handelDelUser);
router.put('/api/editUser', userController.handelEditUser);
router.get('/api/user/:id', userController.handelGetUserByID);

// topic 
router.get('/api/topics', topicController.handelGetAllTopic);
router.post('/api/createTopic', topicController.handelCreateTopic);
router.get('/api/topic/:id', topicController.handelGetTopicByID);
router.put('/api/editTopic', topicController.handelEditTopic);
router.delete('/api/delTopic', topicController.handelDelTopic);


router.get('/api/approve', approveController.handelGetBookNotApproved);
router.get('/api/approve/book/:id', approveController.handelGetBookNotApprovedByID);
router.post('/api/approve/published', approveController.handelPublishBook);



export const routerAdmin = router