const Payments = require('../models/payments')

async function createPayment(payment){
    const {total, date, receipt} = payment

    return Payments.create({...payment})
}

module.exports = {
    createPayment: createPayment,
}