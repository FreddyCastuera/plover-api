const express = require('express');
const server = express();
const paymentRouter = require('./routers/payments')
const appointmentsRouter = require('./routers/appointments')
const patientsRouter = require('./routers/patients')
const cors = require('cors')
server.use(express.json());
server.use(express.urlencoded());
server.use(cors({
    origin:'*'
}))

server.use('/appointments',appointmentsRouter);
server.use('/payments', paymentRouter)
server.use('/patients',patientsRouter)
server.use('/dentist', dentistRouter)

module.exports = server

