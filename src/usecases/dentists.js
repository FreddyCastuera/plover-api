const Dentists = require('../models/dentists')

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

// .: create new dentist
async function createDentist(newDentist){
    return Dentists.create(newDentist)
}

// .: Verifying existing dentist email for registration
async function verifyEmail(email){
    return Dentists.findOne(email)
}

// .: patch dentist
async function updateDentist(id, newDentistData){
    return Dentists.findByIdAndUpdate(id, newDentistData, {new: true})
}

// .: delete dentist
async function deleteDentist(id){
    return Dentists.findByIdAndDelete(id)
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