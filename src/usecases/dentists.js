const Dentists = require('../models/dentists')
const Bcrypt = require('../lib/bcrypt')

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
        const {email, password} = newDentist
        let emailExist = await Dentists.findOne({email: email})
        if(emailExist){
            throw new Error('email already in use, recover password or use ana nother email');
        } else {
            let encryptedPassword= await Bcrypt.hash(password);
            return Dentist.create({...newDentist, password: encryptedPassword})
        }
    }
    catch(error){console.log(error.message)}
}

// .: Verifying existing dentist email for registration
/*async function verifyEmail(email){
    return Dentists.findOne(email)
}*/

// .: patch dentist
async function updateDentist(id, newDentistData){
    return Dentists.findByIdAndUpdate(id, newDentistData, {new: true})
}

// .: delete dentist
async function deleteDentist(id){
    return Dentists.findByIdAndDelete(id)
}

module.exports = {
    getAllDentist: getAllDentist,
    createDentist: createDentist,
    getDentistById: getDentistById,
    getDentistByPatient: getDentistByPatient,
    updateDentist: updateDentist,
    deleteDentist: deleteDentist,
}