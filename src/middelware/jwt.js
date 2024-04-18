

import jwt from "jsonwebtoken";

const createTokenJWT = (payload) => {

    let key = process.env.JWT_TOKEN_SECRET

    const jwtToken = jwt.sign(payload, key, { expiresIn: '1h' });

    console.log("jwtToken : ", jwtToken)

    return jwtToken
}
const createRefreshTokenJWT = (payload) => {

    let key = process.env.JWT_TOKEN_SECRET

    const jwtToken = jwt.sign(payload, key, { expiresIn: '365d' });

    console.log("jwtToken refresh: ", jwtToken)

    return jwtToken
}

const verifyTokenJWT = (token) => {
    console.log("verify token");
    let key = process.env.JWT_TOKEN_SECRET
    let data = null
    try {
        let decoded = jwt.verify(token, key);
        data = decoded
        console.log(data);

    } catch (err) {
        console.log(err);
    }

    return data
}

const checkTokenJWT = (req, res, next) => {

    let userCookie = req.cookies

    if (userCookie && userCookie.accessToken) {
        let token = userCookie.accessToken

        let decoded = verifyTokenJWT(token)

        if (!decoded) {
            return res.status(401).json({
                EC: 1,
                EM: 'invalid token'
            })
        }
        next()
    } else {
        return res.status(401).json({
            EC: 1,
            EM: 'new Bạn Cần Đăng Nhập Để Thực Hiện Yêu Cầu Này !!'
        })
    }
}


module.exports = {
    createTokenJWT: createTokenJWT,
    verifyTokenJWT: verifyTokenJWT,
    checkTokenJWT: checkTokenJWT,
    createRefreshTokenJWT: createRefreshTokenJWT,
}