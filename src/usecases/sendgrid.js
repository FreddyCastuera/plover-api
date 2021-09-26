const sgMail = require('@sendgrid/mail');
const Dentist = require('../models/dentists');
const Patients = require('../models/patients');
const jwt = require ('../lib/jwt');


const EMAIL_API_ID = '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'
const ploverEmail = 'plover.software@gmail.com'

sgMail.setApiKey(EMAIL_API_ID)


function SendEmail(email, name, emailToken, id){
    try {
        const msg = {
            to: email,
            from: ploverEmail,
            subject: "Plover Account Registration",
            text: `Hola ${name}, para confirmar tu cuenta ingresa al siguiente link para empezar a usar tu cuenta
            http://localhost:8080/verify/${id}/{emailToken}`
        }
        
        const emailSuccess = sgMail.send(msg,(error, result)=>{
            if(error){
                console.log('Email not Sent');
            } else {
                console.log('Email Sent Success');
            }
        });
        return emailSuccess
    }
    catch(error){
        console.log(error.message)
    }
}


module.exports = {
        SendEmail: SendEmail,
}