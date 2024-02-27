

import jwt from "jsonwebtoken";

const createTokenJWT = () => {

    let payload = { name: 'namcute', email: 'namcute12@gmail.com' }
    let key = process.env.JWT_SECRET

    const jwtToken = jwt.sign(payload, key);

    console.log(jwtToken)

    return jwtToken
}


const verify = (token) => {
    let key = process.env.JWT_SECRET

    let data = null

    try {
        let decoded = jwt.verify(token, key);
        data = decoded

    } catch (err) {
        console.log(err)

    }

    return data






}


// var privateKey = fs.readFileSync('private.key');
// var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });


module.exports = {
    createTokenJWT: createTokenJWT,
    verify: verify
}