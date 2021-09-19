const Appointments = require('../models/appointments')


async function createAppointment(newAppointment){
    let appointment = await Appointments.create(newAppointment)
    console.log(appointment)
    return appointment
}
async function getAppointments(){
    const appointments = await Appointments.find({})
    console.log(appointments)
    return appointments
}
async function getAppointmentById(id){
    const appointment = await Appointments.findById(id)
    console.log(appointment)
    return appointment
}
async function updateAppointmentById(id,updatedAppointment){
    const appointment=  await Appointments.findByIdAndUpdate(id,updatedAppointment,{new:true})
    console.log(appointment)
    return appointment
}
async function deleteAppointment(id){
    const appointment = await Appointments.findByIdAndRemove(id)
    console.log(appointment)
    return appointment
}

module.exports = {
    createAppointment,
    getAppointments,
    getAppointmentById,
    updateAppointmentById,
    deleteAppointment
}