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
router.get('/:id',async (request, response)=> {
    try {
        const {id} = request.params
        const dentistFound = await Dentists.getDentistById(id)
        if(dentistFound) {
            response.status(200);
            response.json({
                success: true,
                message: `Dentist with the id:{ ${id} }  has been found.`,
                data: {
                    dentist: dentistFound
                } 
                })
        } else {
            response.status(204)
            response.json({
                success: false,
                message: `Dentist with the following id doesn't exist: ${id}`,
            })

        }
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            message: `Dentist with { ${id} } doesn't exist in the database.`,
            error: error.message,
        })
    }
})

// .: POST dentist
router.post('/register', async (request, response)=> {
    try {
        const newDentist = request.body
        const dentistCreated = await Dentists.createDentist(newDentist)
        if(dentistCreated){
            response.status(201)
            response.json({
                success: true,
                message:"Dentist created",
                data: {
                    dentist: dentistCreated
                }
            });
        } else {
            response.json({
                success: false,
                messaje: 'email already in use, recover password or use another email',
            })
    }
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Something went wrong at creating a new Dentist, try again...",
        })
    }
})

// .: GET verify dentist
router.get('/verify/:id/:emailToken', async (request, response)=>{
    try {
    const { id, emailToken } = request.params
    const token = emailToken
    
    console.log('id:',id)
    console.log('emailToken:', emailToken)

    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            error: error.message
        })
    }
})

// .: PATCH dentist
router.patch('/:id', async (request, response)=> { 
    try {
        const {id} = request.params;
        const newDentistData = request.body; 
        const dentistUpdated = await Dentists.updateDentist(id, newDentistData);
        if(dentistUpdated){
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
        else{
            response.json({
                success: false,
                message:"The dentist you're trying to update doesn't exist"
            })
        }
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Something went wrong updating the dentist... try again"
        })
    }
})


// .: Delete Dentist
router.delete('/:id',async (request, response)=> {
    try {
        const {id} = request.params
        const findIdDentist = await Dentists.getDentistById(id)
        if(findIdDentist){
            const dentistDeleted =  await Dentists.deleteDentist(id)
            response.status(200)
            response.json({
                success: true,
                message: "Dentist deleted",
                data: {
                    dentistDeleted
                }
            })
        } else {
            response.status(200)
            response.json({
                success: false,
                messaje: "The dentist you're trying to delete doesn't exist.",
            })
        }
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            message: "Something went wrong at deleting the dentist, try again...",
            error: error.message
        })
    }
})

module.exports  = router