const Dentists = require('../models/dentists')
const Appointments = require('../models/appointments')
const Payments = require('../models/payments')
const Bcrypt = require('../lib/bcrypt')

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
    const appointmentsDentist = await Appointments.find({idDentist:id});
    return appointmentsDentist;
}

async function getPaymentsByDentistsId(id){
    const paymentsPatient = await Payments.find({idDentist:id});
    return paymentsPatient;
}

// .: create new dentist
async function createDentist(newDentist){
    try{
        const {email, password} = newDentist
        let emailExist = await Dentists.findOne({email: email})
        if(emailExist) throw new Error('email already in use, recover password or use ana nother email');
        
        let encryptedPassword= await Bcrypt.hash(password);
        return Dentists.create({...newDentist, password: encryptedPassword});
    } catch(error){console.log(error.message)}
}

// .: Verifying existing dentist email for registration
/*async function verifyEmail(email){
    return Dentists.findOne(email)
}*/

// .: patch dentist
async function updateDentist(id, newDentistData){
    try{
        let idExist = Dentists.findById(id)
        if(!idExist) throw new Error("Dentist doesn't exist");
        return Dentists.findByIdAndUpdate(id, newDentistData, {new: true})
    }
    catch(error){console.log(error.message)}
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
    getAppointmentByDentistId,
    getPaymentsByDentistsId,
    getDentistByEmail
}