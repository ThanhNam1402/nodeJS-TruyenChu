import express from "express";


import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import createrController from "../controllers/createrController";

let router = express.Router();

let initWebRouters = (app) => {
    // router.get('/', homeController.getHomePage);
    // router.get('/about', homeController.getAboutPage);
    // router.get('/add-user', homeController.creteCRUD);
    // router.post('/post-crud', homeController.postCRUD);
    // router.get('/all-user', homeController.getCRUD);
    // router.get('/edit-user', homeController.editCRUD);
    // router.post('/handel', homeController.handelCRUD);
    // router.post('/del-crud', homeController.delCRUD);

    // client 
    router.post('/api/login', userController.handelLogin);
    router.get('/api/getAllUser', userController.handelGetAllUser);
    router.post('/api/createUser', userController.handelCreateUser);
    router.delete('/api/delUser', userController.handelDelUser);
    router.put('/api/editUser', userController.handelEditUser);
    router.get('/api/getAllCode', userController.handelgetAllCode);

    // book
    router.post('/api/creater/addBook', createrController.createrAddBook);
    router.get('/api/creater/getCodeByType', createrController.createrGetCodeByType);
    router.get('/api/creater/getCateGoRy', createrController.handelGetCateGoRy);
    router.get('/api/creater/getBooks', createrController.createrGetBooks);
    router.get('/api/creater/getAllCode', createrController.handelGetAllCode);
    router.delete('/api/creater/delBook', createrController.createrDelBook);

    // chua xong 
    router.put('/api/creater/editBook', createrController.createrEditBook);

    // fix post - > put 
    router.post('/api/creater/createDraft', createrController.handelcreateDraft);
    router.post('/api/creater/editDraft', createrController.handelEditDraft);
    router.post('/api/creater/editDraftByID', createrController.handelEditDraftByID);
    router.get('/api/creater/getDrafts', createrController.handelGetDrafts);
    router.get('/api/creater/getDraftById', createrController.handelGetDraftByID);
    router.get('/api/creater/getBookById', createrController.handelGetBookByID);
    router.delete('/api/creater/delDraft', createrController.handelDelDraft);


    router.get('/api/creater/getChapterByBookID', createrController.createrGetChapterByBookID);

    router.put('/api/creater/editChapter', createrController.createrEditChapter);


    return app.use("/", router);
}


module.exports = initWebRouters;