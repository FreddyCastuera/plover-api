const express = require('express');
const router = express.Router();


// Reset Password

// .: Importing uses cases
const Recovery = require('../usecases/recoverPassword')
const Dentists = require('../usecases/dentists');
const Patients = require('../usecases/patients');

router.post('/',async (request, response)=> {
    try{
    const recoveryData = request.body;
    const sendRecoveryEmail =  await Recovery.recoverPassword(recoveryData)
    response.status(200)
    response.json({
        success: true,
        message: 'email sent correctly',
        data: {
            sendRecoveryEmail,
        }
    })
    }
    catch(error){
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: 'Something went wrong trying to send the email'
        })
    }
})

router.patch('/reset/:id/', async (request, response)=>{
   try{ 
    const {id} = request.params
    const {password} = request.body
    //console.log('id:', id)
    //console.log('token.', token)
    console.log('psw:', password)
    let newData = password

    const resetStatus = await Recovery.resetPassword(newData, id)
    response.status(200)
    response.json({
        succes: true,
        message: 'password reseted',
        data: {
                resetStatus,
        },
    });
   }
   catch(error){
       response.status(400)
       response.json({
           success:false,
           error: error.message,
           message: 'Something went wrong at reseting password, try again'
       })
   }
    
})

module.exports = router