const jwt = require('../lib/jwt')

function auth(request, response, next){
    try{
        const {authorization: token} = request.headers
        const tokenDecoded = jwt.verify(token)
        if(!tokenDecoded) throw new Error('Not Authorized')
        next()
    } catch(error){
        response.status(401)
       response.json({
           success:false,
           message: "Not Authorized",
           error: error.message
       })
    }
}

module.exports = auth