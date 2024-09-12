const mongoose = require('mongoose');



const validateEmail = (email) => {
    const parts = email.split('@');
    return parts.length === 2 && parts[1] === 'nith.ac.in';
  };
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        validate: {
            validator: validateEmail,
            message: 'Email must be a valid NIT Hamirpur email ID',
        },
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },

    cgpa: {
        type: Number,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    placed: {
        type: Boolean,
        default: false
    },
    offers: {
        type: [Object],
        default: [],
    },
    debar: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'student'
    },
    optout: {
        type: Boolean,
        default: false
    }

} ,
{timestamps: true,},  
);