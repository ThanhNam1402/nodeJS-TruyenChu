

import serviceUser from '../services/serveiceUser';


let handelLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(200).json({
            EC: 1,
            EM: 'Erorr Email or Password'
        })
    }

    let userData = await serviceUser.handelLogin(email, password)

    // set cookie token 
    res.cookie('accessToken', userData.token, { httpOnly: true })

    console.log('userData:', userData);
    return res.status(200).json({
        EC: userData.EC,
        EM: userData.EM,
        data: userData.token ?? {}
    });

}

let handelGetAllUser = async (req, res) => {

    let users = await serviceUser.getAllUser();
    console.log(users)

    return res.status(200).json({
        EC: 0,
        EM: 'Oke',
        data: users
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
        EC : message.EC,
        EM : message.EM,
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
    handelLogin: handelLogin,
    handelGetAllUser: handelGetAllUser,
    handelCreateUser: handelCreateUser,
    handelDelUser: handelDelUser,
    handelEditUser: handelEditUser,
    handelgetAllCode: handelgetAllCode,
    handelGetUserByID: handelGetUserByID
}