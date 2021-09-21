const mongoose = require('mongoose')
//quiero hacer cambios aqui
const appointmentsSchema = new mongoose.Schema({
    idPatient:{
        type:mongoose.Types.ObjectId
    },
    idDentist:{
        type:mongoose.Types.ObjectId
    },
    procedures: [{name:String,price:Number,status:Boolean}],
    annotations: {
        type: String
    },
    recommendations: {
        type: String,
    },
    date: {
        type: Date,
        default:Date.now
    }
},{ timestamps: true })

const model = mongoose.model('appointments', appointmentsSchema)

module.exports = model