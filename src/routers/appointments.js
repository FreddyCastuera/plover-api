const express = require('express')
const router = express.Router()
const Appointments = require('../usecases/appointments')

//rutas de appointments
router.get('/', async (request,response)=>{
    const {idPatient,idDentist} = request.query;
    try{
        let appointments
        if(idPatient){
            appointments = await Appointments.getAppointmentByPatient(idPatient)
        }
        else if(idDentist){
            appointments = await Appointments.getAppointmentByDentist(idDentist)
        }
        else{
            appointments = await Appointments.getAppointments()
        }
        if(appointments.length){
            response.status(200)
            response.json({
                success:true,
                message:"All Appointments fetched",
                data:{
                    appointments
                }
            })
        }
        else{
            response.status(200)
            response.json({
                success:true,
                message:"There are no appointments in the database"
            })
        }
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
        if(appointment){
            response.status(200)
            response.json({
                success:true,
                message:"Appointment fetched successfully",
                data:{
                    appointment
                }
            })
        }
        else{
            response.status(200)
            response.json({
                success:true,
                message:"We can not find a appointment with that id",
            })
        }
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
        const {body:appointmentData} = request;
        console.log("esto es desde las rutas")
        console.log(appointmentData)
        const newAppointment = await Appointments.createAppointment(appointmentData)
        //codigo de respuesta cuando se crea exitosamente un recurso
        response.status(201)
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
        const {body:appointmentData} = request
        const updatedAppointment = await Appointments.updateAppointmentById(id,appointmentData)
        if(updatedAppointment){
            response.status(201)
            response.json({
                success:true,
                message:"Appointment updated succesfully",
                data:{
                    updatedAppointment
                }
            })
        }
        else{
            //sin contenido, la solicitud no pudo encontrar el recurso, por lo tanto no devuelve nada la peticion
            response.status(200)
            response.json({
                success:true,
                message:"The appointment you are trying to update does not exist",
            })
        }
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
        const deletedAppointment = await Appointments.deleteAppointmentById(id)
        if(deletedAppointment){
            response.status(200)
            response.json({
                success:true,
                message:"Appointment deleted succesfully",
                data:{
                    deletedAppointment
                }
            })
        }
        else{
            response.status(200)
            response.json({
                success:true,
                message:"The appointment you are trying to delete does not exist",
            })

        }
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