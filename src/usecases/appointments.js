const Appointments = require('../models/appointments')
const Patients = require('../models/patients') 


async function createAppointment(newAppointment){
    let appointment = await Appointments.create(newAppointment)
    console.log("esto es desde los usecases")
    console.log(appointment)
    return appointment
}
async function getAppointments(){
    const appointments = await Appointments.find({})
    console.log(appointments)
    return appointments
}
async function getAppointmentById(id){
    const appointment = await Appointments.findById(id).populate({path:'idPatient',select:'name lastName'})
    console.log(appointment)
    return appointment
}
async function getAppointmentByPatient(idPatient){
    const appointment  = await Appointments.find({idPatient:idPatient})
    return appointment
}
async function getAppointmentByDentist(idDentist){
    const appointment  = await Appointments.find({idDentist:idDentist})
    return appointment
}

async function updateAppointmentById(id,updatedAppointment){
    const appointment=  await Appointments.findByIdAndUpdate(id,updatedAppointment,{new:true})
    console.log(appointment)
    return appointment
}
async function deleteAppointmentById(id){
    const appointment = await Appointments.findByIdAndRemove(id)
    console.log(appointment)
    return appointment
}

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    getAppointmentByPatient,
    getAppointmentByDentist,
    updateAppointmentById,
    deleteAppointmentById
}