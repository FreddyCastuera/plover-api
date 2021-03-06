const express = require('express')
const router = express.Router()
const Appointments = require('../usecases/appointments')

//rutas de appointments
router.get('/', async (request,response)=>{
    try{
        let appointments = await Appointments.getAppointments()
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
            error: error.message
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
            error: error.message
        })

    }

})

router.post('/', async (request,response)=>{
    try{
        const {body:appointmentData} = request;
        console.log("esto es desde las rutas")
        console.log(appointmentData)
        const appointment = await Appointments.createAppointment(appointmentData)
        //codigo de respuesta cuando se crea exitosamente un recurso
        response.status(201)
        response.json({
            success:true,
            message:"Appointment created succesfully",
            data:{
                appointment
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error creating appointment',
            error: error.message
        })

    }
})

router.patch('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const {body:appointmentData} = request
        const appointment = await Appointments.updateAppointmentById(id,appointmentData)
        if(appointment){
            response.status(201)
            response.json({
                success:true,
                message:"Appointment updated succesfully",
                data:{
                    appointment
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
            error: error.message
        })
    
    }
})

router.delete('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const appointment = await Appointments.deleteAppointmentById(id)
        if(appointment){
            response.status(200)
            response.json({
                success:true,
                message:"Appointment deleted succesfully",
                data:{
                    appointment
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
            error: error.message
        })
    }
})


module.exports = router