const express = require('express');
const router = express.Router();

// rama dentista
// .: Importing usescases
const Dentists = require('../usecases/dentists');

// .:-- Methods --:. 

// .: GET all dentist
router.get('/', async (request, response)=>{
    try {
        const allDentist = await Dentists.getAllDentist();
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
        const dentistFound = await Dentists.getDentistById(id)
        if(dentistFound) {
            response.status(200);
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
router.post('/', async (request, response)=> {
    try {
        const newDentist = request.body
        const {email} = newDentist
        const existingEmail = await Dentists.verifyEmail({email: email})
        if(!existingEmail){
            const dentistCreated = await Dentists.createDentist(newDentist)
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

// .: POST login dentist
router.post('/login', async (request, response)=>{

})

// .: PATCH dentist
router.patch('/:id', async (request, response)=> { 
    try {
        const {id} = request.params;
        const newDentistData = request.body;
        const dentistUpdated = await Dentists.updateDentist(id, newDentistData);
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

// .: Delete Dentist

module.exports  = router