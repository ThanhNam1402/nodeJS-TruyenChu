


import express from "express";

import { bookRoutes } from "./bookRoutes";
import { draftRoutes } from "./draftRoutes";
import { topicRoutes } from "./topicRoutes";
import { cmTopic } from "./commentTopics";

let router = express.Router();

router.use('/creator', bookRoutes)
router.use('/creator', draftRoutes)
router.use('/creator', topicRoutes)
router.use('/creator', cmTopic)

export const routerCreator = router