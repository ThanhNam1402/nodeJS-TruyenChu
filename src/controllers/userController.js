

import serviceUser from '../services/serveiceUser';

// login 
let handelLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        // ko nhập email or password
        if (!email || !password) {
            return res.status(401).json({
                EC: 1,
                EM: 'Erorr Email or Password'
            })
        }

        let userData = await serviceUser.handelLogin(email, password)

        // set cookie token 
        if (userData && userData.EC === 0) {
            res.cookie('accessToken', userData.token, { httpOnly: true })
        }
        return res.status(200).json({
            EC: userData.EC,
            EM: userData.EM,
            data: {
                token: userData.token ?? null,
                refresh_token: userData.refresh_token ?? null
            }
        });
    } catch (error) {
        return res.status(401).json({
            EM: error.message,
            EC: 1
        })

    }
}
// logout
let handelLogout = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        return res.status(200).json({
            EC: 0,
            EM: null
        });
    } catch (error) {
        return res.status(401).json({
            EM: error.message,
            EC: 1
        })

    }
}
// refresh token 
const handelRefreshToken = async (req, res) => {
    console.log("req.query", req.query);

    let rfToken = req.query.token

    console.log(rfToken);

    let data = await serviceUser.handelCheckRefreshToken(rfToken)

    console.log('data', data);

    if (data && data.EC === 0) {
        // set cookie token 
        res.cookie('accessToken', data.token)

        console.log(data.token);
        // { httpOnly: true }
    }

    return res.status(200).json({
        EC: data.EC,
        EM: data.EM,
        data: {
            token: data.token ?? null,
            refresh_token: data.refresh_token
        }
    })
}

// get account user 
let handelgetAccount = async (req, res) => {
    try {
        console.log("req.body", req.body);

        let data = await serviceUser.getAccount(req.body.token);
        console.log(data)

        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            data: data.data
        })

    } catch (error) {
        return res.status(401).json({
            EM: 'Phiên Đăng Nhập Không Hợp Lệ, Vui Lòng Nhập Lại',
            EC: 1
        })

    }
}


let handelGetAllUser = async (req, res) => {

    console.log(req.query);
    let users = await serviceUser.getAllUser(req.query);

    console.log(users)

    return res.status(200).json({
        data: users.data,
        _pagination: users.pagination,
        EC: users.EC,
        EM: users.EM
    })
}


let handelCreateUser = async (req, res) => {
    let data = req.body
    let message = await serviceUser.createUser(data)
    return res.status(200).json({
        EC: message.EC,
        EM: message.EM
    })

}

let handelGetUserByID = async (req, res) => {
    try {

        let data = await serviceUser.getUserByID(req.params.id);
        return res.status(200).json({
            user: data.data,
            EC: data.EC,
            EM: data.EM
        })

    } catch (error) {
        console.log(error)

    }
}

let handelDelUser = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            EM: 'User already exists',
            EC: 1
        })
    }
    let message = await serviceUser.delUser(id)
    return res.status(200).json({
        EC: message.EC,
        EM: message.EM
    })
}

let handelEditUser = async (req, res) => {
    let data = req.body
    let message = await serviceUser.editUser(data)
    return res.status(200).json({
        EC: message.EC,
        EM: message.EM,
    })

}

let handelgetAllCode = async (req, res) => {
    try {
        let type = req.query.type
        console.log(type)
        let data = await serviceUser.getAllCode(type)
        console.log('data', data)

        return res.status(200).json({ data })


    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: 'Error Server'
        })
    }
}


module.exports = {
    handelGetAllUser: handelGetAllUser,
    handelCreateUser: handelCreateUser,
    handelDelUser: handelDelUser,
    handelEditUser: handelEditUser,
    handelgetAllCode: handelgetAllCode,
    handelGetUserByID: handelGetUserByID,
    handelgetAccount: handelgetAccount,
    handelRefreshToken: handelRefreshToken,
    handelLogin: handelLogin,
    handelLogout: handelLogout

}