const express = require('express');
const router = express.Router();

// .: Importing usescases
const Payments = require('../usecases/payments');

// .: Methods

// .: GET all payments
router.get('/', async (request, response)=> {
    try {
        const allPayments = await Payments.getAllPayments(); 
        response.status(200)
        response.json({
            success:true,
            message:"Getting all payments",
            data:{
                payment: allPayments
            }
        })
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Recovering payments went wrong try again..."
        })
    }
});

// .: GET payment by ID
router.get('/:id', async (request, response)=> {
    try{
        const {id} = request.params;
        const paymentIdFound = await Payments.getPaymentById(id)
        response.json({
            success: true,
            messaje: `Payment with ${id} found`,
            data:{
                payment: paymentIdFound
            }
        })
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "id provided does not exist, try again with a valid id..."
        })
    }
});

// .: POST create a payment
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
            error: error.message,
            message: "Creating new payment went wronw... try again"
        })
    }
});

module.exports = router