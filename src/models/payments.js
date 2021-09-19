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
    }
}, { timestamps: true})

const model = mongoose.model('payments', paymentsSchema);

module.exports = model