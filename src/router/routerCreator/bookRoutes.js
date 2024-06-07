


import express from "express";

import booksController from "../../controllers/creatorController/bookController";

import { checkTokenJWT } from "../../middelware/jwt";


let router = express.Router();


router.get('/books', checkTokenJWT, booksController.getAllBooks);
router.get('/book/:id', booksController.getOneBook);
router.post('/addBook', booksController.addBook);
router.put('/book/:id', booksController.updateBook);
router.delete('/book/:id', booksController.delBook);


// Cate
router.get('/getCateGoRy', booksController.getCateGoRy);
router.get('/getTagType', booksController.getTagType);


export const bookRoutes = router