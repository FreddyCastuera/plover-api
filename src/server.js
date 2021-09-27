const express = require('express');
const server = express();
const paymentRouter = require('./routers/payments')
const appointmentsRouter = require('./routers/appointments')
const patientsRouter = require('./routers/patients')
const dentistsRouter = require('./routers/dentists')
const authRouter = require('./routers/auth')
const cors = require('cors')
server.use(express.json());

server.use(cors({
    origin:'*'
}))

server.use('/appointments',appointmentsRouter);
server.use('/payments', paymentRouter);
server.use('/patients',patientsRouter);
server.use('/dentists', dentistsRouter);
server.use('/auth',authRouter)

module.exports = server

