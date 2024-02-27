



// import db from '../models/index'
// import CRUDService from '../services/serviceCRUD';



// let getHomePage = async (req, res) => {
//     try {
//         let data = await db.User.findAll();
//         console.log(data);
//         return res.render('homePage.ejs', {
//             data: JSON.stringify(data)
//         });
//     } catch (e) {
//         console.log(e);
//     }

// }
// let getAboutPage = (req, res) => {
//     return res.render('pages/aboutPage.ejs');
// }
// let creteCRUD = (req, res) => {
//     return res.render('crud.ejs');
// }
// let postCRUD = async (req, res) => {
//     let data = await CRUDService.createNewUser(req.body);
//     return res.render('getAlluser', {
//         dataTB : data
//     });
// }
// let getCRUD = async (req, res) => {
//     let data = await CRUDService.getAllUser();
//     return res.render('getAlluser', {
//         dataTB : data
//     });
// }
// let editCRUD = async (req, res) => {
//     let userId = req.query.id;
//     if(userId) {
//         let data = await CRUDService.editUser(userId);
//         return res.render('editUser', {
//             data : data
//         });
//     }else {
//         return res.send('user not found'); 
//     }
    
// }
// let handelCRUD = async (req, res) => {
//     let data = await CRUDService.handelCRUD(req.body);
//     console.log(req.body);
//     return res.render('getAlluser', {
//         dataTB : data
//     });
// }
// let delCRUD = async (req, res) => {
//     let data = await CRUDService.delCRUD(req.body);
//     console.log(data);
//     return res.render('getAlluser', {
//         dataTB : data
//     });
// }



// module.exports = {
//     getHomePage: getHomePage,
//     getAboutPage: getAboutPage,
//     creteCRUD: creteCRUD,
//     postCRUD: postCRUD,
//     getCRUD : getCRUD,
//     editCRUD : editCRUD,
//     handelCRUD : handelCRUD,
//     delCRUD : delCRUD,


// }