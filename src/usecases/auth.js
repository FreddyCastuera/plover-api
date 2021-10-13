const Patients = require('../models/patients');
const Dentists = require('../models/dentists');
const bcrypt = require('../lib/bcrypt');
const jwt = require('../lib/jwt');
//ahora el jwt regresa mas informacion
async function login(email, password){
    var rol='paciente'
    try{
        let emailFound = await Patients.findOne({email})
        console.log(!emailFound)
        if(!emailFound){
            rol='dentista'
            emailFound = await Dentists.findOne({email})
        }
        else if(!emailFound) throw new Error('Invalid Credentials')
        
        const correctPassword = await bcrypt.compare(password, emailFound.password)
        if(!correctPassword) throw new Error('Invalid Credentials');
        return jwt.sign({id: emailFound._id,username:emailFound.username,email:emailFound.email,rol:rol})
    } catch(error){
        response.json({
            succes: false,
            message: 'Invalid data',
            error: error.message
        })
    }
}

module.exports = {
    login
}