


import express from "express";

import topicController from "../../controllers/creatorController/topicController";

let router = express.Router();

router.get('/topics', topicController.getAllTopics);
router.get('/topic/:slug', topicController.getTopicBySlug);


export const topicRoutes = router