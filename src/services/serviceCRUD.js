

// import db from '../models/index';
// const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);

// let createNewUser = async (data) => {
//     return new Promise(async (resolve, reject) => {

//         try {
//             let hashpassword = await hashPass(data.password);
//             await db.User.create({
//                 email: data.email,
//                 password: hashpassword,
//                 firstName: data.fristName,
//                 lastName: data.lastName,
//                 adress: data.adress,
//                 gender: data.gender === 1 ? true : false,
//                 roleId: data.rodeId,
//                 phoneNumber: data.phonenumber
//             })
//             let allUser = await db.User.findAll();
//             resolve(allUser);

//         } catch (error) {
//             reject(error);

//         }
//     })
// }


// let hashPass = (pass) => {
//     return new Promise(async (resolve, reject) => {

//         try {
//             let hash = await bcrypt.hashSync(pass, salt);
//             resolve(hash);
//         } catch (error) {
//             reject(error);

//         }
//     })
// }


// let getAllUser = async () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let data = await db.User.findAll({
//                 order: [
//                     ['id', 'DESC'],
//                 ],
//             });
//             resolve(data);

//         } catch (error) {
//             reject(error);
//         }

//     })
// }



// let editUser = async (userId) => {
  
//     return new Promise(async (resolve, reject) => { 
//         try {
//             let data = await db.User.findOne({
//                 where : { id : userId }
//             })

//             if(data) {
//                 resolve(data);
//             }else {
//                 resolve({});
//             }

            
//         } catch (error) {
//             reject(error);
//         }

//     })
   
// }
// let handelCRUD = async (data) => {
  
//     return new Promise(async (resolve, reject) => { 
//         try {
//             let user = await db.User.findOne({
//                 where : { id : data.id },
//                 raw : false
//             })
//             if(data) {
//                 user.firstName = data.fristName,
//                 user.lastName = data.lastName,
//                 user.adress = data.adress
//                 await user.save();
//                 let allUser = await db.User.findAll();
//                 resolve(allUser);

//             }else {
//                 resolve({});
//             }

            
//         } catch (error) {
//             reject(error);
//         }

//     })
   
// }
// let delCRUD = async (data) => {
//     return new Promise(async (resolve, reject) => { 
//         try {
//             let user = await db.User.findOne({
//                 where : { id : data.id },
//                 raw : false
//             })
//             if(data) {
//                 await user.destroy({});
//                 let allUser = await db.User.findAll({
                   
//                 });
//                 resolve(allUser);
//             }else {
//                 resolve({});
//             }

            
//         } catch (error) {
//             reject(error);
//         }

//     })
   
// }

// module.exports = {
//     createNewUser: createNewUser,
//     getAllUser: getAllUser,
//     editUser : editUser,
//     handelCRUD : handelCRUD ,
//     delCRUD : delCRUD,
// }