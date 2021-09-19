const mongoose = require('mongoose')
//quiero hacer cambios aqui
const appointmentsSchema = new mongoose.Schema({
    procedures: [{name:String,price:Number,status:Boolean}],
    annotations: {
        type: String
    },
    recommendations: {
        type: String,
    },
    date: {
        type: Date
    }
},{ timestamps: true })

const model = mongoose.model('appointments', appointmentsSchema)

module.exports = model