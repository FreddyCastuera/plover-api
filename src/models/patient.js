const mongoose = require('mongoose')
//quiero hacer cambios aqui
const patientsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:String,
        enum: { values: ['hombre','mujer','otro'], message: '{VALUE} is not supported' }
    },
    age:{
        type:Number
    },
    height:{
        type:Number
    },
    weigth:{
        type:Number
    },
    bloodType:{
        type:String,
        enum:{values:['A+','O+','B+','AB+','A-','O-','B-','AB-'], message: '{VALUE} is not supported'}
    },
    maritalStatus:{
        type:String
    }
},{ timestamps: true })

const model = mongoose.model('patients', patientsSchema)

module.exports = model