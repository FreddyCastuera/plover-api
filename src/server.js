const express = require('express');
const server = express();
const appointmentsRouter = require('./routers/appointments')
const cors = require('cors')
server.use(express.json());
server.use(express.urlencoded());
server.use(cors({
    origin:'*'
}))

server.use('/appointments',appointmentsRouter);

module.exports = server