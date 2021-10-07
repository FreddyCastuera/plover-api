const dotenv = require('dotenv')
const sgMail = require('@sendgrid/mail');
const Dentist = require('../models/dentists');
const Patients = require('../models/patients');
const jwt = require ('../lib/jwt');
const ploverEmail = 'plover.software@gmail.com'
dotenv.config()
const EMAIL_API_ID = process.env.EMAIL_API_ID
sgMail.setApiKey(EMAIL_API_ID)


function SendEmail(email, name, emailToken, id){
    try {
        const msg = {
            to: email,
            from: ploverEmail,
            subject: "Plover Account Registration",
            text: `Hola ${name}, para confirmar tu cuenta ingresa al siguiente link para empezar a usar tu cuenta
            http://localhost:8080/dentists/verify/${id}/${emailToken}`
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

function ChangePasswordEmail(email, id, name){
    try {
        //let token = jwt.sign({email: email, id: id}, 'secret', {expiresIn: '2h'});
        //console.log(token)
        const msg = {
            to: email,
            from: ploverEmail,
            subject: "Plover Recovery password",
            text: `Hola ${name}, has solicitado cambiar la contraseña, accede al siguiente link para hacerlo
            en caso de que no lo hayas solicitado, haz caso omiso de este correo
            http://localhost:3000/changepass/${id}`
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
        ChangePasswordEmail: ChangePasswordEmail,
}