const Dentist = require('./models/dentist')

// .: search all the Dentist in the DB
async function getAllDentist(){
    return Dentist.find()
}

// .: search dentist by id
async function getPaymentById(id){
    return Dentist.findById(id)
}

// .: search patiens of the Dentist
async function getDentistByPatient(id){
    return Dentist.findById(id)
}

// .: create dentist
async function createPayment(payment){
    return Dentist.create({...payment})
}

// .: patch dentist
async function updateDentist(id, update){
    return Dentist.findByIdAndUpdate(id, update, {new: true})
}

// .: delete dentist
async function deleteDentist(id){
    return Dentist.findByIdAndDelete(id)
}

module.exports = {
    getAllDentist: getAllDentist,
    createPayment: createPayment,
    getPaymentById: getPaymentById,
    getDentistByPatient: getDentistByPatient,
    updateDentist: updateDentist,
    deleteDentist: deleteDentist,
}