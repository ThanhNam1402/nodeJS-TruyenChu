


import express from "express";

import chapterController from "../../controllers/creatorController/chapterController";

let router = express.Router();


// public draft => chapters
router.put('/draft/public', chapterController.publicDraft);

// // draft
router.get('/drafts', chapterController.getAllDrafts);
router.get('/draft/:id', chapterController.getOneDraft);
router.post('/addDraft', chapterController.addDraft);
router.put('/draft/:id', chapterController.updateDraft);
router.delete('/draft/:id', chapterController.delDraft);

// // chapters
router.get('/chapters', chapterController.getAllChapters);
router.put('/chapter/:id', chapterController.updateChapter);



export const draftRoutes = router