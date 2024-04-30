


import express from "express";

import booksController from "../controllers/bookController";
import chapterController from "../controllers/chapterController";
import topicController from "../controllers/topicController";

let router = express.Router();

router.get('/api/creator/topics', topicController.getAllTopics);
router.get('/api/creator/topic/:slug', topicController.getTopicBySlug);


// book
router.get('/api/creator/books', booksController.getAllBooks);
router.get('/api/creator/book/:id', booksController.getOneBook);
router.post('/api/creator/addBook', booksController.addBook);
router.put('/api/creator/book/:id', booksController.updateBook);
router.delete('/api/creator/book/:id', booksController.delBook);

// Cate
router.get('/api/creator/getCateGoRy', booksController.getCateGoRy);
router.get('/api/creator/getTagType', booksController.getTagType);

// public draft => chapters
router.put('/api/creator/draft/public', chapterController.publicDraft);

// // draft
router.get('/api/creator/drafts', chapterController.getAllDrafts);
router.get('/api/creator/draft/:id', chapterController.getOneDraft);
router.post('/api/creator/addDraft', chapterController.addDraft);
router.put('/api/creator/draft/:id', chapterController.updateDraft);
router.delete('/api/creator/draft/:id', chapterController.delDraft);

// // chapters
router.get('/api/creator/chapters', chapterController.getAllChapters);
router.put('/api/creator/chapter/:id', chapterController.updateChapter);



export const routerCreator = router