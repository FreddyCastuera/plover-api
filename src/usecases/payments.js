const Payments = require('../models/payments')

// .: search all the payments in the DB
async function getAllPayments(){
    return Payments.find()
}
// .: search a payment by id
async function getPaymentById(id){
    return Payments.findById(id)
}
// .: create a new payment
async function createPayment(payment){
    //const {total, date, receipt} = payment
    return Payments.create({...payment})
}
// .: patch a payment
async function updatePayment(id, update){
    return Payments.findByIdAndUpdate(id, update, {new: true})
}

module.exports = {
    getAllPayments: getAllPayments,
    createPayment: createPayment,
    getPaymentById: getPaymentById,
    updatePayment: updatePayment,
}