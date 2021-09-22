const mongoose = require('mongoose')

// .: Model Payments ->
const paymentsSchema = new mongoose.Schema({

    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    receipt: {
        type: Buffer,
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