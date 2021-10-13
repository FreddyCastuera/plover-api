const mongoose = require('mongoose')

// .: Model Payments ->
const paymentsSchema = new mongoose.Schema({

    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default:Date.now
    },
    receipt: {
        type: String,
    },
    idPatient:{
        required:true,
        type:mongoose.Types.ObjectId,
    },
    idDentist:{
        required: true,
        type:mongoose.Types.ObjectId,
    },
}, {timestamps: true})

const model = mongoose.model('payments', paymentsSchema);

module.exports = model