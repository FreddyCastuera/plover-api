const Appointments = require('../models/appointments')
const dbConnect = require('../lib/db')

dbConnect().then(()=>{
    console.log('database connected')
})

const appointmentExample = {
    procedures: [{name:"limpieza dental",price:2500,status:false}],
    annotations:"se realizara una limpieza dental en el paciente",
    recommendations: "lavarse la boca bien chido",
    date: new Date()
}

async function createAppointment(appointment){
    let newAppointment = await Appointments.create(appointment)
}
createAppointment(appointmentExample);

