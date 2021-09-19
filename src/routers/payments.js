const express = require('express');
const Payments = require('../usecases/payments');
const router = express.Router()


router.post('/', async (request, response)=> {
    console.log(request.body)
    try{
        const newPayment = request.body 
        const paymentCreated = await Payments.createPayment(newPayment);

        response.json({
            sucess: true,
            messages: "Payment created",
            data: {
                payment: paymentCreated
            }
        })
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            message: "Something went wronw... try again"
        })
    }
});

module.exports = router