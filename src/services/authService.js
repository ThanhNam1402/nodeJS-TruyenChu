
import db from '../models/index';

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

import { createTokenJWT, verifyTokenJWT, createRefreshTokenJWT } from "../middelware/jwt";


let handleLogin = async (email, password) => {
    try {
        let userData = {};
        let isExist = await checkUserEmail(email);

        if (isExist) {
            let user = await db.Users.findOne({
                where: { email: email },
                attributes: ['password', 'id'],
                raw: true
            })

            if (user) {
                let check = bcrypt.compareSync(password, user.password);

                if (check) {
                    delete user.password;

                    userData.success = true;
                    userData.message = 'success'
                    userData.data = {
                        token: createTokenJWT(user),
                        refresh_token: createRefreshTokenJWT(user)
                    }

                } else {
                    userData.success = false;
                    userData.message = 'Nhập Sai Trường Password !'
                }
            }

        } else {
            userData.success = false;
            userData.message = 'Không tìm thấy Email Vui lòng thử lại !';
        }

        console.log(userData);
        return userData

    } catch (error) {
        console.log(error);
    }


}

let handelCheckRefreshToken = async (refreshToken) => {

    try {
        let userData = {};
        let res = verifyTokenJWT(refreshToken);

        console.log("res", res);

        if (res) {
            let user = await db.Users.findOne({
                where: { id: res.id },
                attributes: ['id', 'name'],
                raw: true
            })

            userData.success = true;
            userData.message = 'success'
            userData.data = {
                token: createTokenJWT(user),
                refresh_token: createRefreshTokenJWT(user)
            }
        } else {
            userData.success = false;
            userData.message = 'Token is expired'
        }

        console.log("userData", userData);
        return userData

    } catch (error) {
        console.log(error);
    }
}


const getAccount = async (token) => {
    try {
        let res = {}

        console.log("token", token);
        let verifyUser = verifyTokenJWT(token)

        let account = await db.Users.findOne({
            where: { id: verifyUser.id },
            attributes: {
                exclude: ['password']
            },
            raw: true
        })
        res.data = account;
        res.success = true;
        res.message = 'success';
        return res

    } catch (error) { throw error }
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





module.exports = {

    handelCheckRefreshToken: handelCheckRefreshToken,
    handleLogin: handleLogin,
    getAccount: getAccount
}