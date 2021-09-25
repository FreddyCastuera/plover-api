const mongoose = require('mongoose')

// .: Model Dentist ->
const dentistSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
        },
    birthDate: {
        dueDate: Date
    },
    gender: {
        type: String,
        enum: ['masculino', 'femenino', 'otro'],
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.*@.*\..*/,
    },
    telephoneNumber: {
        type: String,
        minLength: 10,
        required: true,
        trim: true
    },
    clinicName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
        trim: true
    },
    clinicNumber: {
        type: Number,
        minLength: 10,
        required: true,
    },
    clinicAdress: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true,
        trim: true
      },
      neighborhood: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true,
        trim: true
      },
      zipCode: {
        type: Number,
        minLength: 5,
        required: true
      },
      clinicEmail: {
        type: String,
        required: true,
        match: /.*@.*\..*/,
      },
      degree: {
        type: String,
        minLength: 8,
        maxLength: 50,
        required: true,
        trim: true
      },
      college: {
        type: String,
        minLength: 8,
        maxLength: 50,
        required: true,
        trim: true
      },
      profesionalLicense: {
        type: String,
        minLength: 7,
        maxLength: 10,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      },
      patients: {
        type:[{ type: mongoose.Schema.Types.ObjectId}],
        default:[]
      }

}, {timestamps: true})

const model = mongoose.model('dentists', dentistSchema);
module.exports = model
