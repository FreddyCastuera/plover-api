const mongoose = require('mongoose')
//quiero hacer cambios aqui
const appointmentsSchema = new mongoose.Schema({
    idPatient:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    idDentist:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    procedures: [
        {name:{
            type:String,
            required:true,
            lowercase:true,
            trim:true,

        },
        price:{
            type:Number,
            required:true
        },
        status:{
            type:Boolean,
            required:true
        }
    }
    ],
    annotations: {
        type: String,
        lowercase:true,
        trim:true
    },
    recommendations: {
        type: String,
        lowercase:true,
        trim:true
    },
    date: {
        type: Date,
        default:Date.now
    }
},{ timestamps: true })

const model = mongoose.model('appointments', appointmentsSchema)

module.exports = model