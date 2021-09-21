const Dentist = require('../models/dentist')

// .: search all the Dentist in the DB
async function getAllDentist(){
    return Dentist.find()
}

// .: search dentist by id
async function getDentistById(id){
    return Dentist.findById(id)
}

// .: search patiens of the Dentist
async function getDentistByPatient(id){
    return Dentist.findById(id)
}

// .: create new dentist
async function createDentist(newDentist){
    return Dentist.create(newDentist)
}

// .: Verifying existing dentist email for registration
async function verifyEmail(email){
    return Dentist.findOne(email)
}

// .: patch dentist
async function updateDentist(id, newDentistData){
    return Dentist.findByIdAndUpdate(id, newDentistData, {new: true})
}

// .: delete dentist
async function deleteDentist(id){
    return Dentist.findByIdAndDelete(id)
}

module.exports = {
    getAllDentist: getAllDentist,
    createDentist: createDentist,
    getDentistById: getDentistById,
    getDentistByPatient: getDentistByPatient,
    updateDentist: updateDentist,
    deleteDentist: deleteDentist,
    verifyEmail: verifyEmail,
}