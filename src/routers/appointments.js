const express = require('express')
const router = express.Router()
const Appointments = require('../usecases/appointments')

//rutas de appointments
router.get('/', async (request,response)=>{
    try{
        const appointments = await Appointments.getAppointments()
        response.json({
            success:true,
            message:"All Appointments fetched",
            data:{
                appointments
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error fetching the appointments',
            error: "Error fetching the appointments"
        })

    }
})
router.get('/:id',async (request,response)=>{
    try{
        const {id} = request.params;
        const appointment = await Appointments.getAppointmentById(id);
        response.json({
            success:true,
            message:"Appointment fetched successfully",
            data:{
                appointment
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error fetching the appointment',
            error: "Error fetching the appointment"
        })

    }

})
router.post('/', async (request,response)=>{
    try{
        const appointmentData = request.body;
        const newAppointment = await Appointments.createAppointment(appointmentData)
        response.json({
            success:true,
            message:"Appointment created succesfully",
            data:{
                newAppointment
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error creating appointment',
            error: "Error creating appointment"
        })

    }
})

router.patch('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const appointmentData = request.body
        const updatedAppointment = await Appointments.updateAppointmentById(id,appointmentData)
        response.json({
            success:true,
            message:"Appointment updated succesfully",
            data:{
                updatedAppointment
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error updating appointment',
            error: "Error updating appointment"
        })
    
    }
})

router.delete('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const deletedAppointment = await Appointments.deleteAppointment(id)
        response.json({
            success:true,
            message:"Appointment deleted succesfully",
            data:{
                deletedAppointment
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error deleting appointment',
            error: "Error deleting appointment"
        })
    }
})


module.exports = router