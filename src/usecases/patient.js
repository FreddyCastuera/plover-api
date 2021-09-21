const patients = require('../models/patient')

async function createPatient(newpatient){
    let patient = await patients.create(newpatient)
    console.log(patient)
    return patient
}
async function getPatients(){
    const patient = await patients.find({})
    console.log(patients)
    return patient
}
async function getPatientById(id){
    const patient = await patients.findById(id)
    console.log(patient)
    return patient
}
async function updatePatientById(id,updatedpatient){
    const patient=  await patients.findByIdAndUpdate(id,updatedpatient,{new:true})
    console.log(patient)
    return patient
}
async function deletePatientById(id){
    const patient = await patients.findByIdAndRemove(id)
    console.log(patient)
    return patient
}

module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatientById,
    deletePatientById
}