const express = require('express')
const router = express.Router()
const Patients = require('../usecases/patient')

//rutas de Patient
router.get('/', async (request,response)=>{
    try{
        const patient = await Patients.getPatients()
        if(patient){
            response.status(200)
            response.json({
                success:true,
                message:"All Patients fetched",
                data:{
                    patient
                }
            })
        }
        else{
            response.status(204)
            response.json({
                success:true,
                message:"All Patients fetched",
                data:{
                    patient
                }
            })

        }

    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error fetching the patients',
            error: "Error fetching the patients"
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
            error: "Error fetching the patient"
        })

    }

})
router.post('/', async (request,response)=>{
    try{
        const patientData = request.body;
        const newPatient = await Patients.createPatient(patientData)
        response.json({
            success:true,
            message:"Patient created succesfully",
            data:{
                newPatient
            }
        })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error creating patient',
            error: "Error creating patient"
        })

    }
})

router.patch('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const patientData = request.body
        const updatedPatient = await Patients.updatePatientById(id,patientData)
        if(updatedPatient){
            response.json({
                success:true,
                message:"Patient updated succesfully",
                data:{
                    updatedPatient
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
            error: "Error updating patient"
        })
    
    }
})

router.delete('/:id',async (request,response)=>{
    try{
        const {id} = request.params
        const deletedPatient = await Patients.deletePatientById(id)
        if(deletedPatient){
            response.json({
                success:true,
                message:"Patient deleted succesfully",
                data:{
                    deletedPatient
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
            error: "Error deleting patient"
        })
    }
})


module.exports = router