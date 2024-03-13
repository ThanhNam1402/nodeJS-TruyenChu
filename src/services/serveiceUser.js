
import db from '../models/index';
// $2a$10$SAgLhuAvrRl68uGsnBgQROh7KRICSBd2DW7G606RFRzvW.GFb429O
// eve.holt@reqres.in



import { createTokenJWT } from "../middelware/jwt";

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


let hashPass = (pass) => {
    return new Promise(async (resolve, reject) => {

        try {
            let hash = await bcrypt.hashSync(pass, salt);
            resolve(hash);
        } catch (error) {
            reject(error);

        }
    })
}

let handelLogin = async (email, password) => {

    try {
        let userData = {};

        // check mail not null 
        let isExist = await checkUserEmail(email);

        if (isExist) {
            let user = await db.Users.findOne({
                where: { email: email },
                attributes: ['email', 'name', 'password', 'roleId'],
                raw: true
            })

            if (user) {
                let check = bcrypt.compareSync(password, user.password);

                if (check) {

                    userData.EC = 0;
                    userData.EM = 'success'
                    delete user.password;
                    userData.token = createTokenJWT(user)

                } else {
                    userData.EC = 1;
                    userData.EM = 'error password'
                }
            }

        } else {
            userData.EC = 2;
            userData.EM = 'Không tìm thấy Email !! Vui lòng thử lại !';
        }


        console.log(userData);
        return userData


    } catch (error) {
        console.log(error);
    }


}


let checkUserEmail = (UserEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: UserEmail }
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error);
        }

    });
}


let getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {}

            if (!type) {
                res.errorCode = 1;
                res.message = 'not found parameter';
            } else {
                let Allcode = await db.Allcode.findAll({
                    where: { type: type },
                    raw: true
                });
                res.data = Allcode;
                res.errorCode = 0;
                res.message = 'success';
            }

            resolve(res);

        } catch (error) {

            reject(error);
        }
    })
}


let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errorCode: 1,
                    message: 'Email already exists'
                });
            }
            else {
                let hashPassword = await hashPass(data.password);
                await db.Users.create({
                    email: data.email,
                    password: hashPassword,
                    name: data.name,
                    adress: data.adress,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === "1" ? true : false,
                    roleId: data.roleId,
                })
                resolve({
                    errorCode: 0,
                    message: 'create user success'
                });
            }

        } catch (error) {
            reject(error);
        }

    })

}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findAll({
                attributes: {
                    exclude: ['password']
                },
            })

            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}


let delUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: id },
                raw: false

            })

            if (!user) {
                resolve({
                    errorCode: 1,
                    message: "User not found"
                })
            } else {
                await user.destroy();
                resolve({
                    errorCode: 0,
                    message: "User deleted success"
                })
            }
        } catch (error) {
            reject(error);
        }


    })

}

let editUser = (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errorCode: 1,
                    message: "user qrequired"
                })
            }
            let user = await db.Users.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.adress = data.adress;
                await user.save();
                resolve({
                    errorCode: 0,
                    message: "user update success"
                });

            } else {
                resolve({
                    errorCode: 3,
                    message: "error orther"
                });
            }


        } catch (error) {
            reject(error);
        }

    })
}


module.exports = {
    handelLogin: handelLogin,
    getAllUser: getAllUser,
    createUser: createUser,
    delUser: delUser,
    editUser: editUser,
    getAllCode: getAllCode,

}