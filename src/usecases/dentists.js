const Dentists = require('../models/dentists')
const Bcrypt = require('../lib/bcrypt')
const Sendgrid = require('./sendgrid')

// .: search all the Dentist in the DB
async function getAllDentist(){
    return Dentists.find()
}

// .: search dentist by id
async function getDentistById(id){
    return Dentists.findById(id)
}

// .: search patiens of the Dentist
async function getDentistByPatient(id){
    return Dentists.findById(id)
}

// .: create new dentist
async function createDentist(newDentist){
    try{
        const {email, password, name} = newDentist
        let emailExist = await Dentists.findOne({email: email})

        if(emailExist) throw new Error(' yawcAW email already in use, recover password or use another email');
        
        let encryptedPassword= await Bcrypt.hash(password);
        let encryptedEmail = await Bcrypt.hash(email);
        
        const dentistCreated = await Dentists.create({...newDentist, password: encryptedPassword, emailToken: encryptedEmail});
        const { id } = dentistCreated
        
        //if(!dentistCreated) throw new Error('Somethig went wrong creating the dentist')
        const emailVerification = await Sendgrid.SendEmail(email, name, encryptedEmail, id);
        
        return emailVerification && dentistCreated

    } catch(error){console.log(error.message)}
}

// .: change verify dentist
async function verifyToken(id, token){
    try{
        let idExist = await Dentists.findById(id)
        let {emailToken, verified} = idExist
        
    }
    catch(error){console.log(error.message)}
}

// .: patch dentist
async function updateDentist(id, newDentistData){
    try{
        let idExist = Dentists.findById(id)
        if(!idExist) throw new Error("Dentist doesn't exist");
        return Dentists.findByIdAndUpdate(id, newDentistData, {new: true})
    }
    catch(error){console.log(error.message)}
}

// .: delete dentist
async function deleteDentist(id) {
    try {
        let idExist = Dentists.findById(id)
        if(!idExist) throw new Error("Dentist doesn't exist");
        return Dentists.findByIdAndDelete(id)
    }
    catch(error){console.log(error.message)}
}

module.exports = {
    getAllDentist: getAllDentist,
    createDentist: createDentist,
    getDentistById: getDentistById,
    getDentistByPatient: getDentistByPatient,
    updateDentist: updateDentist,
    deleteDentist: deleteDentist,
}