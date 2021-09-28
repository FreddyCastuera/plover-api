const Dentists = require('../models/dentists');
const Patients = require('../models/patients');
const Bcrypt = require('../lib/bcrypt');
const Sendgrid = require('./sendgrid');
const jwt = require ('../lib/jwt');

// .: send email for reset password
async function recoverPassword(recoveryData) {
    try{
        const {email} = recoveryData
        console.log(email)
        const findUser = await Dentists.find({email:email})
        if(!findUser) throw new Error('El correo no existe')
        const {name, id} = findUser
        return resetPass = Sendgrid.ChangePasswordEmail(email,id, name)
    }
    catch(error){console.log(error.message)}
}

// .: reset password dentist/patient
async function resetPassword(newPassword, id) {
    try {
        const encryptedNewData = await Bcrypt.hash(newPassword)
        console.log(encryptedNewData)
        
        const findDentist = Dentists.findById(id)

        if(findDentist) {
            return findDentist.findOneAndUpdate(id, {password: encryptedNewData}, {new: true})
        } else {
            findPatient = Patients.findById(id);
            return await Patients.findOneAndUpdare(id, {password: encryptedNewData}, {new: true});
        }

    }
    catch(error){console.log(error.message)}
}


module.exports = {
    recoverPassword: recoverPassword,
    resetPassword: resetPassword,
}