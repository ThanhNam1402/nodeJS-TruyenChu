import express from "express";

import userController from "../controllers/userController";
import topicController from "../controllers/topicController";
import createrController from "../controllers/createrController";

import { checkTokenJWT } from "../middelware/jwt";

let router = express.Router();
// topic 
router.get('/api/creater/topic/:slug', topicController.handelGetTopicBySlug);
router.get('/api/creater/getAllTopic', topicController.handelGetAllTopic);

// cate
router.get('/api/creater/getCateGoRy', createrController.handelGetCateGoRy);

// thể loại sub 
router.get('/api/creater/getAllCode', createrController.handelGetAllCode);

// book
router.get('/api/creater/getBooks', createrController.createrGetBooks);
router.post('/api/creater/addBook', createrController.createrAddBook);
router.get('/api/creater/getBookById', createrController.handelGetBookByID);
router.put('/api/creater/editBook', createrController.createrEditBook);
router.delete('/api/creater/delBook', createrController.createrDelBook);

// draft
router.get('/api/creater/getDrafts', createrController.handelGetDrafts);
router.post('/api/creater/createDraft', createrController.handelcreateDraft);
router.get('/api/creater/getDraftById', createrController.handelGetDraftByID);
router.put('/api/creater/editDraft', createrController.handelEditDraft);
router.delete('/api/creater/delDraft', createrController.handelDelDraft);

// publish draft => chapters
router.put('/api/creater/editDraftByID', createrController.handelEditDraftByID);

// chapters
router.get('/api/creater/getChapterByBookID', createrController.createrGetChapterByBookID);
router.put('/api/creater/editChapter', createrController.createrEditChapter);



export const routerCreater = router