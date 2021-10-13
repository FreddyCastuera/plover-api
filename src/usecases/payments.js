const Payments = require('../models/payments')
//este es un punto de revisiongi

// .: search all the payments in the DB
async function getAllPayments(){
    return await Payments.find()
}
// .: search payment by id
async function getPaymentById(id){
    return await Payments.findById(id)
}
// .: search payments of each patient
async function getPaymentsByPatient(idPatient){
    return await Payments.find({idPatient:idPatient})
}
// .: search payments of each dentist
async function getPaymentsByDentist(idDentist){
    return await Payments.find({idDentist:idDentist})
}
// .: create payment
async function createPayment(payment){
    //const {total, date, receipt} = payment
    return await Payments.create({...payment})
}
// .: patch payment
async function updatePayment(id, update){
    return  await Payments.findByIdAndUpdate(id, update, {new: true})
}
// .: delete payment
async function deletePayment(id){
    return await Payments.findByIdAndDelete(id)
}

module.exports = {
    getAllPayments: getAllPayments,
    createPayment: createPayment,
    getPaymentById: getPaymentById,
    getPaymentsByPatient: getPaymentsByPatient,
    getPaymentsByDentist: getPaymentsByDentist,
    updatePayment: updatePayment,
    deletePayment: deletePayment,
}