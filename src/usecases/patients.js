const patients = require('../models/patients')
const dentists = require('../models/dentists')
const bcrypt = require('../lib/bcrypt')
const ObjectId = require('mongoose').Types.ObjectId
//ahora podemos recibir de un query param el id con dentista y guardar el paciente en el arreglo de pacientes del dentista
async function createPatient(newpatient,idDentist=null){
    const {email,password} = newpatient
    let emailExist= await patients.findOne({email:email})
    console.log(emailExist)
    if(emailExist) throw new Error('The email is already on use')

    let encryptedPassword = await bcrypt.hash(password);
    let patient = await patients.create({...newpatient,password:encryptedPassword})
    console.log(patient._id.toString())
    if(idDentist){
        await dentists.findByIdAndUpdate(idDentist,{$push:{patients:patient._id}})
    }
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