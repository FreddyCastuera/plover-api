const mongoose = requite('mongoose');

// .: Model Dentist ->

const modelSchema = new mongoose.Schema({
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
        type: Number,
        minLength: 10,
        required: true
    }
    
})