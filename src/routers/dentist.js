const express = require('express');
const router = express.Router();


// .: Importing usescases
const Dentist = require('../usecases/dentist');

// .: Methods

// .: GET all dentist
router.get('/', async (request, response)=>{
    try {
        const allDentist = await Dentist.getAllDentist();
        response.status(200)
        response.json({
            success:true,
            message: "Dentist list",
            data: {
                dentist: allDentist
            }
        })

    } catch(error) {
        response.status(400)
        response.json({
            success:false,
            error: error.message,
            message: "Recovering dentist went wrong, try agan..."
        })
    }
})

// .: Get dentist by id
router.get('/:id',async (request, response)=>{
    try {
        const {id} = request.params
        const dentistFound = await Dentist.getDentistById
        if(dentistFound) {
            response.json(200);
            response.json({
                success: true,
                message: `Dentist with { ${id} } found.`,
                data: {
                    dentist: dentistFound
                } 
                })
        } else {
            response.status()
            response.json({
                success: false,
                message: `Dentist with { ${id} } doesn't exist.`,
            })

        }
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Something went wrong, try again..."
        })
    }
})

// .: POST dentist
router.post('/dentist', async (request, response)=> {
    const newDentist = request.body
    const dentistCreated = await Dentist.createDentist(newDentist)
    try {
        const {email} = newDentist
        const existingEmail = await Dentist.findOne(email)
        if(!existingEmail){
            response.status(201)
            response.json({
                success: true,
                message:"Dentist created",
                data: {
                    dentist: dentistCreated
                }
            })
        } else{
            response.status(400)
            response.json({
                success: false,
                message:"email already exist"
            })
        }
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Something went wrong, try again...",
        })
    }
})

// .: PATCH dentist
router.patch('/id:', async (request, response)=> { 
    try {
        const {id} = request.params;
        const newDentistData = request.body;
        const dentistUpdated = await Dentist.updateDentist(newDentistData);
        response.status(200)
        response.json({
            success: true,
            message: "Dentist updated",
            data: {
                dentist: {
                    dentistUpdated
                }
            }
        })
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Something went wrong... try again"
        })
    }
})

module.exports  = router