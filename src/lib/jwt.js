const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const { CODENAME } = process.env

// .: Function that sign with a payload into a JWT
function sign(payload){
    return jwt.sign(payload, CODENAME)
}

// .: function tha verify the token
function verify(token){
    return jwt.verify(token, CODENAME)
}
module.exports= {
    ...jwt,
    sign,
    verify
}