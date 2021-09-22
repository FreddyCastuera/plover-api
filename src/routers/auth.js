const express = require('express')
const auth = require('../usecases/auth')
const router = express.Router()

router.post('/login', async (request, response)=>{
    try{
        const {email, password} = request.body;
        const token = await auth.login(email, password);
        response.json({
            success: true,
            message: 'User logged',
            data: {
                token
            }
        });
    } catch(error){
        response.json({
            success: false,
            message:  'Invalid credentials',
            error: error.message
        });
    }
});

module.exports = router