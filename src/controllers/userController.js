

import serviceUser from '../services/serveiceUser';


let handelLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: 'Erorr Email or Password'
        })
    }
    let userData = await serviceUser.handelLogin(email, password)
    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.message,
        user: userData.user ?? {}
    });


}


let handelGetAllUser = async (req, res) => {
    let users = await serviceUser.getAllUSer();
    console.log(users)

    return res.status(200).json({
        errorCode: 0,
        mess: 'Oke',
        users: users
    })
}

 
let handelCreateUser = async (req, res) => {
    let data = req.body
    let message = await serviceUser.createUser(data)
    return res.status(200).json({
        data: message
    })

}

let handelDelUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: 'User already exists',
            errorCode: 1
        })
    }
    let message = await serviceUser.delUser(id)
    return res.status(200).json({
        data: message
    })
}


let handelEditUser = async (req, res) => {
    let data = req.body
    let message = await serviceUser.editUser(data)
    return res.status(200).json({
        data: message
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
    handelgetAllCode: handelgetAllCode
}