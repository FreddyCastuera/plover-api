// .: Server definition
const express = require('express');
const server = express();
const paymentRouter = require('./routers/payments')

// .: Middleware
server.use(express.json());

// .: Routers
server.use('/payments', paymentRouter)
module.exports = server