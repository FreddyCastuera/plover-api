const Payments = require('../models/payments')
//este es un punto de revision

// .: search all the payments in the DB
async function getAllPayments(){
    return Payments.find()
}
// .: search payment by id
async function getPaymentById(id){
    return Payments.findById(id)
}
// .: search payments of each patient
async function getPaymentsByPatient(id){
    return Payments.findById(id)
}
// .: create payment
async function createPayment(payment){
    //const {total, date, receipt} = payment
    return Payments.create({...payment})
}
// .: patch payment
async function updatePayment(id, update){
    return Payments.findByIdAndUpdate(id, update, {new: true})
}
// .: delete payment
async function deletePayment(id){
    return Payments.findByIdAndDelete(id)
}

module.exports = {
    getAllPayments: getAllPayments,
    createPayment: createPayment,
    getPaymentById: getPaymentById,
    getPaymentsByPatient: getPaymentsByPatient,
    updatePayment: updatePayment,
    deletePayment: deletePayment,
}