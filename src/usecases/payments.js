const Payments = require('../models/payments')
const dbConnect = require('../lib/db')

dbConnect().then(()=>{
    console.log('database connected')
})

let paymentTest={
    total: 500,
    date: new Date(),
    receipt: "una imagen"
}

async function createPayment(payment){
    const {total, date, receipt} = payment
    //return Payment.create({...payment})
    console.log(payment)
}


console.log(createPayment(paymentTest))