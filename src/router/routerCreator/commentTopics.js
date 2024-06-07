


import express from "express";

import cmTopicController from "../../controllers/creatorController/cmTopicController"


let router = express.Router();

router.get('/comments/topic', cmTopicController.getAllCommentTopics);
router.post('/comments/add', cmTopicController.addCommentTopic);
router.delete('/comments/delete/:id', cmTopicController.delCommentTopic);


export const cmTopic = router