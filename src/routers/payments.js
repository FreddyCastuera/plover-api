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
        if(paymentIdFound) {
            response.json({
                success: true,
                messaje: `Payment with ID: { ${id} } found`,
                data:{
                    payment: paymentIdFound
                }
            })
        }else {
            response.json({
                success: false,
                messaje: `Payment ID: { ${id} } doesn't exist`,
                data:{
                    payment: paymentIdFound
                }
            })
        }
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Payment ID provided does not exist, try again with a valid id..."
        })
    }
});

// .: GET payments of each patient
router.get('/patients/:id', (request, response)=>{
    const {id, idPatient} = request.params

})

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

// .: PATCH payment by id
router.patch('/:id', async (request, response)=> {
    try{ 
        const {id} = request.params;
        const  newPaymentData = request.body
        const paymentUpdated = await Payments.updatePayment(id, newPaymentData)
        response.json({
            success: true,
            message: "Payment is updated",
            data: {
                payment: paymentUpdated
            }
        })
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Updating payment went wronw... try again",
        })
    }
})

// .: DELETE payment by id
router.delete('/:id', async (request, response)=>{ 
    try{
        const {id} = request.params;
        let deletePaymentById = await Payments.deletePayment(id)
        
        if(deletePaymentById) {
            response.json({
                success: true,
                messaje: `Payment ID: { ${id} } has been deleted`,
                data:{
                    payment: deletePaymentById
                }
            })
        }else {
            response.json({
                success: false,
                messaje: `Payment ID: { ${id} } doesn't exist`,
            })
        }
        
    }
    catch(error) {
        response.status(400)
        response.json({
            success: false,
            error: error.message,
            message: "Payment ID provided does not exist, try again with a valid id..."
        })
    }
})

module.exports = router