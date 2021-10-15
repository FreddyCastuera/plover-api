const Dentists = require('../models/dentists')
const Appointments = require('../models/appointments')
const Payments = require('../models/payments')
const Patients = require('../models/patients')
const Bcrypt = require('../lib/bcrypt')
const Sendgrid = require('./sendgrid')
const Scrapper = require('../lib/scrapper')

// .: search all the Dentist in the DB
async function getAllDentist(){
    return Dentists.find()
}

// .: search dentist by id
async function getDentistById(id){
    return Dentists.findById(id)
}

// .: search patiens of the Dentist
async function getDentistByPatient(id){
    return Dentists.findById(id)
}

async function getDentistByEmail(email){
    const dentist = await Dentists.find({email:email});
    return dentist;
}

async function getAppointmentByDentistId(id){
    const appointmentsDentist = await Appointments.find({idDentist:id}).populate({path:'idPatient',select:'name lastName'})
    return appointmentsDentist;
}

async function getPaymentsByDentistsId(id){
    const paymentsDentist = await Payments.find({idDentist:id});
    return paymentsDentist;
}

async function getPatientsByDentistsId(id){
    const patientDentist = await Patients.find({idDentist:id});
    return patientDentist;
}

// .: create new dentist
async function createDentist(newDentist){
    try{
        const {email, password, name, lastName, profesionalLicense} = newDentist
        let emailExist = await Dentists.findOne({email: email})
        let licenseExist = await Dentists.findOne({profesionalLicense: profesionalLicense})
        if(emailExist) throw new Error('email already in use, recover password or use another email');
        if(licenseExist) throw new Error('Someone is already using this professional licese, contact plover for more information');
        console.log(password)
        let encryptedPassword= await Bcrypt.hash(password);
        let encryptedEmail = await Bcrypt.hash(email);

        console.log(encryptedEmail)
        
        const proExist = await Scrapper.searchProLicense(name, lastName, profesionalLicense)
        
        if(proExist){
        const dentistCreated = await Dentists.create({...newDentist, password: encryptedPassword, emailToken: encryptedEmail});
        const { _id, emailToken } = dentistCreated
        
        console.log(dentistCreated)

        await Sendgrid.SendEmail(email, name, emailToken, _id);
        return dentistCreated
        } else {
            await Sengrid.FailureSendEMail(email, name)
            return true
        }
        
    } catch(error){console.log(error.message)}
}

// .: change verify dentist
async function verifyToken(id){
    try{
        let idExist = await Dentists.findById(id)
        console.log(id)
        let { email} = idExist
        console.log(email)
        const equalToken = await Bcrypt.compare(email, idExist.emailToken)
        console.log('bcrypt:',equalToken)
        if(!equalToken) throw new Error('Invalid link')        
        return await Dentists.updateOne({ _id: idExist._id}, {verified: true })
    }
    catch(error){console.log(error.message)}
}

// .: patch dentist
async function updateDentist(id, newDentistData){
    try{
        let idExist = Dentists.findById(id)
        if(!idExist) throw new Error("Dentist doesn't exist");
        return Dentists.findByIdAndUpdate(id, newDentistData, {new: true})
    }
    catch(error){console.log(error.message)}
}
async function changePassword(id, comparePassword, newPassword){
    try{
        console.log(comparePassword)
        let idExist = await Dentists.findOne({_id:id})
        const {password} = idExist
        if(!idExist) throw new Error("Dentist doesn't exist")
        const comparedPassword = await Bcrypt.compare(comparePassword, password)
        if(!comparedPassword) throw new Error("Password doesn't match")
        const newPasswordEncrypted = await Bcrypt.hash(newPassword)
        return await Dentists.findByIdAndUpdate(id, {password: newPasswordEncrypted}, {new: true})
    }
    catch(error){
        console.log(error.message)
    }
}
// .: delete dentist
async function deleteDentist(id) {
    try {
        let idExist = Dentists.findById(id)
        if(!idExist) throw new Error("Dentist doesn't exist");
        return Dentists.findByIdAndDelete(id)
    }
    catch(error){console.log(error.message)}
}

module.exports = {
    getAllDentist: getAllDentist,
    createDentist: createDentist,
    getDentistById: getDentistById,
    getDentistByPatient: getDentistByPatient,
    updateDentist: updateDentist,
    deleteDentist: deleteDentist,
    verifyToken: verifyToken,
    getDentistByEmail: getDentistByEmail,
    getAppointmentByDentistId:getAppointmentByDentistId,
    getPaymentsByDentistsId:getPaymentsByDentistsId,
    getPatientsByDentistsId:getPatientsByDentistsId,
    changePassword: changePassword,
}