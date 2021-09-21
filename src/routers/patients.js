const express = require('express')
const router = express.Router()
const Patients = require('../usecases/patients')

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
router.post('/', async (request,response)=>{
    try{
        const patientData = request.body;
        const patient = await Patients.createPatient(patientData)
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


module.exports = router