const mongoose = require('mongoose')

// .: Model Payments ->
const paymentsSchema = new mongoose.Schema({

    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date
    },
    receipt: {
        type: Buffer,
    },
    idPatient:{
        type:mongoose.Types.ObjectId
    },
    idDentist:{
        type:mongoose.Types.ObjectId
    },
}, {timestamps: true})

const model = mongoose.model('payments', paymentsSchema);

module.exports = model