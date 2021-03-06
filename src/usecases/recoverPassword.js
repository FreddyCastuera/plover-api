const Dentists = require('../models/dentists');
const Patients = require('../models/patients');
const Bcrypt = require('../lib/bcrypt');
const Sendgrid = require('./sendgrid');
const jwt = require ('../lib/jwt');

// .: send email for reset password
async function recoverPassword(recoveryData) {
    try{
        const {email} = recoveryData
        console.log('w',email)
        const findUser = await Dentists.findOne({email:email})
        if(!findUser) throw new Error('El correo no existe')
        const {name, id} = findUser
        console.log(name, id)
        resetPass = await Sendgrid.ChangePasswordEmail(email,id, name)
        return true
    }
    catch(error){console.log(error.message)}
}

// .: reset password dentist/patient
async function resetPassword(newPassword, id) {
    try {
        const encryptedNewData = await Bcrypt.hash(newPassword)
        console.log(encryptedNewData)
        
        const findDentist = Dentists.findById(id)
        const findPatient = Patients.findById(id)

        if(findDentist) {
            return findDentist.findOneAndUpdate(id, {password: encryptedNewData}, {new: true})
        } else{
            const findPatient = Patients.findById(id);
            console.log('asd',findPatient)
            return findPatient.findOneAndUpdate(id, {password: encryptedNewData}, {new: true});
        }

    }
    catch(error){console.log(error.message)}
}
// ! BORRAR CONSOLE LOGS
module.exports = {
    recoverPassword: recoverPassword,
    resetPassword: resetPassword,
}