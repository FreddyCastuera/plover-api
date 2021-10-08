const express = require('express');
const router = express.Router();

// rama dentista
// .: Importing usescases
const Dentists = require('../usecases/dentists');
// .:-- Methods --:. 

// .: GET all dentist
router.get('/', async (request, response) => {
    try {
        const allDentist = await Dentists.getAllDentist()
        response.status(200)
        response.json({
            success: true,
            message: "Dentist list",
            data: {
                dentist: allDentist
            }
        })

    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Recovering dentist went wrong, try agan..."
        })
    }
})

// .: Get dentist by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const dentistFound = await Dentists.getDentistById(id)
        if (dentistFound) {
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
    catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: `Dentist with { ${id} } doesn't exist in the database.`,
            error: error.message,
        })
    }
})

router.get('/:id/appointments',async (request, response)=>{
    try {
        const {id} = request.params
        const appointmentsDentist = await Dentists.getAppointmentByDentistId(id)
        if(appointmentsDentist) {
            response.status(200);
            response.json({
                success: true,
                message: `Appointments from dentits with id ${id} succesfully fetched.`,
                data: {
                    appointmentsDentist
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


router.get('/:id/patients',async (request, response)=>{
    try {
        const {id} = request.params
        const patientsByDentist = await Dentists.getPatientsByDentistsId(id)
        if(patientsByDentist) {
            response.status(200);
            response.json({
                success: true,
                message: `Patients from dentits with id ${id} succesfully fetched.`,
                data: {
                    patientsByDentist
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



router.get('/:id/payments',async (request, response)=>{
    try {
        const {id} = request.params
        const paymentsDentist = await Dentists.getPaymentsByDentistsId(id)
        if(paymentsDentist) {
            response.status(200);
            response.json({
                success: true,
                data: {
                    paymentsDentist
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
router.post('/register', async (request, response) => {
    try {
        const newDentist = request.body
        const dentistCreated = await Dentists.createDentist(newDentist)
        if (dentistCreated) {
            response.status(201)
            response.json({
                success: true,
                message: "Dentist created",
                data: {
                    dentist: dentistCreated
                }
            });
        } else {
            response.json({
                success: false,
                message: 'email already in use, recover password or use another email',
            });
        }
    }
    catch (error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Something went wrong at creating a new Dentist, try again...",
        })
    }
})

// .: GET verify dentist
router.get('/verify/:id/:emailToken',async (request, response)=> {
   try{ 
    const {id, emailToken} = request.params
    console.log('id:', id)
    console.log('token:', emailToken)
    const tokenVerified = await Dentists.verifyToken(id, emailToken)
    console.log('route token:', tokenVerified);

    if(tokenVerified){
        response.status(200)
        response.json({
            success: true,
            message: 'The account have been verified',
            data: {
                tokenVerified
            }
        })

    } else {
        response.status(400)
        response.json({
            success: false,
            message: 'ROute invalid link'
        })
    }
   }
   catch(error){
       response.status(400)
       response.json({
           success: false,
           error: error.message,
       })
   }
});

// .: PATCH dentist
router.patch('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const newDentistData = request.body;
        const dentistUpdated = await Dentists.updateDentist(id, newDentistData);
        if (dentistUpdated) {
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
        else {
            response.json({
                success: false,
                message: "The dentist you're trying to update doesn't exist"
            })
        }
    }
    catch (error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Something went wrong updating the dentist... try again"
        })
    }
})

router.patch('/changepassword/:id', async (request, response)=> {
    try{
        const {id, password, newPassword} = request.body
        console.log(id, password)
        const changePassword = await Dentists.changePassword(id, password, newPassword)
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

// .: Delete Dentist
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const findIdDentist = await Dentists.getDentistById(id)
        if (findIdDentist) {
            const dentistDeleted = await Dentists.deleteDentist(id)
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
    catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: "Something went wrong at deleting the dentist, try again...",
            error: error.message
        })
    }
})

module.exports = router