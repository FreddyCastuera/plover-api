const express = require('express')
const router = express.Router()
const Patients = require('../usecases/patients')
const Bcrypt = require('../lib/bcrypt')

//rutas de Patient
//terminamos las rutas de paciente
router.get('/', async (request,response)=>{
    try{
        const patients = await Patients.getPatients()
        if(patients){
            response.status(200)
            response.json({
                success:true,
                message:"All Patients fetched",
                data:{
                    patients
                }
            })
        }
        else{
            response.status(204)
            response.json({
                success:true,
                message:"All Patients fetched",
                data:{
                    patients
                }
            })

        }

    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error fetching the patients',
            error: error.message
        })

    }
})
router.get('/:id',async (request,response)=>{
    try{
        const {id} = request.params;
        const patient = await Patients.updatePatientById(id);
        if(patient){
            response.json({
                success:true,
                message:"Patient fetched successfully",
                data:{
                    patient
                }
            })
        }
        else{
            response.json({
                success:true,
                message:"the patient you are looking for does not exist",
            })

        }
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error fetching the patient',
            error: error.message
        })

    }
})
router.get('/:id/appointments',async (request,response)=>{
    try{
        const {id} = request.params;
        const appointmentsPatient = await Patients.getAppointmentsByPatientsId(id);
        if(appointmentsPatient){
            response.json({
                success:true,
                message:"Patient appointments fetched successfully",
                data:{
                    appointmentsPatient
                }
            })
        }
        else{
            response.json({
                success:true,
                message:"the patient you are looking for does not exist",
            })

        }
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error fetching the patient',
            error: error.message
        })

    }
})
router.get('/:id/payments',async (request,response)=>{
    try{
        const {id} = request.params;
        const paymentsPatient = await Patients.getPaymentsByPatientsId(id);
        if(paymentsPatient){
            response.status(200)
            response.json({
                success:true,
                message:"Patient payments fetched successfully",
                data:{
                    paymentsPatient
                }
            })
        }
        else{
            response.json({
                success:true,
                message:"the patient you are looking for does not exist",
            })

        }
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error fetching the patient',
            error: error.message
        })

    }
})


router.post('/', async (request,response)=>{
    const {idDentist} = request.query
    console.log(idDentist)
    try{
        const patientData = request.body;
        const patient = await Patients.createPatient(patientData,idDentist)
        response.json({
            success:true,
            message:"Patient created succesfully",
            data:{
                patient
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error creating patient',
            error: error.message
        })

    }
})

router.patch('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const patientData = request.body
        const patient = await Patients.updatePatientById(id,patientData)
        if(patient){
            response.json({
                success:true,
                message:"Patient updated succesfully",
                data:{
                    patient
                }
            })
        }
        else{
            response.json({
                success:true,
                message:"The patient you are trying to update does not exist",
            })
        }
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error updating patient',
            error: error.message
        })
    
    }
})

router.delete('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const patient = await Patients.deletePatientById(id)
        if(patient){
            response.json({
                success:true,
                message:"Patient deleted succesfully",
                data:{
                    patient
                }
            })
        }
        else{
            response.json({
                success:true,
                message:"The patient you are trying to delete does not exists",
            })
        }
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error deleting patient',
            error: error.message
        })
    }
})


router.patch('/changepassword/:id', async (request, response)=> {
    try{
        const {id, password, newPassword} = request.body
        console.log(id, password)
        const changePassword = await Patients.changePasswordPatient(id, password, newPassword)
        if(changePassword){
            response.status(201)
            response.json({
                success: true,
                message: "Password updated",
                data: {
                    dentist: {
                        changePassword
                    }
                }
            })
        } else {
            response.json({
                success: false,
                message: "Password doen't match",
                data: {
                    dentist: {
                        changePassword
                    }
                }
            })
            }
        }
    catch (error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: 'Something went wrong at changing password, try again'
        })
    }
})

module.exports = router